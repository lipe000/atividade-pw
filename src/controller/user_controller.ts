import { Request, Response } from "express";

export function carregar_login(req: Request, res: Response) {
    res.render('login');
}

import { getByEmail, insert, Usuario } from "../model/usuario";


export function show_login(req: Request, res: Response) {
        res.render('login', { response: null});
}

export async function register(req: Request, res: Response) {
    const { name, email, senha } = req.body;

    if (!name || !email || !senha){
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

    const user: User = {
        name,
        email,
        senha
    }

    await insert(user);

    return res.render('login', {
            response: {
                type: 'success',
                value: 'Usuário cadastrado com sucesso!'
            }
        });
}
