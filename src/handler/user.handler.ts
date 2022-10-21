import {Request, Response} from 'express'
import User_Model from '../models/user.models'
import jwt from 'jsonwebtoken'
import config from '../config'
const user_Model=new User_Model()   

export const authenticate= async(req:Request,res:Response,) => {
    try {
        const u = await user_Model.authenticateUser(req.body.email,req.body.password_digest)
        if(!u){return res.status(401)}
        res.status(200).json(jwt.sign({u},config.token as unknown as string))
    } catch(err){
        res.status(400).json(err)
    }
}

export const create= async( req:Request,  res:Response,) => {
    try {
        const user=await user_Model.create(req.body)
        res.json(user)
    } catch(err){
        res.status(400).json(err)
    }
}
        
export const deleteSingle= async(req:Request,res:Response,) => {
    try {
        const user=await user_Model.deleteSingle(req.params.id as string)
        res.json(user)
    } catch(err){
        res.status(400).json(err)
    }
}

export const RetrieveAll= async(_:Request,res:Response) => {
    try {
        const user=await user_Model.RetrieveAll()
        res.json(user)
    } catch(err){
        res.status(400).json(err)
    }
}

export const RetrieveSingle= async(req:Request,res:Response) => {
    try {
        const user=await user_Model.RetrieveSingle(req.params.id as unknown as string)
        res.json(user)
    } catch(err){
        res.status(400).json(err)
    }
}

export const updateSingle= async(req:Request,res:Response) => {
    try {
        const user=await user_Model.updateSingle(req.body)
        res.json(user)
    } catch(err){
        res.status(400).json(err)
    }
}