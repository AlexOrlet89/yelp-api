const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  // const zip = event.queryStringParameters.zip;
  // const category = event.queryStringParameters.category;
  const { zip, search } = event.queryStringParameters;
  console.log('this is the zip', zip);

  try {
    const response = await fetch(`https://api.yelp.com/v3/businesses/search?location=${zip}`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });
    const data = await response.json();
    const json = JSON.stringify(data);

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

// add code here to fetch data from yelp API
// be sure to include the parameters from event.queryStringParameters

module.exports = { handler };
