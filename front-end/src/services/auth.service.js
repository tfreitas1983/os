import axios from "axios"
import http from "../http-common"

const API_URL = "http://localhost:8089/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(nome, username, email, password, unidade, roles, area ) {
    return axios.post(API_URL + "signup", {
      nome,
      username,
      email,
      password,     
      unidade,
      roles,
      area
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  buscarTodos() {   
      return http.get(`/auth/lista`)
  }
  

  changePassword(username, password) {
    return axios
      .put(API_URL + "change", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new AuthService();