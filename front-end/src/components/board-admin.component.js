import React, { Component } from "react"
import {Link} from 'react-router-dom'
import ChamadoDataService from "../services/chamado.service"
import AuthService from "../services/auth.service"
import * as momentjs from 'moment'
import moment from "moment-business-days"
import {FaSignInAlt, FaEye, FaRedo, FaCheckCircle} from 'react-icons/fa'
import { IconContext } from "react-icons"


export default class BoardAdmin extends Component {
  constructor(props) {
    super(props)
    this.pegaChamados = this.pegaChamados.bind(this)
    this.estadoBuscaNome = this.estadoBuscaNome.bind(this)
    this.estadoBuscaChamado = this.estadoBuscaChamado.bind(this)
    this.estadoBuscaData = this.estadoBuscaData.bind(this)
    this.estadoBuscaUnidade = this.estadoBuscaUnidade.bind(this)
    this.estadoBuscaStatus = this.estadoBuscaStatus.bind(this)
    this.estadoFinalizados = this.estadoFinalizados.bind(this)
    this.buscarNome = this.buscarNome.bind(this)
    this.buscarChamado = this.buscarChamado.bind(this)
    this.buscarData = this.buscarData.bind(this)
    this.buscarUnidade = this.buscarUnidade.bind(this)
    this.buscarStatus = this.buscarStatus.bind(this)
    this.toggleFiltro = this.toggleFiltro.bind(this)
    this.mostrarFinalizados = this.mostrarFinalizados.bind(this)


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
      buscaUnidade: "",
      buscaStatus: "",
      finalizados: true,
      mostraFiltro: true,
      toogleHidden: true,
      className: 'hidden'
    }
  }

  componentDidMount() {
    this.pegaChamados() 

    this.mostrarFinalizados()
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
    const buscaNome = e.target.value.replace(/\d+/g, "")
    this.inputNome.value = this.inputNome.value.replace(/\d+/g, "")
    this.setState({
        buscaNome: buscaNome, 
        buscaChamado : "",           
        buscaData: "",
        buscaStatus: "",
        buscaArea: "",
        buscaUnidade: ""
        })
        this.inputData.value = ""
        this.inputNum.value = ""
        this.timerID = setTimeout(      
            () => this.buscarNome(),1000
        )        
  }

  estadoBuscaChamado(e) {
      const buscaChamado = e.target.value
      this.setState({
          buscaChamado: buscaChamado,
          buscaNome : "",           
          buscaData: "",
          buscaStatus: "",
          buscaArea: "",
          buscaUnidade: ""
          })
          this.inputData.value = ""
          this.inputNome.value = ""
          this.timerID = setTimeout(      
              () => this.buscarChamado(),1000
          )
  }

  estadoBuscaData(e) {
      const buscaData = e.target.value
      this.setState({
          buscaData: buscaData,
          buscaChamado : "",           
          buscaNome: "",
          buscaStatus: "",
          buscaArea: "",
          buscaUnidade: ""
        })
        this.inputNome.value = ""
        this.inputNum.value = ""
        this.timerID = setTimeout(      
            () => this.buscarData(),1000
        )
      
  }

  estadoBuscaUnidade(e) {
      const buscaUnidade = e.target.value      
      this.setState({
          buscaUnidade: buscaUnidade,
          buscaChamado : "",           
          buscaData: "",
          buscaStatus: "",
          buscaArea: "",
          buscaNome: ""
        })
        this.inputData.value = ""
        this.inputNum.value = ""
        this.inputNome.value = ""
        this.timerID = setTimeout(      
            () => this.buscarUnidade(),1000
        )       
  }

  estadoBuscaStatus(e) {
      const buscaStatus = e.target.value     
      this.setState({
          buscaStatus: buscaStatus,
          buscaChamado : "",           
          buscaData: "",
          buscaUnidade: "",
          buscaArea: "",
          buscaNome: ""
        })
        this.inputData.value = ""
        this.inputNum.value = ""
        this.inputNome.value = ""
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

  buscarUnidade(page = 1) {
      ChamadoDataService.buscarUnidade(this.state.buscaUnidade, page)
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

  estadoFinalizados(e) {
    this.setState({
        finalizados: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    })
  }

  mostrarFinalizados() {
    this.setState(state=> ({
        toogleHidden: !state.toogleHidden
      }))
    
    if(this.state.finalizados === true) {
        this.setState({
            toogleHidden: 'false'
        })
    } else {
        this.setState({
            toogleHidden: 'true'
        })
    }  

  }

  render() {
    const { chamados, current, currentUser, page, info, className, buscaUnidade, buscaStatus, finalizados} = this.state

    let i = 0, quantPend = [], quantAg = [], quantAp = [], quantAn = [], quantAt = [], quantForn = [], quantFin = [], quantCanc = [], quantReab = []
    let paginas = [], mostrar = null, filtro = null
    for ( i = 1; i <= info.pages; i++ ) {
      paginas.push(
          <li className={"page-item " + (page === i ? "active" : "")} key={i}>
              <span className="page-link" key={i} id={i} onClick={this.selecionaPagina} >
                  {i}
              </span>
          </li>
      )            
    } 
    
    if (current !== null) {
        mostrar =  <div className="autocomplete-items-active">
            {current.numchamado}{current.descricao}{current.status}{current.dt_abertura}
            {<Link to={`/chamados/${current.id}`} id="editar" className="autocomplete-items">Editar</Link>}
        </div>
    }


    if (chamados) {      
      filtro = chamados.filter((item) => {
          return (item.area === currentUser.area[0] || item.area === currentUser.area[1] || item.area === currentUser.area[2]  || item.area === currentUser.area[3] || item.area === currentUser.area[4])
      })        
           
      mostrar = 
      <div>
        
        <div className="list-group">
        <table style={{marginBottom: 3+'%'}}>
          <tbody>
            <tr>
              <th style={{width: 5+'%', textAlign: 'center'}}>#</th>
              <th style={{width: 12+'%'}}>Unidade</th>
              <th style={{width: 15+'%'}}>Nome</th>
              <th style={{width: 25+'%'}}>Descrição</th>
              <th style={{width: 20+'%'}}>Área</th>
              <th style={{width: 10+'%'}}>Data</th>
              <th style={{width: 15+'%'}}>Status</th>
              <th style={{width: 7+'%', textAlign: 'center'}}>Ações</th>                    
            </tr>
            {filtro.map((chamado, index) => {
                if (chamado.status === "Pendente") { 
                    if ((momentjs(new Date()).format()) > (momentjs(moment(chamado.dt_abertura).businessAdd(3)._d).format())  ) { 
                        
                        return ( 
                        <tr key={index} style={{height: 1+'%'}}>
                            <td style={{textAlign: 'center', backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.numchamado}</td>  
                            <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.unidade}</td>                                                              
                            <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.nome}</td>                                                              
                            <td style={{backgroundColor: '#FF3F3F', color: '#fff', maxHeight: 2+'%'}}>{chamado.descricao}</td>
                            <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.area}</td>
                            <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                            <td style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.status}</td>
                            <td>
                                <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                    {<Link to={`/chamados/view-atendente/${chamado.id}`} id="view" aria-label={"Visualizar"} style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57', textDecoration: 'none' }}> <FaEye /> </Link>}
                                    {<Link to={`/chamados/atender/${chamado.id}`} id="edit"  aria-label={"Atender"}style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57' }}> <FaSignInAlt /> </Link>}
                                </IconContext.Provider>
                            </td>                                
                        </tr> 
                        )
                    }
                }

                if(chamado.status === "Agendado") {
                    if ((momentjs(new Date()).format()) > (momentjs(moment(chamado.dt_previsao).businessAdd(1)._d).format())  ) { 
                    
                        return ( <tr key={index}>
                            <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}  style={{textAlign: 'center', backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.numchamado}</td>  
                            <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}  style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.unidade}</td>                                                              
                            <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}  style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.nome}</td>                                                              
                            <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}  style={{backgroundColor: '#FF3F3F', color: '#fff', maxHeight: 2+'%'}}>{chamado.descricao}</td>
                            <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}  style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.area}</td>
                            <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}  style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                            <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}  style={{backgroundColor: '#FF3F3F', color: '#fff'}}>{chamado.status}</td>
                            <td style={{textAlign: 'center'}}>
                                <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                    {<Link to={`/chamados/view-atendente/${chamado.id}`} aria-label={"Visualizar"} id="view" style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57', textDecoration: 'none' }}> <FaEye /> </Link>}
                                    {<Link to={`/chamados/atender/${chamado.id}`} id="edit" aria-label={"Atender"} style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57' }}> <FaSignInAlt /> </Link>}
                                </IconContext.Provider>
                            </td>                                
                        </tr> 
                        )
                    }
                }

            })}

            {filtro.map((chamado, index) => {
                if (chamado.status === "Pendente") { 
                    if ((momentjs(new Date()).format()) > (momentjs(moment(chamado.dt_abertura).businessAdd(3)._d).format())  ) { 
                        return null
                    } else {
                        return ( 
                            <tr key={index} style={{height: 1+'%'}}>
                                <td style={{textAlign: 'center'}}>{chamado.numchamado}</td>  
                                <td>{chamado.unidade}</td>                                                              
                                <td>{chamado.nome}</td>                                                              
                                <td style={{maxHeight: 2+'%'}}>{chamado.descricao}</td>
                                <td>{chamado.area}</td>
                                <td>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                                <td>{chamado.status}</td>
                                <td style={{textAlign: 'center'}}>
                                    <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                        {<Link to={`/chamados/view-atendente/${chamado.id}`} id="view" aria-label={"Visualizar"} style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57', textDecoration: 'none' }}> <FaEye /> </Link>}
                                        {<Link to={`/chamados/atender/${chamado.id}`} id="edit" aria-label={"Atender"} style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57' }}> <FaSignInAlt /> </Link>}
                                    </IconContext.Provider>
                                </td>                                
                            </tr> 
                        )  
                    }                
                }

                if(chamado.status === "Agendado") {
                    if ((momentjs(new Date()).format()) > (momentjs(moment(chamado.dt_previsao).businessAdd(1)._d).format())  ) { 
                        return null
                    } else {
                    
                    return ( 
                        <tr key={index}>
                        <td style={{textAlign: 'center'}}>{chamado.numchamado}</td>  
                        <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}>{chamado.unidade}</td>                                                              
                        <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}>{chamado.nome}</td>                                                              
                        <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')} style={{maxHeight: 2+'%'}}>{chamado.descricao}</td>
                        <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}>{chamado.area}</td>
                        <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                        <td aria-label={momentjs(chamado.dt_previsao).format('DD/MM/YYYY')}>{chamado.status}</td>
                        <td style={{textAlign: 'center'}}>
                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                {<Link to={`/chamados/view-atendente/${chamado.id}`} id="view" aria-label={"Visualizar"} style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57', textDecoration: 'none' }}> <FaEye /> </Link>}
                                {<Link to={`/chamados/atender/${chamado.id}`} id="edit" aria-label={"Atender"} style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57' }}> <FaSignInAlt /> </Link>}
                            </IconContext.Provider>
                        </td>                                
                    </tr> 
                    )}                    
                }

                if (chamado.status === "Finalizado"  || chamado.status === "Cancelado") {
                    return ( <tr key={index} hidden={finalizados}>
                        <td style={{textAlign: 'center'}}>{chamado.numchamado}</td>  
                            <td>{chamado.unidade}</td>                                                              
                            <td>{chamado.nome}</td>                                                              
                            <td style={{maxHeight: 2+'%'}}>{chamado.descricao}</td>
                            <td>{chamado.area}</td>
                        <td>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                        <td>{chamado.status}</td>
                        <td style={{textAlign: 'center' }}>
                            <IconContext.Provider value={{ size: "1.5em", className: "global-class-name" }}>
                                {<Link to={`/chamados/view-atendente/${chamado.id}`} 
                                id="view"
                                aria-label={"Visualizar"}
                                style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57', textDecoration: 'none' }} > 
                                    <FaCheckCircle /> 
                                </Link>}
                                {/*<Link to={`/chamados/reabrir/${chamado.id}`} id="edit"> <FaSmile /> </Link>*/}
                            </IconContext.Provider>
                        </td>                                
                    </tr> 
                    )
                }

                if (chamado.status === "Reaberto") {
                    return ( <tr key={index}>
                        <td style={{textAlign: 'center', backgroundColor: '#FFBF00', color: '#000'}}>{chamado.numchamado}</td>  
                        <td style={{backgroundColor: '#FFBF00', color: '#000'}} >{chamado.unidade}</td>                                                              
                        <td style={{backgroundColor: '#FFBF00', color: '#000'}} >{chamado.nome}</td>                                                              
                        <td style={{ backgroundColor: '#FFBF00', color: '#000'}}>{chamado.descricao}</td>
                        <td style={{ backgroundColor: '#FFBF00', color: '#000'}} >{chamado.area}</td>
                        <td style={{textAlign: 'center', backgroundColor: '#FFBF00', color: '#000'}} >{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                        <td style={{backgroundColor: '#FFBF00', color: '#000'}} >{chamado.status}</td>
                        <td style={{textAlign: 'center'}}>
                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                {<Link to={`/chamados/view-atendente/${chamado.id}`} id="view" aria-label={"Visualizar"} style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57', textDecoration: 'none' }}> <FaEye /> </Link>}
                                {<Link to={`/chamados/atender/${chamado.id}`} aria-label={"Atender"} id="edit" style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57', textDecoration: 'none' }}> <FaRedo /> </Link>}
                            </IconContext.Provider>
                        </td>                                
                    </tr> 
                    )
                } else { 
                    return ( <tr key={index}>
                        <td style={{textAlign: 'center'}}>{chamado.numchamado}</td>  
                        <td>{chamado.unidade}</td>                                                              
                        <td>{chamado.nome}</td>                                                              
                        <td style={{maxHeight: 2+'%'}}>{chamado.descricao}</td>
                        <td>{chamado.area}</td>
                        <td>{momentjs(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                        <td>{chamado.status}</td>
                        <td style={{textAlign: 'center'}}>
                            <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                {<Link to={`/chamados/view-atendente/${chamado.id}`} id="view" aria-label={"Visualizar"} style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57', textDecoration: 'none' }}> <FaEye /> </Link>}
                                {<Link to={`/chamados/atender/${chamado.id}`} id="edit" aria-label={"Atender"} style={{textAlign: 'center', backgroundColor:'#fefefe', color: '#2E8B57' }}> <FaSignInAlt /> </Link>}
                            </IconContext.Provider>
                        </td>                                
                    </tr> 
                    )
                }
            })}
          </tbody>
        </table>
        </div>
      </div>
    }

    quantPend = filtro.filter((item => {
        if (item.status === "Pendente") {
            return  item.status
        }
    }))

    quantAg = filtro.filter((item => {
        if (item.status === "Agendado") {
            return  item.status
        }
    }))

    quantAt = filtro.filter((item => {
        if (item.status === "Em atendimento") {
            return  item.status
        }
    }))

    quantAp = filtro.filter((item => {
        if (item.status === "Aprovação Glauber") {
            return  item.status
        }
    }))

    quantAn = filtro.filter((item => {
        if (item.status === "Em análise") {
            return  item.status
        }
    }))

    quantForn = filtro.filter((item => {
        if (item.status === "Aguardando Fornecedor") {
            return  item.status
        }
    }))

    quantFin = filtro.filter((item => {
        if (item.status === "Finalizado") {
            return  item.status
        }
    }))

    quantCanc = filtro.filter((item => {
        if (item.status === "Cancelado") {
            return  item.status
        }
    }))

    quantReab = filtro.filter((item => {
        if (item.status === "Reaberto") {
            return  item.status
        }
    }))

    

    
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10+'px'}}>
          <h1> Chamados a atender </h1>
          <div>
            <div style={{
                backgroundColor: '#339b44', 
                borderRadius: 15+'px', 
                width: 102+'%', 
                height: 40+'%', 
                marginTop: 10+'px',
                marginBottom: 5+'%',
                padding:0
                }}>
                <Link to={`/chamados/addterceiros`} 
                    style={{
                        color: '#f2f2f2', 
                        fontSize: 24+'px', 
                        marginLeft: 10+'px', 
                        textDecoration: 'none',     
                        marginTop: -4+'px',
                        padding:0
                    }} 
                    className="actions" >
                    Chamado para terceiros
                </Link>                            
            </div>
            <button type="button" onClick={this.toggleFiltro} className="btn btn-info">
                {this.state.mostraFiltro ?  'Filtros': 'Esconder' }
            </button>
          </div>
        </div>      
        <div className={className}>
          <div className="form-group" style={{display: 'flex', justifyContent: 'space-around', marginTop: 15+'px'}}>
              <input type="number" min="1" className="form-control" placeholder="Busque pelo número" onChange={this.estadoBuscaChamado} onKeyUp={this.buscarChamado} ref={el => this.inputNum = el}/>
              <input type="text" className="form-control" placeholder="Busque pelo nome" onChange={this.estadoBuscaNome} onKeyUp={this.buscarNome} ref={el => this.inputNome = el}/>
              <input type="date" className="form-control" placeholder="Busque pela Data" onChange={this.estadoBuscaData} ref={el => this.inputData = el} onKeyUp={this.buscarData} />
              <select 
                  className="form-control" 
                  id="unidade" 
                  name="unidade"                        
                  value={buscaUnidade}                                    
                  onChange={this.estadoBuscaUnidade}
                  ref={el => this.inputUnidade = el} >                              
                  <option value="" disabled> --- Selecione a unidade --- </option>
                  <option value="Caxias">Caxias</option>  
                  <option value="Nilópolis">Nilópolis</option> 
                  <option value="Nova Iguaçu"> Nova Iguaçu </option>
                  <option value="Queimados"> Queimados </option>
                  <option value="Rio de Janeiro"> Rio de Janeiro </option>
                  <option value="Vilar dos Teles">Vilar dos Teles</option>
                  <option value="CDRio Nova Iguaçu"> CDRio Nova Iguaçu </option>
                  <option value="CDRio São Gonçalo"> CDRio São Gonçalo </option>
              </select>
              <select 
                  className="form-control" 
                  id="status" 
                  name="status"                        
                  value={buscaStatus}                                    
                  onChange={this.estadoBuscaStatus} > 
                  <option value="" disabled> --- Filtre por status --- </option>                                
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
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               <pre> {quantPend.length} Pendentes | {quantAg.length} Agendados | {quantAt.length} Em atendimento | {quantAp.length} ag. Aprovação | {quantAn.length} Em análise 
                | {quantForn.length} ag. Fornecedor | {quantReab.length} Reabertos | {quantCanc.length} Cancelados | {quantFin.length} Finalizados </pre>
               
            </div>
            <label className="form-check-label"  style={{marginLeft: 3+'%',marginRight: 3+'%'}}>
              <input className="form-check-input" type="checkbox" checked={finalizados === true } onChange={this.estadoFinalizados}  /> Oculta finalizados?
            </label>
          {mostrar} 
        </div> 
      </div>
    )
  }
}