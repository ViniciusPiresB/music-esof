import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from "@nestjs/common";
import { MusicService } from "./music.service";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("music")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  create(@Body() CreateMusicDto: CreateMusicDto) {
    return this.musicService.create(CreateMusicDto);
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.musicService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(id, updateMusicDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.musicService.remove(+id);
  }
}
