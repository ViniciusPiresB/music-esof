import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./music/music.module";
import { DataSource } from "typeorm";
import { ConfigModule } from "@nestjs/config";
import { Music } from "./music/entities/music.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Music],
      synchronize: true
    }),
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
