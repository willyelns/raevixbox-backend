const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Criando um middleware para tratar o CORS
// Liberando todos os domínios
app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@raevix-box-0zevl.mongodb.net/omnistack?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

// Criando um middleware para adicionar a propriedade io em toda requisição para o servidor
app.use((req, res, next) => {
  req.io = io;
  // Faz a requisição continuar o caminho dela
  return next();
});

// Liberando o json na aplicação
app.use(express.json());
// Envio de arquivos
app.use(express.urlencoded({ extended: true }));
// Cria um 'redirect' para a pasta onde os arquivos estão
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
// Adicionando as rotas
app.use(require("./routes"));

server.listen(3333);
