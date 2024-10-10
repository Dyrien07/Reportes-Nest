import fs from 'fs';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from '../helpers/chart-utils'

const svgContent = fs.readFileSync("src/assets/ford.svg", "utf8");

const generateCharImage = async() =>{
const charConfig = {
    type: 'bar',                                
    data: {
      labels: [2012, 2013, 2014, 2015, 2016],   
      datasets: [{
        label: 'Users',                     
        data: [120, 60, 50, 180, 120]         
      }]
    }
  }

  return Utils.carjsToImage(charConfig)
}





export const getBasicCharSvgReprot = 
async(): Promise<TDocumentDefinitions> => {

    const char = await generateCharImage();

    return {
        content:[
            {
                svg: svgContent,
                width:100,
                fit: [100, 100]
            },
            {
                image:char,
                width: 130
            }

        ],
    }
};