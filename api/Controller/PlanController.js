
import  * as planService from '../service/planService'

export  async function create(plan){
    let isExitedPlan  = await planService.getPlanByName(plan.name);

    if(isExitedPlan){
        throw new Error("Plan already exists");
    }

    return planService.create(plan)
}

export async function getPlanByName(name){
    return planService.getPlanByName(name);
}

export async function deleteById(id){
    planService.deleteById(id);
}

export async function getAllPlan(offset, limit){
    return planService.getAllPlan(offset, limit);
}
