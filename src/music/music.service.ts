import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { Music } from "./entities/music.entity";

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>
  ) {}

  async create(musicDto: CreateMusicDto) {
    const createdMusic = this.musicRepository.create(musicDto);

    return this.musicRepository.save(createdMusic);
  }

  findAll() {
    return this.musicRepository.find();
  }

  async findOne(id: number) {
    const user = await this.musicRepository.findOneBy({ id });

    if (!user) throw new BadRequestException({ error: "Music not found" });

    return user;
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    const userToBeUpdated = await this.musicRepository.findOneBy({
      id
    });

    if (!userToBeUpdated)
      throw new BadRequestException({ error: "Music not found" });

    const updateResult = await this.musicRepository.update(
      { id },
      updateMusicDto
    );

    if (!updateResult["affected"])
      throw new BadRequestException({ error: "Something went wrong" });

    return { message: "Music updated successfully" };
  }

  async remove(id: number) {
    const deleteResult = await this.musicRepository.delete({ id });

    if (!deleteResult["affected"])
      throw new BadRequestException({ error: "Music not found" });

    return { message: `Music deleted successfully!` };
  }
}
