import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AddUserDto } from './dto/adduser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './dto/loginuser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    getUsers() {
        return this.userRepository.find();
    }

    getUserbyId(id: number) {
        return this.userRepository.findOne({
            where: {id: id}
        });
    }

    getUserbyUsername(username: string) {
        return this.userRepository.findOne({
            where: {username: username}
        });
    }

    async addUser(user: AddUserDto) {
        const newUser: AddUserDto = {
            username: user.username,
            password: await bcrypt.hash(user.password, 10)
        }
        try {
            let result: Partial<UserEntity> = await this.userRepository.save(newUser);
            return {
                id: result.id,
                username: result.username,
                role: result.role,
                createdAt: result.createdAt
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async login(user: LoginUserDto) {
        const userExist = await this.getUserbyUsername(user.username);
        if (!user || !userExist)
            throw new NotFoundException('Une erreur est survenue!');

        try {
            const match = await bcrypt.compare(user.password, userExist.password);
            if (match) {
                // Generate token payload
                const payload = {
                    id: userExist.id,
                    username: user.username,
                };

                const secret = process.env.JWT_SECRET || 'secret'
                
                // 2. generate token
                const token = jwt.sign(payload, secret, {
                    // expriation
                    expiresIn: '10h'
                })

                // 3. send token
                return {
                    "token": token,
                }
            } else {
                throw new NotFoundException('Une erreur est survenue!');
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateUser(id: number, user: UpdateUserDto) {
        const userExist = await this.getUserbyId(id);
        if (!user || !userExist)
            throw new NotFoundException('User n\'existe pas!');

        try {
            const newPassword: UpdateUserDto = { password: await bcrypt.hash(user.password, 10) }
            const newUser = await this.userRepository.update(id, newPassword);
            return newUser;
        } catch (e) {
            throw new Error(e);
        }
    }

    deleteUser(id: number) {
        return this.userRepository.delete(id);
    }

    softDeleteUser(id: number) {
        return this.userRepository.softDelete(id);
    }
}