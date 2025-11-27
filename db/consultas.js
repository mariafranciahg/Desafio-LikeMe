const { Pool } = require("pg");
require ("dotenv").config();

const pool = new Pool ( {
    
    allowExitOnIdle: true,
});

const obtenerPosts = async () => {
    try {
        const result = await pool.query("SELECT * FROM posts");
        return result.rows;
    } catch (error) {
        throw { code: 500, message: "Error al obtener los posts" };
    }
};

const agregarPosts = async (titulo, img, descripcion, likes) => {
    try {
        const values = [titulo, img, descripcion, likes];
        await pool.query(
            "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)",
            values
        );
    } catch (error) {
        throw { code: 500, message: "Error al agregar el post" };
    }
};

const modificarPosts = async (id) => {
    try {
        const consulta = "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1";
        const { rowCount } = await pool.query(consulta, [id]);

        if (rowCount === 0) {
            throw { code: 404, message: "No se consiguió ningún post con este id" };
        }
    } catch (error) {
        // Si es un error controlado, lo reenvía
        throw error.code ? error : { code: 500, message: "Error al modificar el post" };
    }
};

const eliminarPosts = async (id) => {
    try {
        const consulta = "DELETE FROM posts WHERE id = $1";
        const { rowCount } = await pool.query(consulta, [id]);

        if (rowCount === 0) {
            throw { code: 404, message: "No se consiguió ningún post con este id" };
        }
    } catch (error) {
        throw error.code ? error : { code: 500, message: "Error al eliminar el post" };
    }
};

module.exports = { obtenerPosts, agregarPosts, modificarPosts, eliminarPosts };
