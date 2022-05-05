let express = require("express"),
cors = require("cors"),
mongoose = require("mongoose"),
database = require("./database"),
bodyParser = require("body-parser");
mongoose.Promise = global.Promise;
mongoose
.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Base de datos conectada");
},
    (error) => {
        console.log("La base de datos no se pudo conectar: " + error);
    }
);
const usuarioAPI = require("./routes/usuario.route");
const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(cors());
// API
app.use("/api", usuarioAPI);
// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log("Connected to port " + port);
});
// Find 404
app.use((req, res, next) => {
    next(createError(404));
});
// error handler
app.use(function(err, req, res) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
