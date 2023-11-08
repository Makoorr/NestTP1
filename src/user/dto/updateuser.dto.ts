import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
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