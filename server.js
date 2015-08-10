var
  express = require('express')
  app = express( )
, server = require('http').Server(app)
, port = process.env.PORT || 5000;

// use static middleware
app.use( express.static( 'public' ) );


server.listen(port);