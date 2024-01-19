import { Controller, Get } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { EstimationResult } from './result.interface';

@Controller('estimation')
export class EstimationController {
  //add a constructor injecting the estimation service
  constructor(private readonly estimationService: EstimationService) {}

  @Get('/results')
  getEstimationResults(): EstimationResult[] {
    return this.estimationService.getResults();
  }
}
