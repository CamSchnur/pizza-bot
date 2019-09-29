var Twit = require('twit'),
path = require('path'),
fs = require('fs');
var T;
module.exports = 
  {
upload_image: function(imagePath, descrip, hostedOnGlitch)
{
  var T = get_twitter_object(hostedOnGlitch);

  //now upload to twitter
  var b64Img = fs.readFileSync(imagePath, { encoding: 'base64' });

  T.post('media/upload', {media_data: b64Img }, 
      function (err, data, response) 
      {
          if(err)
          {
              console.log('ERROR:' + err);
          }
          else
          {
              console.log('image uploaded, tweeting');
              T.post('statuses/update', 
                  {
                          media_ids: new Array(data.media_id_string),
                          status: descrip
                  },
                  function(err, data, response) 
                  {
                          if(err)
                          {
                              console.log('ERROR' + err);
                              
                          }
                          else{ 
                              console.log('success!');
                            fs.deleteFileSync(imagePath);
                          }
                      }
                  );
              }
          }
    );

  }
};

function get_twitter_object(hostedOnGlitch)
{
  var T;
  if(hostedOnGlitch)
  {
    //secrets are in .env file on glitch
    T = new Twit({
        consumer_key:         process.env.consumer_key,
        consumer_secret:      process.env.consumer_secret,
        access_token:         process.env.access_token,
        access_token_secret:  process.env.access_token_secret
      });
    }
    else
    {
        //secrets are in config.js locally
        config = require(path.join(__dirname, 'config.js')),
        T = new Twit(config);
    }
    return T;
}