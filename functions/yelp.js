const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

exports.handler = async (event, context) => {
  const zip = event.queryStringParameters.zip;
  const category = event.queryStringParameters.category;
  //   const {zip, category} = event.queryStringParameters;
  console.log('this is the zip', { zip, category });

  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${zip}&category=${category}`
    );
    const data = await response.json();
    const json = JSON.stringify({ data });

    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
