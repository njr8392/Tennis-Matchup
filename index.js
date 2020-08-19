const  express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/index");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// set routes
app.use('/', routes);


app.listen(3000, function(){
    console.log("server is up!");
});