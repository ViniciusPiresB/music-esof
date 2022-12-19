import { Module } from "@nestjs/common";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Music } from "./entities/music.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Music])],
  controllers: [MusicController],
  providers: [MusicService]
})
export class MusicModule {}
