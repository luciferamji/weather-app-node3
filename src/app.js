const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('../utils/geocode.js')
const forecast=require('../utils/forecast.js')
const app = express()
//define paths for express configure

const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath= path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
//setup handlers engines and view locations
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akshat Jaitly'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshat Jaitly'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'help',
        name: 'Akshat Jaitly'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'help article not found',
        title: '404',
        name: 'Akshat Jaitly'
    })  
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'please input data'
        })
    }
    
    geocode(req.query.address,(error,data)=>{
        if(error){
           return res.send({
               error
           })
        }
         
    //normal way of function caaling object #forecast data
    forecast( data.latitude,data.longitude,(error,forecastdata)=>
    
    {       if(error){
        return res.send({
            error
              })
             }
          res.send({
             location:data.location,
             summary:forecastdata.summary,
             temperature:forecastdata.temperature,
             percentage:forecastdata.percentage
           })
            
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        error: 'Page not found',
        title: '404',
        name: 'Akshat Jaitly'
    })

})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})