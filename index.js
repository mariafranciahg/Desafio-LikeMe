const express = require("express");
const cors = require("cors");
const { agregarPosts, obtenerPosts, modificarPosts, eliminarPosts } = require("./db/consultas");
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
        res.status(error.code || 500).send(error.message || "Error interno");
    }
});

app.post("/posts", async(req, res) => {
    try {
        const { titulo, url, descripcion, like } = req.body;
        await agregarPosts (titulo, url, descripcion, like );
        res.send ("Post agregado");
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error.message || "Error interno");
    }

});

app.put("/posts/like/:id", async(req, res) => {
    try {
        const {id} = req.params;
        await modificarPosts(id);
        res.send("Post modificado con éxito"); 
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error.message || "Error interno");
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
       const {id} = req.params;
       await eliminarPosts(id);
       res.send("Post eliminado con éxito");
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error.message || "Error interno");
    }
});