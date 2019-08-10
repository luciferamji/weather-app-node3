// request function made of es6 object
const request=require('request')

const forecast=(latitude,longitude,callback)=>
{
    const url="https://api.darksky.net/forecast/1449abbf62e5130a150c7e4636141249/"+latitude+","+longitude
    request({url,json:true},(error,{body})=>
    {

        if(error)
        callback("Unable to connect to weather services",undefined)
        else if(body.error)
        callback("unable to find location",undefined)
        else
        {callback(undefined,{
            summary:body.daily.data[0].summary ,
             temperature: body.currently.temperature,
            percentage:body.currently.precipProbability*100
        
        })
        }
     })
    }
    module.exports=forecast





