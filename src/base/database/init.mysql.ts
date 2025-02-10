import { config } from "@config";
import { Station } from "@modules/railways/entity/station.entity";
import { User } from "@modules/users/entity/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: config.DB_HOST,
            port: config.DB_PORT,
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            entities: [User, Station],
            autoLoadEntities: true,
            synchronize: false
        })
    ]
})
export class InitMysql { }
