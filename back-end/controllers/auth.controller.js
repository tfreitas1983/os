const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    area: req.body.area,
    nome: req.body.nome,
    unidade: req.body.unidade
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Usuário registrado com successo!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Usuário registrado com successo!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha inválida!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        nome: user.nome,
        email: user.email,
        unidade: user.unidade,
        area: user.area,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.change = (req, res) => {
  const username = {username: req.body.username}
  const password = {password: bcrypt.hashSync(req.body.password, 8) }

  User.findOneAndUpdate( username, password, {new: true})
  .then(data => {
    if (!data) {
        res.status(404).send({
            message: `Não foi possível encontrar e/ou alterar o usuário ${username}. `
        })
    } else res.send({
            message: "Senha alterada com sucesso!"                
        })    
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar a senha do usuário " + username
      })
  })
}

exports.buscarTodos = (req, res) => {   
  
  User.find()   
      .then(data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Um erro ocorreu ao buscar o usuários"
          })
      })
}

exports.buscarUm = (req, res) => { 

  User.find({username: req.body.username})   
      .then(data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || `Um erro ocorreu ao buscar o usuário ${username}`
          })
      })
}

exports.editar = (req, res) => {   
  const username = {username: req.body.username}

  User.findOneAndUpdateind(username, req.body)   
  .then(data => {
    if (!data) {
        res.status(404).send({
            message: `Não foi possível encontrar e/ou alterar o usuário ${username}. `
        })
    } else res.send({
            message: "Usuário alterado com sucesso!"                
        })    
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o usuário " + username
      })
  })
}