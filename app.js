const express = require("express");
const https = require("https");
const bosyParser = require("body-parser");
const bodyParser = require("body-parser");

const app= express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");  // sends the file index.html over to the browser

    })

    app.post("/", function(req,res){            // app.post :: catches the post request
       

        const query = req.body.cityName;
        const apiKey="dcb5e6b7a9c82949e83329b1d22230d5";
        const unit = "metric"
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+unit;
        https.get(url ,function(response){
            console.log(response.statusCode);
    
            // for getting the actual data as output :: .go() function
    
            response.on("data", function(data){
                //console.log(data);  // output is in hexadecial:: not so useful for us
                // for output as js object :: JSON.parse();
                //JSON.parse()::from string to object code (opens up)
                const weatherData=JSON.parse(data)
                console.log(weatherData);
                const temp = weatherData.main.temp
                const weatherdes = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
                
                
                res.write("<h1>The temperature in "+ query+" is "+ temp + "degree celcius.</h1>")
                res.write("<p> The weather is currently with "+ weatherdes + "</p>")
                res.write("<img src="+imageURL+">");
                res.send()
                // we cannot have more than one res.send in any given one of these app methods else it will crash down
    
                /* JSON.stringify(object) :: from object code to string(closes down) 
    
                const object={
                    name: "Shree Ram",
                    favouritePlant:"Tulsi"
                }
                console.log(JSON.stringify(object));*/
    
    
    
            })
       

    })

    
})




app.listen(3000,function() {
    console.log("Server is running at port 3000");
})