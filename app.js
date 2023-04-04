const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

    .get(async (req, res) => {
        let articles = await Article.find();
        res.send(articles);
    })

    .post(function(req,res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
    
        newArticle.save();
    
        res.send(newArticle);
    })

    .delete(async function(req, res) {
        const all = await Article.deleteMany().then(function(){
            console.log("Data deleted"); // Success
        }).catch(function(error){
            console.log(error); // Failure
        });
    
        res.send(all);
    });

app.route("/articles/:articleTitle")

    .get(async (req, res) => {
        let article = await Article.find({title: req.params.articleTitle});
        res.send(article);
    })

    .put(async (req, res) => {
        await Article.replaceOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            {overwrite: true}
        ).catch(function(error){
            if(error) {
                console.log(error);
            }
            else {
                console.log("updated successfully");
            }
        })
    });




let PORT = process.env.PORT;

if(PORT === null || PORT === undefined || PORT === "") {
    PORT = 3000;
}

app.listen(PORT, function() {
    console.log("listening on port: " + PORT);
});