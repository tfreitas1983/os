import React, { Component } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { isEmail } from "validator"

import AuthService from "../services/auth.service"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo é obrigatório!
      </div>
    )
  }
}

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        O e-mail não é válido.
      </div>
    )
  }
}

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        O usuário deve possuir entre 3 e 20 caracteres.
      </div>
    )
  }
}

const vnome = value => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        O nome deve possuir entre 6 e 20 caracteres.
      </div>
    )
  }
}

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        A senha deve possuir no mínimo 6 caracteres.
      </div>
    )
  }
}

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNome = this.onChangeNome.bind(this)
    this.onChangeUnidade = this.onChangeUnidade.bind(this)
    this.onChangeArea = this.onChangeArea.bind(this)
    this.onChangePerfil = this.onChangePerfil.bind(this)

    this.state = {
      nome: "",
      username: "",
      email: "",
      password: "",
      unidade: "",
      area: [],
      perfil: "",
      roles: [],
      successful: false,
      message: ""
    };
  }


  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeUnidade(e) {
    this.setState({
      unidade: e.target.value
    })
  }

  onChangePerfil(e) {
    this.setState({
      perfil: e.target.value
    })    
  }

  onChangeArea(e) {
    this.setState({
      area: Array.from(e.target.selectedOptions, (item) => item.value)
    })

    if (this.state.perfil !== "Usuário") {
      this.setState({
        roles: ["user", this.state.perfil]
      })
    } else {
      this.setState({
        roles: ["user"]
      })
    }
  }

 

  handleRegister(e) {
    e.preventDefault()

    this.setState({
      message: "",
      successful: false
    })

    this.form.validateAll()

    

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.nome,
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.unidade,
        this.state.roles,
        this.state.area
      ).then(response => {
          this.setState({
            message: response.data.message,
            roles: response.data.roles,
            successful: true
          })
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {

    let area = null
    if (this.state.perfil === "admin") {
      area =
      <div className="form-group">
      <label htmlFor="area"> Áreas de atendimento </label>
      <select 
          multiple={true}          
          className="form-control"
          placeholder="Selecione as áreas" 
          id="area" 
          name="area"
          value={this.state.area}                                    
          onChange={this.onChangeArea}
          required >                                    
          {/*{areas.map(item => (
            <option value={item.valor} key={item.id}>{item.valor}</option>
          ))} */}          
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
    }

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={this.state.nome}
                    onChange={this.onChangeNome}
                    validations={[required, vnome]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Login</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="unidade"> Unidade </label>
                  <select 
                    className="form-control" 
                    id="unidade" 
                    name="unidade"
                    value={this.state.unidade}                                    
                    onChange={this.onChangeUnidade}                   
                    >                                                                            
                    <option value="1"> Selecione</option>
                    <option value="Caxias"> Caxias</option>  
                    <option value="Nilópolis"> Nilópolis</option> 
                    <option value="Admin"> Nova Iguaçu </option>
                    <option value="Queimados"> Queimados </option>
                    <option value="Rio de Janeiro"> Rio de Janeiro </option>
                    <option value="Vilar dos Teles"> Vilar dos Teles</option>
                    <option value="CDRio Nova Iguaçu"> CDRio Nova Iguaçu </option>
                    <option value="CDRio São Gonçalo"> CDRio São Gonçalo </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="perfil"> Perfil </label>
                  <select
                    multiple={false}
                    className="form-control" 
                    placeholder="Selecione o perfil"
                    id="perfil" 
                    name="perfil"
                    value={this.state.perfil}                                    
                    onChange={this.onChangePerfil}                   
                    >                                                                            
                    
                    <option value="user"> Usuário </option>  
                    <option value="admin"> Atendente </option> 
                    <option value="moderator"> Admin </option>
                  </select>
                </div>

                {area}

                <div className="form-group">
                  <button className="btn btn-success btn-block"> Cadastrar </button>
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
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    )
  }
}