const express = require('express')
const geocode = require('./geocode')
const forecast = require('./forecast')


const path = require('path')


const app = express();
const port = process.env.PORT || 3000; 
const publicDirectory = path.join(__dirname, '../public') 


app.use(express.static(publicDirectory))

  app.get('/weather', (req, res) => {
    if(!req.query.address){
      return res.send ('Please Search for an address')
    }
  
    geocode (req.query.address, (error, response) => {
      if (error){
        return res.send(error)
      }
  
  forecast(response.latitude, response.longitude, (error, forecastData) => {
    if (error) {
      return res.send (error)
    }
  
    res.send({
      forecast: forecastData,
      location: response.location,
      address: req.query.address
    })
  
  })
  }) 
})
app.listen(port,() => { 
    console.log('Server is up on port 3000') 
})