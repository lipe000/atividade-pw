import { Request, Response } from "express";

export function carregar_login(req: Request, res: Response) {
    res.render('login');
}

import { getByEmail, getByEmailAndSenha, insert, Usuario } from "../model/usuario";


export function show_login(req: Request, res: Response) {
        res.render('login', { response: null});
}

export async function register(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha){
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Preencha os campos corretamente'
            }
        });
    }

    const userFound = await getByEmail(email);

    if(userFound) {
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Preencha os campos corretamente'
            }
        });
    }

    const Usuario: Usuario = {
        nome,
        email,
        senha,
        data_criacao: ""
    }

    await insert(Usuario);

    return res.render('login', {
            response: {
                type: 'success',
                value: 'Usuário cadastrado com sucesso!'
            }
        });
}

export async function login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha){
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Preencha os campos corretamente'
            }
        });
    }

    const usuario = await getByEmailAndSenha(email, senha);

    if(!usuario){
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Email ou senha invalidos'
            }
        });
    }
    (req.session as any).usuario = {
        name: usuario.nome,
        email: usuario.email,
        id: usuario.id
    }
    res.redirect('/adm');
}