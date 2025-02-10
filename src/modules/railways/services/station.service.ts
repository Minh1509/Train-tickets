import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Station } from "../entity/station.entity";
import { Repository } from "typeorm";
import { CreateStationDto, UpdateStationDto } from "../dto/admin-station.dto";
import { normalizeStringForComparison, normalizeStringForDatabase } from "@base/api/helpers";
import { ICreatedBy, IDeletedBy, IUpdatedBy } from "@base/api/interface";


@Injectable()
export class StationService {
    constructor(@InjectRepository(Station) private readonly stationRepository: Repository<Station>) { }

    /**
     * 
     * @param dto 
     * xóa khoảng trắng: 2 bên, ở giữa
     * so sánh cần chuyển về Lower case
     * so sánh cần giữ nguyên dấu
     * lưu vào db cần viết hoa chữ cái đầu của mỗi từ, giữ nguyên dấu của từ
     * @returns 
     * cần cấu hình db để phân biệt dấu
     * ALTER TABLE stations MODIFY name VARCHAR(255) COLLATE utf8mb4_bin;
     */
    public async createStation(dto: CreateStationDto) {
        const { name, userId } = dto;

        const normalizeNameForComparison = normalizeStringForComparison(name);
        const normalizeNameForDatabase = normalizeStringForDatabase(name);

        const foundStation = await this.stationRepository
            .createQueryBuilder('stations')
            .where("LOWER(stations.name) = LOWER(:name)", { name: normalizeNameForComparison })
            .andWhere("stations.status = 'active' ")
            .getOne();

        if (foundStation) throw new BadRequestException("Ga này đã tồn tại");

        const createdBy: ICreatedBy = { userId };
        const newStation = this.stationRepository.create({
            ...dto,
            name: normalizeNameForDatabase,
            createdBy,
        });

        await this.stationRepository.save(newStation);
        return { data: newStation };
    }

    /**
     * 
     * @param stationId
     * check ga tồn tại theo name ( trừ ga đang update) vì có thể name mới === name cũ ( vẫn udpate được )
     * đưa về 1 dạng chuẩn của name để so sánh và lưu db 
     * xử lý name ngay từ dto ( check station, đưa name về dạng chuẩn ) 
     * @returns 
     */
    public async updateStation(dto: UpdateStationDto) {
        const { stationId, name, location, userId } = dto;
        const foundStation = await this.stationRepository
            .createQueryBuilder("stations")
            .where("stations.id = :stationId", { stationId })
            .andWhere("stations.status = 'active' ")
            .getOne()
        if (!foundStation) throw new BadRequestException("StationId not found")

        const updatedBy: IUpdatedBy = { userId }

        Object.assign(foundStation, dto);
        foundStation.updatedBy = updatedBy

        // return {
        //     data : await this.stationRepository
        //         .createQueryBuilder()
        //         .update(Station)
        //         .set({
        //             ...dto ,
        //             updatedBy
        //         })
        //         .where("id = :stationId", {stationId})
        //         .execute()
        // }

        return { data: await this.stationRepository.save(foundStation) }
    }

    public async getListStations() {
        const stations = await this.stationRepository
            .createQueryBuilder('stations')
            .where("stations.status = 'active' ")
            .getMany()
        return { data: stations }
    }


    public async deleteStation(stationId: number, userId: number) {
        const foundStation = await this.stationRepository
            .createQueryBuilder("stations")
            .where("stations.id = :stationId", { stationId })
            .andWhere("stations.status = 'active'")
            .getOne()
        if (!foundStation) throw new BadRequestException("Station not found")

        const deletedBy: IDeletedBy = { userId }
        foundStation.deletedBy = deletedBy
        foundStation.isDeleted = true
        await this.stationRepository.save(foundStation)
        return { data: await this.stationRepository.softRemove(foundStation) }
    }

    public async deleteListStations() {

    }


}