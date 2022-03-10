import fetch from "node-fetch";


function handlerErrors(erro){
    throw new Error(erro.message)
}

async function statusCheck(arrayUrls){
    try{
        const arrayStaus = await Promise
        .all(arrayUrls
            .map(async url => {
                const res = await fetch(url);
                return res.status;
        })) 
        return arrayStaus;
    }catch(error){
        handlerErrors(error);
    }

}

function urlArrayGenerate(arrayLinks){
    return arrayLinks
        .map(objectLink => Object
            .values(objectLink)
                .join());
}

async function urlValidation(arrayLinks){
    const links =  urlArrayGenerate(arrayLinks);
    const statusLinks = await statusCheck(links);
    const reuslts = arrayLinks.map((object, index) => ({
        ...object, status:statusLinks[index]
    }))

    return reuslts;
}

export default urlValidation;