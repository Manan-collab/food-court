import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utility/password';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

    async validateUser(email: string, password: string): Promise<any> {
      const user = await this.userService.findByEmail(email);
      const matched = comparePassword(password, user.password);
      if (user && matched) {
        return user;
      }
      return null;
    }

    async login(user: any) {
      const userData = await this.userService.findByEmail(user.email);
      const payload = { email: userData.email, userId: userData.id};
      console.log("from auth service" ,payload);
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        user_id: userData.id,
      }
    }
}
