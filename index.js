let AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});

exports.handler = async (event) => {

  let params = {
    Message: 'Pay for yo Spotify bitch',
    PhoneNumber: '+5555555',
  };
  
  let publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
  
  // Handle promise's fulfilled/rejected states
  await publishTextPromise.then( function(data) {
    console.log("MessageID is " + data.MessageId);
    const response = {
      statusCode: 200,
      body: JSON.stringify("MessageID is " + data.MessageId)
    };
    console.log(response);
    return response;
  }).catch(
    function(err) {
      const response = {
        statusCode: 500,
        body: JSON.stringify("Error: " + err)
      };
      console.log(response);
      return response;
    }
  );
};
