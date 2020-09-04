import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ChamadoDataService from "../services/chamado.service"
import AuthService from "../services/auth.service"
import * as momentjs from 'moment'
import moment from "moment-business-days"
import {FaEdit, FaEye, FaCheckCircle, FaRedo} from 'react-icons/fa'
import { IconContext } from "react-icons"


export default class ChamadosLista extends Component {
    constructor(props) {
        super(props)

        this.pegaChamados = this.pegaChamados.bind(this)
        this.estadoBuscaNome = this.estadoBuscaNome.bind(this)
        this.estadoBuscaChamado = this.estadoBuscaChamado.bind(this)
        this.estadoBuscaData = this.estadoBuscaData.bind(this)
        this.estadoBuscaArea = this.estadoBuscaArea.bind(this)
        this.estadoBuscaStatus = this.estadoBuscaStatus.bind(this)
        this.buscarNome = this.buscarNome.bind(this)
        this.buscarChamado = this.buscarChamado.bind(this)
        this.buscarData = this.buscarData.bind(this)
        this.buscarArea = this.buscarArea.bind(this)
        this.buscarStatus = this.buscarStatus.bind(this)
        this.toggleFiltro = this.toggleFiltro.bind(this)

        this.state = {
            chamados: [],
            info: {},
            page: 1,
            current: null,
            currentIndex: -1,
            currentUser: AuthService.getCurrentUser(),
            selectedPage: null,
            buscaNome: "",
            buscaChamado: "",
            buscaArea: "",
            buscaStatus: "",
            mostraFiltro: true,
            className: 'hidden'
        }
    }

    componentDidMount() {
        this.pegaChamados()        
    }

