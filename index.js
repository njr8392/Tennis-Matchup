const  express = require("express"); const app = express(); const bodyParser = require("body-parser");
const routes = require("./routes/index");
const port = process.env.PORT


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// set routes
app.use('/', routes);


app.listen(port, function(){
    console.log("server is up!");
});
