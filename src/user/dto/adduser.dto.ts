import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {
        message: 'Username trop court.'
    })
    @MaxLength(50, {
        message: 'Username trop long.'
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5, {
        message: 'Mot de passe trop court.'
    })
    @MaxLength(50, {
        message: 'Mot de passe trop long.'
    })
    password: string;
}