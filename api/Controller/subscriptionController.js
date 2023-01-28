import * as producer from '../producer/sendSubscriptionNotification'
const db = require('../../models')
import { where } from 'sequelize';
const Subscription = db.subscription
var cron = require('node-cron');

export async function subscribe(subscription){
    let createdSubscribtion;
    try {

    vilidateSubscriptionDate(subscription.subsctiption_start, subscription.subsctiption_end)
    createdSubscribtion = await Subscription.create(subscription);
    await producer.produce(generateSubscriptionMessage(subscription, subscription.email));

    } catch (error) {
        console.error(error)
        throw new  Error(error.message)
    }

    return createdSubscribtion;
}

export async function getAllSubscriptions(limit, offset){

    const subscriptions = await Subscription.findAndCountAll({
        limit:limit,
        offset:offset
     })

    return subscriptions
}


export async function unsubscription(id, email){
  
    try {

       await Subscription.update({status:false, renew:false}, {
              where: { id:id}
            });

        await producer.produce(generateSubscriptionMessage(unSubscribed, userEmail));
        
    } catch (error) {
       
        throw new Error(error);
    }

}

// unsubscription to  all daily subscriptions 
cron.schedule('0 0 1 * *', async () => {
    todaysDate = new Date().toString();
    dailySubscritions = await Subscription.findAll({
        where:{
            type:'DAYLY',
            renew:true,
            status:true,
            subsctiption_end:todaysDate
        }
    })

    for( let dailySubscrition of dailySubscritions){
        let {id, subsctiption_start, subsctiption_end, type} = dailySubscrition;
        let userEmail = 'marvelous3500@gmail.com';

        vilidateSubscriptionDate(subsctiption_start, subsctiption_end, type)
         await unsubscription(id, userEmail);
         await producer.produce(generateSubscriptionMessage(dailySubscrition, userEmail))
        }
    });

//  unsubscription to a all monthly subscriptions   
cron.schedule('*/1 * * * *',async () => {
        todaysDate = new Date().toString();

        let monthly = await Subscription.findAll({
            where: {
                type: 'MONTHLY',
                renew: true,
                status: true,
                subsctiption_end: todaysDate
            }
        });
 
        for (let monthlySubscrition of monthly) {
            let userEmail = 'marvelous3500@gmail.com'; /// for testing  purposes
            let { id, subsctiption_start, subsctiption_end, type } = monthlySubscrition;
            
            vilidateSubscriptionDate(subsctiption_start, subsctiption_end, type);
            await unsubscription(id, userEmail);
            await producer.produce(generateSubscriptionMessage(monthlySubscrition, userEmail));
        }
    })


function  vilidateSubscriptionDate(startDay, endDay, type) {

    if(type == "DAILY" && numbersOfdays(startDay,endDay) > 1){
        throw new Error(" Your subscription plan is not a daily subscription");
    }

    if(type == "MONTHLY" && numbersOfdays(startDay, vilidateSubscriptionDate) > 31){
        throw new Error(" Your subscription plan is not a monthly subscription");
    }

    if(type == "YEARLY" && numbersOfdays(startDay, vilidateSubscriptionDate) <  365 ){
        throw new Error(" Your subscription plan is not a yearly subscription");
    }

}

function numbersOfdays(date_1, date_2) {
    let difference = date_1.getTime() - date_2.getTime();
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return   totalDays
}


function generateSubscriptionMessage(subscription, userEmail){
    let subscriptionMessage  = {
        "senderEmail":process.env.EMAIL_SENDER,
        "recipientEmail": userEmail,
        "message": "Hello, thanks you for subscribing to  " + subscription.name,
        "subject": "Subscription to " + plan.name
    }

    return subscriptionMessage;
}
