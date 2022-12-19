import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(userDto: CreateUserDto) {
    const createdUser = this.userRepository.create(userDto);

    return this.userRepository.save(createdUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new BadRequestException({ error: "User not found" });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToBeUpdated = await this.userRepository.findOneBy({
      id
    });

    if (!userToBeUpdated)
      throw new BadRequestException({ error: "User not found" });

    const updateResult = await this.userRepository.update(
      { id },
      updateUserDto
    );

    if (!updateResult["affected"])
      throw new BadRequestException({ error: "Something went wrong" });

    return { message: "User updated successfully" };
  }

  async remove(id: number) {
    const deleteResult = await this.userRepository.delete({ id });

    if (!deleteResult["affected"])
      throw new BadRequestException({ error: "User not found" });

    return { message: `User deleted successfully!` };
  }
}
