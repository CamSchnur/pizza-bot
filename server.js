var fs = require('fs'),
path = require('path'),
Twit = require('twit'),
config = require(path.join(__dirname, 'config.js')),
fs = require('fs'),
svg2img = require('svg2img'),
btoa = require('btoa'),
emoji = require('./emoji.js');

T = new Twit(config);

console.log('* generating toppings...')
var allToppings = new Array();
generate_toppings_list();


console.log('* selecting rando toppings...')
var selectedToppings = new Array();
selectedToppings.push(get_random_topping());
selectedToppings.push(get_random_topping());

console.log('* saving topping to png');
svg2img('https://twemoji.maxcdn.com/v/12.1.3/svg/1f355.svg', function(error, buffer){
    if(error)
    {
        console.log('yo');
    }
    console.log('* got it, writing to file')
    fs.writeFileSync('./hello.png', buffer);
    console.log('* saved')
});

console.log('* dl image');
console.log(selectedToppings[0].emojiPath);
svg2img(selectedToppings[0].emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
    if(error)
    {
        console.log(error);
        return;
    }
    fs.writeFileSync('./temp1.png', buffer);

    upload_image('./temp1.png');

    
    console.log('yay');
    });


function upload_image(imagePath)
{
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
                            media_ids: new Array(data.media_id_string)
                    },
                    function(err, data, response) 
                    {
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

function combine_toppings_and_crust()
{

}

function get_random_topping()
{
    console.log('getting topping');
    var index = Math.floor(Math.random() * allToppings.length);
    return allToppings[index];
}

function generate_crust()
{

}

function generate_toppings_list()
{
    addTopping('Pizza', '\ud83c\udf55');
    addTopping('Pancakes', '\ud83e\udd5e');
    addTopping('Croissant', '\ud83e\udd50');
    addTopping('Bacon', '\ud83e\udd53');
    addTopping('Pretzel', '\ud83e\udd68');
    addTopping('Taco', '\ud83c\udf2e');
    addTopping('Lollipop', '\ud83c\udf6d');
    addTopping('Doughnut', '\ud83c\udf69');
    addTopping('Shaved Ice', '\ud83c\udf67');
    addTopping('Mushroom', '\ud83c\udf44');
    addTopping('Soft Ice Cream', '\ud83c\udf66');
    addTopping('Avocado', '\ud83e\udd51');
    addTopping('Carrot', '\ud83e\udd55');
    addTopping('Leafy Green', '\ud83e\udd6c');
    addTopping('Broccoli', '\ud83e\udd66');
    addTopping('Meat on Bone', '\ud83c\udf56');
    addTopping('Cheese Wedge', '\ud83e\uddc0');
    addTopping('Coconut', '\ud83e\udd65');
    addTopping('Watermelon', '\ud83c\udf49');
    addTopping('Fried Shrimp', '\ud83c\udf64');
    addTopping('Fortune Cookie', '\ud83e\udd60');
    addTopping('Peach', '\ud83c\udf51');
    addTopping('Eggplant', '\ud83c\udf46');
    addTopping('Dumpling', '\ud83e\udd5f');
}
function addTopping(emojiName, emojiUnicode)
{
    allToppings.push(new emoji(emojiName, emojiUnicode));
    console.log('added topping ' + emojiName)
}
