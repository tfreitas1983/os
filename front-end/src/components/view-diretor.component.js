import React, { Component } from 'react'
import ChamadoDataService from "../services/chamado.service"
import AuthService from "../services/auth.service"
import {Link} from 'react-router-dom'
import * as moment from 'moment'

export default class VisualizarDiretor extends Component {
    constructor(props) {
        super(props)

        this.buscaChamado = this.buscaChamado.bind(this)

        this.state = {
            current: {
                id: null,
                numchamado: "",
                nome: "",
                username: "",
                dt_abertura: moment(),
                unidade: "",
                descricao: "",
                ramal: "",
                setor: "",
                area: "",
                ip: "",
                equipamento: "",
                responsavel: "",
                solucao: "",
                reaberto: "",
                dt_previsao: moment(),
                dt_fechamento: moment(),
                triagem: "",
                foto: "",
                imagem: "",
                visita: false,
                url:"",
                status: "",
                situacao: false
            },
            currentUser: AuthService.getCurrentUser(),
            message: ""           
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
                    dt_abertura: moment(response.data.dt_abertura).format("DD/MM/YYYY"),
                    username: response.data.username,
                    unidade: response.data.unidade,
                    ramal: response.data.ramal,
                    setor: response.data.setor,
                    descricao: response.data.descricao,
                    area: response.data.area,
                    ip: response.data.ip,
                    visita: response.data.visita,
                    equipamento: response.data.equipamento,
                    responsavel: response.data.responsavel,
                    solucao: response.data.solucao,
                    reaberto: response.data.reaberto,
                    dt_previsao: moment(response.data.dt_previsao).format("DD/MM/YYYY"),
                    dt_fechamento: moment(response.data.dt_fechamento).format("DD/MM/YYYY"),
                    status: response.data.status,
                    triagem: response.data.triagem,
                    resptriagem: response.data.resptriagem,
                    foto: response.data.foto,
                    situacao: response.data.situacao                     
                }
            })
            this.autoResize()
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
        const objTextAreaFinalizado = document.getElementById('solucao');
        while (objTextAreaFinalizado.scrollHeight > objTextAreaFinalizado.offsetHeight)
        {
            objTextAreaFinalizado.rows += 1;
        }
    }


    render() {
        const { current, currentUser } = this.state

        //Monta um array com o nome dos arquivos
       /* const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});
        //No array somente aceita as extensões de imagens
      //  const images = importAll(require.context('../images', true, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        */
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url) {
            $imagePreview = <img alt="" src={this.state.url} />
        }

       if (current.foto.length > 30) {
            $imagePreview = <div style={{display: 'grid', marginBottom: 2+'%'}}>                
                    <img alt="" src={`http://chamadosrj.ddns.net:8089/files/${current.foto}`} style={{height: 200+'px'}}/>
                    <a href={`http://chamadosrj.ddns.net:8089/files/${current.foto}`} target="_blank" rel="noopener noreferrer">Visualizar</a>
                </div>
        }

        //Verifica se a imagem possui mais de 2 MB
        if (this.state.imagem && (this.state.imagem.size > 2 * 1024 * 1024)){
            alert('Somente arquivos até 2MB')
        }
        //Verifica se é uma imagem
        if (this.state.imagem && this.state.imagem.type.substr(0,6) !== "image/" && this.state.imagem.type !== "") {
            alert('Somente imagens podem ser enviadas')
        } 

        

        let agendado = null
        if (current.status === "Agendado") {
            agendado = <div className="form-group">
                <label htmlFor="agendado">Previsão</label>
                <input type="text" className="form-control" disabled value={current.dt_previsao} />
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
                ref={this.inputFechamento}
                disabled />
            </div>
        }

        let unidade = null
        if (currentUser.unidade.length > 0) {
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
                    name="equipamento"
                    disabled />
                </div>
            </div>
        }

        let ip = null
        if(current.area === "TI") {
            ip = 
            <div>
                <div className="form-group">
                    <label htmlFor="ip"> IP </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="ip" 
                    value={current.ip} 
                    name="ip" 
                    disabled/>
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
                disabled />
            </div>
        }

        let triagem = null
        if (current.status === "Triagem") {
            triagem =  
           <div className="form-group">
                <label htmlFor="solucao"> Pergunta ao solicitante </label>
                <textarea                           
                className="form-control" 
                id="triagem"                                             
                value={current.triagem} 
                onChange={this.estadoTriagem} 
                name="triagem"
                disabled />
            </div>            
        }

        let resptriagem = null
        if (current.status === "Resposta") {
           resptriagem =  
           <div className="form-group">
                <label htmlFor="resptriagem"> Resposta ao Solucionador </label>
                <textarea                            
                className="form-control" 
                id="resptriagem"                                             
                value={current.resptriagem}
                name="resptriagem"
                disabled />
            </div>            
        }


       /* const objTextArea =  document.getElementById('descricao');
        
        if (objTextArea > 0) {
            while (objTextArea.scrollHeight > objTextArea.offsetHeight) {
                objTextArea.rows += 1;
            }
            while (objTextArea.scrollHeight < objTextArea.offsetHeight) {
                objTextArea.rows -= 1;
            }
        } else {
            return null
        }
        */

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
                        <div>
                            <h4>Chamado: {current.numchamado}</h4>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nome"> Nome </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="nome" 
                            disabled 
                            value={current.nome} 
                            name="nome" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="unidade"> Unidade </label>
                            <select 
                                className="form-control" 
                                id="unidade" 
                                name="unidade"
                                value={current.unidade}
                                disabled                                     
                                onChange={this.estadoUnidade} >                                    
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
                            disabled
                            value={current.ramal} 
                            onChange={this.estadoRamal} 
                            name="ramal" />
                        </div>
                        {unidade}

                        <div className="form-group">
                            <label htmlFor="setor"> Setor Solicitante </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="setor" 
                            disabled
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
                                disabled
                                value={current.area}                                    
                                onChange={this.estadoArea} >                                    
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
                        {equipamento} {ip}

                        <div className="form-group row">                    
                            <div className="col-md-6" style={{paddingLeft: 30}}>
                                <div className="form-check col-md-6">
                                    <label className="form-check-label" style={{width: 'max-content', fontSize: 18+'px'}}>
                                        <input className="form-check-input" type="checkbox" checked={current.visita === true} disabled  /> Houve visita?
                                    </label>
                                </div>
                            </div>
                        </div> 

                        <div className="form-group">
                            <label htmlFor="descricao"> Descrição </label>
                            <textarea 
                            className="form-control" 
                            id="descricao"
                            disabled 
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
                                disabled
                                value={current.status}                                    
                                onChange={this.estadoStatus} >                                 
                                <option value="Pendente"> Pendente </option>
                                <option value="Em análise"> Em análise </option>  
                                <option value="Aprovação Glauber"> Aprovação Glauber </option>  
                                <option value="Agendado"> Agendado </option>  
                                <option value="Em atendimento"> Em atendimento  </option>                                 
                                <option value="Triagem"> Triagem </option>
                                <option value="Resposta"> Resposta ao Solucionador</option>
                                <option value="Finalizado"> Finalizado </option>                                
                                <option value="Cancelado"> Cancelado </option>
                                <option value="Aguardando Fornecedor"> Aguardando Fornecedor </option>
                            </select>
                        </div>
                        {agendado} {triagem} {resptriagem} {finalizado}
                        
                        <div className="form-group">
                            <label htmlFor="responsavel"> Responsável </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="responsavel"
                            disabled 
                            value={current.responsavel} 
                            onChange={this.estadoresponsavel} 
                            name="responsavel" />
                        </div>

                        {solucao}     {reaberto}
                    
                        <div className="image-container">
                            <div className="upload">
                                {$imagePreview}
                            </div>
                          </div>
                          {/*
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
                        */}
                    
                        <Link to={"/mod"} className="btn btn-info" style={{marginLeft: 20+'px', marginBottom: 15+'px'}}> Voltar</Link>
                        <div style={{display: 'grid'}}>
                            <span> <b>Criado por: </b> {current.nome}</span>
                            <span><b>Atendido por: </b>{current.responsavel}</span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}