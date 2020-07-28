const express = require ('express')
const path = require ('path')
const fs = require("fs")
const { promisify } = require("util")
const bodyParser = require ('body-parser')
const cors = require ('cors')

const app = express()

var corsOptions = {
    origin: "http://localhost:3001"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./models')
const Role = db.role;
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado à base de dados")
        initial();
    })
    .catch(err => {
        console.log("Erro ao conectar à base de dados")
        process.exit()
    })

    function initial() {
        Role.estimatedDocumentCount((err, count) => {
          if (!err && count === 0) {
            new Role({
              name: "user"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("Adicionado 'user' à collection roles");
            });
      
            new Role({
              name: "moderator"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("Adicionado 'moderator' à collection roles");
            });
      
            new Role({
              name: "admin"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("Adicionado 'admin' à collection roles");
            });
          }
        });
    }


    app.use("/files", express.static(path.resolve(__dirname, '..', 'front-end', 'src', 'images')))

    app.get("/", (req, res) => {
    res.json({ message: "Hello World"})
})


// Rota do chamado
require("./routes/chamado.routes")(app)

// Rotas de login
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
})
