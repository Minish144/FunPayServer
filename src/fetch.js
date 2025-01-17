import fetch from 'node-fetch';
import { log } from './log.js';

export default async function fetch_(url, options, delay = 0, retries = 20) {
    try {
        let tries = 1;
        await sleep(delay);
        let res = await fetch(url, options);

        while(!res.ok) {
            if(tries > retries) {
                log(`Превышено количество попыток запроса.`);
                log(`Request:`);
                log(options);
                log(`Response:`);
                log(res);
                break;
            };
            await sleep(2000);
            res = await fetch(url, options);
            tries++;
        }
    
        return res;
    } catch (err) {
        log(`Error while fetch: ${err}`);
    }
}

function sleep(delay) {
    if(delay == 0) return Promise.resolve();
    return new Promise(resolve => setTimeout(resolve, delay));
}