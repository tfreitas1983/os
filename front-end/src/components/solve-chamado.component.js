import React, { Component } from 'react'
import ChamadoDataService from "../services/chamado.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import Form from "react-validation/build/form"
import Textarea from "react-validation/build/textarea"
import Input from "react-validation/build/input"
import Select from "react-validation/build/select"
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
        this.estadoIP = this.estadoIP.bind(this)
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
        this.estadoDataFechamento = this.estadoDataFechamento.bind(this)
        this.estadoReaberto = this.estadoReaberto.bind(this)
        this.estadoVisita = this.estadoVisita.bind(this)
        this.estadoTriagem = this.estadoTriagem.bind(this)

        this.inputPrevisao = React.createRef()
        this.inputFechamento = React.createRef()

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
                ip:"",
                equipamento: "",
                visita: false,
                responsavel: "",
                triagem: "",
                resptriagem: "",
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
                    dt_abertura: moment(response.data.dt_abertura).format('YYYY-MM-DD'),
                    username: response.data.username,
                    email: response.data.email,
                    unidade: response.data.unidade,
                    ramal: response.data.ramal,
                    setor: response.data.setor,
                    descricao: response.data.descricao,
                    area: response.data.area,
                    ip: response.data.ip,
                    equipamento: response.data.equipamento,
                    responsavel: response.data.responsavel,
                    solucao: response.data.solucao,
                    reaberto: response.data.reaberto,
                    dt_previsao: moment(response.data.dt_previsao).format('YYYY-MM-DD'),
                    dt_fechamento: moment(response.data.dt_fechamento).format('YYYY-MM-DD'),
                    status: response.data.status,
                    foto: response.data.foto,
                    visita: response.data.visita,
                    triagem: response.data.triagem,
                    resptriagem: response.data.resptriagem,
                    situacao: response.data.situacao                     
                }
            }) 
            this.autoResize()            
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

    estadoIP(e) {
        const ip = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 ip: ip
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

    estadoVisita(e) {
        const visita = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                visita: visita
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

    estadoDataFechamento(e){ 
        const dt_fechamento_novo = moment().format("YYYY-MM-DD")
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

    estadoTriagem(e) {
        const triagem = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                triagem: triagem
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
                dt_abertura: this.state.current.dt_abertura,
                unidade: this.state.current.unidade,
                ramal: this.state.current.ramal,
                setor: this.state.current.setor,
                area: this.state.current.area,
                ip: this.state.current.ip,
                descricao: this.state.current.descricao,
                foto: this.state.current.foto,
                status: this.state.current.status,
                visita: this.state.current.visita,
                solucao: this.state.current.solucao,
                reaberto: this.state.current.reaberto,
                triagem: this.state.current.triagem,
                resptriagem: this.state.current.resptriagem,
                responsavel: this.state.current.responsavel, 
                situacao: this.state.current.situacao,
                submitted: true
            })                    
        })
        .catch(e => {
            console.log(e)
        })
    }

    async salvarChamado(e) {

        
        e.preventDefault()

        if (this.state.current.status !== "Finalizado") {
            await this.setState(prevState => ({
                current: {
                    ...prevState.current,
                    dt_fechamento: moment().format('YYYY-MM-DD')
                }
            }))
        }

        if (this.state.current.status !== "Agendado") {
            await this.setState(prevState => ({
                current: {
                    ...prevState.current,
                    dt_previsao: moment().format('YYYY-MM-DD')
                }
            }))
        }



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
            visita: this.state.current.visita,
            ip: this.state.current.ip,
            solucao: this.state.current.solucao,
            reaberto: this.state.current.reaberto,
            triagem: this.state.current.triagem,
            resptriagem: this.state.current.resptriagem,
            dt_previsao: this.state.current.dt_previsao,
            dt_fechamento: this.state.current.dt_fechamento,
            foto: this.state.current.foto,
            status: this.state.current.status
        }

        if (this.checkBtn.context._errors.length === 0) {
            ChamadoDataService.editar(this.state.current.id, data)
            .then(response => {
                this.setState({
                
                    id: response.data.id,
                    nome: response.data.nome,
                    unidade: response.data.unidade,
                    email: response.data.email,
                    dt_abertura: moment(response.data.dt_abertura).format('YYYY-MM-DD'),
                    ramal: response.data.ramal,
                    setor: response.data.setor,
                    area: response.data.area,                    
                    descricao: response.data.descricao,
                    responsavel: response.data.responsavel,
                    solucao: response.data.solucao,
                    reaberto: response.data.reaberto,
                    dt_previsao: moment(response.data.dt_previsao).format('DD-MM-YYYY'),
                    dt_fechamento: moment(response.data.dt_fechamento).format('DD-MM-YYYY'),
                    foto: response.data.foto,
                    ip: response.data.ip,
                    visita: response.data.visita,
                    triagem: response.data.triagem,
                    resptriagem: response.data.resptriagem,
                    status: response.data.status,                                      
                    situacao: response.data.situacao,
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

    autoResize = () => {
        const objTextArea = document.getElementById('descricao');
        while (objTextArea.scrollHeight > objTextArea.offsetHeight)
        {
            objTextArea.rows += 1;
        }
        if (this.state.current.solucao !== "" || this.state.current.solucao !== undefined) {
            const objTextAreaFinalizado = document.getElementById('solucao');
            while (objTextAreaFinalizado.scrollHeight > objTextAreaFinalizado.offsetHeight)
            {
                objTextAreaFinalizado.rows += 1;
            }
        }
    }

    render() {

        const { current } = this.state

        let agendado = null
        if (current.status === "Agendado") {
           
            agendado = <div className="form-group">
                <label htmlFor="agendado">Previsão</label>
                <input 
                type="date" 
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
                type="date" 
                className="form-control" 
                value={current.dt_fechamento} 
                ref={this.inputFechamento}
                onChange={this.estadoDtFechamentoNovo}
                validations={[required, vdt_fechamento]} 
                onClick={this.estadoDataFechamento} />
            </div>
        } else {
            finalizado = <div></div>
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
                onKeyDown={this.autoResize}
                name="solucao"
                 />
            </div>            
        }

        let triagem = null
        if (current.status === "Triagem") {
           triagem =  
           <div className="form-group">
                <label htmlFor="solucao"> Pergunta ao solicitante </label>
                <Textarea 
                validations={[required]}                            
                className="form-control" 
                id="solucao"                                             
                value={current.triagem} 
                onChange={this.estadoTriagem} 
                onKeyDown={this.autoResize}
                name="triagem"
                 />
            </div>            
        }



        let resptriagem = null
        if (current.status === "Resposta") {
           resptriagem =  
           <div className="form-group">
                <label htmlFor="resptriagem"> Resposta ao Solucionador </label>
                <textarea 
                validations={[required]}                            
                className="form-control" 
                id="solucao"                                             
                value={current.resptriagem} 
                onKeyDown={this.autoResize}
                name="resptriagem"
                disabled />
            </div>            
        }


        let ip = null
        let responsavel = null
        if(current.area === "TI") {
            ip = <div>
                <div className="form-group">
                    <label htmlFor="ip"> IP </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="ip" 
                    value={current.ip} 
                    onChange={this.estadoIP} 
                    name="ip" />
                </div>
            </div>
        }

        if(current.area === "Alarme/CFTV/Rede/Telefonia") {
            responsavel = <div>
                <div className="form-group">
                    <label htmlFor="responsavel"> Responsável </label>
                    <Select 
                        className="form-control" 
                        id="responsavel" 
                        name="responsavel"
                        value={current.responsavel}                                                                     
                        onChange={this.estadoResponsavel}
                        validations={[required, vresponsavel]} >                                    
                        <option value="" >Selecione</option>
                        <option value="Max">Max</option>  
                        <option value="Yuri">Yuri</option> 
                        <option value="Max / Yuri">Max / Yuri</option>                         
                    </Select>
                </div>
            </div>
        }

        if(current.area === "TI") {
            responsavel = <div>
                <div className="form-group">
                    <label htmlFor="responsavel"> Responsável </label>
                    <Select 
                        className="form-control" 
                        id="responsavel" 
                        name="responsavel"
                        value={current.responsavel}                                                                     
                        onChange={this.estadoResponsavel}
                        validations={[required, vresponsavel]} >                                    
                        <option value="" disabled>Selecione</option>
                        <option value="Claudio">Claudio</option>  
                        <option value="Ivan">Ivan</option> 
                        <option value="Thiago"> Thiago </option>
                        <option value="Claudio / Ivan"> Claudio / Ivan </option>
                    </Select>
                </div>
            </div>
        }

        if(current.area === "Transporte") {
            responsavel = <div>
                <div className="form-group">
                    <label htmlFor="responsavel"> Responsável </label>
                    <Select 
                        className="form-control" 
                        id="responsavel" 
                        name="responsavel"
                        value={current.responsavel}                                                                     
                        onChange={this.estadoResponsavel}
                        validations={[required, vresponsavel]} >                                    
                        <option value="" disabled>Selecione</option>
                        <option value="Camilo Junior"> Camilo Junior</option>  
                        <option value="Adilson"> Adilson</option> 
                        <option value="Glauber"> Glauber </option>
                        <option value="Michele"> Michele </option>
                    </Select>
                </div>
            </div>
        }

        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url) {
            $imagePreview = <img alt="" src={this.state.url} />
        }

        if(current.foto && current.foto.length > 30) {
            $imagePreview = <div style={{display: 'grid', marginBottom: 2+'%'}}>                
                    <img alt="" src={`http://chamadosrj.ddns.net:8089/files/${current.foto}`} style={{height: 200+'px'}}/>
                    <a href={`http://chamadosrj.ddns.net:8089/files/${current.foto}`} target="_blank" rel="noopener noreferrer">Visualizar</a>
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
                        <Form onSubmit={this.handleRegister} ref={c => {this.form = c}}>

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
                                        <option value="Escritório">Escritório</option> 
                                        <option value="Nilópolis">Nilópolis</option> 
                                        <option value="Nova Iguaçu"> Nova Iguaçu </option>
                                        <option value="Queimados"> Queimados </option>
                                        <option value="Vilar dos Teles">Vilar dos Teles</option>
                                        <option value="CDRio Nova Iguaçu"> CDRio Nova Iguaçu </option>
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
                                    <select                             
                                    className="form-control" 
                                    id="setor" 
                                    value={current.setor} 
                                    onChange={this.estadoSetor} 
                                    required
                                    name="setor">
                                        <option value="" disabled> --Selecione-- </option>
                                        <option value="Caixa"> Caixa </option>
                                        <option value="Consultório"> Consultório </option>
                                        <option value="Cozinha"> Cozinha </option>  
                                        <option value="Enfermaria"> Enfermaria </option>
                                        <option value="Escritório"> Escritório </option> 
                                        <option value="Laboratório"> Laboratório </option>
                                        <option value="Recepção"> Recepção </option>  
                                        <option value="Sala de Espera"> Sala de Espera </option>
                                        <option value="Telefonia"> Telefonia </option>
                                    </select>
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

                                <div className="form-group row">                    
                                    <div className="col-md-6" style={{paddingLeft: 30}}>
                                        <div className="form-check col-md-6">
                                            <label className="form-check-label" style={{width: 'max-content', fontSize: 18+'px'}}>
                                                <input className="form-check-input" type="checkbox" checked={this.state.current.visita === true} onChange={this.estadoVisita}  /> Houve visita?
                                            </label>
                                        </div>
                                    </div>
                                </div> 
                                {ip}
                                <div className="form-group">
                                    <label htmlFor="descricao"> Descrição </label>
                                    <textarea 
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
                                        <option value="Triagem"> Pergunta ao Solicitante </option> 
                                        <option value="Resposta"> Resposta ao Solucionador </option>  
                                        <option value="Finalizado"> Finalizado </option>                                
                                        <option value="Cancelado"> Cancelado </option>                                        
                                        <option value="Reaberto"> Reaberto </option>
                                        
                                    </select>
                                </div>

                                <div>
                                    {agendado}
                                </div>

                                <div>
                                    {triagem}
                                    {resptriagem}
                                    {responsavel}
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
                                    <span> <b>Criado por: </b> {current.nome}</span>
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