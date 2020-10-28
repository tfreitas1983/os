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

    email(id) {
        return http.get(`/chamados/envio/${id}`)
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

    buscarChamado(num, page) {
        return http.get(`/chamados?numchamado=${num}&page=${page}`)
    }

    buscarData(dt, page) {
        return http.get(`/chamados?dt_abertura=${dt}&page=${page}`)
    }

    buscarPeriodo(dt, dt_fim, page) {
        return http.get(`/chamados?dt_abertura=${dt}&dt_abertura_fim=${dt_fim}&page=${page}`)
    }

    buscarArea(area, page) {
        return http.get(`/chamados?area=${area}&page=${page}`)
    }

    buscarUnidade(unidade, page) {
        return http.get(`/chamados?unidade=${unidade}&page=${page}`)
    }

    buscarStatus(status, page) {
        return http.get(`/chamados?status=${status}&page=${page}`)
    }

    cadastrarImagem(file) {
        return http.post("/chamados/files", file)
    } 

    buscarImagens() {
        return http.get("/chamados/files")
    }
}

export default new ChamadoDataService()