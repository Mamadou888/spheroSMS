var spherocontrol = require('node-sphero');

var sphero = new spherocontrol.Sphero();

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.startSphero = function(){
  sphero.connect();
};

exports.SpheroSMS = function(request, response){
  var rgb = color();
  sphero.setRGBLED(rgb[0], rgb[1], rgb[2], false);
  response.send('<Response><Sms>Thanks for Playing!  http://gosphero.com</Sms></Response>');
  console.log('Sphero changed colors!  (' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')');
};

var color = function(){
    var r = Math.random()*255;
    var g = Math.random()*255;
    var b = Math.random()*255;
    return [r,g,b];
};

