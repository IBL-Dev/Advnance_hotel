import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './loacal.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers:[AuthController],
    imports : [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret : jwtConstants.secret,
            // 2d  need to .add .env
            signOptions : {expiresIn : '2d'}
        })
    ],
    providers:[AuthService,LocalStrategy,JwtStrategy]
    
})
export class AuthModule {}
