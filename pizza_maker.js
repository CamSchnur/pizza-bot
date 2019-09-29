var fs = require('fs'),
svg2img = require('svg2img'),
path = require('path'),
btoa = require('btoa'),
emoji = require(__dirname + '/emoji.js'),
mergeImages = require('merge-images-v2'),
Canvas = require('canvas'),
sharp = require('sharp'),
twitter = require(__dirname + '/twitter.js'),
toppings = require(__dirname + '/toppings.js'),
prepCook = require(__dirname + '/prep_cook.js');

var allToppings;
var cheese;
var sauce;
var crust;
var selectedToppings;

module.exports = 
  {
make_pizza: function(postResultToTwitter, hostedOnGlitch)
{
    console.log('* Generating Toppings...')
    allToppings = toppings.generate_toppings_list();

    console.log('* Selecting Random Toppings...')
    selectedToppings = new Array();
    selectedToppings.push(get_random_topping());
    selectedToppings.push(get_random_topping());

    console.log('* Preparing Crust, Sauce, and Cheese...');
    cheese = new emoji('Yellow Circle', '\ud83d\udfe1');
    sauce = new emoji('Red Circle', '\ud83d\udd34');
    crust = new emoji('Brown Circle', '\ud83d\udfe4');

    console.log('* Saving ingredients to png files...');
    
    svg2img(selectedToppings[0].emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
        if(error)
        {
            console.log(error);
            return;
        }
        fs.writeFileSync('./.data/top1.png', buffer);
            svg2img(selectedToppings[1].emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
                if(error)
                {
                    console.log(error);
                    return;
                }
                fs.writeFileSync('./.data/top2.png', buffer);

                svg2img(crust.emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
                    if(error)
                    {
                        console.log(error);
                        return;
                    }
                    fs.writeFileSync('./.data/crust.png', buffer);
                
                    svg2img(cheese.emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
                        if(error)
                        {
                            console.log(error);
                            return;
                        }
                        fs.writeFileSync('./.data/cheese.png', buffer);
                    
                        svg2img(sauce.emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
                            if(error)
                            {
                                console.log(error);
                                return;
                            }
                            fs.writeFileSync('./.data/sauce.png', buffer);
                            console.log("* Resizing Ingredients...")
                            //now let's get our topping sizes right.
                            sharp('./.data/cheese.png').resize(850, 850).toFile('./.data/cheese2.png', (err, info) => {
                                sharp('./.data/sauce.png').resize(900, 900).toFile('./.data/sauce2.png', (err, info) => {
                                    sharp('./.data/top1.png').resize(100, 100).toFile('./.data/top1r.png', (err, info) => {
                                        sharp('./.data/top2.png').resize(100, 100).toFile('./.data/top2r.png', (err, info) => {
                                            //now combine the images,
                                            console.log("* Baking at 500 degrees...");
                                            var canvasObj = {
                                                            Canvas: Canvas
                                                            };
                                            mergeImages(prepCook.get_prepared_ingredients(), canvasObj)
                                            //and output the result
                                            .then(b64 => output_result(b64, postResultToTwitter, hostedOnGlitch));
                                        });
                                    });
                            });
                        });

                    });
                });
            });
        });
    });

    
}
};

function output_result(b64ImageData, postResultToTwitter, hostedOnGlitch)
{
    var b64data = b64ImageData.replace(/^data:image\/png;base64,/, "");
    console.log('* Saving output...')
    fs.writeFile('./.data/result.png', b64data, 'base64', function(err)
    {
        if(err)
        {
            console.log(err);
            return;
        }

        var description = selectedToppings[0].emojiName + ' and ' + selectedToppings[1].emojiName + ' Pizza';
        console.log('* Pizza created: ' + description);

        if(postResultToTwitter == true)
        {
            twitter.upload_image('./.data/result.png', description, hostedOnGlitch);
            
            console.log('* Sent to Twitter.');
        }
        else
        {
            console.log('* Skipping Twitter Upload.');
        }
    });
}
function get_random_topping()
{
    var index = Math.floor(Math.random() * allToppings.length);
    console.log('** Topping selected: ' + allToppings[index].emojiName);
    return allToppings[index];
}


