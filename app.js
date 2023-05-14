const bodyParser  = require('body-parser');
const express     = require ('express');
const { engine }  = require('express-handlebars');
const path        = require('path');
const app         = express();
const db          = require('./db/connection');
const Cliente     = require('./models/cliente');
const cliente     = require('./models/cliente');
const Sequelize   = require('sequelize');
const Op          = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O Express esta rodando na porta ${PORT}`);
});

// body parser
app.use (bodyParser.urlencoded({ extended: false }));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ extname: 'handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco de dados com sucesso");
    })
    .catch(err =>{
        console.log("Ocorreu um erro ao conectar", err);
    })

//rotas
app.get ('/', (req, res) => {

    let search = req.query.cliente;
    let query  = '%'+search+'%'; //pesquisa coisas semelhantes

    if(!search) {
        Cliente.findAll({order: [
            ['createdAt','DESC']
        ]})
        .then(clientes =>{
            res.render('index', {
                clientes
            });

        })
        .catch(err => console.log(err));    
    } else {
        Cliente.findAll({
            where: {nome: {[Op.like]: query}},
            order: [
             ['createdAt','DESC']
        ]})
        .then(clientes =>{
            res.render('index', {
                clientes,search
            });
        })
        .catch(err => console.log(err));   
    }
});

// clientes rotas
app.use('/clientes', require('./routes/clientes'));