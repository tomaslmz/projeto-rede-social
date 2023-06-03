const express = require('express');
const app = express();

const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const Usuarios = require('./model/Usuarios');
const Postagens = require('./model/Postagens');

var users;

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
        res.redirect("/registro");
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
    user = await Usuarios.findOne({where: {'email' : req.body.email,'senha' : req.body.senha}});

    if(!user) {
        res.redirect("/login");
    } else {
        users = await Usuarios.findOne({where: {'email' : req.body.email, 'senha' : req.body.senha}});
        res.redirect("/inicio");
    }
});

app.get("/inicio", async (req, res) => {

    const posts = await Postagens.findAll({order: [['id', 'DESC']]});
    if(!users) {
        res.redirect('/');
    } else {
        res.render("inicio", {usuario: users, posts: posts});
    }
});

app.get("/post", (req, res) => {
    res.render("post");
});

app.post("/postar", (req, res) => {
    Postagens.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        idUsuario: users.id
    }).then(() => {
        res.redirect("inicio");
    }).catch((erro) => {
        res.send(erro);
    })
});

app.get("/sair", (req, res) => {
    users = null;
    res.redirect("/");
});


app.listen(8081, () => {
    console.log("Servidor rodando!");
})