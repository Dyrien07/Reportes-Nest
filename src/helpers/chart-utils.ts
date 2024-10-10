import axios from "axios";


interface CharOptions {
    height?: number;
    width?: number;
}


export const carjsToImage = async (charConfig: unknown, options: CharOptions = {}) => {

    const params = new URLSearchParams();

    if (options.height) params.append("height", options.height.toString());
    if (options.width) params.append("width", options.width.toString());

    const encodedUrl = encodeURIComponent(JSON.stringify(charConfig));

    const charurl = `https://quickchart.io/chart?c=${encodedUrl}&${params.toString()}`

    const response = await axios.get(charurl, { responseType: 'arraybuffer' })

    return `data:image/png;base64, ${Buffer.from(response.data).toString('base64')}`

}