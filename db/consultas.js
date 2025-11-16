const { Pool } = require("pg");
require ("dotenv").config();

const pool = new Pool ( {
    
    allowExitOnIdle: true,
});

const obtenerPosts = async () => {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
};


const agregarPosts = async (titulo, img, descripcion, likes) => {
    const values = [titulo, img, descripcion, likes];
    await pool.query ("INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)", values);
};

module.exports = { obtenerPosts, agregarPosts };
