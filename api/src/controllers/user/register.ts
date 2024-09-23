import { Request, Response } from "express";
import { RegisterService } from "../../services/register";
import { PrismaUserRository } from "../../repositories/prisma/prisma-user-repository";
import { EmailAlreadyExists } from "../../services/errors/email-already-exists";


export async function register(req: Request, res: Response) {
    try {
        const userRepository = new PrismaUserRository
        const registerService = new RegisterService(userRepository)
    
        await registerService.execute(req, res)
        
        res.status(201).send('user created')
    }
    catch(err) {
        if(err instanceof EmailAlreadyExists) {
            res.status(401).send(err.message)
        }
    }
}