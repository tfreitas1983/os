import React, { Component } from 'react'
import ChamadoDataService from "../services/chamado.service"
import * as momentjs from 'moment'
import moment from "moment-business-days"
import imgchamados from "../images/chamados.jpg"
import esperando from "../images/esperando.jpg"
import feito from "../images/feito.png"
import relogio from "../images/relogio.gif"

export default class ResumeModerator extends Component {
    constructor(props) {
        super(props)
        this.pegaChamados = this.pegaChamados.bind(this)
        this.totalPendentes = this.totalPendentes.bind(this)
        this.totalFinalizados = this.totalFinalizados.bind(this)
        this.totalAtrasados = this.totalAtrasados.bind(this)
        this.totalTI = this.totalTI.bind(this)
        this.totalRH = this.totalRH.bind(this)
        this.totalTel = this.totalTel.bind(this)
        this.totalAr = this.totalAr.bind(this)
        this.totalCompras = this.totalCompras.bind(this)
        this.totalFinanceiro = this.totalFinanceiro.bind(this)
        this.totalGrafica = this.totalGrafica.bind(this)
        this.totalManutencao = this.totalManutencao.bind(this)
        this.totalAtendente = this.totalAtendente.bind(this)

        this.handlerDtAbertura = this.handlerDtAbertura.bind(this)
        this.handlerDtAberturaFim = this.handlerDtAberturaFim.bind(this)
        this.buscarPeriodo = this.buscarPeriodo.bind(this)
        this.stop = this.stop.bind(this)
        this.limpar = this.limpar.bind(this)

        this.state = {
            chamados: [],
            dt_abertura: "",
            dt_abertura_fim: "",
            pendentes: "",
            atrasados: "",
            finalizados: "",
            atendente: "",
            ti: "",
            rh: "",
            ar: "",
            tel: "",
            financeiro: "",
            compras: "",
            grafica: "",
            manutencao: "",
            info: {}
        }
    }

    componentDidMount() {
        this.timerpegaChamados = setInterval(      
            () => this.pegaChamados(),1000
        )  
        this.timerID = setInterval(      
            () => this.totalPendentes(),1000
        ) 
        this.timerID = setInterval(      
            () => this.totalFinalizados(),1000
        ) 
        this.timerID = setInterval(      
            () => this.totalAtrasados(),1000
        )   
        this.timerID = setInterval(      
            () => this.totalTI(),1000
        )  
        this.timerID = setInterval(      
            () => this.totalRH(),1000
        )   
        this.timerID = setInterval(      
            () => this.totalTel(),1000
        )  
        this.timerID = setInterval(      
            () => this.totalAr(),1000
        )     
        this.timerID = setInterval(      
            () => this.totalCompras(),1000
        )            
        this.timerID = setInterval(      
            () => this.totalFinanceiro(),1000
        ) 
        this.timerID = setInterval(      
            () => this.totalGrafica(),1000
        )   
        this.timerID = setInterval(      
            () => this.totalManutencao(),1000
        )  
        /*this.timerID = setTimeout(      
            () => this.totalAtendente(), 3000
        )*/
    }
  
    async pegaChamados(page = 1) {        
        await ChamadoDataService.buscarTodos(page)
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
            
            this.totalAtendente()
    }

    totalPendentes () {
        const pendentes = (this.state.chamados).filter((item) => {
            return item.status === "Pendente"
        })
        this.setState({
            pendentes: pendentes.length
        })
    }

    totalFinalizados () {
        const finalizados = (this.state.chamados).filter((item) => {
            return item.status === "Finalizado"
        })
        this.setState({
            finalizados: finalizados.length
        })
    }

    totalAtrasados() {
        const pendentes = (this.state.chamados).filter((item) => {
            return item.status === "Pendente"
        })

        const agendados = (this.state.chamados).filter((item) => {
            return item.status === "Agendado"
        })

        if (pendentes.length > 0 && agendados.length > 0) {

            if (pendentes.length > 0 || agendados.length > 0 ) {
                const atrasadosA = pendentes.filter((pendente) => {
                    return  ( (momentjs(new Date()).format()) > (momentjs(moment(pendente.dt_abertura).businessAdd(3)._d).format()) )
                })

                const atrasadosP = agendados.filter((agendado) => {
                    return ((momentjs(new Date()).format()) > (momentjs(moment(agendado.dt_previsao).businessAdd(1)._d).format()))     
                })               

                this.setState({
                    atrasados: atrasadosA.length + atrasadosP.length
                }) 
            }
        } else {
            this.setState({
                atrasados: 0
            }) 
        }
    }

