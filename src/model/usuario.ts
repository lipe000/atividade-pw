import { connection } from "../infra/connection";

export type Usuario = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    data_criacao: string;
}

// Funcionalidades (CRUD)

// essa função insere um usuario no banco
export async function insert(user: Usuario) {
    await connection. query(
        'INSERT INTO usuario(nome, email, senha) VALUES ($1, $2, $3)',
        [
            user.nome,
            user.email,
            user.senha
        ]
    );
}

//essa função retorna todos os usuarios do banco
export async function getAll() {
    const { rows } = await connection.query('SELECT * FROM usuario;');
    return rows;    
}

//essa função atualiza os dados de um usuario no banco
export async function updateById(user: Usuario) {
    await connection.query(
        'UPDATE usuario SET name=$1, senha=$2, email=$3 WHERE id =$4;', 
        [
            user.nome,
            user.senha,
            user.email
        ]
    );
}

// essa função busca um usuario no banco

export async function getByEmail(email: string) {
    const { rows } = await connection.query(
        'SELECT * FROM usuario WHERE email=$1;',
        [email]
    );
    return rows[0];
}

export async function getByEmailAndSenha(email: string, senha: string) {
    const { rows } = await connection.query(
        'SELECT * FROM usuario WHERE email=$1 AND senha=$2;',
        [email, senha]
    );
    return rows[0];
}
