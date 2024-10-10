import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { CurrencyFormatter, DateFormater } from "src/helpers"
import { footerSection } from "./sections/footer.section"
import { text } from "stream/consumers"


const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10, 30]
}

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [0, 30, 0, 0]
    },
    subHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 0]
    }
}

export interface ReportData {
    order_id: number;
    customer_id: number;
    order_date: Date;
    customers: Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id: number;
    customer_name: string;
    contact_name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    products: Products;
}

export interface Products {
    product_id: number;
    product_name: string;
    category_id: number;
    unit: string;
    price: string;
}


interface ReportValues {
    title?: string;
    subTitle?: string;
    data: ReportData;

}



export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {

    const { data } = value
    const { customers, order_id, order_details } = data
    const subTotal = order_details.reduce((acc, detail) =>
         acc + detail.quantity * +detail.products.price, 0);

    const total = subTotal * 1.15;

    return {
        styles: styles,
        header: logo,
        pageMargins: [40, 60, 40, 60],
        footer: footerSection,
        content: [
            {
                text: "Tucan Code",
                style: "header",
            },
            {
                columns: [
                    {
                        text: "15 Mongomery Str, suite 100 \nOttawa ON K2Y 9x1, Canada \nBN:1312312\nhttps://devtalles.com"
                    },
                    {
                        text: [
                            { text: `Recibo Nro.${order_id}\n`, bold: true },
                            `Fecha del rescibo ${DateFormater.getDDMMMMYYYY(data.order_date)} \nPagar antes de: ${DateFormater.getDDMMMMYYYY(new Date())} `,

                        ],
                        alignment: "right"
                    }
                ],
            },
            { qr: 'https://devtalles.com', fit: 75, alignment: 'right' },

            {
                text: [
                    {
                        text: "Cobrar a: \n ",
                        bold: true,
                        style: 'subHeader'
                    },
                    ` Razon Social: ${customers.customer_name} 
                      Direccion:${customers.address}
                      Contacto:${customers.contact_name}
                    `

                ]
            },
            {
                layout: 'headerLineOnly',
                margin: [0, 20,],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Description', 'Cantidad', 'Precio', 'Total'],
                        ...order_details.map((detail) => [
                            detail.order_detail_id.toString(),
                            detail.products.product_name,
                            detail.quantity.toString(), {
                                text: CurrencyFormatter.formatCurrency(+detail.products.price.toString()),
                                aligment: "right",
                            },
                            {
                                text: CurrencyFormatter.formatCurrency(+detail.products.price * detail.quantity),
                                aligment: "right",
                            }
                        ])
                    ]
                }
            },
            '\n\n',

            {
                columns: [
                    {
                        width: "*",
                        text: " "
                    }, {
                        width: "auto",
                        layout: "noBorders",
                        table: {
                            body: [
                                ["Subtotal", {
                                    text: CurrencyFormatter.formatCurrency(subTotal),
                                    alignment: "right"
                                }],
                                [{ text: "Total", bold: true }, {
                                    text: CurrencyFormatter.formatCurrency(total),
                                    alignment: "right",
                                    bold: true
                                }],

                            ]


                        }
                    }
                ]


            }

        ]

    }


}