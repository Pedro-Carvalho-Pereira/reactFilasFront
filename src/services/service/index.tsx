import axios from "axios";
import { routes } from "../routes";
import { SenhaPreferencial, TypeEditUser, TypeLogin, TypeSaveUser, TypeSaveVeiculo, TypeUser } from "../types";

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
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      data: data
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }


  async criarsenha(data: TypeUser, token: string) {

    const options = {
      method: 'DELETE',
      url: 'http://localhost:3000/usuario/deletar/' + data.id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }


  async deleteuser(data: TypeUser, token: string) {

    const options = {
      method: 'DELETE',
      url: 'http://localhost:3000/usuario/deletar/' + data.id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  async editusers(data: TypeEditUser, token: string, id: string) {

    const options = {
      method: 'PUT',
      url: 'http://localhost:3000/usuario/editar/' + id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
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



  async getCaixas(token: string) {


    const options = {
      method: 'GET',
      url: 'http://localhost:3000/usuario/listarCaixas',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };

    return axios.request(options).then(function (response) {
      return Promise.resolve(response);
    }).catch(function (error) {
      return Promise.reject(error);
    });
  }



  async trocarExpediente(id: string, token: string) {


    const options = {
      method: 'PUT',
      url: 'http://localhost:3000/usuario/trocarexpediente/' + id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };
    
    return axios.request(options).then(function (response) {
      return Promise.resolve(response);
    }).catch(function (error) {
      return Promise.reject(error);
    });
  }




  async getSenhasEmOrdem(token: string) {


    const options = {
      method: 'GET',
      url: 'http://localhost:3000/senha/listarEmOrdem',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };

    return axios.request(options).then(function (response) {
      return Promise.resolve(response);
    }).catch(function (error) {
      return Promise.reject(error);
    });
  }




  async retirarSenha(data: SenhaPreferencial, token: string) {
    const options = {
      method: 'POST',
      url: 'http://localhost:3000/senha/cadastrar',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      data: data
    };

    return axios.request(options).then((response) => {
      return Promise.resolve(response);
    }).catch((error) => {
      return Promise.reject(error);
    })
  }

  async listarum(id: string,token: string) {


    const options = {
      method: 'GET',
      url: 'http://localhost:3000/usuario/listarum/' + id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };
    
     return axios.request(options).then(function (response) {
      return Promise.resolve(response);
    }).catch((error) => {
      return Promise.reject(error);
    })
  }

}

const service = new Service();
export default service;