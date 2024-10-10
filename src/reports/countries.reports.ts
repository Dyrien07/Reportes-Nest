import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { countries as Coutry } from "@prisma/client";
import { footerSection } from "./sections/footer.section";


interface ReportOptions {
    title?: string;
    subtitle?: string;
    countries: Coutry[];

}


export const getCuntriesReport = (options: ReportOptions): TDocumentDefinitions => {

    const { title, subtitle, countries } = options;

    return {
        pageOrientation: "landscape",
        header: headerSection({
            title: title ?? "Cuntries Report",
            subtitle: subtitle ?? "Cuntries Report sub",
        }),
        footer: footerSection,
        pageMargins: [40, 110, 40, 60],

        content: [
            {
                layout: 'customLayout01', // optional
                table: {
                    headerRows: 1,
                    widths: [50, 50, 50, '*', 'auto', '*'],

                    body: [
                        ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
                        ...countries.map((country) => [
                            country.id.toString(),
                            country.iso2,
                            country.iso3,
                            { text: country.name, bold: true },
                            country.continent,
                            country.local_name,

                        ]),



                    ]
                }
            }
                    



        ]
    }

}