# angularjs-flux-example
Example of an AngularJS application using Flux Pattern

## Build and Run


## JSON REST API

JSON REST Api provided by (Mocky)[http://www.mocky.io/].
`http://www.mocky.io/v2/55c8c2ae66d16f900ef63bca`.


JSON data generated with (JSON-GENERATOR)[http://www.json-generator.com/].
```json
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
The charset has to be converted into ASCII / Unicode.