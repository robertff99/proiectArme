import {HOST} from '../hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    utilizator: '/utilizator',
};

function getUtilizators(callback) {
    let request = new Request(HOST.backend_api + endpoint.utilizator, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getUtilizatorById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.utilizator + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postUtilizator(user, callback){
    let request = new Request(HOST.backend_api + endpoint.utilizator , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getUtilizators,
    getUtilizatorById,
    postUtilizator
};
