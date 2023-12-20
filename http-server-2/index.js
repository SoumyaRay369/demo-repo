function calculateSum(n){
    let ans = 0;
    for(let i=1; i< n; i++){
        ans+= i;
    }
    return ans;
}

// console.log(calculateSum(5))

//Instead of logging, I will expose this to the world

//To expose this to the world, I need to do that over the Internet while following the HTTP Protocol

const express = require('express')
const app = express();

app.get('/', function(req, res){
    const n = req.query.n;
    const ans = calculateSum(n);
    res.send(ans.toString()); //do not send back a number, otherwise it thinks that it is a status code
})

app.listen(3000);