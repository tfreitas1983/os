const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin)
  app.put("/api/auth/change", controller.change)
  app.get("/api/auth/usuarios", controller.buscarTodos)
  app.get("/api/auth/usuarios/:username", controller.buscarUm)
  app.put("/api/auth/usuarios/:username", controller.editar)
};