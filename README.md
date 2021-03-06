# angularjs-flux-example
Example of an AngularJS application using Flux Pattern

## Demo
http://angularjs-flux-example.herokuapp.com/


## Build, Run and Test

### Build Dev

`webpack -d`

### Build Prod

`webpack -p`

### Run

`node server.js`

### Test

`npm test`


## JSON REST API

JSON REST Api provided by [Mocky](http://www.mocky.io/).

`http://www.mocky.io/v2/55ca5d2dce3e737a14c75a7e`.

You have to set `Access-Control-Allow-Origin` to `*`.



JSON data generated with [JSON-GENERATOR](http://www.json-generator.com/).
```javascript
[
  '{{repeat(9, 9)}}',
  {
    _id: '{{objectId()}}',
    picture: 'http://placehold.it/180x180',
    name: 'Product #{{this.integer( 5, 100 )}}',
    details: function( tags ) {
      return tags.lorem(1, "paragraphs").replace( "\r", "" ).replace( "\n", "" );
    },
    price: function ( tags ) {
      return Math.round( ( tags.floating(24, 115) ) *100 ) / 100;
    }
  }
]
```
Rember to convert to JSON with an online converter.