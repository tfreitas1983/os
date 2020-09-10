import React, { Component } from 'react'
import ChamadoDataService from "../services/chamado.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import Form from "react-validation/build/form"
import Textarea from "react-validation/build/textarea"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo é obrigatório!
        </div>
      )
    }
  }

const vsolucao = value => {
    if (value.length < 6) {
        return (
        <div className="alert alert-danger" role="alert">
            A solução deve possuir no mínimo 6 caracteres.
        </div>
        )
    }
}

const vresponsavel = value => {
    if (value.length < 3) {
        return (
        <div className="alert alert-danger" role="alert">
            O nome do responsável deve possuir no mínimo 3 caracteres.
        </div>
        )
    }
}

const vdt_fechamento = value => {
    if (value.length < 8) {
        return (
        <div className="alert alert-danger" role="alert">
            A data deve ser preenchida.
        </div>
        )
    }
}

export default class Atender extends Component {
    constructor(props) {
        super(props)

        this.buscaChamado = this.buscaChamado.bind(this)
        this.estadoNome = this.estadoNome.bind(this)
        this.estadoUnidade = this.estadoUnidade.bind(this)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoRamal = this.estadoRamal.bind(this)
        this.estadoSetor = this.estadoSetor.bind(this)
        this.estadoArea = this.estadoArea.bind(this)
        this.estadoEquipamento = this.estadoEquipamento.bind(this)
        this.estadoSelectArea = this.estadoSelectArea.bind(this)
        this.estadoResponsavel = this.estadoResponsavel.bind(this)
        this.estadoSolucao = this.estadoSolucao.bind(this)
        this.estadoStatus = this.estadoStatus.bind(this)
        this.estadoSelectStatus = this.estadoSelectStatus.bind(this)
        this.estadoDtPrevisao = this.estadoDtPrevisao.bind(this)
        this.estadoDtPrevisaoNovo = this.estadoDtPrevisaoNovo.bind(this)
        this.estadoDtFechamento = this.estadoDtFechamento.bind(this)
        this.estadoDtFechamentoNovo = this.estadoDtFechamentoNovo.bind(this)
        this.estadoReaberto = this.estadoReaberto.bind(this)

        this.inputPrevisao = React.createRef()

        this.enviaEmail = this.enviaEmail.bind(this)
        this.salvarChamado = this.salvarChamado.bind(this)
        

        this.state = {
            current: {
                id: null,
                numchamado: "",
                nome: "",
                username: "",
                dt_abertura: "",
                unidade: "",
                email: "",
                descricao: "",
                ramal: "",
                setor: "",
                area: "",
                selectedArea: "",
                equipamento: "",
                responsavel: "",
                solucao: "",
                dt_previsao: "",
                dt_previsao_novo: "",
                dt_fechamento: "",
                dt_fechamento_novo: "",
                reaberto: "",
                foto: "",
                imagem: "",
                url:"",
                status: "",
                selectedStatus: "",
                situacao: false
            },
            currentUser: AuthService.getCurrentUser(),
            message: "",            
            successful: false      
        }
    }

    componentDidMount() {
        this.buscaChamado(this.props.match.params.id)        
    }

    buscaChamado(id) {
        ChamadoDataService.buscarUm(id)
        .then(response => {
            this.setState({
                current: {
                    id: response.data.id,
                    numchamado: response.data.numchamado,
                    nome: response.data.nome,
                    dt_abertura: moment(response.data.dt_abertura).format('DD/MM/YYYY'),
                    username: response.data.username,
                    email: response.data.email,
                    unidade: response.data.unidade,
                    ramal: response.data.ramal,
                    setor: response.data.setor,
                    descricao: response.data.descricao,
                    area: response.data.area,
                    equipamento: response.data.equipamento,
                    responsavel: response.data.responsavel,
                    solucao: response.data.solucao,
                    reaberto: response.data.reaberto,
                    dt_previsao: moment(response.data.dt_previsao).format('DD/MM/YYYY'),
                    dt_fechamento: moment(response.data.dt_fechamento).format('DD/MM/YYYY'),
                    status: response.data.status,
                    foto: response.data.foto,
                    situacao: response.data.situacao                     
                }
            }) 
            
            if (this.state.current.dt_previsao === "Invalid date") {
                this.setState(prevState=> ({
                    current: {
                        ...prevState.current,
                        dt_previsao: ""
                    }                    
                }))
                this.inputPrevisao.current.value = ""
            }

            })
            .catch(e => {
                console.log(e)
            })            
    }


