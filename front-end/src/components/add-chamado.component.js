import React, { Component } from 'react'
import ChamadoDataService from "../services/chamado.service"
import AuthService from "../services/auth.service"
import * as moment from 'moment'

export default class AdicionarChamado extends Component {
    constructor(props) {
        super(props)
        this.estadoNome = this.estadoNome.bind(this)       
        this.estadoUnidade = this.estadoUnidade.bind(this)
        this.estadoRamal = this.estadoRamal.bind(this)
        this.estadoDescricao = this.estadoDescricao.bind(this)        
        this.estadoSetor = this.estadoSetor.bind(this)       
                
        this.estadoUpload = this.estadoUpload.bind(this)
       
        this.salvarImagem = this.salvarImagem.bind(this)
        this.salvarChamado = this.salvarChamado.bind(this)
        this.novoChamado = this.novoChamado.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            id: null,
            nome: "",
            dt_abertura: "",
            unidade: "",
            descricao: "",
            ramal: "",
            setor: "",
            foto: "default.jpg",
            imagem: "",
            url:"",
            submitted: false
        }
    }

    estadoUpload(e) {
        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "default.jpg", type: "image/jpeg"}
            const foto = "default.jpg"
            const url = ""
            this.setState({
                imagem: imagem,
                url: url,
                foto: foto
            })
        }
        //Quando o usuário escolhe uma imagem a ser enviada
        else {
            const imagem = e.target.files[0]
            this.setState({
                imagem: imagem,
                url: URL.createObjectURL(imagem)          
            })
        }
    }

    estadoNome(e) {
        this.setState({
            nome: e.target.value
        })
    }

    estadoUnidade(e) {
        this.setState({
            unidade: e.target.value
        })
    }

    estadoRamal(e) {
        this.setState({
            ramal: e.target.value
        })
    }

    estadoDescricao(e) {
        this.setState({
            descricao: e.target.value
        })
    }

    estadoSetor(e) {
        this.setState({
            setor: e.target.value
        })
    }

   salvarImagem() {
    
        if(this.state.foto === "default.jpg") {
            this.salvarChamado()  
            return false
        } if(this.state.foto !== "default.jpg") {
        
            var data = new FormData()
            data.append('file', this.state.imagem)
        
            ChamadoDataService.cadastrarImagem(data)
                            .then(response => {
                                this.setState({
                                    foto: response.data.foto
                                })
                                this.salvarChamado()
                            })
                            .catch(e => {
                                console.log(e)
                            })
        }
    }

    salvarChamado() {

        var data = {
            
            nome: this.state.nome,
            username: this.state.currentUser.username,
            dt_abertura: moment.now(),
            unidade: this.state.unidade,
            ramal: this.state.ramal,
            setor: this.state.setor,
            descricao: this.state.descricao,
            foto: this.state.foto,
            status: "Pendente"
        }

        ChamadoDataService.cadastrar(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        nome: response.data.nome,
                        username: response.data.username,
                        dt_abertura: response.data.dt_abertura,
                        unidade: response.data.unidade,
                        ramal: response.data.ramal,
                        setor: response.data.setor,
                        descricao: response.data.descricao,
                        foto: response.data.foto,
                        status: response.data.status,
                        situacao: response.data.situacao,
                        submitted: true
                    })
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
    }

    novoChamado() {
        this.setState({
        id: null,
        nome: "",
        username: "",
        dt_abertura: "",
        unidade: "",
        descricao: "",
        ramal: "",
        setor: "",
        foto: "default.jpg",
        imagem: "",
        url:"",
        submitted: false
        })
    }

    render() {
        const { currentUser } = this.state

        //Monta um array com o nome dos arquivos
        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});
        //No array somente aceita as extensões de imagens
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url) {
            $imagePreview = <img alt="" src={this.state.url} />
        }
        if(!this.state.url) {
            $imagePreview = <img alt="" src={images[this.state.foto]} />
        }

        //Verifica se a imagem possui mais de 2 MB
        if(this.state.imagem && (this.state.imagem.size > 2 * 1024 * 1024)){
            alert('Somente arquivos até 2MB')
        }
        //Verifica se é uma imagem
        if(this.state.imagem && this.state.imagem.type.substr(0,6) !== "image/" && this.state.imagem.type !== "") {
            alert('Somente imagens podem ser enviadas')
        } 
    

        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4> Envio completado com sucesso!</h4>
                        <button className="btn btn-success" onClick={this.novoMembro}>
                            Adicionar
                        </button>
                    </div>
                ) : (
                
                    <div>

                        <div className="form-group">
                            <label htmlFor="nome"> Nome </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="nome" 
                            required 
                            value={this.state.nome} 
                            onChange={this.estadoNome} 
                            name="nome" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="unidade"> Unidade </label>
                            <select 
                                className="form-control" 
                                id="unidade" 
                                name="unidade"
                                value={this.state.unidade}                                    
                                onChange={this.estadoUnidade} >                                    
                                <option value="1">Selecione</option>
                                <option value="Caxias">Caxias</option>  
                                <option value="Nilopolis">Nilópolis</option> 
                                <option value="Nova Iguacu"> Nova Iguaçu </option>
                                <option value="Queimados"> Queimados </option>
                                <option value="Rio de Janeiro"> Rio de Janeiro </option>
                                <option value="Vilar dos Teles">Vilar dos Teles</option>
                                <option value="CDRio Nova Iguaçu"> CDRio Nova Iguaçu </option>
                                <option value="CDRio São Gonçalo"> CDRio São Gonçalo </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ramal"> Ramal </label>
                            <input 
                            type="number" 
                            className="form-control" 
                            id="ramal" 
                            value={this.state.ramal} 
                            onChange={this.estadoRamal} 
                            name="ramal" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="setor"> Setor </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="setor" 
                            value={this.state.setor} 
                            onChange={this.estadoSetor} 
                            name="setor" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="descricao"> Descrição </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="descricao" 
                            value={this.state.descricao} 
                            onChange={this.estadoDescricao} 
                            name="descricao" />
                        </div>
                    
                        <div className="image-container">

                            <div className="upload">
                                {$imagePreview}
                            </div>

                            <div className="envio">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="file"
                                    onChange={this.estadoUpload}
                                    id="file"
                                    name="file" /> 
                            </div>
                        </div>
                    
                        <button onClick={this.salvarImagem} className="envio">
                            Adicionar
                        </button>
                    </div>
                )}
            </div>
        )
    }
}