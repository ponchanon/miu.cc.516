const { 
    SQSClient, 
    SendMessageCommand, 
    ReceiveMessageCommand, 
    DeleteMessageCommand,
    ChangeMessageVisibilityCommand,
} = require('@aws-sdk/client-sqs'); 
const {configObject} = require("./credentials");
const sqsClient = new SQSClient(configObject);  
const queueUrl01 = 'https://sqs.us-east-1.amazonaws.com/603576858557/consumer-01-queue';
const queueUrl02 = 'https://sqs.us-east-1.amazonaws.com/603576858557/consumer-02-queue';  
const receiveMessage = async (consumerID,queueUrl) => {
    try {
        const attributeFilters = {
            consumerID: consumerID
          };
        const filterEntries = Object.entries(attributeFilters).map(([name, value]) => ({
            Key: name,
            Value: value,
            DataType: value.DataType
          }));
        const command = new ReceiveMessageCommand({
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 20,
            VisibilityTimeout: 30,
            WaitTimeSeconds: 10,
            AttributeNames: ['All'],
            //MessageAttributeNames: ['All'],
            MessageAttributeFilters: filterEntries
        });
        const response = await sqsClient.send(command);
        if (response.Messages) {
            console.log('Received', response.Messages.length, 'message(s) for '+consumerID);
            response.Messages.forEach(message => {
                const messageBody = JSON.parse(message.Body);
                console.log('\t\tMessage:', messageBody.Message+", "+consumerID);
                console.log('\t\tTopicArn:', messageBody.TopicArn);
                console.log();
            });
          } else {
            console.log('No messages available');
          }
    } catch (error) {
        console.log(error);
    }
};
receiveMessage('consumer-01',queueUrl01);
receiveMessage('consumer-02',queueUrl02);

const DeleteMessageFromQueue = async (queueUrl, receiptHandle) => {
    try {
        const data = await sqsClient.send(
            new DeleteMessageCommand({
                QueueUrl: queueUrl,
                ReceiptHandle: receiptHandle
                })
        );
        console.log('Message deleted successfully');
    } catch (error) {
        console.error('Error deleting message:', error);
    }
};