    totalTI () {
        const ti = (this.state.chamados).filter((item) => {
            return item.area === "TI"
        })
        this.setState({
            ti: ti.length
        })
    }

    totalRH () {
        const rh = (this.state.chamados).filter((item) => {
            return item.area === "Recursos Humanos"
        })
        this.setState({
            rh: rh.length
        })
    }

    totalTel() {
        const tel = (this.state.chamados).filter((item) => {
            return item.area === "Alarme/CFTV/Rede/Telefonia"
        })
        this.setState({
            tel: tel.length
        })
    }

    totalAr() {
        const ar = (this.state.chamados).filter((item) => {
            return item.area === "Ar Condicionado"
        })
        this.setState({
            ar: ar.length
        })
    }

    totalCompras() {
        const compras = (this.state.chamados).filter((item) => {
            return item.area === "Compras"
        })
        this.setState({
            compras: compras.length
        })
    }
    
    totalFinanceiro() {
        const financeiro = (this.state.chamados).filter((item) => {
            return item.area === "Financeiro"
        })
        this.setState({
            financeiro: financeiro.length
        })
    }
    
    totalGrafica() {
        const grafica = (this.state.chamados).filter((item) => {
            return item.area === "Gráfica"
        })
        this.setState({
            grafica: grafica.length
        })
    }
    
    totalManutencao() {
        const manutencao = (this.state.chamados).filter((item) => {
            return item.area === "Manutenção"
        })
        this.setState({
            manutencao: manutencao.length
        })
    }

    async totalAtendente () {
        const atendente = (this.state.chamados).map((item) => {
            return item.responsavel
        })
        await this.setState({
            atendente: atendente
        })
    }

    handlerDtAbertura(e) {
        this.setState({
            dt_abertura: e.target.value
        })
    }

    handlerDtAberturaFim(e) {
        this.setState({
            dt_abertura_fim: e.target.value
        })
    }

    stop () {
        clearInterval(this.timerpegaChamados)
        clearInterval(this.timerID)
    }

    async buscarPeriodo (page = 1) {
        
        this.stop()
        await ChamadoDataService.buscarPeriodo(this.state.dt_abertura, this.state.dt_abertura_fim, page)
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

          this.totalAtendente()
    }

    limpar() {
        window.location.reload()
    }

