# pizza-bot
 
Creates random pizza topping ideas using emoji.

See it in action: [@EmojiPizzaBot](https://twitter.com/EmojiPizzaBot "Emoji Pizza Bot on Twitter") on Twitter

#### Implementation

Powered by node, glitch, twemoji, and my love for pizza.

#### License Info

uses [twemoji](https://twemoji.twitter.com/) which uses the MIT license 

uses [cheerio](https://github.com/cheeriojs/cheerio) which uses the MIT license

using [twit](https://www.npmjs.com/package/twit) which uses the MIT license

using [svg2img](https://www.npmjs.com/package/svg2img) which uses the MIT license

using [sharp](https://www.npmjs.com/package/sharp) which uses the Apache-2.0 license

using [merge-images-v2](https://www.npmjs.com/package/merge-images-v2) which uses the MIT license

using [canvas](https://www.npmjs.com/package/canvas) which uses the MIT license

using [express](https://www.npmjs.com/package/express) which uses the MIT license

#### Howto

##### Glitch version 
If you're remixing this bot on Glitch, you'll just need to:

1. Add the following keys to your .env file:

consumer_key='w'

consumer_secret='x'

access_token='y'

access_token_secret='z'

BOT_ENDPOINT='/someEndpointName'

...just replace with your own values.

2. You'll then need to set up something like [cron-job.org](https://cron-job.org) to hit your endpoint every 60 minutes.  
You can do an HTTP get request of the format https://your-project-name.glitch.me/someEndpointName.


##### Running locally
To run this locally (can be useful for testing or debugging), download the code from Glitch or [from my github repo](https://github.com/camschnur/pizza-bot).  Instead of using a .env file, create a file in the root called config.js, and use this format:



`var config = {
    consumer_key: 'w',
    consumer_secret: 'x',
    access_token: 'y',
    access_token_secret: 'z'
}

module.exports = config;`