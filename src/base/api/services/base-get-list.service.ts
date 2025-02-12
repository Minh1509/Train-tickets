import { Repository, SelectQueryBuilder } from "typeorm";

export class BaseGetList<T> {
    constructor(private readonly repository: Repository<T>) { }

    async getList(
        pageSize: number = 10,
        currentPage: number = 1,
        keyword?: string,
        status?: string,
        additionalConditions?: (queryBuilder: SelectQueryBuilder<T>) => void
    ): Promise<{ data: T[] }> {
        const queryBuilder = this.repository.createQueryBuilder("entity");

        if (keyword) {
            queryBuilder.andWhere("entity.name ILIKE :keyword", { keyword: `%${keyword}%` });
        }

        if (status) {
            queryBuilder.andWhere("entity.status = :status", { status });
        }

        if (additionalConditions) {
            additionalConditions(queryBuilder);
        }

        const skip = (currentPage - 1) * pageSize;
        const data = await queryBuilder.skip(skip).take(pageSize).getMany();

        return { data };
    }
}