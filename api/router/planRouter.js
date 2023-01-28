import * as planController from '../Controller/PlanController'
import express from 'express'


var router = express.Router()

router.get('/:name', async (req, res) => {
  let { name } = req.params
  
  try {
    let result = await planController.getPlanByName(name);

    if(!result){
     return res.status(404).json({message: 'Plan not found'});
    }

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({message: error});
  }
})

router.post('/', async (req, res) => {

  // const schema = Joi.object().keys({
  //   name: Joi.string().alphanum().min(2).max(30).required(),
  //   price: Joi.string().alphanum().min(2).max(30).required(),
  //   discription: Joi.string().alphanum().min(2).max(30).required()
  
  // })

  // schema.validate(req.body,schema);

  // if (validateData.error) {
  //   return res.status(400).send(validateData.error.details[0].message)
  // }

  const plan = {
    name: req.body.name,
    price: req.body.price,
    discription: req.body.discription
  }

  try {
    let result = await planController.create(plan)
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json( {message: "server error"});
  }
})

router.get('/', async (req,res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
  
    try{
        const plans = await planController.getAllPlan(offset, limit);
        return res.status(200).json(plans);

    }catch(error){
        return res.status("200").json({message: error});
    }

})

router.delete('/:id', async (req, res) =>{
  let {id} = req.params
    try{
        await planController.deleteById(id);
        return res.status(200);
    }catch(error){
        return  res.status({message: error})
    }
})

module.exports = router;
