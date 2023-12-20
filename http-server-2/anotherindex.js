const express = require('express')
const app = express();
var users = [{
    name: 'John',
    kidneys:[{
        health: false
    },{
        health: true
    }]

}]

function healthyKidneyCount(n){
    //id is users[0] for now
    let healthyCount = 0;
    for(let i=0; i< n; i++){
        if(users[0].kidneys[i].health === true) healthyCount++;
    }
    return healthyCount;
}

//Same route (/) but different methods
//1. GET -> Users can check how many kidneys they have and their health
//2. POST -> User can add a new kidney
//3. PUT -> User can replace a kidney, make it healthy
//4. DELETE -> User can remove a kidney

app.get('/', function(req, res){
    //how many kidneys they have
    const numberOfkidneys = (users[0].kidneys).length;
    
    //how many healthy kidneys they have
    const healthyKidneys = healthyKidneyCount(numberOfkidneys);
    if(healthyKidneys === 1){
        res.send(users[0].name + ' has just ' + healthyKidneys.toString() + ' healthy Kidney and a total of ' + numberOfkidneys.toString() + ' kidneys ')
    }
    else{
        res.send(users[0].name + ' has ' + healthyKidneys.toString() + ' healthy Kidneys and a total of ' + numberOfkidneys.toString() + ' kidneys ')
    }
})

app.use(express.json());

app.post('/', function(req, res){ //for post requests you send data in the body
    const isHealthy = req.body.isHealthy;
    //the following logic just pushes a new kidney
    users[0].kidneys.push({
        health: isHealthy
    })
    // res.json({
    //     msg: "Done"
    // })
    res.send('The kidney has been updated')
})

app.put('/', function(req, res){
    //the following logic changes all the healthy and the unhealthy kidneys to become healthy
    for(let i=0; i< (users[0].kidneys).length; i++){
        users[0].kidneys[i].health = true;
    }
    res.json({
        msg: "Updated changes!"
    })
})

app.delete('/', function(req,res){
    //remove all the unhealthy kidneys if anyone sends a delete request
    const newKidneys = [];
    for (let i = 0; i < (users[0].kidneys).length; i++) {
        if(users[0].kidneys[i].health){
            newKidneys.push({
                health: true
            })
        }
        
    }
    users[0].kidneys = newKidneys;
    res.send('All changes done')
})


app.listen(3000)