    render () {

       const {pendentes, finalizados, atrasados, info, ti, rh, tel, ar, compras, financeiro, manutencao, grafica, atendente} = this.state 
    
       
       let claudio = "", ivan = "", thiago = "", max = "", yuri = "", maxyuri = "", claudioivan = ""

       if (atendente.length > 0) {
           claudio = atendente.filter(atd => atd === "Claudio").length
           ivan = atendente.filter(atd => atd === "Ivan").length
           thiago = atendente.filter(atd => atd === "Thiago").length
           max = atendente.filter(atd => atd === "Max").length
           yuri = atendente.filter(atd => atd === "Yuri").length
           maxyuri = atendente.filter(atd => atd === "Max / Yuri").length
           claudioivan = atendente.filter(atd => atd === "Claudio / Ivan").length
       }


        return (
            <div style={{marginTop: 2+'%'}}>                
                    <div className="row" style={{display: 'flex', justifyContent: 'space-around' }}>
                        <div className="col-md-4 form-group" style={{display: 'flex'}}>
                            <label htmlFor="Data Início" style={{marginRight: 5+'%'}}> Início</label>
                            <input type="date" className="form-control" onChange={this.handlerDtAbertura} ref={el => this.inputDataInicio = el} />
                        </div>
                        <div className="col-md-4 form-group"  style={{display: 'flex' }}>
                            <label htmlFor="Data Final" style={{marginRight: 5+'%'}}>Fim</label>
                            <input type="date" className="form-control" onChange={this.handlerDtAberturaFim} ref={el => this.inputDataFim = el} />
                        </div> 
                        <div className="col-md-2">
                            <button type="button" className="btn btn-danger" style={{marginRight: 5+'%'}} onClick={this.limpar}> Limpar </button>
                            <button type="button" className="btn btn-info" onClick={this.buscarPeriodo}>Filtrar</button>
                        </div>
                    </div>
                
                    
          
                <div style={{marginTop: 2+'%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>                
                    <div className="caixa">
                    <img src={imgchamados} alt="Chamados" className="resumo"/>
                        <article>                        
                            <h2 style={{textAlign: 'center', marginTop: 1+'%'}}>Total</h2>
                            <h2 style={{textAlign: 'center'}}>{info.total}</h2>
                        </article>
                    </div>
                    <div  className="caixa">
                        <img src={esperando} alt="Pendentes" className="resumo"/>
                        <article>
                            <h2  style={{textAlign: 'center'}}>Pendentes</h2>
                            <h2  style={{textAlign: 'center'}}>{pendentes}</h2>
                        </article>
                    </div>
                    <div  className="caixa">
                        <img src={feito} alt="Finalizado" className="resumo"/>
                        <article>
                            <h2  style={{textAlign: 'center'}}>Finalizados</h2>
                            <h2  style={{textAlign: 'center'}}>{finalizados}</h2>
                        </article>
                    </div>
                    <div  className="caixa">
                        <img src={relogio} alt="Finalizado" className="resumo"/>
                        <article>
                            <h2  style={{textAlign: 'center'}}>Atrasados</h2>
                            <h2  style={{textAlign: 'center'}}>{atrasados}</h2>
                        </article>
                    </div>                    
                </div>
                <div style={{display: 'flex', justifyContent: "center", marginTop:2+'%'}}>
                    <h2>Sintético por área</h2>
                </div>
                <div style={{marginTop: 2+'%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    
                    <div className="caixaArea">
                        <article>
                            <h3>Ar Condicionado</h3>
                            <h2>{ar}</h2>
                        </article>
                    </div>
                    <div className="caixaArea">
                        <article>
                            <h3>CFTV/Telefonia</h3>
                            <h2>{tel}</h2>
                        </article>
                    </div>
                    <div className="caixaArea">
                        <article>
                            <h3>Compras</h3>
                            <h2>{compras}</h2>
                        </article>
                    </div>
                    <div className="caixaArea">
                        <article>
                            <h3>Financeiro</h3>
                            <h2>{financeiro}</h2>
                        </article>
                    </div>
                    <div className="caixaArea">
                        <article>
                            <h3>Gráfica</h3>
                            <h2>{grafica}</h2>
                        </article>
                    </div>
                    <div className="caixaArea">
                        <article>
                            <h3>Manutenção</h3>
                            <h2>{manutencao}</h2>
                        </article>
                    </div>
                    <div className="caixaArea">
                        <article>
                            <h3>TI</h3>
                            <h2>{ti}</h2>
                        </article>
                    </div>
                    <div className="caixaArea">
                        <article>
                            <h3>RH</h3>
                            <h2>{rh}</h2>
                        </article>
                    </div>
                </div>
                
                <div style={{display: 'flex', justifyContent: "center", marginTop:2+'%'}}>
                    <h2>Sintético por atendente</h2>
                </div>

                <div style={{marginTop: 2+'%', marginBottom: 2+'%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <div className="caixaArea">
                        <h3> Claudio {claudio} </h3>
                    </div> 
                    <div className="caixaArea">
                        <h3> Ivan {ivan}  </h3>
                    </div>
                    <div className="caixaArea">
                        <h3> Thiago {thiago}  </h3>
                    </div>
                    <div className="caixaArea">
                        <h3> Max {max}  </h3>
                    </div>
                    <div className="caixaArea">
                        <h3> Yuri {yuri}  </h3>
                    </div>

                    <div className="caixaArea">
                        <h3> Max/Yuri {maxyuri}  </h3>
                    </div>

                    <div className="caixaArea">
                        <h3> Claudio/Ivan {claudioivan}  </h3>
                    </div>
                </div>

            </div>
        )
    }
}