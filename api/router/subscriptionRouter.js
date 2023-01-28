import * as subscriptionController from '../Controller/subscriptionController'
import *  as plainController from '../Controller/PlanController'
import express from 'express'
const db = require('../../models') // use inport 
const Plan = db.plan
import { where } from 'sequelize';

const router = express.Router();

router.put('/un_subscribe/:id', async  (req, res, next) => {
   let  {id} = req.params;
   let {email} = req.body;
   try{
      await subscriptionController.unsubscription(id,  email);
      res.status(200).json({ message:'you have subscribed to this subscription'})
   }catch(error){
    res.status(500).json({message: "server errror"})
   }

})

router.post('/', async (req, res) => {
//    const validateData = await Joi.validate(req.body,validate);
//   if (validateData.error) {
//      res.status(400).send(validateData.error.details[0].message)
//   }
    let {name,type,discription,subsctiption_start,subsctiption_end, planId} = req.body;
    try { 
        const plan = await Plan.findOne({ where:{id:planId}})
        if (!plan) {
         res.status(404).json("plain not found");
        }
        const subsription = {
            name: name,
            type: type,
            discription:discription,
            subsctiption_start:subsctiption_start,
            subsctiption_end: subsctiption_end,
            plan:plan.id,
            status:true
        }

       const result = await subscriptionController.subscribe(subsription);
       res.json(result).status(201);

    } catch (error) {
        res.status(500).json({message: "server errror"})
    }

})

router.get('/', async (req, res) => {
    try {
        let limit = req.query.limit;
        let offset = req.query.offset;
        let type = req.query.type;

        const subscribes =  await subscriptionController.getAllSubscriptions(limit, offset, type);
        res.json(subscribes).status(200);
    } catch (error) {
       res.json({message: "server error", status: 500})
        
    }

})

module.exports = router;
