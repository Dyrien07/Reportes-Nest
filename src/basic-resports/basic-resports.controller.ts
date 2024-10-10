import path from 'path';
import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicResportsService } from './basic-resports.service';
import { Response } from 'express';


@Controller('basic-reports')
export class BasicResportsController {
  constructor(private readonly basicResportsService: BasicResportsService) { }


  @Get()
  hellow(
    @Res() response: Response) {
    const pdfDoc = this.basicResportsService.hellow();

    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = "Hola mundo";
    pdfDoc.pipe(response)
    pdfDoc.end()

  }

  @Get("employment-letter")
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicResportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = "Carta de empleo";
    pdfDoc.pipe(response)
    pdfDoc.end()

  }


  @Get("employment-letter/:id")
  async employmentLetterId(@Res() response: Response, @Param("id", ParseIntPipe) id:number) {
    const pdfDoc = await this.basicResportsService.employmentLetterById(id);

    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = "Carta de empleo";
    pdfDoc.pipe(response)
    pdfDoc.end()

  }

  @Get("countries")
  async getCountries(@Res() response: Response) {
    const pdfDoc = await this.basicResportsService.getCountries();

    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = "Countries Report";
    pdfDoc.pipe(response)
    pdfDoc.end()

  }

  


}
