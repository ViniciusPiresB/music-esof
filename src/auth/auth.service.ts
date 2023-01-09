import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(user) {
    const payload = { sub: user.id };

    return {
      token: this.jwtService.sign(payload)
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      return null;
    }

    if (password != user.password) return null;

    return user;
  }
}
