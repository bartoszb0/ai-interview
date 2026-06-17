import { Injectable, NotFoundException } from '@nestjs/common';
import type { UUID } from 'crypto';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSessionDto: CreateSessionDto, userId: string) {
    return this.prisma.interviewSession.create({
      data: {
        userId,
        jobTitle: createSessionDto.jobTitle,
        jobDescription: createSessionDto.jobDescription,
        jobSeniority: createSessionDto.jobSeniority,
        questionRecords:
          createSessionDto.questionRecords as unknown as Prisma.JsonArray,
        overallScore: createSessionDto.overallScore,
        whatWentWell: createSessionDto.whatWentWell,
        areasForImprovement: createSessionDto.areasForImprovement,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.interviewSession.findMany({
      where: { userId },
      select: {
        id: true,
        jobTitle: true,
        jobSeniority: true,
        overallScore: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: UUID, userId: string) {
    const session = await this.prisma.interviewSession.findFirst({
      where: { id, userId },
    });
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  async remove(id: UUID, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.interviewSession.delete({
      where: { id },
    });
  }
}
