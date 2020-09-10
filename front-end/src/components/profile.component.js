import React, { Component } from "react"
import AuthService from "../services/auth.service"
import ChamadoDataService from "../services/chamado.service"
import * as momentjs from 'moment'
import moment from "moment-business-days"
import imgchamados from "../images/chamados.jpg"
import esperando from "../images/esperando.jpg"
import feito from "../images/feito.png"
import relogio from "../images/relogio.gif"

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.handleAlterar = this.handleAlterar.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleNewPassword = this.handleNewPassword.bind(this)
    this.handleSalvar = this.handleSalvar.bind(this)

    this.pegaChamados = this.pegaChamados.bind(this)
    this.intervalo = this.intervalo.bind(this)
    this.totalGeral = this.totalGeral.bind(this)
    this.totalPendentes = this.totalPendentes.bind(this)
    this.totalFinalizados = this.totalFinalizados.bind(this)
    this.totalAtrasados = this.totalAtrasados.bind(this)

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      alterar: false,
      mostraAlterar: true,
      password: "",
      newpassword: "",      
      loading: false,
      message: "",
      chamados: [],
      total: "",
      pendentes: "",
      atrasados: "",
      finalizados: "",
      info: {}
    }
  }

  componentDidMount() {
    this.pegaChamados()
    this.timerID = setInterval(      
      () => this.intervalo(),1000
    )
                 
  } 

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return
    }
  
  }
  intervalo(){
    this.totalGeral()
    this.totalPendentes()
    this.totalFinalizados()
    this.totalAtrasados()

    /*
     this.timerID = setInterval(      
      () => this.totalGeral(),1000
    )
    this.timerID = setInterval(      
        () => this.totalPendentes(),1000
    ) 
    this.timerID = setInterval(      
        () => this.totalFinalizados(),1000
    ) 
    this.timerID = setInterval(      
        () => this.totalAtrasados(),1000
    ) */   
  }

  handlePassword(e) {
      this.setState({
        password: e.target.value
      })
  }  

  handleNewPassword(e) {
    this.setState({
      newpassword: e.target.value
    })
  }  

  handleAlterar() {
    this.setState(state=> ({
      mostraAlterar: !state.mostraAlterar
   }))

   if(this.state.mostraAlterar === true) {
       this.setState({
           alterar: true
       })
   } else {
       this.setState({
           alterar: false
       })
   }     
  }

  handleSalvar() {
    AuthService.changePassword(this.state.currentUser.username, this.state.password).then(
      () => {
        this.props.history.push("/profile");
        window.location.reload();
      },
      
        alert("Senha alterada com sucesso!")
      
      ,
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
      }
    );
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

  totalGeral() {
    const total = (this.state.chamados).filter((item) => {
      return (this.state.currentUser.username === item.username)
    })
     this.setState({
        total: total.length
    })
  }

  totalPendentes () {
      const pendentes = (this.state.chamados).filter((item) => {
          return (item.status === "Pendente" && this.state.currentUser.username === item.username)
      })
      this.setState({
          pendentes: pendentes.length
      })
  }

  totalFinalizados () {
      const finalizados = (this.state.chamados).filter((item) => {
          return (item.status === "Finalizado" && this.state.currentUser.username === item.username)
      })
      this.setState({
          finalizados: finalizados.length
      })
  }

  totalAtrasados() {
      const pendentes = (this.state.chamados).filter((item) => {
          return (item.status === "Pendente" && this.state.currentUser.username === item.username)
      })

      const agendados = (this.state.chamados).filter((item) => {
          return (item.status === "Agendado" && this.state.currentUser.username === item.username)
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
    

  render() {

    const { alterar, password, newpassword, pendentes, finalizados, atrasados, total } = this.state

    let mostrar = null
    let divergente = null
    
    if (alterar === true) {
      mostrar = <div>
         <span style={{margin: 0, fontSize: 32+'px'}}> Nova Senha </span>
        <div className="form-group" style={{display: 'flex', padding: 0, margin: 0}}>
          <input type="password" className="form-control" placeholder="Digite a nova senha" onChange={this.handlePassword} style={{margin: 1+'%'}}/>
          <input type="password" className="form-control" placeholder="Repita a nova senha" onChange={this.handleNewPassword} style={{margin: 1+'%'}}/>
          <button className="btn btn-success" onClick={this.handleSalvar} style={{margin: 1+'%', width:10+'%'}}>
            Alterar
          </button>
        </div>
        {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
      </div>
    }

    if (alterar === true && newpassword !== "" && (newpassword !== password) ) {
      divergente = <div>
        <div className="alert alert-danger">
          Senha digitada não confere!
        </div>
      </div>
    }


   

    return (
      <div style={{margin:1+'%'}}>
        <div className="container">
          <form>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button type="button" className="btn btn-info" onClick={this.handleAlterar} style={{width: 15+"%"}}>
              Trocar senha  
            </button> 
            </div>
            {mostrar}
            {divergente}
            
          </form>
          <span style={{margin: 0, fontSize: 32+'px'}}> Estatísticas </span>
          <div style={{marginTop: 1+'%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
               
                <div className="caixa">
                <img src={imgchamados} alt="Chamados" className="resumo"/>
                    <article>                        
                        <h2 style={{textAlign: 'center', marginTop: 3+'%'}}>Total</h2>
                        <h2 style={{textAlign: 'center'}}>{total}</h2>
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
        </div>
      </div>
    )
  }
}