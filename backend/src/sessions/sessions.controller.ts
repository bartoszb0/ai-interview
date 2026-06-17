import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { UUID } from 'crypto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { UserPayload } from '../common/types/user-payload.type';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
@UseGuards(JwtGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(
    @Body() createSessionDto: CreateSessionDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.sessionsService.create(createSessionDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: UserPayload) {
    return this.sessionsService.findAll(user.id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: UUID,
    @CurrentUser() user: UserPayload,
  ) {
    return this.sessionsService.findOne(id, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseUUIDPipe) id: UUID,
    @CurrentUser() user: UserPayload,
  ) {
    return this.sessionsService.remove(id, user.id);
  }
}
