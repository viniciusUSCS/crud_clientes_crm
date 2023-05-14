const express  = require('express');
const router   = express.Router();
const Cliente  = require('../models/cliente');

// rota de teste
router.get('/test', (req,res) => {
    res.send('deu certo');
});

//informacoes do cliente -> view/1, view/2
router.get('/view/:id', (req,res) => Cliente.findOne({
    where: {id: req.params.id}
}).then(cliente => {

    res.render('view', {
        cliente
    });

}).catch(err => console.log(err)));

//form da rota de envio
router.get('/add',(req,res) => {
    res.render('add');
})

// ADICIONAR CLIENTE VIA POSTMAN

router.post ('/add', (req,res) => {

    let {nome,description, endereço, telefone, email, feedback} = req.body;

    // inserir dados no sistema
    Cliente.create({
        nome,
        description,
        endereço,
        telefone,
        email,
        feedback,
    })

    .then(() => res.redirect('/')); 
    //.catch(err => console.log(err));

});

module.exports = router