const axios = require("axios");

let pollingInterval;
function handleErr(err) {
  clearInterval(pollingInterval);
  callback(err, {
    statusCode: 500,
    body: `Something went wrong parsing your request: ${err}`
  });
}

function sendBody(body) {
  callback(null, {
    statusCode: 200,
    body
  });
}

exports.handler = async function(event, context, callback) {
  const url = process.env.GATSBY_311_URL;
  console.log(event.body);
  try {
    const data = JSON.parse(event?.body);
  } catch (err) {
    console.error(err);
    handleErr(err);
  }

  const { token } = data;

  pollingInterval = setInterval(() => {
    console.log("Checking if token has converted");
    axios
      .get(`${url}/open311/v2/tokens/${token}.json`)
      .then(({ data }) => {
        console.log(data);
        if (data[0].service_request_id) {
          clearInterval(pollingInterval);
          axios
            .get(
              `${url}/open311/v2/requests.json?service_request_id=${
                data[0].service_request_id
              }`
            )
            .then(({ data }) => {
              sendBody(JSON.stringify(data[0]));
            })
            .catch(err => {
              console.error(err);
              handleErr(err);
            });
        }
      })
      .catch(err => {
        console.error(err);
        handleErr(err);
      });
  }, 1000);
};