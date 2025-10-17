import { Request, Response } from "express";

export function carregar_login(req: Request, res: Response) {
    res.render('login');
}