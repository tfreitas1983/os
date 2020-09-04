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

        this.state = {
            chamados: [],
            pendentes: "",
            atrasados: "",
            finalizados: "",
            info: {}
        }
    }

    componentDidMount() {
        this.timerID = setInterval(      
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

        if (pendentes && agendados) {

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
        }
    }

    render () {

        const {pendentes, finalizados, atrasados, info} = this.state   

        return (
            <div style={{marginTop: 10+'%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
               {/* <h1> Estatísticas </h1> */}
                <div className="caixa">
                <img src={imgchamados} alt="Chamados" className="resumo"/>
                    <article>                        
                        <h2 style={{textAlign: 'center', marginTop: 3+'%'}}>Total</h2>
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
        )
    }
}