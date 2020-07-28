import React, { Component } from 'react'
//import ChamadoDataService from "../services/chamado.service"
import "bootstrap/dist/css/bootstrap.min.css";
import * as moment from 'moment'

export default class Venda extends Component {
    constructor(props) {
        super(props)

        this.estadoTipo = this.estadoTipo.bind(this)

        this.state = {
            tipo: ""
        }
    }


    estadoTipo(e) {
        this.setState({
            tipo: e.target.value
        })
    }

    render() {
        const {tipo} = this.state

        let tela = null

            /*********************************************************************
            *
            *                   RELATÓRIO ANALÍTICO
            *
            **********************************************************************/

        
        if(tipo && tipo === 'Analítico') {
           tela = <div style={{width: 109+'%', margin: 0, padding: 0}}>
              <div style={{marginTop: 20+'px'}}>
                <div>
                    <span><b>Vendedor: </b> Jorge</span>
                </div>
                <div>
                    <table class="table table-dark table-striped" style={{marginTop: 10+'px'}}>
                        <tbody>
                        <tr>
                            <th>Data</th>
                            <th>Contrato</th>
                            <th>Reponsável Financeiro</th>
                            <th>Forma de pagamento</th>
                            <th>Valor</th>
                            <th>Desconto</th>
                            <th>Comissão</th>
                        </tr>
                        <tr>
                            <td>25/07/2020</td>
                            <td>95231.0</td>
                            <td>Ana Júlia Countinho</td>
                            <td>Dinheiro</td>
                            <td>R$ 150,00</td>
                            <td></td>
                            <td>R$ 15,00</td>
                        </tr>
                        <tr>
                            <td>25/07/2020</td>
                            <td>95232.0</td>
                            <td>Paulo Roberto da Silva</td>
                            <td>Dinheiro</td>
                            <td>R$ 200,00</td>
                            <td></td>
                            <td>R$ 20,00</td>
                        </tr>
                        <tr>
                            <td>26/07/2020</td>
                            <td>95233.0</td>
                            <td>Maria José Oliveira</td>
                            <td>Cartão Débito - Visa</td>
                            <td>R$ 100,00</td>
                            <td></td>
                            <td>R$ 10,00</td>
                        </tr>
                        <tr>
                            <td>27/07/2020</td>
                            <td>95234.0</td>
                            <td>José Carlos Monteverde</td>
                            <td>Cartão Débito - Master</td>
                            <td>R$ 90,00</td>
                            <td></td>
                            <td>R$ 9,00</td>
                        </tr>
                        <tr>
                            <td>27/07/2020</td>
                            <td>95235.0</td>
                            <td>Angela Costa Silva</td>
                            <td>Dinheiro</td>
                            <td>R$ 500,00</td>
                            <td style={{color: 'red'}}> - R$ 50,00</td>
                            <td>R$ 45,00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            {/*********************************************************************
            *
            *                   FECHAMENTO TOTAL DE VENDAS JORGE
            *
            **********************************************************************/} 
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div>                        
                        <table style={{margin: 0}}>
                            <tbody>
                                <tr>
                                    <th>Tipo de pagamento</th>
                                    <th>Valor</th>
                                    <th>Desconto</th>
                                    <th>Qt Pagto</th>
                                    <th>Comissão</th>
                                </tr>
                                <tr>
                                    <td>Dinheiro</td>
                                    <td>R$ 850,00</td>
                                    <td style={{color: 'red'}}> - R$ 50,00</td>
                                    <td>3</td>   
                                    <td>R$ 80,00</td>                    
                                </tr>
                                <tr>
                                    <td>Cartão Débito - Master</td>
                                    <td>R$ 90,00</td>
                                    <td> </td>
                                    <td>1</td>
                                    <td>R$ 9,00</td>                       
                                </tr>
                                <tr>
                                    <td>Cartão Débito - Visa</td>
                                    <td>R$ 100,00</td>
                                    <td> </td>
                                    <td>1</td>
                                    <td>R$ 10,00</td>                       
                                </tr>
                                <tr>
                                    <td><b>Sub-total</b></td>
                                    <td>R$ 1.040,00</td>
                                    <td style={{color: 'red'}}> -R$ 50,00 </td>
                                    <td>5</td>  
                                    <td>R$ 99,00</td>                     
                                </tr>
                                <tr>
                                    <td><b>Total</b></td>
                                    <td><b>R$ 990,00</b></td>
                                    <td> </td>
                                    <td>5</td>
                                    <td><b>R$ 99,00</b></td>                         
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style={{marginTop: 20+'px'}}>
                <div>
                    <span><b>Vendedor: </b> Pedro</span>
                </div>
                <div>
                    <table class="table table-dark table-striped" style={{marginTop: 10+'px'}}>
                        <tbody>
                        <tr>
                            <th>Data</th>
                            <th>Contrato</th>
                            <th>Reponsável Financeiro</th>
                            <th>Forma de pagamento</th>
                            <th>Valor</th>
                            <th>Desconto</th>
                            <th>Comissão</th>
                        </tr>
                        <tr>
                            <td>25/07/2020</td>
                            <td>95231.0</td>
                            <td>Ana Júlia Countinho</td>
                            <td>Dinheiro</td>
                            <td>R$ 150,00</td>
                            <td></td>
                            <td>R$ 15,00</td>
                        </tr>
                        <tr>
                            <td>25/07/2020</td>
                            <td>95232.0</td>
                            <td>Paulo Roberto da Silva</td>
                            <td>Dinheiro</td>
                            <td>R$ 200,00</td>
                            <td></td>
                            <td>R$ 20,00</td>
                        </tr>
                        <tr>
                            <td>26/07/2020</td>
                            <td>95233.0</td>
                            <td>Maria José Oliveira</td>
                            <td>Cartão Débito - Visa</td>
                            <td>R$ 100,00</td>
                            <td></td>
                            <td>R$ 10,00</td>
                        </tr>
                        <tr>
                            <td>27/07/2020</td>
                            <td>95234.0</td>
                            <td>José Carlos Monteverde</td>
                            <td>Cartão Débito - Master</td>
                            <td>R$ 90,00</td>
                            <td></td>
                            <td>R$ 9,00</td>
                        </tr>
                        <tr>
                            <td>27/07/2020</td>
                            <td>95235.0</td>
                            <td>Angela Costa Silva</td>
                            <td>Dinheiro</td>
                            <td>R$ 250,00</td>
                            <td style={{color: 'red'}}> </td>
                            <td>R$ 25,00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            {/*********************************************************************
            *
            *                   FECHAMENTO TOTAL DE VENDAS PEDRO
            *
            **********************************************************************/} 
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div>                        
                        <table style={{margin: 0}}>
                            <tbody>
                                <tr>
                                    <th>Tipo de pagamento</th>
                                    <th>Valor</th>
                                    <th>Desconto</th>
                                    <th>Qt Pagto</th>
                                    <th>Comissão</th>
                                </tr>
                                <tr>
                                    <td>Dinheiro</td>
                                    <td>R$ 600,00</td>
                                    <td> </td>
                                    <td>3</td>   
                                    <td>R$ 60,00</td>                    
                                </tr>
                                <tr>
                                    <td>Cartão Débito - Master</td>
                                    <td>R$ 90,00</td>
                                    <td> </td>
                                    <td>1</td>
                                    <td>R$ 9,00</td>                       
                                </tr>
                                <tr>
                                    <td>Cartão Débito - Visa</td>
                                    <td>R$ 100,00</td>
                                    <td> </td>
                                    <td>1</td>
                                    <td>R$ 10,00</td>                       
                                </tr>
                                <tr>
                                    <td><b>Sub-total</b></td>
                                    <td>R$ 790,00</td>
                                    <td> </td>
                                    <td>5</td>  
                                    <td>R$ 79,00</td>                     
                                </tr>
                                <tr>
                                    <td><b>Total</b></td>
                                    <td><b>R$ 790,00</b></td>
                                    <td> </td>
                                    <td>5</td>
                                    <td><b>R$ 79,00</b></td>                         
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*********************************************************************
            *
            *                   FECHAMENTO TOTAL DE VENDAS
            *
            **********************************************************************/}

            <div style={{display:'flex', color: '#fafafa',marginTop: 20+'px', marginBottom: 20+'px', backgroundColor: '#454d55',justifyContent: 'center', border: 1+'px solid'}}>
                <span style={{backgroundColor: '#454d55'}}><b>FECHAMENTO DAS VENDAS</b></span>                
            </div>
            <div style={{display:'flex', justifyContent: 'center'}}>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Valor</th>
                        <th>Desconto</th>
                        <th>Qtd</th>
                        <th>Comissão</th>
                    </tr>
                    <tr>
                        <td>Dinheiro</td>
                        <td>R$ 1.450,00</td>
                        <td style={{color: 'red'}}> - R$ 50,00</td>
                        <td>6</td>
                        <td>R$ 140,00</td>
                    </tr>                     
                    <tr>
                        <td>Cartão Débito - Master</td>
                        <td>R$ 180,00</td>
                        <td></td>
                        <td>2</td>
                        <td>R$ 18,00</td>
                    </tr>
                    <tr>
                        <td>Cartão Débito - Visa</td>
                        <td>R$ 200,00</td>
                        <td></td>
                        <td>2</td>
                        <td>R$ 20,00</td>
                    </tr>
                    
                    <tr style={{backgroundColor: '#454d55', color: '#f2f2f2'}}>
                        <td>Total</td>
                        <td><b>R$ 1.780,00</b></td>
                        <td></td>
                        <td>10</td>
                        <td>R$ 178,00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        }

