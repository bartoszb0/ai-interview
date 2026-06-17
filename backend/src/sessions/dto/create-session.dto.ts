import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Difficulty, Seniority } from '../../../generated/prisma/enums';

class ExchangeDto {
  @IsString()
  declare answer: string;

  @IsString()
  declare feedback: string;
}

class QuestionDto {
  @IsString()
  declare text: string;

  @IsString()
  declare topic: string;

  @IsIn(Object.values(Difficulty))
  declare difficulty: Difficulty;
}

class QuestionSummaryDto {
  @IsInt()
  @Min(1)
  @Max(5)
  declare score: number;

  @IsArray()
  @IsString({ each: true })
  declare correct: string[];

  @IsArray()
  @IsString({ each: true })
  declare gaps: string[];

  @IsArray()
  @IsString({ each: true })
  declare improvements: string[];
}

class QuestionRecordDto {
  @ValidateNested()
  @Type(() => QuestionDto)
  declare question: QuestionDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExchangeDto)
  declare exchanges: ExchangeDto[];

  @ValidateNested()
  @Type(() => QuestionSummaryDto)
  declare summary: QuestionSummaryDto;
}

export class CreateSessionDto {
  @IsString()
  declare jobTitle: string;

  @IsString()
  declare jobDescription: string;

  @IsIn(Object.values(Seniority))
  declare jobSeniority: Seniority;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuestionRecordDto)
  declare questionRecords: QuestionRecordDto[];

  @IsNumber()
  @Min(0)
  @Max(100)
  declare overallScore: number;

  @IsArray()
  @IsString({ each: true })
  declare whatWentWell: string[];

  @IsArray()
  @IsString({ each: true })
  declare areasForImprovement: string[];
}
