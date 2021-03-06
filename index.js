const express   = require('express');
const app       = express();

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('dist'));

app.get('/', (req,res)=>{
    res.render('home');
})

app.listen(5001, ()=>{console.log("Server started with port 5001!")});