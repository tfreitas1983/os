const db = require("../models")
const Chamado = db.chamados
const Files = db.files


exports.cadastrar = (req, res) => {
    if (!req.body.descricao || !req.body.unidade) {
        res.status(400).send({ message: "A descrição e/ou unidade devem ser preenchidas"})
        return
    }

    const chamado = new Chamado ({
        unidade: req.body.unidade,
        dt_abertura: req.body.dt_abertura,
        ramal: req.body.ramal,
        nome: req.body.nome,
        setor: req.body.setor,
        descricao: req.body.descricao,
        status: req.body.status,
        responsavel: req.body.responsavel,
        setor: req.body.setor,
        dt_previsao: req.body.dt_previsao,    
        dt_fechamento: req.body.dt_fechamento,        
        situacao: req.body.situacao ? req.body.situacao: true,
        foto: req.body.foto
    })

    chamado
        .save(chamado)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar o chamado"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query;
    const nome = req.query.nome
    var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {}


    //Verifica se foi passado o nome na busca
    if (nome) {
        var query = Chamado.find(condition)
    } if (!nome) {
        var query = {}
    }
    
    Chamado.paginate(query,{page, limit: 5})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar os chamados"
        })
    })
}

exports.buscarUm = (req, res) => {
    const id = req.params.id

    Chamado.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado o chamado com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o chamado com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Chamado.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o chamado com o id=${id}. `
                })
            } else res.send({ message: "Chamado alterado com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o chamado com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    Chamado.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletar o chamado com o id " + id
                })
            } else {
                res.send({
                    message: "Chamado deletado com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar o chamado com o id " + id
            })
        })
}

exports.apagarTodos = (req, res) => {
    Chamado.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} chamados foram deletados com sucesso`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todos os chamados"
            })
        })
}

exports.buscarAtivos = (req, res) => {
    Chamado.find({ situacao: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar os chamados ativos"
            })
        })
}

exports.buscarImagem = (req, res) => {
    const id = req.params.id

    Files.findById(id)   
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar a imagem"
            })
        })
}

exports.buscarImagens = (req, res) => {   

    Files.find()   
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar as imagens"
            })
        })
}



exports.cadastrarImagem = (req, res) => {
    const { originalname: original, filename: foto, size, location: url = "" } = req.file
    if (!foto) {
        res.status(400).send({ message: "A imagem deve ser enviada"})
        return
    }

    const file = new Files ({
       original,
       foto,
       size, 
       url
    })
    file    
        .save(file)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a imagem"
            })
        })
}