        if(tipo && tipo === 'Sintético') {
            tela = <div style={{width: 109+'%', margin: 0, padding: 0}}>
               <div style={{marginTop: 20+'px'}}>
            {/*********************************************************************
            *
            *                   FECHAMENTO SINTÉTICO DE VENDAS JORGE
            *
            **********************************************************************/} 
                    
                    <div style={{marginBottom: 10+'px'}}>
                        <span><b>Vendedor: </b> Jorge</span>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div>                        
                            <table style={{margin: 0, width: 500+'px'}}>
                                <tbody>
                                    <tr>
                                        <th>Tipo de pagamento</th>
                                        <th>Valor</th>
                                        <th>Desconto</th>
                                        <th>Qt Pagto</th>
                                        <th>Comissão</th>
                                    </tr>
                                    <tr>
                                        <td>Dinheiro</td>
                                        <td>R$ 850,00</td>
                                        <td style={{color: 'red'}}> - R$ 50,00</td>
                                        <td>3</td>   
                                        <td>R$ 80,00</td>                    
                                    </tr>
                                    <tr>
                                        <td>Cartão Débito - Master</td>
                                        <td>R$ 90,00</td>
                                        <td> </td>
                                        <td>1</td>
                                        <td>R$ 9,00</td>                       
                                    </tr>
                                    <tr>
                                        <td>Cartão Débito - Visa</td>
                                        <td>R$ 100,00</td>
                                        <td> </td>
                                        <td>1</td>
                                        <td>R$ 10,00</td>                       
                                    </tr>
                                    <tr>
                                        <td><b>Sub-total</b></td>
                                        <td>R$ 1.040,00</td>
                                        <td style={{color: 'red'}}> -R$ 50,00 </td>
                                        <td>5</td>  
                                        <td>R$ 99,00</td>                     
                                    </tr>
                                    <tr>
                                        <td><b>Total</b></td>
                                        <td><b>R$ 990,00</b></td>
                                        <td> </td>
                                        <td>5</td>
                                        <td><b>R$ 99,00</b></td>                         
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            {/*********************************************************************
            *
            *                   FECHAMENTO SINTÉTICO DE VENDAS PEDRO
            *
            **********************************************************************/}
                <div style={{marginBottom: 10+'px', marginTop: 10+'px'}}>
                    <span><b>Vendedor:</b> Pedro</span>
                </div>
                <div style={{display: 'flex'}}>
                    <div>                        
                        <table style={{margin: 0, width: 500+'px'}}>
                            <tbody>
                                <tr>
                                    <th>Tipo de pagamento</th>
                                    <th>Valor</th>
                                    <th>Desconto</th>
                                    <th>Qt Pagto</th>
                                    <th>Comissão</th>
                                </tr>
                                <tr>
                                    <td>Dinheiro</td>
                                    <td>R$ 600,00</td>
                                    <td> </td>
                                    <td>3</td>   
                                    <td>R$ 60,00</td>                    
                                </tr>
                                <tr>
                                    <td>Cartão Débito - Master</td>
                                    <td>R$ 90,00</td>
                                    <td> </td>
                                    <td>1</td>
                                    <td>R$ 9,00</td>                       
                                </tr>
                                <tr>
                                    <td>Cartão Débito - Visa</td>
                                    <td>R$ 100,00</td>
                                    <td> </td>
                                    <td>1</td>
                                    <td>R$ 10,00</td>                       
                                </tr>
                                <tr>
                                    <td><b>Sub-total</b></td>
                                    <td>R$ 790,00</td>
                                    <td> </td>
                                    <td>5</td>  
                                    <td>R$ 79,00</td>                     
                                </tr>
                                <tr>
                                    <td><b>Total</b></td>
                                    <td><b>R$ 790,00</b></td>
                                    <td> </td>
                                    <td>5</td>
                                    <td><b>R$ 79,00</b></td>                         
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            {/*********************************************************************
            *
            *                   FECHAMENTO TOTAL DE VENDAS
            *
            **********************************************************************/}

                <div style={{display:'flex', color: '#fafafa',marginTop: 20+'px', marginBottom: 20+'px', backgroundColor: '#454d55',justifyContent: 'center', border: 1+'px solid'}}>
                    <span style={{backgroundColor: '#454d55'}}><b>FECHAMENTO DAS VENDAS</b></span>                
                </div>
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <table>
                        <tbody>
                        <tr>
                            <th></th>
                            <th>Valor</th>
                            <th>Desconto</th>
                            <th>Qtd</th>
                            <th>Comissão</th>
                        </tr>
                        <tr>
                            <td>Dinheiro</td>
                            <td>R$ 1.450,00</td>
                            <td style={{color: 'red'}}> - R$ 50,00</td>
                            <td>6</td>
                            <td>R$ 140,00</td>
                        </tr>                     
                        <tr>
                            <td>Cartão Débito - Master</td>
                            <td>R$ 180,00</td>
                            <td></td>
                            <td>2</td>
                            <td>R$ 18,00</td>
                        </tr>
                        <tr>
                            <td>Cartão Débito - Visa</td>
                            <td>R$ 200,00</td>
                            <td></td>
                            <td>2</td>
                            <td>R$ 20,00</td>
                        </tr>
                        
                        <tr style={{backgroundColor: '#454d55', color: '#f2f2f2'}}>
                            <td>Total</td>
                            <td><b>R$ 1.780,00</b></td>
                            <td></td>
                            <td>10</td>
                            <td>R$ 178,00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>            
         }
    
