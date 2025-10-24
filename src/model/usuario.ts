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
        'INSERT INTO user(name, email, senha) VALUES ($1, %2, %3;)',
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

// essa função deleta um usuario do banco
export async function deleteById(id: string) {
    await connection.query('DELETE FROM user WHERE id=$1', [id]);
}

//essa função atualiza os dados de um usuario no banco
export async function updateById(user: Usuario) {
    await connection.query(
        'UPDATE user SET name=$1, senha=$2, email=$3 WHERE id =$4;', 
        [
            user.nome,
            user.senha,
            user.email,
            user.id
        ]
    );
}

// essa função busca um usuario no banco
export async function getById(id: string) {
    const { rows } = await connection.query(
        'SELECT * FROM usuario WHERE id=$1',
        [id]
    );
    return rows[0];
}

export async function getByEmail(email: string) {
    const { rows } = await connection.query(
        'SELECT * FROM usuario WHERE email=$1',
        [email]
    );
    return rows[0];
}
