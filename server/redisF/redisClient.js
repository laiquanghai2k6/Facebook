
const { createClient } = require('redis');
const client = createClient ({
  url : "rediss://default:AUBgAAIjcDE1Zjk2NjcyZGEwMGQ0ZTUyODIzOTdiNzVmZDEyZTJhM3AxMA@innocent-mink-16480.upstash.io:6379"
});


(async () => {
  try {
    await client.connect();

    console.log('redis lived');
    client.on('error', (err) => {
      console.log('redis error:', err)
    })
  } catch (err) {
    
  }
})();




module.exports = client;

