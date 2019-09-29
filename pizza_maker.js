var fs = require('fs'),
svg2img = require('svg2img'),
path = require('path'),
btoa = require('btoa'),
emoji = require(__dirname + '/emoji.js'),
mergeImages = require('merge-images-v2'),
Canvas = require('canvas'),
sharp = require('sharp'),
twitter = require(__dirname + '/twitter.js');
toppings = require(__dirname + '/toppings.js');


var allToppings;
var cheese;
var sauce;
var crust;
var selectedToppings;

module.exports = 
  {
make_pizza: function(postResultToTwitter)
{
    console.log('* Generating Toppings...')
    allToppings = toppings.generate_toppings_list();

    console.log('* Selecting Random Toppings...')
    selectedToppings = new Array();
    selectedToppings.push(get_random_topping());
    selectedToppings.push(get_random_topping());

    cheese = new emoji('Yellow Circle', '\ud83d\udfe1');
    sauce = new emoji('Red Circle', '\ud83d\udd34');
    crust = new emoji('Brown Circle', '\ud83d\udfe4');

    console.log('* saving topping to png');
    
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
                            console.log(buffer);
                            fs.writeFileSync('./.data/sauce.png', buffer);

                        //now let's get our topping sizes right.
                        sharp('./.data/cheese.png').resize(850, 850).toFile('./.data/cheese2.png', (err, info) => {
                             sharp('./.data/sauce.png').resize(900, 900).toFile('./.data/sauce2.png', (err, info) => {

                                sharp('./.data/top1.png').resize(100, 100).toFile('./.data/top1r.png', (err, info) => {
                                    sharp('./.data/top2.png').resize(100, 100).toFile('./.data/top2r.png', (err, info) => {
                        //now manipulate the image
                                        mergeImages([
                                            {src: 'https://cdn.glitch.com/d4b86d30-396d-47c5-a181-d845c506ec1b%2Fwhite.png?v=1569695143892', x:0+get_random_offset(), y:0+get_random_offset() },
                                            {src: './.data/crust.png', x:388+get_random_offset(), y:0+get_random_offset() },
                                            {src: './.data/sauce2.png', x:438+get_random_offset(), y:50+get_random_offset() },
                                            {src: './.data/cheese2.png', x:463+get_random_offset(), y:75+get_random_offset() },


                                            {src: './.data/top1r.png', x:848+get_random_offset(), y:102+get_random_offset() },
                                            {src: './.data/top1r.png', x:1121+get_random_offset(), y:290+get_random_offset() },
                                            {src: './.data/top1r.png', x:920+get_random_offset(), y:787+get_random_offset() },
                                            {src: './.data/top1r.png', x:688+get_random_offset(), y:730+get_random_offset() },
                                            {src: './.data/top1r.png', x:516+get_random_offset(), y:501+get_random_offset() },
                                            {src: './.data/top1r.png', x:602+get_random_offset(), y:220+get_random_offset() },
                                            {src: './.data/top1r.png', x:667+get_random_offset(), y:387+get_random_offset() },
                                            {src: './.data/top1r.png', x:838+get_random_offset(), y:407+get_random_offset() },
                                            {src: './.data/top1r.png', x:865+get_random_offset(), y:268+get_random_offset() },
                                            {src: './.data/top1r.png', x:1038+get_random_offset(), y:490+get_random_offset() },
                                            {src: './.data/top1r.png', x:1121+get_random_offset(), y:600+get_random_offset() },
                                            {src: './.data/top1r.png', x:845+get_random_offset(), y:658+get_random_offset() },


                                            {src: './.data/top2r.png', x:700+get_random_offset(), y:135+get_random_offset() },
                                            {src: './.data/top2r.png', x:1000+get_random_offset(), y:160+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:500+get_random_offset(), y:340+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:750+get_random_offset(), y:288+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:970+get_random_offset(), y:360+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:1160+get_random_offset(), y:441+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:667+get_random_offset(), y:560+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:794+get_random_offset(), y:519+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:548+get_random_offset(), y:650+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:968+get_random_offset(), y:600+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:796+get_random_offset(), y:770+get_random_offset() } ,
                                            {src: './.data/top2r.png', x:1038+get_random_offset(), y:750+get_random_offset() } 

                                        ],
                                            
                                            {
                                            Canvas: Canvas
                                            })
                                            .then(function(b64){
                                                var b64data = b64.replace(/^data:image\/png;base64,/, "");
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
                                                        twitter.upload_image('./.data/result.png', description);
                                                        
                                                        console.log('* Sent to Twitter.');
                                                    }
                                                    else
                                                    {
                                                        console.log('* Skipping Twitter Upload.');
                                                    }
                                                });
                                            });
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
function get_random_offset()
{
    var offset = (Math.random() * 10);

    return offset - 5;

}


function get_random_topping()
{
    console.log('getting topping');
    var index = Math.floor(Math.random() * allToppings.length);
    return allToppings[index];
}


