const express = require("express");
const app = express();
const cors = require("cors");
const { pool } = require("./data/data");
app.use(express.json());
app.use(cors());
app.listen(3000, () => {
    console.log("Servidor está ativo na porta 3000!");
});

process.on('SIGINT', () => {
    pool.end();
    process.exit();
});

let register = null;

app.post("/api/registerUser", async (req, res) => {
    try {
        register = await pool.connect();
        const { nome, email, senha } = req.body;
        await register.query(`INSERT INTO Users (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`);
        res.status(200).send("Cadastro realizado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Não conectou ao servidor");
    } finally {
        register.release();
    }
})

app.get('/api/getUsers', async(req, res) => {
    try {
        register = await pool.connect();
        const data = await register.query(`SELECT * FROM Users`);
        console.table(data.rows);
        res.status(200).send(data.rows)
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro na consulta")
    }
})

app.put("/api/putUser", async (req, res) => {
    try {
        register = await pool.connect();
        const { id, nome, email, senha } = req.body;
        await register.query('UPDATE Users SET nome = $1, email = $2, senha = $3 WHERE id = $4',[nome, email, senha, id]);
        res.status(200).send("Cadastro alterado com sucesso!");
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Não conectou ao servidor");
    } finally {
        register.release();
    }
})


app.delete("/api/deleteUser", async (req, res) => {
    try {
        register = await pool.connect();
        const { id } = req.body;
        await register.query(`DELETE FROM Users WHERE id = ${id}`);
        res.status(200).send("Usuário deletado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Não conectou ao servidor");
    } finally {
        register.release();
    }
})