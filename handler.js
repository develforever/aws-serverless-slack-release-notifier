require('dotenv').config();
const AWS = require('aws-sdk');

exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};


const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.saveMessage = async (event) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'releases',
    Item: {
      id: data.id,
      message: data.message,
      timestamp: Date.now(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message saved successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not save message', message: error.message, stack: error.stack }),
    };
  }
};

const axios = require('axios');

module.exports.handleRelease = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const newRelease = record.dynamodb.NewImage;
      const message = newRelease.message.S;

      try {
        await axios.post(`${process.env.SLACK_WEBHOOK_URL}`, {
          text: `New release message: ${message}`,
        });
      } catch (error) {
        console.error('Error sending Slack notification', error);
      }
    }
  }
};

