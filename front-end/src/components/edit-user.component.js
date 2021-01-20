import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthService from "../services/auth.service"
import {FaEdit, FaEye} from 'react-icons/fa'
import { IconContext } from "react-icons"

export default class EditarUsuario extends Component {
    constructor(props) {
        super(props)
        this.pegaUsuario = this.pegaUsuario.bind(this)
        this.handlerPassword = this.handlerPassword.bind(this)
        this.salvar = this.salvar.bind(this)

        this.state = {
            current: {
                id: null,
                username: "",
                nome: "",
                password: "",
                area: [],
                email: ""
            },
            message: "",
            successful: false
        }
    }

    componentDidMount() {
        this.pegaUsuario(this.props.match.params.username)
    }

    pegaUsuario(username) {
        AuthService.buscarUm(username)        
        .then(response => {
            this.setState({
                current: {
                    id: response.data[0]._id,                    
                    username: response.data[0].username,
                    nome: response.data[0].nome,
                    email: response.data[0].email,
                    password: response.data[0].password,
                    area: response.data[0].area
                }
            })
            })
            .catch(e => {
                console.log(e)
            })     
    }

    handlerPassword(e) {
        const password = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 password: password
            }
        }))
    }

    async salvar() {

     
                
        await AuthService.changePassword(this.state.current.username, this.state.current.password)
        .then(response => {
            this.setState({                
                submitted: true,
                successful: true,
                message: "Senha alterada com sucesso"                
            })     
        })
        .catch(e => {
            console.log(e)
        })
    }


    render () {

        const {current} = this.state

        
        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4> Senha alterada com sucesso!</h4>
                        <Link to={"/usuarios"} className="btn btn-info" style={{marginLeft: 20+'px', marginBottom: 15+'px'}}> 
                            Voltar
                        </Link>
                    </div>
                ) : (
                
                    <div>
                        
                        {!this.state.successful && (
                            <div>
                                <h1>Trocar Senha</h1>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="nome"> Nome </label>
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            id="nome"                              
                                            value={current.nome} 
                                            name="nome"
                                            disabled />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="username"> Login </label>
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            id="username"                              
                                            value={current.username} 
                                            name="username"
                                            disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="password"> Nova Senha </label>
                                            <input 
                                            type="password" 
                                            className="form-control" 
                                            id="password"                              
                                            onChange={this.handlerPassword}
                                            name="password"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <button type="submit" onClick={this.salvar} className="btn btn-success"> Alterar </button>
                                        </div>
                                    </div>
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