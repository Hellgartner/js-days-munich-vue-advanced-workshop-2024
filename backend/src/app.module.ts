import { Module } from '@nestjs/common';
import { EstimationController } from './estimation/estimation.controller';
import { EstimationService } from './estimation/estimation.service';

@Module({
  imports: [],
  controllers: [EstimationController],
  providers: [EstimationService],
})
export class AppModule {}
