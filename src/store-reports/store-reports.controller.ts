import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) { }


  @Get("order/:orderId")
  async getOrderReport(@Param("orderId", ParseIntPipe) orderId: number,
    @Res() res: Response) {
    const pdfDoc = await this.storeReportsService.getOrderReportById(orderId);
    res.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = "Order Report";
    pdfDoc.pipe(res)
    pdfDoc.end()


  }

  @Get("svgs-charts")
  async getSvgCharts(
    @Res() res: Response) {
    const pdfDoc = await this.storeReportsService.svgReport();
    res.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = "SVG";
    pdfDoc.pipe(res)
    pdfDoc.end()


  }

  
}
