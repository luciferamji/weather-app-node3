//normal function request using response
const request=require('request')
const geocode =(address,callback)=>{

    const locurl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURI(address)+".json?access_token=pk.eyJ1IjoiYWtzaGF0amFpdGx5IiwiYSI6ImNqeWVmemxuejAzOGgzY3J5NHc0eDA0aWMifQ.kv__lVFUjE-h6fhNBNWWLQ&limit=1"
    request({url:locurl,json:true},(error,response)=>{
    
    if(error)
    callback('unable to connect to location services',undefined)
   
    else if(response.body.features.length==0)
    callback("0 search results",undefined)
    else
    {
    callback(undefined,{
        location:response.body.features[0].place_name,
        latitude:response.body.features[0].center[1],
        longitude:response.body.features[0].center[0]
    })
    
    }
    })
    }
    
    
    
    module.exports=geocode