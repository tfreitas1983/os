import axios from 'axios'

export default axios.create({
   baseURL: "http://chamadosrj.ddns.net:8089/api",
   // baseURL: "http://10.1.1.26:8089/api",
    headers: {
        "Content-type": "application/json"
    }
})