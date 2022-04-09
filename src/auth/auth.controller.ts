import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';




@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
        
    }

}
