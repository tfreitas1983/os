const db = require("../models")
const Chamado = db.chamados
const Users = db.user
const Files = db.files
require('dotenv').config()
const moment = require('moment')
const sgMail = require('@sendgrid/mail')


exports.cadastrar = (req, res) => {
    if (!req.body.descricao || !req.body.unidade) {
        res.status(400).send({ message: "A descrição e/ou unidade devem ser preenchidas"})
        return
    }

  
    const chamado = new Chamado ({
        unidade: req.body.unidade,
        identificador: req.body.identificador,
        dt_abertura: req.body.dt_abertura,
        ramal: req.body.ramal,
        nome: req.body.nome,
        username: req.body.username,
        email: req.body.email,
        atendente: req.body.atendente,
        setor: req.body.setor,
        area: req.body.area,
        equipamento: req.body.equipamento,
        ip: req.body.ip,
        visita: req.body.visita,
        descricao: req.body.descricao,
        status: req.body.status,
        responsavel: req.body.responsavel,
        setor: req.body.setor,
        dt_previsao: req.body.dt_previsao,    
        dt_fechamento: req.body.dt_fechamento,   
        triagem: req.body.triagem,
        resptriagem: req.body.resptriagem,
        situacao: req.body.situacao ? req.body.situacao: true,
        foto: req.body.foto
    })

    chamado
    .save(chamado)
    .then(data => {
        res.send(data)        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: chamado.email,
            from: {
                email: 'cmedrjchamados@gmail.com',
                name: 'Sistema de Chamados'
            },
            subject: `Novo chamado criado nº ${chamado.numchamado}`,
            text: `O chamado ${chamado.descricao} foi registrado com número ${chamado.numchamado}.`,
            html: `O chamado <strong>${chamado.descricao}</strong> foi registrado com número <strong>${chamado.numchamado}</strong>.
            <p> Chamado solicitado por: ${chamado.nome} </p>`,
        }    
        sgMail.send(msg)
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
    const numchamado = req.query.numchamado
    const area = req.query.area
    const unidade = req.query.unidade
    const status = req.query.status
    const username = req.query.username

    var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {}
    var condnumero = numchamado ? { numchamado: numchamado } : {}
    var condArea = area ? {area: area } : {}
    var condUnidade = unidade ? {unidade: unidade } : {}
    var condStatus = status ? {status: status } : {}
    var condUsername = username ? {username: username } : {}

    //Verifica se foi passado a data de abertura do chamado
    let dt_abertura = null
    let dt_abertura_fim = null
    let dt_final = null
    if(req.query.dt_abertura) {
        dt_abertura = new Date(req.query.dt_abertura)        
        dt_final = new Date(moment(dt_abertura).add(1,'days'))
    }

    //Verifica se foi passado o período final da busca dos chamados
    if (req.query.dt_abertura_fim) {
        dt_abertura_fim = new Date(moment(req.query.dt_abertura_fim).add(1,'days'))
    }

     //Verifica se não possui filtro
    if (!nome && !numchamado && !dt_abertura && !dt_abertura_fim && !area && !status && !unidade) {
        var query = Chamado.find().sort({dt_abertura: -1})
    }

    //Verifica se foi passado o nome na busca
    if (nome) {
        var query = Chamado.find(condition).sort({dt_abertura: -1})
    }

    //Verifica se foi passado o número do chamado na busca
    if (numchamado) {
        var query = Chamado.find(condnumero)
    }

    //Verifica se foi passada a data de abertura do chamado
    if (dt_abertura && !dt_abertura_fim) {
        var query = Chamado.find({dt_abertura: {$gte: dt_abertura, $lt: dt_final }})
    } 

    if (dt_abertura && dt_abertura_fim) {
        var query = Chamado.find({dt_abertura: {$gte: dt_abertura, $lt: dt_abertura_fim }}).sort({dt_abertura: -1})
    }
    
    if (area) {
        var query = Chamado.find(condArea).sort({dt_abertura: -1})
    }

    if (unidade) {
        var query = Chamado.find(condUnidade).sort({dt_abertura: -1})
    }

    if (status) {
        var query = Chamado.find(condStatus).sort({dt_abertura: -1})
    }

    if (username) {
        var query = Chamado.find(condUsername).sort({dt_abertura: -1})
    }
   
    Chamado.paginate(query,{page, limit: 5000})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar os chamados"
        })
    })
}

