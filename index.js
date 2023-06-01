const express = require('express');
const app = express();

const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

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

app.post('/', (req, res) => {
    res.render('start');
});

app.get("/inicio", (req, res) => {
    res.render('inicio');
})






app.listen(8081, () => {
    console.log("Servidor rodando!");
})