# Information
This is a project that will allow you to communicate with your Sphero Robotic Ball [(GoSphero)](http://gosphero.com 'gosphero.com') via sending text messages through Twilio's SMS services with Node.js.


# Requirements
  
  * Sphero Robotic Ball 

  * Computer with Bluetooth (Serail Port Profile)

  * A Twilio Account w/ SMS Phone Number

  *  node.js (0.8.xx)+ and npm (package manager)
    * express
    * node-sphero

  * localtunnel (ruby gem)
    * gem install localtunnel
 
# Setup

      npm install express -g
      express -H sphero
      cd sphero
      npm install

# Configure app.js
Add a route to our Express application to accept POST requests for the path “/sphero/sms” and wire it to the SpheroSMS function we just created.


     app.post('/sphero/sms', routes.SpheroSMS);

Start the Sphero connection in the routes file:

    routes.startSphero();


# Configure routes/index.js

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
    };

    var color = function(){
        var r = Math.random()*255;
        var g = Math.random()*255;
        var b = Math.random()*255;
        return [r,g,b];
    };

# Usage

### Bluetooth Connection to Sphero
Depending on your operating system (I am using OSX for this example).  Pair Sphero to your computer over bluetooth.  Accept the pin number request and you should be paired to Sphero.

### Node.js
At this point our node app is complete and if we run it, it should connect to any Sphero's paired (and present) to your computer.

     node app.js


### LocalTunnel
We now have everything setup on our node app, it is time to setup localtunnel, (a Ruby Gem) found [localtunnel](http://progrium.com/localtunnel/ "Here"). 

    gem install localtunnel

the first time you run localtunnel you have to give it your ssh key

     localtunnel -k ~/.ssh/id_rsa.pub 3000

after that, you can simply run (in a new terminal/tab)

     localtunnel 3000
     
     
### Twilio Config
If you don't already have a twilio account, now is the time.  You will need to get a number you can SMS from.   Configure your SMS POST for that number to point to the address local tunnel spat out + /sphero/sms  (which is where we configured our node app to listen)


     http://3i46.localtunnel.com/sphero/sms

    
# Test it out!
For this example, simply text anything to your twilio number, you should receive a response via text and your Sphero should now change to a new random color!  





