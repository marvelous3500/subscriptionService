import { where } from 'sequelize';
const Subscription =require('../../models').Subscription

export async function create(subscription){
    subscription.status = true;
    let created_subscription = await Subscription.create(subscription);
    return created_subscription;
}

export async function getSubscritionByName(name){
    let subscription = await Subscription.findOne({

        where:{
            name: name
        }})
    return subscription; 
}

export async function getSubscritionById(id){
    let subscription = await Subscription.findOne({

        where:{
            id: id
        }})
    return subscription; 
}

export async function getAllSubcriptions(offset, limit, type){
   let  allSubscriptionsbyPagination =  await Subscription.findAll({
    offset: offset,
    limit:limit, 
    where: {
        type:type

    }
    })

    return allSubscriptionsbyPagination;
}



export async function deleteById(id){
    await Subscription.destroy({
        where : {id:id}
    } )

}


export async function update ( subscribe) {
const updatedSubscription = await Subscription.update(subscribe, {
        where: {
            id: subscribe.id
        }
    });
    return updatedSubscription;
}

export async function getAllDailySubscritionsToBeUnSubscribe(todayDate){
    const dailySubscritions =  await Subscription.findAll(
        {where:{
            type:"DAILY",
            renew: false,
            subsctiption_end:todayDate
        }}
    )

    return dailySubscritions;
}

export async function getAllMonthlySubscritionsToBeUnSubscribe(todayDate){
    const monthlySubscritions =  await Subscription.findAll(
        {
            where:{
            type:"MONTHLT",
            renew: false,
            subsctiption_end:todayDate
        }}
    )

    return monthlySubscritions;
}

export async function getAllMonthLySubscritions(){
    const monthlySubscritions =  await Subscription.findAll(
        {
            where:{
            type:"MONTHLT",
            renew: false
        }}
    )

    return monthlySubscritions;
}


export async function getallYearlySubscritions(){
    const yearlySubscritions =  await Subscription.findAll(
        {
            where:{
            type:"MONTHLT",
            renew: false
        }}
    )

    return yearlySubscritions;
}

