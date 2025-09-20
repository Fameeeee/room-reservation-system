import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already registered');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ name, email, password: hashed });
    await this.usersRepository.save(user);
    return { status: 'success', message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return { status: 'success', message: 'Login successful', token };
  }
}
