const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials(__dirname + '/views/partials')
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});



app.get('/beers', (request, response) => {
  punkAPI.getBeers()
  .then(beersFromAPI => {
    console.log(beersFromAPI);
    let data = {
      beers:[]
    };
    // let data = {
    //   name:[],
    //   description:[],
    //   images: [],
    //   tagline: []
    // }
    for(let beer of beersFromAPI) {
      let object = {}
      object.image = beer.image_url;
      object.description = beer.description;
      object.name = beer.name;
      object.tagline = beer.tagline;
      data.beers.push(object);
    }
    response.render('beers', data);
  })
  .catch(error => console.log(error));
})

app.get('/random-beer', (request, response) => {
  punkAPI.getRandom()
    .then(responseFromAPI => {
      response.render("random-beer", responseFromAPI[0]);
    })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
