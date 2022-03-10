import chalk from 'chalk';
import fs from 'fs';


function catchError(err){
    throw new Error(chalk.red(err.code, 'Não foi possível encontrar o arquivo'));
}

export default async function getFile(pathFile){
    const encoding = 'utf-8';
    try{
        const text = await fs.promises.readFile(pathFile, encoding);
        return linkExtract(text);
    }catch(error){
        catchError(error);
    }
   
}

function linkExtract(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResult = [];
    let temp;

    while((temp = regex.exec(texto)) !== null){
        arrayResult.push({ [temp[1]]: temp[2]})
    }
    
    return arrayResult.length === 0 ? 'Não há Links' : arrayResult;
}

