const express = require('express');
const status = require('http-status');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

//Controller e rotas
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", require("./routers/route"));
app.use("/lembrete", require("./routers/rotaLembrete"));

//conexão com o banco e subindo o servidor
const sequilize = require('./config/banco');
sequilize.sync({force:false}).then(()=>{
    app.listen(3000, ()=>{
        console.log("Está Funcionando");

    });
}).catch((error)=>{
    console.log(erro);
});
