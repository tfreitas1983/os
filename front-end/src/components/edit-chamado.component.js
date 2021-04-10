import React, { Component } from 'react'
import ChamadoDataService from "../services/chamado.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import blocked from "../images/blocked.png"
/*import Form from "react-validation/build/form"
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

const vreaberto = value => {
    if (value.length < 6) {
        return (
        <div className="alert alert-danger" role="alert">
            O motivo da reabertura deve possuir no mínimo 6 caracteres.
        </div>
        )
    }
}
*/

export default class EditarChamado extends Component {
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
        this.estadoReaberto = this.estadoReaberto.bind(this)
        this.estadoStatus = this.estadoStatus.bind(this)
        this.estadoSelectStatus = this.estadoSelectStatus.bind(this)
        this.estadoDtPrevisao = this.estadoDtPrevisao.bind(this)
        this.estadoDtPrevisaoNovo = this.estadoDtPrevisaoNovo.bind(this)
        this.estadoDtFechamento = this.estadoDtFechamento.bind(this)
        this.estadoDtFechamentoNovo = this.estadoDtFechamentoNovo.bind(this)

        this.estadoUpload = this.estadoUpload.bind(this)
        this.salvarChamado = this.salvarChamado.bind(this)
        this.salvarImagem = this.salvarImagem.bind(this)
        

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
                reaberto: "",
                dt_previsao: "",
                dt_previsao_novo: "",
                dt_fechamento: "",
                dt_fechamento_novo: "",
                foto: "",
                imagem: "",
                url: "",
                status: "",
                selectedStatus: "",
                situacao: false,
                submitted: false
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
                    url: response.data.url,
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
            this.setState(prevState=>({
                current: {
                    ...prevState.current,
                    imagem: imagem,
                    url: url,
                    foto: foto
                }
            }))
        }

        //Quando o usuário escolhe uma imagem a ser enviada
        else {
            const upload = e.target.files[0]           
            const foto =  e.target.files[0].name
            //const url = ""
            this.setState(prevState=>({  
                upload: upload,   
                url: URL.createObjectURL(upload),                         
                current: {
                    ...prevState.current,
                    foto: foto,                                  
                }                        
            }))
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

   async salvarImagem() {
        
        if (this.state.current.foto === "default.jpg") {
            this.salvarChamado()  
            return false
        } 
        
        if (this.state.current.foto !== "default.jpg") {
        
            const img = new FormData()
            img.append('file', this.state.upload)
        
          await  ChamadoDataService.cadastrarImagem(img)
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

    salvarChamado() {
       

        /*this.setState({
            message: "",
            successful: false
        })
      */
     //   this.form.validateAll()

        var data = {
            id: this.state.current.id,
            nome: this.state.current.nome,
            ramal: this.state.current.ramal,
            setor: this.state.current.setor,
            area: this.state.current.area,
            descricao: this.state.current.descricao,
            responsavel: this.state.current.responsavel,
            solucao: this.state.current.solucao,
            reaberto: this.state.current.reaberto,
            dt_previsao: moment(this.state.current.dt_previsao, 'DD-MM-YYYY'),
            dt_fechamento: moment(this.state.current.dt_fechamento, 'DD-MM-YYYY'),
            foto: this.state.foto,
            url: this.state.url,
            status: this.state.current.status,
            submitted: true
        }
        
            ChamadoDataService.editar(this.state.current.id, data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    numchamado: response.data.numchamado,
                    nome: response.data.nome,
                    username: response.data.username,
                    email: response.data.email,
                    dt_abertura: response.data.dt_abertura,
                    unidade: response.data.unidade,
                    ramal: response.data.ramal,
                    setor: response.data.setor,
                    area: response.data.area,
                    descricao: response.data.descricao,
                    foto: response.data.foto,
                    url: response.data.url,
                    status: response.data.status,
                    solucao: response.data.solucao,
                    reaberto: response.data.reaberto,
                    responsavel: response.data.responsavel, 
                    dt_previsao: response.data.dt_previsao,
                    dt_fechamento: response.data.dt_fechamento,
                    situacao: response.data.situacao,
                    submitted: true,
                    message: "Chamado alterado com sucesso"                
                })                
            })
            .catch(e => {
                console.log(e)
            })

            ChamadoDataService.email(this.state.current.id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    numchamado: response.data.numchamado,
                    nome: response.data.nome,
                    username: response.data.username,
                    email: response.data.email,
                    dt_abertura: response.data.dt_abertura,
                    unidade: response.data.unidade,
                    ramal: response.data.ramal,
                    setor: response.data.setor,
                    area: response.data.area,
                    descricao: response.data.descricao,
                    foto: response.data.foto,
                    url: response.data.url,
                    status: response.data.status,
                    solucao: response.data.solucao,
                    reaberto: response.data.reaberto,
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

    autoResize = () => {
        const objTextArea = document.getElementById('descricao');
        while (objTextArea.scrollHeight > objTextArea.offsetHeight)
        {
            objTextArea.rows += 1;
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
                value={current.dt_previsao} 
                onChange={this.estadoDtPrevisaoNovo} 
                disabled />
            </div>
        }

        let finalizado = null
        if (current.status === "Finalizado") {
            finalizado = <div className="form-group">
                <label htmlFor="finalizado">Finalizado em: </label>
                <input
                type="text" 
                className="form-control" 
                value={current.dt_fechamento} 
                onChange={this.estadoDtFechamentoNovo}
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
                <textarea                                           
                className="form-control" 
                id="solucao"                                             
                value={current.solucao} 
                onChange={this.estadoSolucao} 
                name="solucao"
                disabled />
            </div>            
        }

        let reaberto = null
        if (current.status === "Reaberto") {
            reaberto = <div className="form-group">
                <label htmlFor="reaberto"> Motivo da reabertura </label>
                <textarea                  
                className="form-control" 
                value={current.reaberto} 
                onChange={this.estadoReaberto}
               /* validations={[required, vreaberto]} */ />
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
                    value={current.ip} 
                    onChange={this.estadoIP} 
                    name="ip" />
                </div>
            </div>
        }

        //Monta um array com o nome dos arquivos
      /*  const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});
        //No array somente aceita as extensões de imagens
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        */
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (current.url && current.foto !== "default.jpg") {
            $imagePreview = 
            <div className="preview">
                <img alt="upload" src={this.state.url} />
            </div>
        }

        if(current.foto.length > 30) {
            $imagePreview = <div style={{display: 'grid', marginBottom: 2+'%'}}>                
                    <img alt="" src={`http://chamadosrj.ddns.net:8089/files/${current.foto}`} style={{height: 200+'px'}}/>
                    <a href={`http://chamadosrj.ddns.net:8089/files/${current.foto}`} target="_blank" rel="noopener noreferrer">Visualizar</a>
                </div>
        }

        //Verifica se a imagem possui mais de 2 MB
        if(this.state.upload && (this.state.upload.size > 2 * 1024 * 1024)){
            alert('Somente arquivos até 2MB.')
            $imagePreview = 
            <div className="preview">
                <img alt="upload" src={blocked} />
            </div>
            
        }

        //Verifica se é uma imagem
        if(this.state.upload && this.state.upload.type.substr(0,6) !== "image/" && this.state.upload.type !== "") {
            alert('Somente imagens podem ser enviadas')
        } 


        
        return(
            <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4> Chamado editado com sucesso!</h4>
                        <Link to={"/lista"} className="btn btn-info" style={{marginLeft: 20+'px', marginBottom: 15+'px'}}> 
                            Voltar
                        </Link>
                    </div>
                ) : (
                
                    <div>
                        
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
                                    name="nome"
                                    disabled />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="unidade"> Unidade </label>
                                    <select 
                                        className="form-control" 
                                        id="unidade" 
                                        name="unidade"
                                        value={current.unidade}                                                                     
                                        onChange={this.estadoUnidade}
                                        disabled >                                    
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
                                        onChange={this.estadoSelectArea}
                                        disabled >                                    
                                        <option value="" disabled> --Selecione--</option>
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
                                    {ip}
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
                                        onChange={this.estadoSelectStatus} 
                                        disabled
                                        >                                 
                                        <option value="Pendente"> Pendente </option>
                                        <option value="Cancelado"> Cancelado </option>
                                        <option value="Em análise" disabled> Em análise </option>  
                                        <option value="Aprovação Glauber" disabled> Aprovação Glauber </option>  
                                        <option value="Agendado" disabled> Agendado </option>  
                                        <option value="Em atendimento" disabled> Em atendimento  </option> 
                                        <option value="Finalizado"disabled> Finalizado </option>
                                        <option value="Aguardando Fornecedor" disabled> Aguardando Fornecedor </option>
                                        <option value="Reaberto"> Reaberto </option>
                                    </select>
                                </div>

                                <div>
                                    {agendado}
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="responsavel"> Responsável </label>                                    
                                    <input 
                                    type="text" 
                                    disabled
                                    className="form-control" 
                                    value={current.responsavel}  
                                    name="responsavel" />
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
                            
                                <button onClick={this.salvarImagem} className="btn btn-success" style={{marginBottom: 15+'px'}}>
                                    Editar
                                </button>

                                <Link to={"/lista"} className="btn btn-info" style={{marginLeft: 20+'px', marginBottom: 15+'px'}}> Voltar</Link>
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
                        
                    </div>
                )}
            </div>
        )
    }



}