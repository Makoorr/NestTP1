import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto } from './dto/adduser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}
    
    @Get('/')
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUserbyId(
        @Param() params: {id: number}
    ) {
        return this.userService.getUserbyId(params.id);
    }

    @Get('/:username')
    getUserbyUsername( 
        @Param() params: {username: string}
    ) {
        return this.userService.getUserbyUsername(params.username);
    }

    @Post('/')
    addUser( 
        @Body() body: AddUserDto
    ) {
        return this.userService.addUser(body);
    }

    @Put('/:id')
    async updateUser(
        @Param() params,
        @Body() body: UpdateUserDto
    ) {
        const id = params.id;
        try{
            await this.userService.updateUser(id, body);
            return "Utilisateur mis à jour!"
        } catch (e) {
            return e;
        }
    }

    @Delete('/:id')
    deleteUser(
        @Param() params
    ) {
        const id = params.id;
        return this.userService.deleteUser(id);
    }

    @Delete('/soft/:id')
    softDeleteUser(
        @Param() params
    ) {
        const id = params.id;
        return this.userService.softDeleteUser(id);
    }

}