    return (
        <div>
            <div style={{width: 110+'%', marginLeft: -100+'px', padding: 0}}>
                <h1>Relatório de Vendas</h1>
                <div style={{display: 'flex'}}>
                    <span  style={{marginRight: 10+'px'}}><b>Selecione o tipo</b></span>
                    <div className="form-group" >
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input"
                                type="radio"
                                name="tipo"
                                id="tipoAnalitico"
                                value="Analítico"
                                checked={this.state.tipo === 'Analítico'}
                                onChange={this.estadoTipo} />
                        </div>
                        <label className="form-check-label">Analítico</label>

                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input"
                                type="radio"
                                name="tipo"
                                id="tipoSintetico"
                                value="Sintético"
                                checked={this.state.tipo === 'Sintético'}
                                onChange={this.estadoTipo} />
                        </div>
                        <label className="form-check-label">Sintético</label>
                    </div>                    
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <span><b>Período </b></span>
                        <input type="date" />
                        <span> a </span>
                        <input type="date" />
                    </div>
                    <div>
                        <span><b>Unidade: </b>Nova Iguaçu</span>
                        <span style={{marginLeft: 15+'px'}}><b>Data de impresão: </b> {moment().format('DD/MM/YYYY')} </span>
                    </div>
                </div>
                    {tela}
            </div>
        </div>
    )
    }

}