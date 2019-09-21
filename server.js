var fs = require('fs'),
path = require('path'),
Twit = require('twit'),
twemoji = require('twemoji'),
cheerio = require('cheerio'),
config = require(path.join(__dirname, 'config.js'))
base64Img = require('base64-img');

var imagePath = get_random_topping();

var T = new Twit(config);

upload_image(imagePath);


function upload_image(imagePath)
{
    //download from specified URL
  //  var filename = download_image(imagePath);
console.log(imagePath + 'aaa');
   // console.log('ok, ' + filename)
    //now upload to twitter

   // b64Img = fs.readFileSync(filename, {encoding: 'base64' });

     base64Img.requestBase64(imagePath, function(err, response, body){
        if(err) 
        {
            console.log(err)
        }
        else
        {
            
                console.log(body);
                T.post('media/upload', {media_data: body.replace("data:image/svg+xml;base64,", "") }, function (err, data, response) {
                    if(err){
                        console.log('ERROR:' + err);
                    }
                    else
                    {
                        console.log('image uploaded, tweeting');
                        T.post('statuses/update', {
                                media_ids: new Array(data.media_id_string)
                        },
                            function(err, data, response) {
                                    if(err)
                                    {
                                        console.log('ERROR' + err);
                                        
                                    }
                                    else{ 
                                        console.log('success!');
                                    }
                                }
                            );
                        }
                    }
                    );
            }
        });
         
}

function combine_toppings_and_crust()
{

}

function get_random_topping()
{
    console.log('getting topping');

    var div = twemoji.parse('\ud83c\udf55', { folder: 'svg', ext: '.svg'});

    var parsed = cheerio.load(div);

    //console.log(parsed);
    var src = parsed('img').attr('src');

    console.log(src);
    
    return src;  

}

function generate_crust()
{

}