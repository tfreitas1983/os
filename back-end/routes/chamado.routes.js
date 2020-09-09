module.exports = app => {
    const chamados = require('../controllers/chamados.controller')
   
    const files = require ('../controllers/file.controller')
    const router = require ('express').Router()
    const multer = require ('multer')
    const multerConfig = require ('../config/multer')
    
    const upload = multer(multerConfig)

    router.post("/chamados", chamados.cadastrar)
    router.get("/chamados", chamados.buscarTodos)
    router.get("/chamados/files", chamados.buscarImagens)
    router.get("/chamados/files/:id", chamados.buscarImagem)
    router.get("/chamados/:id", chamados.buscarUm)
    router.put("/chamados/:id", chamados.editar)
    router.get("/chamados/envio/:id", chamados.email)
    router.delete("/chamados/:id", chamados.apagar)
    router.delete("/chamados", chamados.apagarTodos)
    router.get("/chamados/files", chamados.buscarImagens)
    router.get("/chamados/files/:id", chamados.buscarImagem)
    router.post("/chamados/files", upload.single('file'), chamados.cadastrarImagem)  
    
    app.use('/api', router)

}