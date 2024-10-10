import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from "@prisma/client"
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, getEmploymentLetter, getEmploymentLetterById, getCuntriesReport } from 'src/reports';


@Injectable()
export class BasicResportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();

    }
    constructor(private readonly printerService: PrinterService) {
        super();
    }
    hellow() {
        const docDefinition = getHelloWorldReport({
            name: "Nacho"
        })
        const doc = this.printerService.createPdf(docDefinition);
        return doc
    }


    employmentLetter() {
        const docDefinition = getEmploymentLetter()

        const doc = this.printerService.createPdf(docDefinition);
        return doc

    }


   async employmentLetterById(id: number) {

        const employee = await this.employees.findUnique({
            where: {
                id: id,
            }
        })
        if (!employee) throw new NotFoundException(`Employee ${id} not found`)

        const docDefinition = getEmploymentLetterById({
            employerName: "mister Duff",
            employerPosition: "Gerente RRHH",
            employeeName: employee.name,
            employeePosition: employee.position,
            employeeStartDate: employee.start_date,
            employeeHours: employee.hours_per_day,
            employeeWorkSchedule: employee.work_schedule,
            employerCompany: "Tucan Code Corp"
        })

        const doc = this.printerService.createPdf(docDefinition);
        return doc

    }

    async getCountries(){

        const countries = await this.countries.findMany({
            where: {
                local_name:{
                    not: null
                }
            }
        });
        const docDefinition = getCuntriesReport({countries})
        const doc = this.printerService.createPdf(docDefinition);
        return doc


    }
}
