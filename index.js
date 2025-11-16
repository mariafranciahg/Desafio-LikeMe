const express = require("express");
const cors = require("cors");
const { agregarPosts, obtenerPosts } = require("./db/consultas");
const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, console.log("Servidor encendido"));

app.get("/posts", async (req,res) => {
    try {
        const posts = await obtenerPosts();
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener posts");
    }
})

app.post("/posts", async(req, res) => {
    try {
        const { titulo, url, descripcion, like } = req.body;
        await agregarPosts (titulo, url, descripcion, like );
        res.send ("Post agregado");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al agregar post");
    }

})