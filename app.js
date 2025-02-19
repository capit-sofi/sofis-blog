import express from "express"
import ejs from "ejs"
import mongoose from  "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import blog from './models/models.js'


const app = express();

dotenv.config()
const port = process.env.port;
const mongo_url = process.env.mongo_url;

mongoose.connect(mongo_url).then(() => {
  console.log("database is connected");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/",(req,res) => {
  res.redirect('/blogs');
})

app.get("/about",(req,res) => {
  res.render("about.ejs",{title:"about"});
})
app.get("/blogs/create",(req,res) => {
  res.render("creat.ejs",{title:"creat"});
})
app.post("/create",(req, res) =>{
  console.log("req.body");
})
app.get("/blogs/:id", (req,res) => {
  const id = req.params.id;
  blog.findById(id).then(result => {
    res.render('details.ejs', {data: result, title: 'Blog Details', blog:blog})
  }).catch(err => {
    console.log(err);
  })
})
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id
 blog.findByIdAndDelete(id).then(
  res.redirect('/blogs')
 )
    

});
app.get("/blogs",(req,res) => {
  blog.find().sort({createdAt: -1})
  .then((result) => {
    res.render('index.ejs',{title:'ALL BLOGS', blogs: result})
  })
  .catch((err)=>{
    console.log(err);
  })
})
app.post("/blogs", (req, res) => {
  const newblog = new blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body
  })
  newblog.save();
  res.redirect("/blogs");
});



app.listen(port,console.log(`sorver running on port ${port}`));
