import http from "../http-common"

class ImagemDataService {
    cadastrarImagem(file) {
        return http.post("/files", file)
    }

    buscarImagem(avatar_id) {
        return http.get(`/files/${avatar_id}`)
    }

}

export default new ImagemDataService()