import React, { Component } from 'react'
import ChamadoDataService from "../services/chamado.service"
import AuthService from "../services/auth.service"
import * as moment from 'moment'
import {Link} from 'react-router-dom'
import blocked from "../images/blocked.png"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import Select from "react-validation/build/select"
import Textarea from "react-validation/build/textarea"

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo é obrigatório!
        </div>
      )
    }
}

export default class AdicionarChamado extends Component {
    constructor(props) {
        super(props)
        this.estadoNome = this.estadoNome.bind(this)       
        this.estadoUnidade = this.estadoUnidade.bind(this)
        this.estadoRamal = this.estadoRamal.bind(this)
        this.estadoDescricao = this.estadoDescricao.bind(this)        
        this.estadoSetor = this.estadoSetor.bind(this)       
        this.estadoArea = this.estadoArea.bind(this) 
        this.estadoAtendente = this.estadoAtendente.bind(this)
        this.estadoEquipamento = this.estadoEquipamento.bind(this)
        this.estadoIP = this.estadoIP.bind(this)
                
        this.estadoUpload = this.estadoUpload.bind(this)
       
        this.salvarImagem = this.salvarImagem.bind(this)
        this.salvarChamado = this.salvarChamado.bind(this)
        this.novoChamado = this.novoChamado.bind(this)
        this.enviarEmail = this.enviarEmail.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            id: null,
            nome: "",
            email: "",
            identificador: "",
            atendente: "",
            dt_abertura: "",
            unidade: "",
            descricao: "",
            ramal: "",
            setor: "",
            area: "",
            equipamento: "",
            ip: "",
            responsavel:"",
            solucao: "",
            reaberto: "",
            dt_previsao: "",
            dt_fechamento: "",
            foto: "default.jpg",
            imagem: "",
            visita: false,
            url:"",
            submitted: false
        }
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
                url: URL.createObjectURL(imagem) ,
                foto: imagem.name       
            })
        }
    }

    estadoNome(e) {
        this.setState({
            nome: this.state.currentUser.nome
        })
    }

    estadoUnidade(e) {
        this.setState({
            unidade: e.target.value
        })
    }

    estadoRamal(e) {
        this.setState({
            ramal: e.target.value
        })
    }

    async estadoDescricao(e) {
        this.setState({
            descricao: e.target.value,
            nome: this.state.currentUser.nome,
            email: this.state.currentUser.email,
            unidade: this.state.currentUser.unidade,
        })

        await this.setState({
            identificador: moment().valueOf(),
        })
    }

    estadoSetor(e) {
        this.setState({
            setor: e.target.value
        })
    }

    estadoAtendente() {
        if (this.state.area === "Alarme/CFTV/Rede/Telefonia") {
            this.setState({
                atendente: "maxlyra8@gmail.com"
            })
        }

        if (this.state.area === "Compras" || this.state.area === "Gráfica" ) {
            this.setState({
                atendente: "centro@clinicariodejaneiro.com.br"
            })
        }

        if (this.state.area === "Financeiro") {
            this.setState({
                atendente: "financeiro@clinicariodejaneiro.com.br"
            })
        }

        if (this.state.area === "Recursos Humanos" || this.state.area === "Manutenção" || this.state.area === "Transporte" || this.state.area === "Ar Condicionado") {
            this.setState({
                atendente: "rh@clinicariodejaneiro.com.br"
            })
        }

        if (this.state.area === "TI") {
            this.setState({
                atendente: "ti@clinicariodejaneiro.com.br"
            })
        }
    }

    estadoArea(e) {
        this.setState({
            area: e.target.value
        })
        this.estadoAtendente()        
    }

    estadoEquipamento(e) {
        this.setState({
            equipamento: e.target.value
        })
    }

    estadoIP(e) {
        this.setState({
            ip: e.target.value
        })
    }

    salvarImagem(e) {
        e.preventDefault();

        this.setState({
        message: "",
        loading: true
        })

        this.form.validateAll()

        if (this.checkBtn.context._errors.length === 0) {
            if(this.state.foto === "default.jpg") {
                this.salvarChamado()  
                return false
            } 
            
            if(this.state.foto !== "default.jpg") {
                if(this.state.imagem && (this.state.imagem.size > 2 * 1024 * 1024)){
                    this.setState({
                        foto: "",
                        imagem: "",
                        url: ""
                    })                
                }
                if(this.state.imagem && this.state.imagem.type.substr(0,6) !== "image/" && this.state.imagem.type !== "") {
                    this.setState({
                        foto: "",
                        imagem: "",
                        url: ""
                    })  
                } 

                var data = new FormData()
                data.append('file', this.state.imagem)
            
                ChamadoDataService.cadastrarImagem(data)
                .then(response => {
                    this.setState({
                        foto: response.data.foto
                    })
                    this.salvarChamado()
                },
                error => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
        
                  this.setState({
                    loading: false,
                    message: resMessage
                  });
                })
                .catch(e => {
                    console.log(e)
                })
            }
        } else {
            this.setState({
              loading: false
            })
          }
    }

    salvarChamado() {

        var data = {
            nome: this.state.currentUser.nome,
            username: this.state.currentUser.username,
            identificador: this.state.identificador,
            email: this.state.currentUser.email,
            atendente: this.state.atendente,
            dt_abertura: moment.now(),
            unidade: this.state.unidade,
            ramal: this.state.ramal,
            setor: this.state.setor,
            area: this.state.area,
            equipamento: this.state.equipamento,
            ip: this.state.ip,
            descricao: this.state.descricao,
            responsavel:this.state.responsavel,
            solucao: this.state.solucao,
            reaberto: this.state.reaberto,
            visita: this.state.visita,
            dt_previsao: moment(),
            dt_fechamento: moment(),
            foto: this.state.foto,
            status: "Pendente"
        }

        ChamadoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                nome: response.data.nome,
                username: response.data.username,
                identificador: response.data.identificador,
                email: response.data.email,
                atendente: response.data.atendente,
                dt_abertura: response.data.dt_abertura,
                unidade: response.data.unidade,
                ramal: response.data.ramal,
                setor: response.data.setor,
                area: response.data.area,
                equipamento: response.data.equipamento,
                ip: response.data.ip,
                descricao: response.data.descricao,
                visita: response.data.visita,
                foto: response.data.foto,
                dt_previsao: response.data.dt_previsao,
                dt_fechamento: response.data.dt_fechamento,
                status: response.data.status,
                situacao: response.data.situacao,
                submitted: true
            })  
            this.enviarEmail()          
        })
        .catch(e => {
            console.log(e)
        })
    }

    enviarEmail() {

        ChamadoDataService.email(this.state.id)
        .then(response => {
            this.setState({
                id: response.data.id,
                nome: response.data.nome,
                username: response.data.username,
                email: response.data.email,
                atendente: response.data.atendente,
                dt_abertura: response.data.dt_abertura,
                unidade: response.data.unidade,
                equipamento: response.data.equipamento,
                ramal: response.data.ramal,
                setor: response.data.setor,
                area: response.data.area,
                descricao: response.data.descricao,
                foto: response.data.foto,
                status: response.data.status,
                solucao: response.data.solucao,
                responsavel: response.data.responsavel, 
                dt_previsao: response.data.dt_previsao,
                dt_fechamento: response.data.dt_fechamento,
                situacao: response.data.situacao,
                submitted: true
            })                    
        })
        .catch(e => {
            console.log(e)
        })        
    }

    novoChamado() {
        this.setState({
        id: null,
        nome: "",
        username: "",
        dt_abertura: "",
        unidade: "",
        descricao: "",
        ramal: "",
        setor: "",
        area: "",
        equipamento: "",
        foto: "default.jpg",
        imagem: "",
        url:"",
        submitted: false
        })
    }

    autoResize = () => {
        const objTextArea = document.getElementById('descricao');
        while (objTextArea.scrollHeight > objTextArea.offsetHeight)
        {
            objTextArea.rows += 1;
        }
    }

    render() {

        const {currentUser} = this.state
     
        //Monta um array com o nome dos arquivos
        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});
        //No array somente aceita as extensões de imagens
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url) {
            $imagePreview = 
            <div className="preview">
                <img alt="upload" src={this.state.url} />
            </div>
        }
        if(!this.state.url) {
            $imagePreview = <img alt="" src={images[this.state.foto]} />
        }

        //Verifica se a imagem possui mais de 2 MB
        if(this.state.imagem && (this.state.imagem.size > 2 * 1024 * 1024)){
            alert('Somente arquivos até 2MB.')
            $imagePreview = 
            <div className="preview">
                <img alt="upload" src={blocked} />
            </div>            
        }

        //Verifica se é uma imagem
        if(this.state.imagem && this.state.imagem.type.substr(0,6) !== "image/" && this.state.imagem.type !== "") {
            alert('Somente imagens podem ser enviadas')
        } 

        let unidade = null
        if (currentUser && currentUser.unidade.length > 0) {
            unidade = 
            <div className="form-group">
                <label htmlFor="unidade" hidden> Unidade </label>
                <select 
                    className="form-control" 
                    id="unidade" 
                    name="unidade"
                    value={currentUser.unidade}                                    
                    onChange={this.estadoUnidade}
                    disabled 
                    hidden>                                                                            
                    <option value="1">Selecione</option>
                    <option value="Escritório">Escritório</option>  
                    <option value="Caxias">Caxias</option>  
                    <option value="Nilópolis">Nilópolis</option> 
                    <option value="Nova Iguaçu"> Nova Iguaçu </option>
                    <option value="Queimados"> Queimados </option>
                    <option value="Rio de Janeiro"> Rio de Janeiro </option>
                    <option value="Vilar dos Teles">Vilar dos Teles</option>
                    <option value="CDRio Nova Iguaçu"> CDRio Nova Iguaçu </option>
                    <option value="CDRio São Gonçalo"> CDRio São Gonçalo </option>
                </select>
            </div>
        }

        let equipamento = null
        if(this.state.area === "Ar Condicionado" || this.state.area === "Alarme/CFTV/Rede/Telefonia") {
            equipamento = 
            <div>
                <div className="form-group">
                    <label htmlFor="equipamento"> Equipamento </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="equipamento" 
                    value={this.state.equipamento} 
                    onChange={this.estadoEquipamento} 
                    name="equipamento" />
                </div>
            </div>
        }

        let ip = null
        if(this.state.area === "TI") {
            ip = 
            <div>
                <div className="form-group">
                    <label htmlFor="ip"> IP </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="ip" 
                    value={this.state.ip} 
                    onChange={this.estadoIP} 
                    name="ip" />
                </div>
            </div>
        }

        

        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4> Envio completado com sucesso!</h4>
                        <Link to={"/lista"} className="btn btn-info">
                            Voltar
                        </Link>
                    </div>
                ) : (
                
                    <div>
                        <Form onSubmit={this.handleLogin} ref={c => {this.form = c;}}  >
                            <div className="form-group">
                                <label htmlFor="nome" hidden> Nome </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="nome" 
                                required 
                                value={currentUser.nome} 
                                onChange={this.estadoNome} 
                                name="nome"
                                hidden />
                            </div>
                        
                            {unidade}

                            <div className="form-group">
                                <label htmlFor="ramal"> Ramal </label>
                                <Input 
                                type="number" 
                                className="form-control" 
                                id="ramal" 
                                value={this.state.ramal} 
                                onChange={this.estadoRamal} 
                                name="ramal"
                                validations={[required]} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="setor"> Setor Solicitante </label>
                                <Select                             
                                className="form-control" 
                                id="setor" 
                                value={this.state.setor} 
                                onChange={this.estadoSetor} 
                                validations={[required]}
                                name="setor">
                                    <option value="" disabled> --Selecione-- </option>
                                    <option value="Administração"> Administração </option>
                                    <option value="Caixa"> Caixa </option>
                                    <option value="Consultório"> Consultório </option>
                                    <option value="Cozinha"> Cozinha </option>  
                                    <option value="Enfermaria"> Enfermaria </option>
                                    <option value="Escritório"> Escritório </option> 
                                    <option value="Laboratório"> Laboratório </option>
                                    <option value="Medicina Ocupacional"> Medicina Ocupacional </option>
                                    <option value="Recepção"> Recepção </option>  
                                    <option value="Sala de Espera"> Sala de Espera </option>
                                    <option value="Telefonia"> Telefonia </option>
                                </Select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="area"> Área Requisitada </label>
                                <Select 
                                    className="form-control" 
                                    id="area" 
                                    name="area"
                                    required
                                    value={this.state.area}                                    
                                    onChange={this.estadoArea}
                                    onClick={this.estadoAtendente}
                                    validations={[required]} >                                    
                                    <option value="" disabled> --Selecione-- </option>
                                    <option value="Alarme/CFTV/Rede/Telefonia"> Alarme/CFTV/Rede/Telefonia </option>
                                    <option disabled value="Ar Condicionado"> Ar Condicionado (Em Breve)</option>
                                    <option disabled value="Compras"> Compras (Em Breve) </option>  
                                    <option disabled value="Financeiro"> Financeiro (Em Breve) </option>  
                                    <option disabled value="Gráfica"> Gráfica (Em Breve) </option>  
                                    <option disabled value="Manutenção"> Manutenção (Em Breve) </option> 
                                    <option disabled value="Recursos Humanos"> Recursos Humanos (Em Breve) </option>                                 
                                    <option value="TI"> TI </option>
                                    <option value="Transporte"> Transporte </option>
                                </Select>
                            </div>
                            {equipamento} {ip}
                    
                            <div className="form-group">
                                <label htmlFor="descricao"> Descrição </label>
                                <Textarea 
                                className="form-control" 
                                id="descricao" 
                                value={this.state.descricao} 
                                onChange={this.estadoDescricao} 
                                name="descricao"
                                validations={[required]}
                                onKeyDown={this.autoResize}>

                                </Textarea>
                                
                            </div>
                        
                            <div className="image-container">

                                <div className="upload">
                                    {$imagePreview}
                                </div>

                                <div className="envio">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="file"
                                        onChange={this.estadoUpload}
                                        id="file"
                                        name="file" /> 
                                </div>
                            </div>
                        
                            <button onClick={this.salvarImagem} className="btn btn-success">
                                Adicionar
                            </button>

                            {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                {this.state.message}
                                </div>
                            </div>
                            )}
                            <CheckButton style={{display: "none"}} ref={c => {this.checkBtn = c;}} />
                        </Form>
                    </div>
                )}
            </div>
        )
    }
}