import {Request, Response} from 'express'
import Product_Model from '../models/product.models'
const product_Model=new Product_Model()

export const create= async(req:Request,res:Response) => {
    try {
        const product=await product_Model.create(req.body)
        res.status(200).json(product)
    } catch(err){
        res.status(400).json(err)
    }
}
        
export const deleteSingle= async(req:Request,res:Response ) => {
    try {
        const product=await product_Model.deleteSingle(req.params.id as string)
        res.status(200).json(product)
    } catch(err){
        res.status(400).json(err)
    }
}

export const RetrieveAll= async(_req:Request,res:Response) => {
    try {
        const products=await product_Model.RetrieveAll()
        res.status(200).json(products)
    } catch(err){
        res.status(400).json(err)
    }
}

export const RetrieveSingle= async(req:Request,res:Response) => {
    try {
        const product=await product_Model.RetrieveSingle(req.params.id as string)
        res.status(200).json(product)
    } catch(err){
        res.status(400).json(err)
    }
}

export const updateSingle= async(req:Request,res:Response) => {
    try {
        const product=await product_Model.updateSingle(req.body)
        res.status(200).json(product)
    } catch(err){
        res.status(400).json(err)
    }
}