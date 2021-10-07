import {HOST} from '../hosts';
import RestApiClient from "../api/rest-client";


const endpoint = {
    admin:'/admin',
    utilizator:'/utilizator',
    arme:'/arme',
    person:'/person'
};
function getAdmins(callback) {
    let request = new Request(HOST.backend_api + endpoint.admin, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getArme(callback) {
    let request = new Request(HOST.backend_api + endpoint.arme, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getPerson(callback) {
    let request = new Request(HOST.backend_api + endpoint.person, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function deleteAdmin(id,callback) {
    let request = new Request(HOST.backend_api + endpoint.admin+"/"+id, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function deleteArme(id,callback) {
    let request = new Request(HOST.backend_api + endpoint.arme+"/"+id, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function deletePerson(id,callback) {
    let request = new Request(HOST.backend_api + endpoint.person+"/"+id, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getAdminById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.admin + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postAdmin(user, callback){
    let request = new Request(HOST.backend_api + endpoint.admin , {
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
function postUtilizator(user, callback){
    let request = new Request(HOST.backend_api + endpoint.utilizator , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    console.log(user);
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
export {
    getAdmins,
    getArme,
    getPerson,
    getAdminById,
    postAdmin,
    postUtilizator,
    deleteAdmin,
    deleteArme,
    deletePerson
};
