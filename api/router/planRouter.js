import * as planController from '../Controller/PlanController'
import express from 'express'
import { validatePlan as  validate } from '../middleware/planValidation'
import Joi from 'joi'


var router = express.Router()

router.get('/:name', async (req, res) => {
  let { name } = req.params
  
  try {
    let result = await planController.getPlanByName(name)
    console.log(`result`, result)
    return res.status(200).json(result)
  } catch (error) {
    return res.json({mesage: error.mesage, status: error.status})
  }
})

router.post('/', async (req, res) => {

  const validateData = await Joi.validate(req.body,validate);

  if (validateData.error) {
    return res.status(400).send(validateData.error.details[0].message)
  }

  const plan = {
    name: req.body.name,
    price: req.body.price,
    discription: req.body.discription
  }

  try {
    return res.status(200).json(await planController.create(plan));

  } catch (error) {
    return res.json( {message: error.message, status: error.status})
  }
})

router.get('/:offset, limit', async (req,res) => {
    let limit = req.query.offset;
    let offset = req.query.offset;

    try{

        const plans = await planController.getAllPlan(offset, limit);
        return res.status(201).json(plans);

    }catch(error){
        return res.json({message: error.message, status: error.status})
    }

})

router.delete('/:id', async (req, res) =>{
    try{
        await planController.deleteById(req.params.id);
        return res.status(200);
    }catch(error){
        return  res.status({message: error})
    }
})