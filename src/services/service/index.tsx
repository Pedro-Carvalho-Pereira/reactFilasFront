import axios from "axios";
import { routes } from "../routes";
import { TypeLogin, TypeSaveUser, TypeSaveVeiculo, TypeUser } from "../types";

class Service {
  async login(data: TypeLogin) {
    return axios({
      url: "http://localhost:3000/usuario/login",
      method: "POST",
      data: data,
      timeout: 5000,
      headers: routes.HEADER_REQUEST
    }).then((response) => {
      return Promise.resolve(response);
    }).catch((error) => {
      return Promise.reject(error);
    })
  }

  async saveusers(data: TypeSaveUser, token: string) {

    const options = {
      method: 'POST',
      url: 'http://localhost:3000/usuario/cadastrar',
      headers: { 'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token},
      data: data
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  async getUsers(token: string) {


    const options = {
      method: 'GET',
      url: 'http://localhost:3000/usuario/listar',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };

    return axios.request(options).then((response) => {
      return Promise.resolve(response);
    }).catch((error) => {
      return Promise.reject(error);
    })
  }




}

const service = new Service();
export default service;