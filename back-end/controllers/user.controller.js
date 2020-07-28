exports.allAccess = (req, res) => {
    res.status(200).send("Conteúdo público.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Conteúdo do usuário.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Conteúdo do admin.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Conteúdo da TI.");
  };