    estadoUpload(e) {
        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "default.jpg", type: "image/jpeg"}
            const foto = "default.jpg"
            const url = ""
            this.setState({
                imagem: imagem,
                url: url,
                foto: foto
            })
        }
        //Quando o usuário escolhe uma imagem a ser enviada
        else {
            const imagem = e.target.files[0]
            this.setState({
                imagem: imagem,
                url: URL.createObjectURL(imagem)          
            })
        }
    }

    estadoNome(e) {
        const nome = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 nome: nome
            }
        }))
    }

    estadoUnidade(e) {
        const unidade = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 unidade: unidade
            }
        }))
    }

    estadoRamal(e) {
        const ramal = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 ramal: ramal
            }
        }))
    }

    estadoDescricao(e) {
        const descricao = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 descricao: descricao
            }
        }))
    }

    estadoSetor(e) {
        const setor = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 setor: setor
            }
        }))
    }

    estadoArea(e) {
        const area = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 area: area
            }
        }))
    }

    estadoSelectArea(e) {
        const selectedArea = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 area: selectedArea
            }
        }))
    }

    estadoEquipamento(e) {
        const equipamento = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 equipamento: equipamento
            }
        }))        
    }

    estadoResponsavel(e) {
        const responsavel = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 responsavel: responsavel
            }
        }))
    }

    estadoSolucao(e) {
        const solucao = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 solucao: solucao
            }
        }))
    }

    estadoStatus(e) {
        const status = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 status: status
            }
        }))
    }

    estadoSelectStatus(e) {
        const selectedStatus = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 status: selectedStatus
            }
        }))
    }

    estadoDtPrevisao(e) {
        const dt_previsao = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                dt_previsao: dt_previsao
            }
        }))
    }

    estadoDtPrevisaoNovo(e) {
        const dt_previsao_novo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                dt_previsao: dt_previsao_novo
            }
        }))
    }

    estadoDtFechamento(e) {
        const dt_fechamento = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                dt_fechamento: dt_fechamento
            }
        }))
    }

    estadoDtFechamentoNovo(e) {
        const dt_fechamento_novo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                dt_fechamento: dt_fechamento_novo
            }
        }))
    }

    estadoReaberto(e) {
        const reaberto = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                reaberto: reaberto
            }
        }))
    }

   salvarImagem() {
    
        if(this.state.foto === "default.jpg") {
            this.salvarChamado()  
            return false
        } if(this.state.foto !== "default.jpg") {
        
            var data = new FormData()
            data.append('file', this.state.imagem)
        
            ChamadoDataService.cadastrarImagem(data)
            .then(response => {
                this.setState({
                    foto: response.data.foto
                })
                this.salvarChamado()
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    enviaEmail () {
        ChamadoDataService.email(this.state.current.id)
        .then(response => {
            this.setState({
                id: this.state.current.id,
                numchamado: this.state.current.numchamado,
                nome: this.state.current.nome,
                username: this.state.current.username,
                email: this.state.current.email,
                dt_abertura: moment(this.state.current.dt_abertura, 'DD-MM-YYYY'),
                unidade: this.state.current.unidade,
                ramal: this.state.current.ramal,
                setor: this.state.current.setor,
                area: this.state.current.area,
                descricao: this.state.current.descricao,
                foto: this.state.current.foto,
                status: this.state.current.status,
                solucao: this.state.current.solucao,
                reaberto: this.state.current.reaberto,
                responsavel: this.state.current.responsavel, 
                dt_previsao: moment(this.state.current.dt_previsao, 'DD-MM-YYYY'),
                dt_fechamento: moment(this.state.current.dt_fechamento, 'DD-MM-YYYY'),
                situacao: this.state.current.situacao,
                submitted: true
            })                    
        })
        .catch(e => {
            console.log(e)
        })
    }

    salvarChamado(e) {
        e.preventDefault()

        this.setState({
            message: "",
            successful: false
          })
      
          this.form.validateAll()

        var data = {
            nome: this.state.current.nome,
            unidade: this.state.current.unidade,
            email: this.state.current.email,
            ramal: this.state.current.ramal,
            setor: this.state.current.setor,
            area: this.state.current.area,
            descricao: this.state.current.descricao,
            responsavel: this.state.current.responsavel,
            solucao: this.state.current.solucao,
            reaberto: this.state.current.reaberto,
            dt_previsao: moment(this.state.current.dt_previsao, 'DD-MM-YYYY'),
            dt_fechamento: moment(this.state.current.dt_fechamento, 'DD-MM-YYYY'),
            foto: this.state.current.foto,
            status: this.state.current.status
        }

        if (this.checkBtn.context._errors.length === 0) {
            ChamadoDataService.editar(this.state.current.id, data)
            .then(response => {
                this.setState({
                    id: this.state.current.id,
                    nome: this.state.current.nome,
                    unidade: this.state.current.unidade,
                    email: this.state.current.email,
                    dt_abertura: moment(this.state.current.dt_abertura, 'DD-MM-YYYY'),
                    ramal: this.state.current.ramal,
                    setor: this.state.current.setor,
                    area: this.state.current.area,
                    descricao: this.state.current.descricao,
                    responsavel: this.state.current.responsavel,
                    solucao: this.state.current.solucao,
                    reaberto: this.state.current.reaberto,
                    dt_previsao: moment(this.state.current.dt_previsao, 'DD-MM-YYYY'),
                    dt_fechamento: moment(this.state.current.dt_fechamento, 'DD-MM-YYYY'),
                    foto: this.state.current.foto,
                    status: this.state.current.status,                                      
                    situacao: this.state.current.situacao,
                    submitted: true,
                    message: response.data.message,           
                    successful: true
                })
                this.enviaEmail()                    
            },
            error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  successful: false,
                  message: resMessage
                })
              })
            .catch(e => {
                console.log(e)
            })
        }
    }  

    render() {

        const { current } = this.state

        let agendado = null
        if (current.status === "Agendado") {
           
            agendado = <div className="form-group">
                <label htmlFor="agendado">Previsão</label>
                <input 
                type="text" 
                className="form-control" 
                ref={this.inputPrevisao}
                value={current.dt_previsao} 
                onChange={this.estadoDtPrevisaoNovo}
                validations={[required, vdt_fechamento]} />
            </div>
        }

        let finalizado = null
        if (current.status === "Finalizado") {
            finalizado = <div className="form-group">
                <label htmlFor="finalizado">Finalizado em: </label>
                <Input 
                type="text" 
                className="form-control" 
                value={current.dt_fechamento} 
                onChange={this.estadoDtFechamentoNovo}
                validations={[required, vdt_fechamento]} />
            </div>
        }

        let reaberto = null
        if (current.status === "Reaberto") {
            reaberto = <div className="form-group">
                <label htmlFor="reaberto"> Motivo da reabertura </label>
                <Textarea 
                className="form-control" 
                value={current.reaberto} 
                onChange={this.estadoReaberto}
                disabled />
            </div>
        }

        let equipamento = null
        if(current.area === "Ar Condicionado" || current.area === "Alarme/CFTV/Rede/Telefonia") {
            equipamento = 
            <div>
                <div className="form-group">
                    <label htmlFor="equipamento"> Equipamento </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="equipamento" 
                    value={current.equipamento} 
                    onChange={this.estadoEquipamento} 
                    name="equipamento" />
                </div>
            </div>
        }

        let solucao = null
        if (current.status === "Finalizado") {
           solucao =  
           <div className="form-group">
                <label htmlFor="solucao"> Solução </label>
                <Textarea 
                validations={[required, vsolucao]}                            
                className="form-control" 
                id="solucao"                                             
                value={current.solucao} 
                onChange={this.estadoSolucao} 
                name="solucao" />
            </div>            
        }

        //Monta um array com o nome dos arquivos
        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {})

        //No array somente aceita as extensões de imagens
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url) {
            $imagePreview = <img alt="" src={this.state.url} />
        }

        if(current.foto.length > 30) {
            $imagePreview = <div style={{display: 'grid', marginBottom: 2+'%'}}>                
                    <img alt="" src={images[current.foto]} style={{height: 200+'px'}}/>
                    <a href={`http://10.1.1.26:8089/files/${current.foto}`} target="_blank" rel="noopener noreferrer">Visualizar</a>
                </div>
        }

        if(current.foto === 'default.jpg') {
            $imagePreview = <div>                
                    
                </div>
        }

        //Verifica se a imagem possui mais de 2 MB
        if(this.state.imagem && (this.state.imagem.size > 2 * 1024 * 1024)){
            alert('Somente arquivos até 2MB')
        }
        //Verifica se é uma imagem
        if(this.state.imagem && this.state.imagem.type.substr(0,6) !== "image/" && this.state.imagem.type !== "") {
            alert('Somente imagens podem ser enviadas')
        } 
        

        return(
            <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4> Chamado editado com sucesso!</h4>
                        <Link to={"/admin"} className="btn btn-info" style={{marginLeft: 20+'px', marginBottom: 15+'px'}}> 
                            Voltar
                        </Link>
                    </div>
                ) : (
                
                    <div>
                        <Form 
                        onSubmit={this.handleRegister} 
                        ref={c => {
                            this.form = c
                        }}>

                        {!this.state.successful && (
                            <div>
                                <div>
                                    <h4>Chamado: {current.numchamado}</h4>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nome"> Nome </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nome"                              
                                    value={current.nome} 
                                    onChange={this.estadoNome}
                                    name="nome" />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="unidade"> Unidade </label>
                                    <select 
                                        className="form-control" 
                                        id="unidade" 
                                        name="unidade"
                                        value={current.unidade}                                                                     
                                        onChange={this.estadoUnidade} >                                    
                                        <option value="1">Selecione</option>
                                        <option value="Caxias">Caxias</option>  
                                        <option value="Nilópolis">Nilópolis</option> 
                                        <option value="Nova Iguacu"> Nova Iguaçu </option>
                                        <option value="Queimados"> Queimados </option>
                                        <option value="Rio de Janeiro"> Rio de Janeiro </option>
                                        <option value="Vilar dos Teles">Vilar dos Teles</option>
                                        <option value="CDRio Nova Iguaçu"> CDRio Nova Iguaçu </option>
                                        <option value="CDRio São Gonçalo"> CDRio São Gonçalo </option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ramal"> Ramal </label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="ramal"                             
                                    value={current.ramal} 
                                    onChange={this.estadoRamal} 
                                    name="ramal" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="setor"> Setor Solicitante </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="setor"                             
                                    value={current.setor} 
                                    onChange={this.estadoSetor} 
                                    name="setor" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="area"> Área Requisitada </label>
                                    <select 
                                        className="form-control" 
                                        id="area" 
                                        name="area"                                
                                        value={current.area}                                    
                                        onChange={this.estadoSelectArea} >                                    
                                        <option value="1">Selecione</option>
                                        <option value="Alarme/CFTV/Rede/Telefonia"> Alarme/CFTV/Rede/Telefonia </option>
                                        <option value="Ar Condicionado"> Ar Condicionado </option>
                                        <option value="Compras"> Compras </option>  
                                        <option value="Financeiro"> Financeiro </option>  
                                        <option value="Gráfica"> Gráfica </option>  
                                        <option value="Manutenção"> Manutenção </option> 
                                        <option value="Recursos Humanos"> Recursos Humanos </option>                                                                
                                        <option value="TI"> TI </option>
                                        <option value="Transporte"> Transporte </option>
                                    </select>
                                </div>

                                <div>
                                    {equipamento}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descricao"> Descrição </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="descricao"                             
                                    value={current.descricao} 
                                    onChange={this.estadoDescricao} 
                                    name="descricao" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status"> Status </label>
                                    <select 
                                        className="form-control" 
                                        id="status" 
                                        name="status"                                
                                        value={current.status}                                    
                                        onChange={this.estadoSelectStatus} >                                 
                                        <option value="Pendente"> Pendente </option>
                                        <option value="Em análise"> Em análise </option>  
                                        <option value="Aprovação Glauber"> Aprovação Glauber </option>  
                                        <option value="Agendado"> Agendado </option>                                          
                                        <option value="Aguardando Fornecedor"> Aguardando Fornecedor </option>
                                        <option value="Em atendimento"> Em atendimento  </option> 
                                        <option value="Finalizado"> Finalizado </option>                                
                                        <option value="Cancelado"> Cancelado </option>                                        
                                        <option value="Reaberto"> Reaberto </option>
                                    </select>
                                </div>

                                <div>
                                    {agendado}
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="responsavel"> Responsável </label>
                                    <Input 
                                    type="text" 
                                    className="form-control" 
                                    id="responsavel"                             
                                    value={current.responsavel} 
                                    onChange={this.estadoResponsavel} 
                                    name="responsavel"
                                    validations={[required, vresponsavel]} />
                                </div>

                                <div>
                                    {solucao}
                                    {reaberto}
                                </div>
                                <div>
                                    {finalizado}
                                </div>
                            
                                <div className="image-container">
                                    <div className="upload">
                                        {$imagePreview}
                                    </div>
                                </div>
                            
                                <button onClick={this.salvarChamado} className="btn btn-success" style={{marginBottom: 15+'px'}}>
                                    Editar
                                </button>

                                <Link to={"/admin"} className="btn btn-info" style={{marginLeft: 20+'px', marginBottom: 15+'px'}}> Voltar</Link>
                                <div style={{display: 'grid'}}>
                                    <span> <b>Criado por: </b> {current.username}</span>
                                    <span><b>Atendido por: </b>{current.responsavel}</span>
                                </div>
                            </div>
                        )} 

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                className={
                                    this.state.successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                                }
                                role="alert"
                                >
                                {this.state.message}
                                </div>
                            </div>
                            )}
                            <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                            />
                        </Form>
                    </div>
                )}
            </div>
        )
    }



}