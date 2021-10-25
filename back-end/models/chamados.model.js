module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    var uniqueValidator = require('mongoose-unique-validator')
    const AutoIncrement = require('mongoose-sequence')(mongoose)
    var schemaChamados = mongoose.Schema ({
        numchamado: Number,
        unidade: String,
        dt_abertura: { type: Date }, 
        ramal: Number,
        nome: String,
        username: String,
        email: String,
        atendente: String,
        setor: String,
        area: String,
        equipamento: String,
        ip: String,
        visita: Boolean,
        descricao: String,
        status: String,
        responsavel: String,
        solucao: String,
        reaberto: String,
        triagem: String,
        resptriagem: String,
        dt_previsao: { type: Date } ,
        dt_fechamento: { type: Date },
        url: String,
        situacao: Boolean,
        foto: {
            type: String,
            default: 'default.jpg'
        }
    },
        { timestamps: true }
    )

    schemaChamados.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    schemaChamados.plugin(uniqueValidator)
    schemaChamados.plugin(mongoosePaginate)
    schemaChamados.plugin(AutoIncrement, {num:'numchamado_seq', inc_field: 'numchamado'})
    const Chamados = mongoose.model("chamados", schemaChamados)    
    return Chamados
}