exports.todosResumo = (req,res) => {
    
    const nome = req.query.nome
    const numchamado = req.query.numchamado
    const area = req.query.area
    const unidade = req.query.unidade
    const status = req.query.status
    const username = req.query.username

    var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {}
    var condnumero = numchamado ? { numchamado: numchamado } : {}
    var condArea = area ? {area: area } : {}
    var condUnidade = unidade ? {unidade: unidade } : {}
    var condStatus = status ? {status: status } : {}
    var condUsername = username ? {username: username } : {}

    //Verifica se foi passado a data de abertura do chamado
    let dt_abertura = null
    let dt_abertura_fim = null
    let dt_final = null
    if(req.query.dt_abertura) {
        dt_abertura = new Date(req.query.dt_abertura)        
        dt_final = new Date(moment(dt_abertura).add(1,'days'))
    }

    //Verifica se foi passado o período final da busca dos chamados
    if (req.query.dt_abertura_fim) {
        dt_abertura_fim = new Date(moment(req.query.dt_abertura_fim).add(1,'days'))
    }

     //Verifica se não possui filtro
    if (!nome && !numchamado && !dt_abertura && !dt_abertura_fim && !area && !status && !unidade) {
        var query = Chamado.find().sort({dt_abertura: -1})
    }

    //Verifica se foi passado o nome na busca
    if (nome) {
        var query = Chamado.find(condition).sort({dt_abertura: -1})
    }

    //Verifica se foi passado o número do chamado na busca
    if (numchamado) {
        var query = Chamado.find(condnumero)
    }

    //Verifica se foi passada a data de abertura do chamado
    if (dt_abertura && !dt_abertura_fim) {
        var query = Chamado.find({dt_abertura: {$gte: dt_abertura, $lt: dt_final }})
    } 

    if (dt_abertura && dt_abertura_fim) {
        var query = Chamado.find({dt_abertura: {$gte: dt_abertura, $lt: dt_abertura_fim }}).sort({dt_abertura: -1})
    }
    
    if (area) {
        var query = Chamado.find(condArea).sort({dt_abertura: -1})
    }

    if (unidade) {
        var query = Chamado.find(condUnidade).sort({dt_abertura: -1})
    }

    if (status) {
        var query = Chamado.find(condStatus).sort({dt_abertura: -1})
    }

    if (username) {
        var query = Chamado.find(condUsername).sort({dt_abertura: -1})
    }
   
    Chamado.find(query)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar os chamados"
        })
    })
}

exports.buscarAbertos = (req, res) => {
    const {page = 1} = req.query

    var query = Chamado.find({ $and: [ 
        {status: {$ne: "Finalizado"}},
        {status: {$ne: "Cancelado" }}
    ]   }).sort({dt_abertura: -1})

    Chamado.paginate(query,{page, limit: 5000})
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
        } else res.send({
                message: "Chamado alterado com sucesso!"                
            })
        
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao alterar o chamado com o id " + id
        })
    })

    
}

