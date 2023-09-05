const {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  ChangeMessageVisibilityCommand,
} = require("@aws-sdk/client-sqs");
const {
  SNSClient,
  PublishCommand,
  SubscribeCommand,
  ListSubscriptionsByTopicCommand,
  UnsubscribeCommand,
  DeleteTopicCommand,
  ListTopicsCommand,
  CreateTopicCommand,
} = require("@aws-sdk/client-sns");
const { configObject } = require("./credentials");
//const sqsClient = new SQSClient(configObject);
//const queueUrl01 = "https://sqs.us-east-1.amazonaws.com/603576858557/consumer-01-queue";
//const queueUrl02 = "https://sqs.us-east-1.amazonaws.com/603576858557/consumer-02-queue";
const snsClient = new SNSClient(configObject);
const topicArn = "arn:aws:sns:us-east-1:603576858557:publisher-topic";
const publishCommand = async (messageBody, consumerID) => {
  try {
    const command = new PublishCommand({
      Message: messageBody,
      TopicArn: topicArn,
      MessageAttributes: {
        consumerID: {
          DataType: "String",
          StringValue: consumerID,
        },
      },
    });
    const response = await snsClient.send(command);
    console.log("Publishing Message for "+consumerID+"\n\tMessageId:"+response.MessageId);
  } catch (error) {
    console.log(error);
  }
};

publishCommand("Hello", "consumer-01");
publishCommand("Hello", "consumer-02");

// const sendMessage = async (messageBody,consumerID) => {
//     try {
//         const command = new SendMessageCommand({
//             QueueUrl: (consumerID === 'consumer-01')?queueUrl01:queueUrl02,
//             MessageBody: messageBody,
//             MessageAttributes: {
//                 consumerID: {
//                   DataType: 'String',
//                   StringValue: 'consumer-01'
//                 }
//               }
//             //DelaySeconds: 10,
//             // MessageDeduplicationId: 'string',
//             // MessageGroupId: 'string',
//         });
//         const response = await sqsClient.send(command);
//         console.log(response);
//     } catch (error) {
//         console.log(error);
//     }
// }
//sendMessage('hello2','consumer-01');
