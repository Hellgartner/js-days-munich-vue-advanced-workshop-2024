import {
  EstimationOptions,
  EstimationResult,
  EstimationVariant,
} from './estimation.interface';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

const estimationResults: Record<EstimationVariant, EstimationResult[]> = {
  fibonacci: [
    {
      name: 'Jon Smith',
      result: 'cup',
    },
    {
      name: 'Jane Doe',
      result: '3',
    },
    {
      name: 'Bob Johnson',
      result: '5',
    },
    {
      name: 'Alice Brown',
      result: '3',
    },
    {
      name: 'Tom Wilson',
      result: undefined,
    },
  ],
  shirtSize: [
    {
      name: 'Jon Smith',
      result: 'L',
    },
    {
      name: 'Jane Doe',
      result: 'S',
    },
    {
      name: 'Bob Johnson',
      result: 'M',
    },
    {
      name: 'Alice Brown',
      result: 'M',
    },
    {
      name: 'Tom Wilson',
      result: undefined,
    },
  ],
};

export class EstimationService {
  estimationVariant: EstimationVariant = 'fibonacci';
  logger = new Logger('EstimationService');

  getResults(): EstimationResult[] {
    return estimationResults[this.estimationVariant];
  }

  startEstimation(options: EstimationOptions) {
    this.estimationVariant = options.variant;
    this.logger.log(
      `Starting estimation with variant ${this.estimationVariant}`,
    );
  }
}
