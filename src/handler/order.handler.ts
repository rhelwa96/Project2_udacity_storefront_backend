import {Request, Response} from 'express'
import Order_Model from '../models/order.models'
const order_Model=new Order_Model()

export const create= async(req:Request,res:Response) => {
try {
    const order=await order_Model.create(req.body)
    res.status(200).json(order)
    } catch(err){
    res.status(400).json(err)
    }
}

export const deleteSingle= async(req:Request,res:Response) => {
    try {
    const order=await order_Model.deleteSingle(req.params.id as string)
    res.status(200).json(order)
    } catch(err){
    res.status(400).json(err)
    }
}

export const RetrieveAll= async(_req:Request,res:Response) => {
    try {
    const order=await order_Model.RetrieveAll()
    res.status(200).json(order)
    } catch(err){
        res.status(400).json(err)
    }
}

export const RetrieveSingle= async(req:Request,res:Response) => {
try {
    const order=await order_Model.RetrieveSingle(req.params.id as unknown as string)
    res.status(200).json(order)
    } catch(err){
        res.status(400).json(err)
    }
}

export const updateSingle= async(req:Request,res:Response
) => {
try {
    const order=await order_Model.updateSingle(req.body)
    res.status(200).json(order)
    } catch(err){
        res.status(400).json(err)
    }
}
export const createOrder_Product= async(req:Request,res:Response) => {
try {
    const order=await order_Model.createOrder_Product(req.body)
    res.json(order)
    } catch(err){
    res.status(400).json(err)
    }
}