import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { EstimationOptions, EstimationResult } from './estimation.interface';

@Controller('estimation')
export class EstimationController {
  constructor(private readonly estimationService: EstimationService) {}

  @Post('/vote')
  startNewVote(@Body() estimationParameters: EstimationOptions) {
    if (!['fibonacci', 'shirtSize'].includes(estimationParameters.variant)) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }
    this.estimationService.startEstimation(estimationParameters);
  }

  @Get('/results')
  getEstimationResults(): EstimationResult[] {
    return this.estimationService.getResults();
  }
}
