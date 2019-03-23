








const request = require('request');
// const dotenv = require('dotenv');

// dotenv.load();
                                      url='https://api.darksky.net/forecast/f4f563e7d41f2f9f60c29b6bb0b7a99d/35.2456474,-80.80178769999999'
                                  request(url,(error,response,body)=>{
                                                          // console.log(JSON.parse(body));
                                                      var  b= JSON.parse(body)
                                  })
var getlocation = (location) => {

    return new Promise((resolve, reject) => {
        request({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' +  location +',+CA&key=AIzaSyAmLBJkoEcLyLvU7O66wGHA08A3SwzmoBw',
            json:true

        }, (error, response, body) => {

            if (error) {
                reject('Cannot connect to Darksky API');
            } else {

                resolve(

                    {

                    source : body
                });
            }
        });
    });
};
var getWeather =(lat,lng,source)=>{
    return new Promise((resolve, reject) => {
        request({
            // url: 'https://api.weatherbit.io/v2.0/history/agweather?lat=' +  lat +'&lon='+ lng +'&start_date=2019-03-20&end_date=2019-03-27&key=03961e15438855b8be53a392dc9a5937',
          url: 'http://api.openweathermap.org/data/2.5/weather?q=lat=35&lon=139&units=imperial&appid=e85e0a3142231dab28a2611888e48f22'



        }, (error, response, body) => {

            if (error) {
                reject('Cannot connect to Darksky API');
            } else {

                resolve(

                    {

                        source : body
                    });
            }
        });
    });
}           ;
module.exports = {
    getlocation,
    getWeather
};
            var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
        function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
