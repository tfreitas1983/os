import http from "../http-common"

class EquipamentoDataService {
    buscarTodos(page) {
        return http.get(`/equipamentos?page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/equipamentos/${id}`)
    }

    cadastrar(data) {
        return http.post("/equipamentos", data)
    }

    editar(id, data) {
        return http.put(`/equipamentos/${id}`, data)
    }

    email(id) {
        return http.get(`/equipamentos/envio/${id}`)
    }

    apagar(id) {
        return http.delete(`/equipamentos/${id}`)
    }

    apagarTodos() {
        return http.delete(`/equipamentos`)
    }

    buscarNome(nome, page) {
        return http.get(`/equipamentos?nome=${nome}&page=${page}`)
    }

    buscarChamado(num, page) {
        return http.get(`/equipamentos?numchamado=${num}&page=${page}`)
    }

    buscarData(dt, page) {
        return http.get(`/equipamentos?dt_abertura=${dt}&page=${page}`)
    }

    buscarArea(area, page) {
        return http.get(`/equipamentos?area=${area}&page=${page}`)
    }

    buscarUnidade(unidade, page) {
        return http.get(`/equipamentos?unidade=${unidade}&page=${page}`)
    }

    buscarStatus(status, page) {
        return http.get(`/equipamentos?status=${status}&page=${page}`)
    }

    cadastrarImagem(file) {
        return http.post("/equipamentos/files", file)
    } 

    buscarImagens() {
        return http.get("/equipamentos/files")
    }
}

export default new EquipamentoDataService()