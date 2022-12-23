import * as subscriptionService from  '../service/subscriptionService'
import *  as plainSeverice from '../service/planService'
require("dotenv").config();
import * as producer from '../producer/sendSubscriptionNotification'

var cron = require('node-cron');

export async function subscribe(subscription){
    vilidateSubscriptionDate(subscription.subsctiption_start, subscription.subsctiption_end)
    let createdSubscribtion = await subscriptionService.create(subscription);
    await producer.produce(generateSubscriptionMessage(subscription, subscription.email));
    
    return createdSubscribtion;
}


export  async function getAllSubscriptions(limits, offset, type){
   return subscriptionService.getAllSubcriptions(limits, offset, type)
}


export async function unsubscription(id, userEmail){
    let subscription = await subscriptionService.getSubscritionById(id);
    subscription.status = false;
    subscription.renew = false;

    let response = await subscriptionService.update(subscription);
    await producer.produce(generateSubscriptionMessage(response, userEmail));
}

// create a method that will auto renew subscription plan  will call the payment servcie and make payment 

// crate a  will send a notification to user teeling them that there plan will expire in  3 or 2 days to come 



// unsubscription to  all daily subscriptions 
cron.schedule('*/1 * * * *', () => {
    todaysDate = new Date().toString();
    dailySubscritions = subscriptionService.getAllMonthLySubscritions();
    dailySubscritions.forEach(subscription =>{   
        unsubscription(subscription.id);
        subscriptionService.deleteById(subscription.id);
     })  
})


//  unsubscription to a all monthly subscriptions   
cron.schedule('*/1 * * * *',function monthlyUnSubscritions(){
    todaysDate = new Date().toString();
    subscriptionService.getAllMonthlySubscritionsToBeUnSubscribe(todaysDate).forEach(subscribe =>{
        unsubscription(subscribe.id);
        subscriptionService.deleteById(subscription.id);
     })
})


function vilidateSubscriptionDate(startDay, endDay, subscription) {
    subscribetionStartDate = new Date(startDay);
    subscribeEndDate = new Date(endDay);

    if(subscribetionStartDate.type == "DAILY" && numbersOfdays(subscribetionStartDate,subscribeEndDate) > 1){
        throw new Error(" Your subscription plan is not a daily subscription");
    }

    if(subscribeEndDate.type == "MONTHLY" && numbersOfdays(subscribetionStartDate, vilidateSubscriptionDate) > 31){
        throw new Error(" Your subscription plan is not a monthly subscription");
    }

    if(subscribeEndDate.type == "YEARLY" && numbersOfdays(subscribetionStartDate, vilidateSubscriptionDate) <  365 ){
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
