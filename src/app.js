const path =  require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
// Define paths for Express config
const PublicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPaths= path.join(__dirname,'../templates/partials')
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPaths)
// Setup static directory to serve

app.use(express.static(PublicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'steve malass'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about weather app',
        name :'stevemalass'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        msg : "help nigga",
        title:'help',
        name : 'steve malass'
    })
})

  app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'search term required'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
           if(error){
              return res.send({error})
           }
           forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
             }
             res.send({
                 forecast:forecastData,
                 location : location,
                 address : req.query.address
             })
           })
    })
   
  })
  app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name : 'steve malass',
        errormessage : 'help article not found'
        
  })
  })
  app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'stevemalass',
        errormessage : '404 page not found'
    })
  })
app.listen(3000,()=>{
    console.log('server is runnin on port 3000')
})