exports.email = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "O e-mail não pode ficar em branco!"
        })
    }

    const id = req.params.id

    Chamado.findById(id, req.body)  
    .then(data => {    
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        
        if (data.status !== "Pendente" && data.status !== "Finalizado" && data.status !== "Agendado" && data.status !== "Reaberto" && data.status !== "Triagem" && data.status !== "Resposta") {
            const msgeditar = {
                to: data.email,
                from: {
                    email: 'cmedrjchamados@gmail.com',
                    name: 'Sistema de Chamados'
                },
                subject: `Seu chamado nº ${data.numchamado} foi atualizado`,
                text: `O chamado ${data.descricao}, sob número ${data.numchamado} mudou o status para ${data.status}.`,
                html: `O chamado <strong>${data.descricao}</strong>, sob número <strong>${data.numchamado}</strong> mudou o status para <strong>${data.status}</strong>.`,
            } 
            sgMail.send(msgeditar)           
        }

        if (data.status === "Pendente") {
            const msgeditar = {
                to: data.atendente,
                from: {
                    email: 'cmedrjchamados@gmail.com',
                    name: 'Sistema de Chamados'
                },                
                subject: `Você tem um novo chamado para atender sob nº ${data.numchamado}`,
                text: `O chamado ${data.descricao}, sob número ${data.numchamado} foi criado e precisa ser analisado.`,
                html: `O chamado <strong>${data.descricao}</strong>, sob número <strong>${data.numchamado}</strong> foi criado e precisa ser analisado.
                <p>Por favor, entre na plataforma para atendê-lo.</p>`,
            } 
            sgMail.send(msgeditar)             
        }

        if (data.status === "Reaberto") {
            const msgeditar = {
                to: data.atendente,
                from: {
                    email: 'cmedrjchamados@gmail.com',
                    name: 'Sistema de Chamados'
                },
                subject: `O chamado nº ${data.numchamado} foi reaberto`,
                text: `O chamado ${data.descricao}, sob número ${data.numchamado} foi reaberto e precisa ser verificado novamente.`,
                html: `O chamado <strong>${data.descricao}</strong>, sob número <strong>${data.numchamado}</strong>
                 foi reaberto com o motivo <strong>${data.reaberto}</strong> e precisa ser verificado novamente.`,
            } 
            sgMail.send(msgeditar)             
        }

        if (data.status === "Agendado") {
            const msgeditar = {
                to: data.email,
                from: {
                    email: 'cmedrjchamados@gmail.com',
                    name: 'Sistema de Chamados'
                },
                subject: `Seu chamado nº ${data.numchamado} foi agendado para o dia ${moment(data.dt_previsao).add(1, 'days').format('DD/MM/YYYY')}.`,
                text: `O chamado ${data.descricao}, sob número ${data.numchamado} foi agendado para ser resolvido em ${moment(data.dt_previsao).add(1, 'days').format('DD/MM/YYYY')}.`,
                html: `O chamado <strong>${data.descricao}</strong>, sob número <strong>${data.numchamado}</strong> foi agendado para ser resolvido em <strong>${moment(data.dt_previsao).add(1, 'days').format('DD/MM/YYYY')}</strong>.`,
            } 
            sgMail.send(msgeditar)             
        }

        if (data.status === "Triagem") {
            const msgeditar = {
                to: data.email,
                from: {
                    email: 'cmedrjchamados@gmail.com',
                    name: 'Sistema de Chamados'
                },
                subject: `${data.responsavel}, tem uma pergunta para o término da solução do seu chamado nº ${data.numchamado} `,
                text: `O chamado ${data.descricao}, sob número ${data.numchamado} tem uma pergunta do responsável para solucioná-lo:  <strong>${data.triagem}</strong>. Por favor, responda no sistema de de OS, para que seja atendido de forma correta.`,
                html: `O chamado ${data.descricao}, sob número ${data.numchamado} tem uma pergunta do responsável para solucioná-lo:  <strong>${data.triagem}</strong>. Por favor, responda no sistema de de OS, para que seja atendido de forma correta.`,
            } 
            sgMail.send(msgeditar)             
        }

        if (data.status === "Resposta") {
            const msgeditar = {
                to: data.email,
                from: {
                    email: 'cmedrjchamados@gmail.com',
                    name: 'Sistema de Chamados'
                },
                subject: `${data.nome}, respondeu sua pergunta para o término da solução do chamado nº ${data.numchamado} `,
                text: `O chamado ${data.descricao}, sob número ${data.numchamado} tem uma resposta do(a) solicitante para solucioná-lo:  <strong>${data.resptriagem}</strong>.`,
                html: `O chamado ${data.descricao}, sob número ${data.numchamado} tem uma resposta do(a) solicitante para solucioná-lo:  <strong>${data.resptriagem}</strong>.`,
            } 
            sgMail.send(msgeditar)             
        }



        if (data.status === "Finalizado") {
            const msgeditar = {
                to: data.email,
                from: {
                    email: 'cmedrjchamados@gmail.com',
                    name: 'Sistema de Chamados'
                },
                subject: `Seu chamado nº ${data.numchamado} foi finalizado.`,
                text: `O chamado ${data.descricao} sob número ${data.numchamado} foi finalizado por ${data.responsavel}.`,
                html: `O chamado <strong>${data.descricao}</strong>, sob número <strong>${data.numchamado}</strong> foi finalizado por <strong>${data.responsavel}</strong>, que
                registrou a seguinte resposta à sua solicitação: 
                <p><strong><i>${data.solucao}</i></strong>. </p>
                <p>Verifique, por favor, se foi atendido corretamente. Caso contrário clique no botão reabrir chamado na plataforma.</p>`,
            } 
            sgMail.send(msgeditar)             
        }

        res.send({
            message: "E-mail enviado com sucesso"
        })
                               
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao enviar o e-mail"
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

/*exports.buscarImagem = (req, res) => {
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
*/

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





