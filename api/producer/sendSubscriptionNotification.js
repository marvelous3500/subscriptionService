const { Kafka } = require("kafkajs")
require("dotenv").config();


export async function produce( message){
    console.log("@@@@@@@@@@@ am called @@@@@@@@@@ ");
    try {

         const clientId =  "subscription-service";
         const brokers  = ['localhost:9092'];
         const kafka = new Kafka({ clientId, brokers })
         const producer = kafka.producer();
        let topic = "sentEmail";

        await producer.connect();
        await producer.send({
            topic,
            messages: [
                {
                    key: "sending email notification",
                    value: JSON.stringify(message),
                },
            ],
        })
        await producer.disconnect();
    } catch (error) {
        console.error(error)
       
    }
}

// let message  = {
//     "senderEmail": req.body.senderEmail,
//     "recipientEmail": req.body.recipientEmail,
//     "message": req.body.message,
//     "subject": req.body.subject,
// }