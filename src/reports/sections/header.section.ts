import { Content } from "pdfmake/interfaces";
import { DateFormater } from "src/helpers";

interface HeaderOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

const logo: Content = {
    image: "src/assets/tucan-code-logo.png",
    width: 100,
    height: 100,
    alignment: "center",
    margin: [0, 0, 0, 20]
};

const currentDate: Content = {
    text: DateFormater.getDDMMMMYYYY(new Date()), 
    alignment: "right",
    margin: [20, 20],
    width: 150
};

export const headerSection = (options: HeaderOptions): Content => {
    const { title, subtitle, showDate = true, showLogo = true } = options;

    const headerLogo: Content = showLogo ? logo : null;
    const headerDate: Content = showDate ? currentDate : null;

    const headerSubTitle: Content = subtitle ? {
        text: subtitle,
        alignment: "center",
        margin: [0, 2, 0, 0],
        style: {
            fontSize: 16,
            bold: true
        }
    } : null;

    const headerTitle: Content = title ? {  
        stack: [
            {
                text: title,
                alignment: "center",
                margin: [0, 15, 0, 0],
                style: {
                    bold: true,
                    fontSize: 22,
                }
            },
            headerSubTitle
        ]
    } : null;

    return {
        columns: [headerLogo, headerTitle, headerDate]
    };
};
