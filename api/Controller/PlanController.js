const db = require('../../models')
const Plan = db.plan
import { where } from 'sequelize';


export  async function create(plan){
    let createdPlan;
    try {
         createdPlan  = await Plan.create(plan);
    } catch (error) {
        console.log(error);

    }
    return createdPlan
}

export async function getPlanByName(name){
   
    let plan = await Plan.findOne({where:{
            name:name
        }})
        
    return plan;
}

export async function getPlanById(id){
    const plan =  await Plan.findOne({where:{id: id }})
    return plan;
}

export async function deleteById(id){
    try {
        await Plan.destroy({where:{id: id}});
    } catch (error) {
        console.error(error);
    }
     
}

export async function getAllPlan(offset, limit){
    const plans = await Plan.findAll({
        offset: offset,
        limit: limit
    })            
    return plans;
}
