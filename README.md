# TJBot Demo
> Control TJBot's LED and arm with your voice!

This recipe uses the [Watson Speech to Text](https://www.ibm.com/watson/developercloud/speech-to-text.html) service to let you control the color of TJBot's LED with your voice, and have TJBot wave hello. For example, if you say "turn the light green," TJBot will change the color of the LED to green. If you say "Hello TJBot!" or "Can you wave?", TJBot will wave hello to you.

## Hardware
This recipe requires a TJBot with a microphone, LED, and Servo motor arm.

## Build and Run
First, clone this repo.
    $ git clone git@github.com:kostickm/tjbotDemo.git

Next, make sure you have configured your Raspberry Pi for TJBot.

    $ cd tjbotDemo/bootstrap && sudo sh bootstrap.sh

Go to the 'tjbotDemo' folder and install the dependencies.

    $ cd ..
    $ npm install

Create an instance of the [Watson Text to Speech](https://www.ibm.com/watson/developercloud/text-to-speech.html) service and note the authentication credentials.

Make a copy the default configuration file and update it with the Watson service credentials.

    $ cp config.default.js config.js
    $ nano config.js
    <enter your credentials in the specified places>

Run!

    sudo node tjbotDemo.js

> Note the `sudo` command. Root user access is required to run TJBot recipes.

Now talk to your microphone to change the color of the LED. Say "turn the light blue" to change the light to blue. You can try other colors as well, such as yellow, green, orange, purple, magenta, red, blue, aqua, and white. You can also say "turn the light on" or "turn the light off".

Ask TJBot to wave hello by saying "Can you wave?" or "Hello TJBot!".

Say "Let's have a discoparty" for a fun surprise.

# Watson Services
- [Watson Speech to Text](https://www.ibm.com/watson/developercloud/speech-to-text.html)

# License
This project is licensed under Apache 2.0. Full license text is available in [LICENSE](../../LICENSE).
