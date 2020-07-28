import React, { Component } from 'react'
//import ChamadoDataService from "../services/chamado.service"
import "bootstrap/dist/css/bootstrap.min.css";

export default class Caixa extends Component {
    constructor(props) {
        super(props)

        this.estadoTipo = this.estadoTipo.bind(this)

        this.state = {
            tipo: "Analítico"
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
        if(tipo && tipo === 'Analítico') {
           tela = <div style={{width: 109+'%', margin: 0, padding: 0}}>
              <div style={{marginTop: 20+'px'}}>
            {/*********************************************************************
            *
            *                   LISTA DE LANÇAMENTOS WESLEY
            *
            **********************************************************************/} 
                <div>
                    <span><b>Conta: </b> Wesley</span>
                </div>
                <div>
                <table class="table table-dark table-striped" style={{marginTop: 10+'px'}}>
                    <tr>
                        <th>Data</th>
                        <th>Nº entrada</th>
                        <th>Categoria Financeira</th>
                        <th>Descrição</th>
                        <th>Cliente/Fornecedor</th>
                        <th>Ref</th>
                        <th>Forma de pagamento</th>
                        <th>Valor receita</th>
                        <th>Valor despesa</th>
                        <th>Desconto</th>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1002</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>José Maria da Silva - 89812</td>
                        <td>Jun/2020</td>
                        <td>Dinheiro</td>
                        <td>R$ 100,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1003</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Maria da Glória da Silva - 73541</td>
                        <td>Ago/2020</td>
                        <td>Cartão Débito - Master</td>
                        <td>R$ 150,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1004</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Ana Cláudia Oliveira - 61822</td>
                        <td>Jul/2020</td>
                        <td>Cartão de Crédito - Visa</td>
                        <td>R$ 90,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1005</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Ana Júlia Monteverde - 87564</td>
                        <td>Jul/2020</td>
                        <td>Cartão Crédito - Master</td>
                        <td>R$ 200,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1006</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Penélope Charmosa - 73994</td>
                        <td>Jul/2020</td>
                        <td>Cartão de Débito - Visa</td>
                        <td>R$ 100,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1007</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Ana Paula Corredeira - 87009</td>
                        <td>Jul/2020</td>
                        <td>Dinheiro</td>
                        <td>R$ 100,00</td>
                        <td> - </td>
                        <td style={{color: 'red', paddingLeft: 2+'px'}}> - R$ 10,00 </td>
                    </tr>
                    
                    <tr style={{backgroundColor: '#FF3333' }}>
                        <td>27/07/2020</td>
                        <td>1001</td>
                        <td>Alimentação</td>
                        <td>Padaria</td>
                        <td>Padaria Modelo</td>
                        <td>-</td>
                        <td>Dinheiro</td>
                        <td>-</td>
                        <td> - R$ 32,00 </td>
                        <td> - </td>
                    </tr>                
                </table>

            {/*********************************************************************
            *
            *                   FECHAMENTO TOTAL DE RECEITAS WESLEY
            *
            **********************************************************************/} 
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div>
                        <table style={{width: 390+'px', margin: 0, display: 'flex', justifyContent: 'center'}}>
                            <tr>
                                <th style={{width: 100+'%', border: 0}}>Receita</th>
                            </tr>
                        </table>
                        <table style={{margin: 0}}>
                            <tr>
                                <th>Tipo de pagamento</th>
                                <th>Valor</th>
                                <th>Desconto</th>
                                <th>Qt Pagto</th>
                            </tr>
                            <tr>
                                <td>Dinheiro</td>
                                <td>R$ 200,00</td>
                                <td>R$ 10,00</td>
                                <td>2</td>                       
                            </tr>
                            <tr>
                                <td>Cartão Crédito - Master</td>
                                <td>R$ 200,00</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Cartão Crédito - Visa</td>
                                <td>R$ 90,00</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Cartão Débito - Master</td>
                                <td>R$ 150,00</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Cartão Débito - Visa</td>
                                <td>R$ 100,00</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Total de descontos</td>
                                <td>-</td>
                                <td style={{color: 'red'}}> - R$ 10,00</td>
                                <td>-</td>  
                            </tr>
                            <tr>
                                <td>Total de atendimentos</td>
                                <td>6</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>R$ 730,00</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </table>
                    </div>
            {/*********************************************************************
            *
            *                   FECHAMENTO TOTAL DE DESPESAS WESLEY
            *
            **********************************************************************/}
                    <div>
                        <table style={{width: 372+'px', margin: 0, display: 'flex', justifyContent: 'center'}}>
                            <tr>
                                <th style={{width: 100+'%', border: 0}}>Despesa</th>
                            </tr>
                        </table>
                        <table style={{margin: 0}}>
                            <tr>
                                <th>Tipo de pagamento</th>
                                <th>Valor</th>
                                <th>Desconto</th>
                                <th>Qt Pagto</th>
                            </tr>
                            <tr>
                                <td>Dinheiro</td>
                                <td>R$ 32,00</td>
                                <td>-</td>
                                <td>1</td>                       
                            </tr>
                            <tr>
                                <td>Total de descontos</td>
                                <td>-</td>
                                <td style={{color: 'red'}}> - </td>
                                <td>-</td>  
                            </tr>
                            <tr>
                                <td>Total de atendimentos</td>
                                <td>1</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>R$ 32,00</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </table>
                    </div>
                    
                </div>
                </div>
              </div>

            {/*********************************************************************
            *
            *                   LANÇAMENTOS PRISCILA
            *
            **********************************************************************/ }
              <div style={{marginTop: 20+'px'}}>
                <div>
                    <span><b>Conta: </b> Priscila</span>
                </div>
                <div>
                <table class="table table-dark table-striped" style={{marginTop: 10+'px'}}>
                    <tr>
                        <th>Data</th>
                        <th>Nº entrada</th>
                        <th>Categoria Financeira</th>
                        <th>Descrição</th>
                        <th>Cliente/Fornecedor</th>
                        <th>Ref</th>
                        <th>Forma de pagamento</th>
                        <th>Valor receita</th>
                        <th>Valor despesa</th>
                        <th>Desconto</th>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1002</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>José Maria da Silva - 89812</td>
                        <td>Jun/2020</td>
                        <td>Dinheiro</td>
                        <td>R$ 100,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1003</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Maria da Glória da Silva - 73541</td>
                        <td>Ago/2020</td>
                        <td>Cartão Débito - Master</td>
                        <td>R$ 150,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1004</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Ana Cláudia Oliveira - 61822</td>
                        <td>Jul/2020</td>
                        <td>Cartão de Crédito - Visa</td>
                        <td>R$ 90,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1005</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Ana Júlia Monteverde - 87564</td>
                        <td>Jul/2020</td>
                        <td>Cartão Crédito - Master</td>
                        <td>R$ 200,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1006</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Penélope Charmosa - 73994</td>
                        <td>Jul/2020</td>
                        <td>Cartão de Débito - Visa</td>
                        <td>R$ 100,00</td>
                        <td> - </td>
                        <td> - </td>
                    </tr>
                    <tr>
                        <td>27/07/2020</td>
                        <td>1007</td>
                        <td>Mensalidade</td>
                        <td>Pagto Mensalidade</td>
                        <td>Ana Paula Corredeira - 87009</td>
                        <td>Jul/2020</td>
                        <td>Dinheiro</td>
                        <td>R$ 100,00</td>
                        <td> - </td>
                        <td style={{color: 'red', paddingLeft: 2+'px'}}> - R$ 10,00 </td>
                    </tr>
                    
                    <tr style={{backgroundColor: '#FF3333' }}>
                        <td>27/07/2020</td>
                        <td>1001</td>
                        <td>Segurança</td>
                        <td>Segurança</td>
                        <td>Medeiros</td>
                        <td>-</td>
                        <td>Dinheiro</td>
                        <td>-</td>
                        <td> - R$ 220,00 </td>
                        <td> - </td>
                    </tr>                
                </table>

            {/*********************************************************************
            *
            *                   FECHAMENTO TOTAL DE RECEITAS PRISCILA
            *
            **********************************************************************/} 
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div>
                        <table style={{width: 390+'px', margin: 0, display: 'flex', justifyContent: 'center'}}>
                            <tr>
                                <th style={{width: 100+'%', border: 0}}>Receita</th>
                            </tr>
                        </table>
                        <table style={{margin: 0}}>
                            <tr>
                                <th>Tipo de pagamento</th>
                                <th>Valor</th>
                                <th>Desconto</th>
                                <th>Qt Pagto</th>
                            </tr>
                            <tr>
                                <td>Dinheiro</td>
                                <td>R$ 200,00</td>
                                <td>R$ 10,00</td>
                                <td>2</td>                       
                            </tr>
                            <tr>
                                <td>Cartão Crédito - Master</td>
                                <td>R$ 200,00</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Cartão Crédito - Visa</td>
                                <td>R$ 90,00</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Cartão Débito - Master</td>
                                <td>R$ 150,00</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Cartão Débito - Visa</td>
                                <td>R$ 100,00</td>
                                <td>-</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Total de descontos</td>
                                <td>-</td>
                                <td style={{color: 'red'}}> - R$ 10,00</td>
                                <td>-</td>  
                            </tr>
                            <tr>
                                <td>Total de atendimentos</td>
                                <td>6</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>R$ 730,00</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </table>
                    </div>

            {/*********************************************************************
            *
            *                   FECHAMENTO TOTAL DE DESPESAS PRISCILA
            *
            **********************************************************************/}                    
                    <div>
                        <table style={{width: 381+'px', margin: 0, display: 'flex', justifyContent: 'center'}}>
                            <tr>
                                <th style={{width: 100+'%', border: 0}}>Despesa</th>
                            </tr>
                        </table>
                        <table style={{margin: 0}}>
                            <tr>
                                <th>Tipo de pagamento</th>
                                <th>Valor</th>
                                <th>Desconto</th>
                                <th>Qt Pagto</th>
                            </tr>
                            <tr>
                                <td>Dinheiro</td>
                                <td>R$ 220,00</td>
                                <td>-</td>
                                <td>1</td>                       
                            </tr>
                            <tr>
                                <td>Total de descontos</td>
                                <td>-</td>
                                <td style={{color: 'red'}}> - </td>
                                <td>-</td>  
                            </tr>
                            <tr>
                                <td>Total de atendimentos</td>
                                <td>1</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>R$ 220,00</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </table>
                    </div>                    
                </div>
                </div>
              </div>

            {/*********************************************************************
            *
            *                   TOTAL DE TRANSFERÊNCIAS
            *
            **********************************************************************/}

            <div>
                <div style={{display: 'flex', justifyContent: 'center',color: '#f2f2f2', marginTop: 20+'px', marginBottom: 20+'px',backgroundColor: '#454d55', width: 100+'%'}}>
                  <span> TRANSFERÊNCIAS</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <table>
                        <tr>
                            <th>Conta Origem</th>
                            <th>Conta Destino</th>
                            <th>Valor</th>
                        </tr>
                        <tr>
                            <td>Wesley</td>
                            <td>Eliane</td>
                            <td>R$ 2.000,00</td>
                        </tr>
                        <tr>
                            <td>Priscila</td>
                            <td>Eliane</td>
                            <td>R$ 1.000,00</td>
                        </tr>
                    </table>
                </div>
            </div>

            {/*********************************************************************
            *
            *                   FECHAMENTO TOTAL DE OPERADORES
            *
            **********************************************************************/}

              <div style={{display:'flex',justifyContent: 'center', color: '#fafafa',marginTop: 20+'px', marginBottom: 20+'px', backgroundColor: '#454d55',justifyContent: 'center', border: 1+'px solid'}}>
                <span style={{backgroundColor: '#454d55'}}><b>FECHAMENTO DO DIA</b></span>                
              </div>
              <div style={{display:'flex',justifyContent: 'center'}}>
                  <table>
                      <tr>
                          <th></th>
                          <th>Valor</th>
                          <th>Qtd</th>
                      </tr>
                      <tr>
                          <td>Saldo Anterior</td>
                          <td> R$ 8.723,00</td>
                          <td></td>
                      </tr>
                      <tr style={{backgroundColor: '#c2c2c2'}}>
                          <td >Receitas</td>
                          <td></td>
                          <td></td>
                      </tr>
                      <tr>
                          <td>Dinheiro</td>
                          <td>R$ 380,00</td>
                          <td>4</td>
                      </tr>
                      <tr>
                          <td>Cartão Crédito - Master</td>
                          <td>R$ 400,00</td>
                          <td>2</td>
                      </tr>
                      <tr>
                          <td>Cartão Crédito - Visa</td>
                          <td>R$ 180,00</td>
                          <td>2</td>
                      </tr>
                      <tr>
                          <td>Cartão Débito - Master</td>
                          <td>R$ 300,00</td>
                          <td>2</td>
                      </tr>
                      <tr>
                          <td>Cartão Débito - Visa</td>
                          <td>R$ 200,00</td>
                          <td>2</td>
                      </tr>
                      <tr style={{backgroundColor: '#c2c2c2'}}>
                          <td>Despesas</td>
                          <td></td>
                          <td></td>
                      </tr>
                      <tr >
                          <td>Dinheiro</td>
                          <td style={{color: 'red'}}> -R$ 232,00</td>
                          <td></td>
                      </tr>

                      <tr style={{backgroundColor: '#c2c2c2'}}>
                          <td>Transferências</td>
                          <td>R$ 3.000,00</td>
                          <td></td>
                      </tr>
                      <tr style={{backgroundColor: '#454d55', color: '#f2f2f2'}}>
                          <td>Total do dia</td>
                          <td><b>R$ 6.951,00</b></td>
                          <td></td>
                      </tr>

                  </table>
              </div>
             {/* <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div>
                    <table style={{width: 402+'px', margin: 0, display: 'flex', justifyContent: 'center'}}>
                        <tr>
                            <th style={{width: 100+'%', border: 0}}>Receita</th>
                        </tr>
                    </table>
                    <table style={{margin: 0}}>
                        <tr>
                            <th>Tipo de pagamento</th>
                            <th>Valor</th>
                            <th>Desconto</th>
                            <th>Qt Pagto</th>
                        </tr>
                        <tr>
                            <td>Dinheiro</td>
                            <td>R$ 400,00</td>
                            <td>R$ 20,00</td>
                            <td>4</td>                       
                        </tr>
                        <tr>
                            <td>Cartão Crédito - Master</td>
                            <td>R$ 400,00</td>
                            <td>-</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Cartão Crédito - Visa</td>
                            <td>R$ 180,00</td>
                            <td>-</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Cartão Débito - Master</td>
                            <td>R$ 300,00</td>
                            <td>-</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Cartão Débito - Visa</td>
                            <td>R$ 200,00</td>
                            <td>-</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Total de descontos</td>
                            <td>-</td>
                            <td style={{color: 'red'}}> - R$ 20,00</td>
                            <td>-</td>  
                        </tr>
                        <tr>
                            <td>Total de atendimentos</td>
                            <td>12</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>R$ 1.460,00</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </table>
                </div>
              <div>
                <table style={{width: 381+'px', margin: 0, display: 'flex', justifyContent: 'center'}}>
                    <tr>
                        <th style={{width: 100+'%', border: 0}}>Despesa</th>
                    </tr>
                </table>
                <table style={{margin: 0}}>
                    <tr>
                        <th>Tipo de pagamento</th>
                        <th>Valor</th>
                        <th>Desconto</th>
                        <th>Qt Pagto</th>
                    </tr>
                    <tr>
                        <td>Dinheiro</td>
                        <td>R$ 252,00</td>
                        <td>-</td>
                        <td>2</td>                       
                    </tr>
                    <tr>
                        <td>Total de descontos</td>
                        <td>-</td>
                        <td style={{color: 'red'}}> - </td>
                        <td>-</td>  
                    </tr>
                    <tr>
                        <td>Total de atendimentos</td>
                        <td>2</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>R$ 252,00</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table>
            </div>   
        </div> */} 
           </div>
        }

        return(
            <div style={{width: 110+'%', marginLeft: -100+'px', padding: 0}}>
                <h1>Relatório de Caixa</h1>
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
                        <span style={{marginLeft: 15+'px'}}><b>Data de impresão: </b>27/07/2020</span>
                    </div>
                </div>
                    {tela}
            </div>
        )
    }



}