    pegaChamados(page = 1) {        
        ChamadoDataService.buscarTodos(page)
            .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do chamado e "info" com os dados das páginas
                const { docs, ...info } = response.data 
                this.setState({
                    chamados: docs,
                    info: info,
                    page: page
                })                
            })
            .catch(e => {
                console.log(e)
            })
    }

    ativaChamado(chamado, index) {
        this.setState({
            current: chamado,
            currentIndex: index
        })
    }

    estadoBuscaNome(e) {
        const buscaNome = e.target.value
        this.buscarNome()        
        this.setState({
            buscaNome: buscaNome            
        })
    }

    estadoBuscaChamado(e) {
        const buscaChamado = e.target.value
               
        this.setState({
            buscaChamado: buscaChamado,            
            buscaData: "",
            buscaStatus: "",
            buscaArea: ""
        })
        this.inputData.value = ""
        this.timerID = setTimeout(      
            () => this.buscarChamado(),1000
        ) 
    }

    estadoBuscaData(e) {
        const buscaData = e.target.value               
        this.setState({
            buscaData: buscaData,
            buscaChamado: "",            
            buscaStatus: "",
            buscaArea: ""
        })
        this.inputNum.value = ""
        this.timerID = setTimeout(      
            () => this.buscarData(),1000
        )
         
    }

    estadoBuscaArea(e) {
        const buscaArea = e.target.value        
        this.setState({
            buscaArea: buscaArea,
            buscaChamado: "",
            buscaData: "",
            buscaStatus: ""
        })
        this.inputData.value = ""
        this.inputNum.value = ""
        this.timerID = setTimeout(      
            () => this.buscarArea(),1000
        )
    }

    estadoBuscaStatus(e) {
        const buscaStatus = e.target.value       
        this.setState({
            buscaStatus: buscaStatus,
            buscaChamado: "",
            buscaData: "",
            buscaArea: ""
        })
        this.inputData.value = ""
        this.inputNum.value = ""
        this.timerID = setTimeout(      
            () => this.buscarStatus(),1000
        )
    }

    limpaCurrent() {
        this.setState({
            current: null,
            currentIndex: -1,
            selectedPage: null,
            buscaNome: "",
            buscaChamado: "",
            buscaSetor: "",
            buscaArea: "",
            buscaStatus: ""          
        })
    }

    buscarNome(page = 1) {
        ChamadoDataService.buscarNome(this.state.buscaNome, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    chamados: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
    }

    buscarChamado(page = 1) {
        ChamadoDataService.buscarChamado(this.state.buscaChamado, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                chamados: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    buscarData(page = 1) {
        ChamadoDataService.buscarData(this.state.buscaData, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    chamados: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
    }

    buscarArea(page = 1) {
        ChamadoDataService.buscarArea(this.state.buscaArea, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    chamados: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
    }

    buscarStatus(page = 1) {
        ChamadoDataService.buscarStatus(this.state.buscaStatus, page)
        .then(response => {
            const { docs, ...info } = response.data 
            this.setState({
                chamados: response.data.docs,
                info: info                                 
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    toggleFiltro() {
        this.setState(state=> ({
           mostraFiltro: !state.mostraFiltro
        }))

        if(this.state.mostraFiltro === true) {
            this.setState({
                className: 'show'
            })
        } else {
            this.setState({
                className: 'hidden'
            })
        }        
    }


    render() {

        const { chamados, current, currentUser, page, info, 
            className, buscaArea, buscaStatus} = this.state

        let i = 0
        let paginas = []
        for ( i = 1; i <= info.pages; i++ ) {
            paginas.push(
                <li className={"page-item " + (page === i ? "active" : "")} key={i}>
                    <span className="page-link" key={i} id={i} onClick={this.selecionaPagina} >
                        {i}
                    </span>
                </li>
            )            
        } 

     
        let mostrar = null
        if (current !== null) {
            mostrar =  <div className="autocomplete-items-active">
                {current.numchamado}{current.descricao}{current.status}{current.dt_abertura}
                {<Link to={`/chamados/${current.id}`} id="editar" className="autocomplete-items">Editar</Link>}
            </div>
        } 

        let filtro = null
        if (chamados) {
            filtro = chamados.filter((item) => {
                return item.username === currentUser.username
            })   
                 
            mostrar = 
            <div className="list-group" style={{width: 100+'%'}}>
                <table style={{width: 100+'%'}}>
                    <tbody>
                        <tr>
                            <th style={{width: 5+'%', textAlign: 'center'}}> Número </th>                                                        
                            <th style={{width: 45+'%'}}> Descrição </th>
                            <th style={{width: 15+'%'}}> Área </th>
                            <th style={{width: 5+'%'}}> Data </th>
                            <th style={{width: 5+'%'}}> Status </th>
                            <th style={{width: 8+'%', textAlign: 'center'}}> Ações </th>                            
                        </tr>
                        {filtro.map((chamado, index) => {
                            if (chamado.status === "Pendente") { 
                                if ((momentjs(new Date()).format()) > (momentjs(moment(chamado.dt_abertura).businessAdd(3)._d).format())  ) { 
                                    return ( <tr key={index}>
                                        <td style={{textAlign: 'center', backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.numchamado}</td>                                                                
                                        <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.descricao}</td>
                                        <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.area}</td>
                                        <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                                        <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.status}</td>
                                        <td style={{textAlign: 'center'}}>
                                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                                {<Link to={`/chamados/visualizar/${chamado.id}`} aria-label={"Visualizar"} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="view"> <FaEye /> </Link>}
                                                {<Link to={`/chamados/editar/${chamado.id}`} aria-label={"Editar"} id="edit" style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}}> <FaEdit /> </Link>}
                                            </IconContext.Provider>
                                        </td>                                
                                    </tr> 
                                    )
                                } else {
                                    return ( <tr key={index}>
                                        <td style={{textAlign: 'center'}}>{chamado.numchamado}</td>                                                                
                                        <td>{chamado.descricao}</td>
                                        <td>{chamado.area}</td>
                                        <td>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                                        <td>{chamado.status}</td>
                                        <td style={{textAlign: 'center'}}>
                                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                                {<Link to={`/chamados/visualizar/${chamado.id}`} aria-label={"Visualizar"} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="view"> <FaEye /> </Link>}
                                                {<Link to={`/chamados/editar/${chamado.id}`} aria-label={"Editar"} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="edit"> <FaEdit /> </Link>}
                                            </IconContext.Provider>
                                        </td>                                
                                    </tr> 
                                    )
                                }
                            }

                            if(chamado.status === "Agendado") {
                                if ((momentjs(new Date()).format()) > (momentjs(moment(chamado.dt_previsao).businessAdd(1)._d).format())  ) {                                    
                                    return ( <tr key={index}>
                                        <td style={{textAlign: 'center', backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.numchamado}</td>                                                                
                                        <td style={{textAlign: 'center', backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.descricao}</td>
                                        <td style={{textAlign: 'center', backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.area}</td>
                                        <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                                    <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.status}-{momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}</td>
                                        <td style={{textAlign: 'center'}}>
                                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                                {<Link to={`/chamados/visualizar/${chamado.id}`} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} aria-label={"Visualizar"} id="view"> <FaEye /> </Link>}
                                                {<Link to={`/chamados/editar/${chamado.id}`} id="edit" aria-label={"Editar"} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}}> <FaEdit /> </Link>}
                                            </IconContext.Provider>
                                        </td>                                
                                    </tr> 
                                    )
                                } else {
                                    return ( <tr key={index}>
                                        <td style={{textAlign: 'center'}}>{chamado.numchamado}</td>                                                                
                                        <td>{chamado.descricao}</td>
                                        <td>{chamado.area}</td>
                                        <td>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                                        <td>{chamado.status}-{momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}</td>
                                        <td style={{textAlign: 'center'}}>
                                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                                {<Link to={`/chamados/visualizar/${chamado.id}`} aria-label={"Visualizar"} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="view"> <FaEye /> </Link>}
                                                {<Link to={`/chamados/editar/${chamado.id}`} aria-label={"Editar"} id="edit" style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}}> <FaEdit /> </Link>}
                                            </IconContext.Provider>
                                        </td>                                
                                    </tr> 
                                    )
                                }
                            }

                            if (chamado.status === "Finalizado") {
                                return ( <tr key={index}>
                                    <td style={{textAlign: 'center'}}>{chamado.numchamado}</td>                                                                
                                    <td>{chamado.descricao}</td>
                                    <td>{chamado.area}</td>
                                    <td>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                                    <td>{chamado.status}</td>
                                    <td style={{textAlign: 'center'}}>
                                        <IconContext.Provider value={{ size: "1.9em", className: "global-class-name" }}>
                                            {<Link to={`/chamados/visualizar/${chamado.id}`} aria-label={"Visualizar"} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="view"> <FaCheckCircle /> </Link>}
                                            {<Link to={`/chamados/reabrir/${chamado.id}`} aria-label={"Reabrir"} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="edit"> <FaRedo /> </Link>}
                                        </IconContext.Provider>
                                    </td>                                
                                </tr> 
                                )
                            }

                            if (chamado.status === "Reaberto") {
                                return ( <tr key={index}>
                                    <td style={{textAlign: 'center'}}>{chamado.numchamado}</td>                                                                
                                    <td>{chamado.descricao}</td>
                                    <td>{chamado.area}</td>
                                    <td>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                                    <td>{chamado.status}</td>
                                    <td style={{textAlign: 'center'}}>
                                        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                            {<Link to={`/chamados/visualizar/${chamado.id}`} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="view"> <FaCheckCircle /> </Link>}
                                            {/*<Link to={`/chamados/reabrir/${chamado.id}`}  id="edit"> <FaRedo /> </Link>*/}
                                        </IconContext.Provider>
                                    </td>                                
                                </tr> 
                                )
                            }

                            if (chamado.status !== "Pendente" && chamado.status !== "Agendado" && chamado.status !== "Finalizado" && chamado.status !== "Reaberto") { 
                                return ( <tr key={index}>
                                    <td style={{textAlign: 'center'}}>{chamado.numchamado}</td>                                                                
                                    <td>{chamado.descricao}</td>
                                    <td>{chamado.area}</td>
                                    <td>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                                    <td>{chamado.status}</td>
                                    <td style={{textAlign: 'center'}}>
                                        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                            {<Link to={`/chamados/visualizar/${chamado.id}`} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="view"> <FaEye /> </Link>}
                                            {<Link to={`/chamados/editar/${chamado.id}`} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="edit"> <FaEdit /> </Link>}
                                        </IconContext.Provider>
                                    </td>                                
                                </tr> 
                                )
                            }
                        })}
                </tbody>
            </table>
            </div>
        }

       
        return(
            <div>
                <h1>
                    Lista de chamados
                </h1>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{
                        backgroundColor: '#339b44', 
                        borderRadius: 15+'px', 
                        width: 190+'px', 
                        height: 30+'px', 
                        marginTop: 10+'px'
                        }}>
                        <Link to={`/chamados/adicionar`} 
                            style={{
                                color: '#f2f2f2', 
                                fontSize: 24+'px', 
                                marginLeft: 10+'px', 
                                textDecoration: 'none',     
                                marginTop: -4+'px',
                                padding:0
                            }} 
                            className="actions" >
                            Novo Chamado
                        </Link>                            
                    </div>
                    <div>
                        <button type="button" onClick={this.toggleFiltro} className="btn btn-info">
                            {this.state.mostraFiltro ?  'Filtros': 'Esconder' }
                        </button>
                    </div>
                </div>
                <div className={className} >
                    <div className="form-group" style={{display: 'flex', justifyContent: 'space-around', marginTop: 15+'px'}}>
                        <input type="number" min="1" className="form-control" placeholder="Busque pelo número" ref={el => this.inputNum = el} onChange={this.estadoBuscaChamado} onKeyUp={this.buscarChamado}/>
                        <input type="date" className="form-control" placeholder="Busque pela Data" ref={el => this.inputData = el} onChange={this.estadoBuscaData} onKeyUp={this.buscarData} />
                        <select 
                            className="form-control" 
                            id="area" 
                            name="area"                        
                            value={buscaArea}                                    
                            onChange={this.estadoBuscaArea} >                    
                            <option value="">Filtre por área</option>
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
                        <select 
                            className="form-control" 
                            id="status" 
                            name="status"                        
                            value={buscaStatus}                                    
                            onChange={this.estadoBuscaStatus}  > 
                            <option value="">Filtre por status</option>                                
                            <option value="Pendente"> Pendente </option>
                            <option value="Em análise"> Em análise </option>  
                            <option value="Aprovação Glauber"> Aprovação Glauber </option>  
                            <option value="Agendado"> Agendado </option>  
                            <option value="Em atendimento"> Em atendimento  </option> 
                            <option value="Finalizado"> Finalizado </option>                                
                            <option value="Cancelado"> Cancelado </option>
                            <option value="Aguardando Fornecedor"> Aguardando Fornecedor </option>
                        </select>
                    </div>       
                </div>     
                {mostrar}
            </div>
        )
    }
}