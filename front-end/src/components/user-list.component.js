import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthService from "../services/auth.service"
import {FaEdit, FaEye} from 'react-icons/fa'
import { IconContext } from "react-icons"

export default class ListarUsuario extends Component {
    constructor(props) {
        super(props)
        this.pegaUsuarios = this.pegaUsuarios.bind(this)

        this.state = {
            usuarios: []
        }
    }

    componentDidMount() {
        this.pegaUsuarios()
    }

    pegaUsuarios() {
        AuthService.buscarTodos()        
        .then(response => {
            const usuarios = response.data
            this.setState({
                usuarios: usuarios
            })                
        })
        .catch(e => {
            console.log(e)
        })   
    }


    render () {

        const {usuarios} = this.state

        let mostrar = null
        mostrar = <div className="list-group" style={{width: 100+'%'}}>
            <table style={{width: 100+'%'}}>
                <tbody>
                    <tr>
                        <th style={{width: 5+'%', textAlign: 'center'}}> Usuário </th>                                                        
                        <th style={{width: 15+'%'}}> Nome </th>
                        <th style={{width: 15+'%'}}> E-mail </th>
                        <th style={{width: 12+'%'}}> Unidade </th>
                        <th style={{width: 25+'%'}}> Área </th>
                        <th style={{width: 8+'%', textAlign: 'center'}}> Ações </th>                            
                    </tr>
                    {usuarios.map((usuario, index) => {            
                        return ( <tr key={index}>
                            <td style={{textAlign: 'center'}}>{usuario.username}</td>                                                                
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.unidade}</td>
                            <td>{usuario.area}</td>
                            <td style={{textAlign: 'center'}}>
                                <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                                    {<Link to={`/usuarios/visualizar/${usuario.id}`} aria-label={"Visualizar"} style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}} id="view"> <FaEye /> </Link>}
                                    {<Link to={`/usuarios/editar/${usuario.id}`} aria-label={"Editar"} id="edit" style={{textDecoration: 'none', backgroundColor:'#fefefe', color: '#2E8B57'}}> <FaEdit /> </Link>}
                                </IconContext.Provider>
                            </td>                                
                        </tr> 
                        )
                    })}
                </tbody>
            </table>
        </div>
        return (
            <div>
                <h1>Lista de usuários</h1>
                <Link to={"/register"} className="btn btn-success" >
                    Novo Usuário
                </Link>  
                {mostrar} 
            </div>
        )

    }
}