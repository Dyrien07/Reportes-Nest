import { Module } from '@nestjs/common';
import { BasicResportsService } from './basic-resports.service';
import { BasicResportsController } from './basic-resports.controller';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  controllers: [BasicResportsController],
  providers: [BasicResportsService],
  imports:[PrinterModule]
})
export class BasicResportsModule {}
