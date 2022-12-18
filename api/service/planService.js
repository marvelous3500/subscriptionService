import { where } from 'sequelize';
const Plan =require('../..').Plan

export async function create(plan){
    let createdPlan = await Plan.create(plan);
    return createdPlan;
}

export async function getPlanByName(name){
    let plan = await Plan.findOne({

        where:{
            name: name
        }})
    return plan; 
}

export async function getAllPlan(offset, limit){
   let  allPlansbyPagination =  await Plan.findAll({
    offset: offset,
    limit:limit
    })

    return allPlansbyPagination;
}



export async function deleteById(id){
    await Plan.destroy({
        where : {id:id}
    } )

}

export async function getPlanById(id){
    let plan = await Plan.findOne({

        where:{
            id: id
        }})
    return plan; 
}

