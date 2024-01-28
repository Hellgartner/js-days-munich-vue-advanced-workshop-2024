import { ApiProperty } from '@nestjs/swagger';

export interface EstimationResult {
  name: string;
  result?: string;
}
export type EstimationVariant = 'fibonacci' | 'shirtSize';

export class EstimationOptions {
  @ApiProperty()
  variant: EstimationVariant;
}
