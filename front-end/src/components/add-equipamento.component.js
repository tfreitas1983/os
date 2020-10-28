import React, { Component } from 'react'
import EquipamentoDataService from "../services/equipamento.service"
import AuthService from "../services/auth.service"
import * as moment from 'moment'
import {Link} from 'react-router-dom'

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import Select from "react-validation/build/select"
import Textarea from "react-validation/build/textarea"

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Este campo é obrigatório!
        </div>
      )
    }
}

export default class AdicionarEquipamento extends Component {
    constructor(props) {
        super(props)

        this.handlerDescricao = this.handlerDescricao.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            id: null,
            descricao: "",
            submitted: false
        }
    }

    handlerDescricao() {

    }


    render () {
        return (
            <div style={{marginTop: 5+'%'}}>
                <h1>Cadastro de equipamentos</h1>
            </div>
        )
    }


}