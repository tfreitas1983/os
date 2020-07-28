import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import "./App.css"

import AdicionarChamado from "./components/add-chamado.component"
import ChamadosLista from "./components/list-chamado.component"
import Chamado from "./components/edit-chamado.component"
import Caixa from "./components/caixa"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container mt-6">
            <Switch>
              <Route exact path={"/"} component={ChamadosLista} />
              <Route exact path={"/chamados"} component={ChamadosLista} />
              <Route exact path="/chamados/adicionar" component={AdicionarChamado} />
              <Route exact path="/chamados/atender" component={Chamado} />
              <Route exact path={"/chamados/caixa"} component={Caixa} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;