import * as subscriptionController from '../Controller/subscriptionController'
import *  as plainController from '../Controller/PlanController'

import express from 'express'
import { response } from 'express';

const router = express.Router();

router.get('/un_subscribe/:id', async  (req, res) => {
   let  {id} = req.params;
   try{
        await subscriptionController.unsubscription(id);
        return res.json({mesage: "you have unsubscribed successfully"})
   }catch(error){
    return res.json({mesage: error.mesage, status: error.status})};

})

router.post('/', async (req, res) => {
   // const validateData = await Joi.validate(req.body,validate);
//   if (validateData.error) {
//     return res.status(400).send(validateData.error.details[0].message)
//   }

    const subsription = {
        name: req.body.name,
        type: req.body.type,
        discription: req.body.discription,
        subsctiption_start: req.body.subsctiption_start,
        subsctiption_end: req.body.subsctiption_end,
        plainId: req.body.plainId
    }

    try { 
        let plan = plainController.getPlanById(subsription.plainId);
        if (!plan) {
            return res.json("plain not found").status(404);
        }
       let  result =  await subscriptionController.subscribe(subsription);
       return res.json(result).status(201);
    } catch (error) {
        return res.json({message: error, status: error.status})
    }

})

router.get('/', async (req, res) => {
    try {
        let limit = req.query.limit;
        let offset = req.query.offset;
        let type = req.query.type;

        let subscribes =  await subscriptionController.getAllSubscriptions(limit, offset, type);
        return response.json(subscribes).status(200);
    } catch (error) {

        return res.json({message: error, status: error.status})
        
    }

})

module.exports = router;
