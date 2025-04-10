const redis = require('redis');
const client = redis.createClient({
    url:process.env.UPSTASH_REDIS_URL
});

client.on('error',(err)=>{
    console.log('redis error:',err)
})
// client.on('')