
import  * as planService from '../service/planService'

export  async function create(plan){
    console.log(plan.name)
    let isExitedPlan  = await planService.getPlanByName(plan.name);

    if(isExitedPlan){
        throw new Error("Plan already exists");
    }

    return planService.create(plan)
}

export async function getPlanByName(name){
    return planService.getPlanByName(name);
}

export async function getPlanById(id){
    return planService.getPlanById(id);
}
export async function deleteById(id){
    planService.deleteById(id);
}

export async function getAllPlan(offset, limit){
    return planService.getAllPlan(offset, limit);
}
