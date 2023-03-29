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
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const matched = comparePassword(password, user.password);
    if (user && matched) {
      return user;
    }
    return null;
  }

  async googleLogin(user: any): Promise<any> {
    if (user) {
      return {
        access_token: this.jwtService.sign({
          user: user.id, sub: 1
        })
      }
    } else {
      return {
        access_token: ''
      }
    }
  }  

  // async googleLogin(googleUserInfo: any) {
  //   const client = new OAuth2Client();

  //   const ticket = await client.verifyIdToken({
  //     idToken: googleUserInfo.credentialToken,
  //     audience: googleUserInfo.clientId,
  //   })
  //   // console.log(`ticket hu me `, ticket);
  //   const user = await this.userService.findByEmail(ticket["payload"].email);
  //   if (!user) {
  //     const newUser = this.createUser({
  //       firstName: ticket["payload"].given_name,
  //       lastName: ticket["payload"].family_name,
  //       email: ticket["payload"].email
  //     })
  //   }
  //   return {
  //     ...ticket["payload"],
  //     accessToken: this.jwtService.sign({
  //       firstName: ticket["payload"].given_name,
  //       lastName: ticket["payload"].family_name,
  //       email: ticket["payload"].email,
  //       picture: ticket["payload"].picture
  //     }, { secret: process.env.JWT_SECRET })
  //   };
  // }

  async login(user: any) {
    const userData = await this.userService.findByEmail(user.email);
    const payload = { email: userData.email, userId: userData.id };
    console.log("from auth service", payload);
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user_id: userData.id,
    }
  }
}
