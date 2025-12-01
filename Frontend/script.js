const express = require('express');
const { Pool } = require('pg'); // Se estiver usando PostgreSQL. Mude se for MySQL/outro
const app = express();
const PORT = 3000;

// ATENÇÃO: Configure os detalhes do seu banco de dados
const pool = new Pool({
    user: 'seu_usuario_bd',
    host: 'localhost',
    database: 'seu_banco_de_dados',
    password: 'sua_senha_secreta',
    port: 5432, 
});

// Middlewares
app.use(express.json()); 

// Configuração de CORS (Essencial para o Frontend acessar o Backend)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// ------------------------------------
// ROTAS DE TURMAS (Exemplo)
// ------------------------------------
app.get('/api/turmas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Turmas ORDER BY identificacao');
        res.json(result.rows);
    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        res.status(500).json({ error: 'Erro ao buscar turmas no banco de dados.' });
    }
});

app.post('/api/turmas', async (req, res) => {
    const { identificacao, curso, turno, ano, vagas_max } = req.body;
    try {
        const query = `
            INSERT INTO Turmas (identificacao, curso, turno, ano, vagas_max) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
        `;
        const result = await pool.query(query, [identificacao, curso, turno, ano, vagas_max]);
        res.status(201).json({ message: 'Turma criada com sucesso!', data: result.rows[0] });
    } catch (error) {
        console.error("Erro ao inserir turma:", error);
        res.status(400).json({ error: 'Erro ao cadastrar turma. Verifique os dados.' });
    }
});

// ------------------------------------
// Inicia o Servidor
// ------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});