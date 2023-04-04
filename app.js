const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));








let PORT = process.env.PORT;

if(PORT === null || PORT === undefined || PORT === "") {
    PORT = 3000;
}

app.listen(PORT, function() {
    console.log("listening on port: " + PORT);
});