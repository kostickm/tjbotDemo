/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TJBot = require('tjbot');
var config = require('./config');
var pigpio = require('pigpio');
pigpio.initialize();

// obtain our credentials from config.js
var credentials = config.credentials;

// these are the hardware capabilities that our TJ needs for this recipe
var hardware = ['led', 'microphone'];

// set up TJBot's configuration
var tjConfig = {
    log: {
        level: 'verbose',
      },
  };

// instantiate our TJBot!
var tj = new TJBot(hardware, tjConfig, credentials);

// full list of colors that TJ recognizes, e.g. ['red', 'green', 'blue']
var tjColors = tj.shineColors();

console.log("I understand lots of colors.  You can tell me to shine my light a different color by saying 'turn the light red' or 'change the light to green' or 'turn the light off'.");

// uncomment to see the full list of colors TJ understands
// console.log("Here are all the colors I understand:");
// console.log(tjColors.join(", "));

// hash map to easily test if TJ understands a color, e.g. {'red': 1, 'green': 1, 'blue': 1}
var colors = {};
tjColors.forEach(function (color) {
    colors[color] = 1;
  });

// listen for speech
tj.listen(function (msg) {
    var containsTurn = msg.indexOf('turn') >= 0;
    var containsChange = msg.indexOf('change') >= 0;
    var containsSet = msg.indexOf('set') >= 0;
    var containsLight = msg.indexOf('the light') >= 0;
    var containsDisco = msg.indexOf('disco') >= 0;
    var containsWaveArm = (str.indexOf('raise') >= 0 || str.indexOf('weave') >= 0 || str.indexOf('wave') >= 0 || str.indexOf('hello') >= 0) || str.indexOf('leave') >= 0) && (str.indexOf('arm') >= 0);

    if ((containsTurn || containsChange || containsSet) && containsLight) {
      // was there a color uttered?
      var words = msg.split(' ');
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (colors[word] != undefined || word == 'on' || word == 'off') {
          // yes!
          tj.shine(word);
          break;
        }
      }
    } else if (containsWaveArm) {
      waveArm('wave');
    } else if (containsDisco) {
      discoParty();
    }
  });

// let's have a disco party!
function discoParty() {
  for (i = 0; i < 30; i++) {
    setTimeout(function () {
        var randIdx = Math.floor(Math.random() * tjColors.length);
        var randColor = tjColors[randIdx];
        tj.shine(randColor);
        waveArm('dance');
      }, i * 250);
  }
}

var mincycle = 500; var maxcycle = 2300;
var dutycycle = mincycle;
var iswaving = false;

function waveArm(action) {
  iswaving = true;
  var Gpio = pigpio.Gpio;
  var motor = new Gpio(7, { mode: Gpio.OUTPUT });

  var times =  8;
  var interval = 700;

  if (action == 'wave') {
    var pulse = setInterval(function () {
      motor.servoWrite(maxcycle);
      setTimeout(function () {
        if (motor != null) {
          motor.servoWrite(mincycle);
        }
      }, interval / 3);

      if (times-- === 0) {
        clearInterval(pulse);
        if (!isplaying) {
          setTimeout(function () {
            micInstance.resume();
            iswaving = false;
          }, 500);
        }

        return;
      }
    }, interval);
  }else {
    motor.servoWrite(maxcycle);
    setTimeout(function () {
      motor.servoWrite(mincycle);
    }, 400);
  }
}

// ---- Stop PWM before exit
process.on('SIGINT', function () {
  pigpio.terminate();
  process.nextTick(function () { process.exit(0); });
});
