import { Module } from '@nestjs/common';
import { BasicResportsModule } from './basic-resports/basic-resports.module';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';


@Module({
  imports: [BasicResportsModule, PrinterModule, StoreReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
