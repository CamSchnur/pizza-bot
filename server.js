var fs = require('fs'),
path = require('path'),
Twit = require('twit'),
twemoji = require('twemoji'),
cheerio = require('cheerio'),
config = require(path.join(__dirname, 'config.js'))


var imagePath = get_random_topping();

var T = new Twit(config);
T.post('statuses/update', {status: imagePath}, function(err, data, response){ console.log (data)});


function combine_toppings_and_crust()
{

}

function get_random_topping()
{
    console.log('getting topping');

    var div = twemoji.parse('\ud83c\udf55');
    var parsed = cheerio.load(div);

    //console.log(parsed);
    var src = parsed('img').attr('src');

    console.log(src);
    
    return src;  

}

function generate_crust()
{

}