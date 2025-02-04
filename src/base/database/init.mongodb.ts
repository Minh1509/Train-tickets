import { config } from "@config";
import { Module, OnModuleInit } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Module({
    imports: [MongooseModule.forRoot(config.DB_URI)]
})
export class InitMongodb implements OnModuleInit {
    async onModuleInit() {
        mongoose.connection.on("connected", () => {
            console.log("Database connected"); // Log khi kết nối thành công
        });
        mongoose.connection.on("error", (error) => {
            console.error(`Connect database error:: ${error.message}`);
        });
        mongoose.connection.on("disconnected", () => {
            console.warn("Database disconnected");
        });
    }
}
