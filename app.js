const express = require('express');
const hbs = require('hbs');
const request =require('request');
const geo = require('./weather');
var app=express();
var apiKey="e85e0a3142231dab28a2611888e48f22";

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'hbs');
var source,slat,slng;
var icons = {
    darkSky: {
        'clear-day': '/images/sun.svg',
        'clear-night': '/images/moon-full.svg',
        'rain': '/images/umbrella.svg',
        'snow': '/images/snowflake.svg',
        'sleet': '/images/cloud-hail.svg',
        'wind': '/images/wind.svg',
        'fog': '/images/cloud-fog.svg',
        'cloudy': '/images/cloud.svg',
        'partly-cloudy-day': '/images/cloud-sun.svg',
        'partly-cloudy-night': '/images/cloud-moon.svg',
    },
    'openWeather': {
        '01d': '/images/sun.svg',
        '02d': '/images/cloud-sun.svg',
        '03d': '/images/cloud.svg',
        '04d': '/images/cloud.svg',
        '09d': '/images/umbrella.svg',
        '10d': '/images/umbrella.svg',
        '11d': '/images/umbrella.svg',
        '13d': '/images/snowflake.svg',
        '50d': '/images/cloud-fog.svg',
        '01n': '/images/moon-full.svg',
        '02n': '/images/cloud-moon.svg',
        '03n': '/images/cloud-moon.svg',
        '04n': '/images/cloud.svg',
        '09n': '/images/umbrella.svg',
        '10n': '/images/umbrella.svg',
        '11n': '/images/umbrella.svg',
        '13n': '/images/snowflake.svg',
        '50n': '/images/cloud-fog.svg',
    },
};
var msg="city not found"
app.get('/',(req,res)=>{
    res.render('index');
})
    app.post('/',(req, res, next)=>{
        let city = req.body.loc.replace(/\s/g, "");
        let precipitation;
       geo.getlocation(city).then((code)=>{
          var slat=code.source.results[0].geometry.location.lat;
          var slng=code.source.results[0].geometry.location.lng;
          var address= code.source.results[0].formatted_address;
           let url2=`https://api.darksky.net/forecast/f4f563e7d41f2f9f60c29b6bb0b7a99d/${slat},${slng}`;
           console.log(url2);
           request(url2,(err,darkresult,darkbody)=>{


              let DB= JSON.parse(darkbody);
console.log(DB)
console.log(JSON.stringify(darkbody));
               precipitation=DB.currently.precipProbability*100;
               var tem=DB.currently.temperature;
               var darkSky = {
                   source: "DarkSky",
                   icon_id: DB.currently.icon,
                   icon: icons.darkSky[DB.currently.icon],
                   address: address,
                   temperature: Math.round(tem * 10)/10,
                   summary: DB.currently.summary,
                  precip: DB.currently.precipProbability,
                   humidity:DB.currently.humidity,
                   hourly:DB.hourly,
                   daily:DB.daily,
               };
               let cityy = req.body.loc;

               let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityy}&units=imperial&appid=${apiKey}`;               console.log(url)

               request(url,(err,result,body)=>{

                   let bod=JSON.parse(body);
                   console.log(err)
                   console.log(bod.message)
                   if(parseInt(bod.cod)==404){
                       res.render('index',{
                           error:err,
msg:msg,

                       });
                   }
               else {
                       var openWeather = {
                           source: "OpenWeather",
                           icon_id: bod.weather[0].icon,
                           icon: icons.openWeather[bod.weather[0].icon],
                           address: address,
                           temperature: Math.round(bod.main.temp * 10) / 10,
                           summary: bod.weather[0].main,
                           humidity: bod.main.humidity,
                           precipitation: "NULL"
                       };


                       res.render('index', {
                           pass: darkSky,
                           dark: darkSky,

                           open: openWeather,

                       })
                   }
               })
           })
       }).catch((err)=>{
           console.log(err)
           res.render('index',{
               error:err,
msg:msg,

           });
       });





    });
port=process.env.PORT || 8000;
app.listen(port);
// var a =bod.list[0];
// var b = bod.list[1];
// var c = bod.list[2];
// var d=bod.list[3];
// var e=bod.list[4];
// var f = bod.list[5];
// var g = bod.list[6];
// var h = bod.list[7];
// var i = bod.list[8];
// var j = bod.list[9];
// var k = bod.list[10];
// var l = bod.list[11];
// var m = bod.list[12];
// var n = bod.list[13];
// var o = bod.list[14];
// var p = bod.list[15];
// var q = bod.list[16];
// var r = bod.list[17];
// var s = bod.list[18];
// var t = bod.list[19];
