import { Injectable } from '@nestjs/common';
import type { UUID } from 'crypto';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  create(createSessionDto: CreateSessionDto, userId: string) {
    return 'This action adds a new session';
  }

  findAll(userId: string) {
    return `This action returns all sessions`;
  }

  findOne(id: UUID, userId: string) {
    return `This action returns a #${id} session`;
  }

  remove(id: UUID, userId: string) {
    return `This action removes a #${id} session`;
  }
}
