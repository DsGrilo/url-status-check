import chalk from 'chalk';
import getFile from './index.js';
import urlValidation from './http-validacao.js';

const filePath = process.argv;

async function textProcess(filePath){
    const result = await getFile(filePath[2]);
    if(filePath[3] === 'validar'){
        console.log(result)
        console.log(chalk.yellow('Links Validados'), await urlValidation(result));
    }else{
        console.log(chalk.yellow('Lista de Links'), result);
    }
}


textProcess(filePath);