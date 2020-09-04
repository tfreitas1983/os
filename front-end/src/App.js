import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import logo from './images/logo.png'

import ListarUsuario from "./components/user-list.component"
import AdicionarChamado from "./components/add-chamado.component"
import ChamadosLista from "./components/list-chamado.component"
import EditarChamado from "./components/edit-chamado.component"
import ReabrirChamado from "./components/reabrir-chamado.component"
import Atender from "./components/solve-chamado.component"
import VisualizarChamado from "./components/view-chamado.component"
import VisualizarAtendente from "./components/view-atendente.component"
import VisualizarDiretor from "./components/view-diretor.component"

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component"
import ResumeModerator from "./components/resume-moderator.component"
import ResumeAdmin from './components/resume-admin.component';
import ResumeUser from './components/resume-user.component';


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div style={{padding: 0, margin: 0}}>
        <nav className="navbar navbar-expand" style={{backgroundColor: '#2E8B57', padding: 0, margin: 0}}>
            <Link to={"/"} className="navbar-brand">
              <img src={logo} alt={logo} style={{height: 50+'px', padding: 0, margin: 0}}/>
            </Link>
            <div className="navbar-nav mr-auto">              

              {showModeratorBoard && (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                      Chamados
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/usuarios"} className="nav-link">
                      Usuários
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/resumo"} className="nav-link">
                      Resumo
                    </Link>
                  </li>
                </div>
              )}

              {showAdminBoard && (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Atender
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/resumo-atendente"} className="nav-link">
                      Resumo
                    </Link>
                  </li>
                </div>
              )}

              {currentUser && (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <li className="nav-item">
                    <Link to={"/lista"} className="nav-link">
                      Meus Chamados
                    </Link>
                  </li>                                   
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.nome}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Sair
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>                
              </div>
            )}
          </nav>

          <div className="container mt-6">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/resumo" component={ResumeModerator} />
              <Route path="/resumo-atendente" component={ResumeAdmin} />
              <Route path="/resumo-usuario" component={ResumeUser} />
              <Route exact path={"/usuarios"} component={ListarUsuario} />
              <Route exact path={"/lista"} component={ChamadosLista} />
              <Route exact path={"/chamados"} component={ChamadosLista} />
              <Route exact path={"/chamados/adicionar"} component={AdicionarChamado} />
              <Route exact path={"/chamados/visualizar/:id"} component={VisualizarChamado} />
              <Route exact path={"/chamados/view-atendente/:id"} component={VisualizarAtendente} />
              <Route exact path={"/chamados/view-diretor/:id"} component={VisualizarDiretor} />
              <Route exact path={"/chamados/editar/:id"} component={EditarChamado} />
              <Route exact path={"/chamados/reabrir/:id"} component={ReabrirChamado} />
              <Route exact path={"/chamados/atender/:id"} component={Atender} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;