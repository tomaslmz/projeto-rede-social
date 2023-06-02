const express = require('express');
const app = express();

const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const Usuarios = require('./model/Usuarios');
const Postagens = require('./model/Postagens');

app.engine("handlebars", handlebars.engine({
    defaultLayout: 'main',
    
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,

        allowProtoMethodsByDefault: true
    }
}));

app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('start');
});

app.get('/registro', (req, res) => {
    res.render("register");
});

app.post('/registrar', (req, res) => {
    Usuarios.create({
        nome: req.body.nome,
        senha: req.body.senha,
        email: req.body.email
    }).then(() => {
        res.redirect('/');
    }).catch((erro) => {
        res.send("ERRO NO REGISTRO DO USUÁRIO!<br>+" + erro);
    });
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/logar', async (req, res) => {
    // Usuarios.findOne({where: {'senha' : req.body.senha, 'email' : req.body.email}}).then(() => {
    //     res.redirect("/inicio");
    // }).catch((erro) => {
    //     res.send("ERRO AO LOGAR: " + erro);
    // });
    const user = await Usuarios.findOne({where: {'email' : req.body.email,'senha' : req.body.senha}});

    if(!user) {
        res.redirect("/login");
    } else {
        res.redirect("/inicio");
    }
});


app.get("/inicio", (req, res) => {
    res.render('inicio');
});



app.listen(8081, () => {
    console.log("Servidor rodando!");
})