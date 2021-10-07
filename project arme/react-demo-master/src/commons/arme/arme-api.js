import {HOST} from '../hosts';
import RestApiClient from "../api/rest-client";


const endpoint = {
    arme:'/arme',
};

function getArmes(callback) {
    let request = new Request(HOST.backend_api + endpoint.arme, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getArmeById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.arme + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postArme(arme, callback){
    let request = new Request(HOST.backend_api + endpoint.arme , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arme)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getArmes,
    getArmeById,
    postArme
};
