import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ChamadoDataService from "../services/chamado.service"
import * as moment from 'moment'

export default class ChamadosLista extends Component {
    constructor(props) {
        super(props)

        this.pegaChamados = this.pegaChamados.bind(this)



        this.state = {
            chamados: [],
            info: {},
            page: 1,
            current: null,
            currentIndex: -1,
            selectedPage: null,
            buscaNome: ""
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
            currentMembro: chamado,
            currentIndex: index
        })
    }


    render() {

        const { chamados, current, currentIndex, page, info} = this.state

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

        if (current === null) {            
            mostrar = 
            <div className="list-group">
                <table>
                    <tr>
                        <th>Número</th>
                        <th>Unidade</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Data</th>
                        <th>Visualizar</th>
                        <th>Status</th>
                    </tr>
           { chamados && chamados.map((chamado, index) => (
                 <tr>
                    <td>{chamado.numchamado}</td>
                    <td>{chamado.unidade}</td>
                    <td>{chamado.nome}</td>
                    <td>{chamado.descricao}</td>
                    <td>{moment(chamado.dt_abertura).format('DD/MM/YYYY')}</td>
                    <td>{<Link to={`/chamados/${chamado.id}`} id="view" className="autocomplete-items">Visualizar</Link>}</td>
                    <td>{chamado.status}</td>
                 </tr>                
            ))}
            </table>
            </div>
        }

        return(
            <div>
                <h1>
                    Lista de chamados
                    <div>
                        <Link to={`/chamados/adicionar`} className="actions">Novo Chamado</Link>
                    </div>
                </h1>
                {mostrar}
            </div>
        )
    }



}