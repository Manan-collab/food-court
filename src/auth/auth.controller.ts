import { Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto, loginDto } from './dto/create-auth.dto';
import { Public } from './gaurds/decorators/decorators.IsPublic';
import { UserAuthGuard } from './gaurds/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(UserAuthGuard)
  // @Public()
  @Post('/login')
  async login(@Body() req: loginDto) {
    return this.authService.login(req);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googlelogin() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    const jwt = await this.authService.googleLogin(req.user);
    res.set('authorization', jwt.access_token);   
    res.json(req.user);
  }

  @Get('test123')
  @UseGuards(AuthGuard('jwt'))
  async test123(@Res() res) {
    res.json('success');
  }
}

function storeToken() {
  throw new Error('Function not implemented.');
}

