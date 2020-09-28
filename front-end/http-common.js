import axios from 'axios'

export default axios.create({
    baseURL: "http://chamadosrj.ddns.net:8089/api",
    headers: {
        "Content-type": "application/json"
    }
})