import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getBasicCharSvgReprot, getHelloWorldReport, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient {
    async onModuleInit() {
        await this.$connect();

    }

    constructor(private readonly printerService: PrinterService) {
        super();
    }



    async getOrderReportById(id: number) {
        const order = await this.orders.findUnique({
            where:
                { order_id: id },
            include: {
                customers: true,
                order_details: {
                    include: {
                        products: true,
                    }
                },

            }
        });

        if (!order) throw new NotFoundException(`Order ${id} not found`);

        const docDefinition = orderByIdReport({
            data: order as any
        });
        const doc = this.printerService.createPdf(docDefinition);
        return doc

    }


     async svgReport() {
        const docDefinition = await getBasicCharSvgReprot()
        const doc = this.printerService.createPdf(docDefinition);
        return doc
    }
}
