import { Content } from "pdfmake/interfaces";




export const footerSection = (currentPage: number, pageCount: number): Content => {
    return {
        text: ` Pagina ${currentPage} de ${pageCount}`,
        alignment:'right',
        fontSize: 10,
        margin:[0, 20, 35, 0],
        bold: true,
    }



}