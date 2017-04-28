
var express = require('express');
var router = express.Router();
var Twit = require('twit');

var config = require('../config');

var twitter = new Twit(config.twitter);

var TWEET_COUNT = 5;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';
var USER_TIMELINE_URL = 'statuses/user_timeline'; //  o API REST search/tweets


/**

status/user_timeline
Devuelve una colección de los Tweets más recientes publicados por el usuario 
 indicado por los parámetros screen_name o user_id.


statuses/oembed
Devuelve un solo Tweet, especificado por una URL web Tweet o por el ID de Twitter,
 en un formato compatible con oEmbed.
  El fragmento HTML devuelto se reconocerá automáticamente como un Tweet incrustado cuando el JavaScript
   del widget de Twitter se incluya en la página.

El punto final oEmbed permite la personalización de la apariencia final de un Tweet incrustado estableciendo
 las propiedades correspondientes en el marcado HTML para ser interpretado por JavaScript de Twitter
  incluido con la respuesta HTML de forma predeterminada.
   El formato del marcado devuelto puede cambiar con el tiempo a medida que Twitter agrega nuevas características o ajusta su representación de Tweet.

El marcado de fallback de Tweet está destinado a ser almacenado en caché en sus servidores
 hasta el tiempo de vida de la caché sugerido especificado en cache_age.
*/

/**
 * GET tweets json.
 */
router.get('/user_timeline/:user', function(req, res) {

  var oEmbedTweets = [], tweets = [],

  params = {
    screen_name: req.params.user, 
    count: TWEET_COUNT 
  };

  if(req.query.max_id) {
    params.max_id = req.query.max_id;
  }

  // request data 
  twitter.get(USER_TIMELINE_URL, params, function (err, data, resp) {

    tweets = data;

    var i=0;
    var len=tweets.length;

    for(i; i < len; i++) {
      getOEmbed(tweets[i]);
    }
  });

  /**
   * requests the oEmbed html
   */
  function getOEmbed(tweet){

    var params = {
      "id": tweet.id_str,
      "maxwidth": MAX_WIDTH,
      "hide_thread": true,
      "omit_script": true
    };

    // request data 
    twitter.get(OEMBED_URL, params, function (err, data, resp) {
      tweet.oEmbed = data;
      oEmbedTweets.push(tweet);

      if (oEmbedTweets.length == tweets.length) {
        res.setHeader('Content-Type', 'application/json');
        res.send(oEmbedTweets);
      }
    });
  }
  
});


/** Middleware    se puede modular mejor pero para simplificar se agrega aqui */
router.use( (req, res, next)=>{
  // * cualquiera puede acceder
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
   'X-API_KEY, Origin, X-Requested-With, Content-With, Content-Type, Accept, Access-Control-Request-Method');

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  res.header('Allow', 'GET, POST, PUT, DELETE');

  next();
});


/** 
RUTA: http://localhost:8000/tweets/all
*/
router.get('/all', function(req, res) {

    twitter.get('search/tweets', {q:'java, ruby, python', lang:'en', count:10 }, function (err, data, resp) {
      res.json({ "data": data });
    });

  
});


router.post('/all/params', function(req, res) {

  var busqueda1, busqueda2, cuantos, lenguajebuscado;

    busqueda1 =  req.body.peticion.busqueda1;
    busqueda2  =  req.body.peticion.busqueda2;
    cuantos =  req.body.peticion.cuantos;
    lenguajebuscado =  req.body.peticion.lenguajebuscado;
  

    twitter.get('search/tweets', {q: busqueda1+", "+busqueda2, lang:lenguajebuscado, count:cuantos }, function (err, data, resp) {      
      res.json({ "data": data });
    });
  
});

module.exports = router;
