import { Injectable } from '@nestjs/common';
import { EstimationResult } from './result.interface';

const estimationResults: EstimationResult[] = [
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
];
@Injectable()
export class EstimationService {
  getResults(): EstimationResult[] {
    return estimationResults;
  }
}
