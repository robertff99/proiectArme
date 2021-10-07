import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    login: '/login'
};

function getUser(params, callback){
    let request = new Request(HOST.backend_api +"/utilizator"+ endpoint.login +"/"+ params.username+"/"+ params.password, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


export {
    getUser
};
