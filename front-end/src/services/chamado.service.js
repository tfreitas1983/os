import http from "../http-common"

class ChamadoDataService {
    buscarTodos(page) {
        return http.get(`/chamados?page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/chamados/${id}`)
    }

    cadastrar(data) {
        return http.post("/chamados", data)
    }

    editar(id, data) {
        return http.put(`/chamados/${id}`, data)
    }

    apagar(id) {
        return http.delete(`/chamados/${id}`)
    }

    apagarTodos() {
        return http.delete(`/chamados`)
    }

    buscarNome(nome, page) {
        return http.get(`/chamados?nome=${nome}&page=${page}`)
    }

    cadastrarImagem(file) {
        return http.post("/chamados/files", file)
    } 

    buscarImagens() {
        return http.get("/chamados/files")
    }
}

export default new ChamadoDataService()