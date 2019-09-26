var fs = require('fs'),
path = require('path'),
Twit = require('twit'),
config = require(path.join(__dirname, 'config.js')),
fs = require('fs'),
svg2img = require('svg2img'),
btoa = require('btoa'),
emoji = require('./emoji.js'),
mergeImages = require('merge-images'),
Canvas = require('canvas'),
sharp = require('sharp');

T = new Twit(config);

console.log('* generating toppings...')
var allToppings = new Array();
generate_toppings_list();

console.log('* selecting rando toppings...')
var selectedToppings = new Array();
selectedToppings.push(get_random_topping());
selectedToppings.push(get_random_topping());

var cheese = new emoji('Yellow Circle', '\ud83d\udfe1');
var sauce = new emoji('Red Circle', '\ud83d\udd34');
var crust = new emoji('Brown Cirlce', '\ud83d\udfe4');

console.log('* saving topping to png');
make_pizza(selectedToppings);

function make_pizza(selectedToppings)
{
    svg2img(selectedToppings[0].emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
        if(error)
        {
            console.log(error);
            return;
        }
        fs.writeFileSync('./top1.png', buffer);
            svg2img(selectedToppings[1].emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
                if(error)
                {
                    console.log(error);
                    return;
                }
                fs.writeFileSync('./top2.png', buffer);

                svg2img(crust.emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
                    if(error)
                    {
                        console.log(error);
                        return;
                    }
                    fs.writeFileSync('./crust.png', buffer);
                
                    svg2img(cheese.emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
                        if(error)
                        {
                            console.log(error);
                            return;
                        }
                        fs.writeFileSync('./cheese.png', buffer);
                    
                        svg2img(sauce.emojiPath, {'width':1000, 'height':1000}, function(error, buffer) {
                            if(error)
                            {
                                console.log(error);
                                return;
                            }
                            console.log(buffer);
                            fs.writeFileSync('./sauce.png', buffer);

                        //now let's get our topping sizes right.
                        sharp('./cheese.png').resize(850, 850).toFile('./cheese2.png', (err, info) => {
                             sharp('./sauce.png').resize(900, 900).toFile('./sauce2.png', (err, info) => {

                                sharp('./top1.png').resize(100, 100).toFile('./top1r.png', (err, info) => {
                                    sharp('./top2.png').resize(100, 100).toFile('./top2r.png', (err, info) => {
                        //now manipulate the image
                                        mergeImages([
                                            {src: './white.png', x:0, y:0 },
                                            {src: './crust.png', x:388, y:0 },
                                            {src: './sauce2.png', x:438, y:50  },
                                            {src: './cheese2.png', x:463, y:75 },


                                            {src: './top1r.png', x:848, y:102 },
                                            {src: './top1r.png', x:1121, y:290 },
                                            {src: './top1r.png', x:920, y:787 },
                                            {src: './top1r.png', x:688, y:730 },
                                            {src: './top1r.png', x:516, y:501 },
                                            {src: './top1r.png', x:602, y:220 },
                                            {src: './top1r.png', x:667, y:387 },
                                            {src: './top1r.png', x:838, y:407 },
                                            {src: './top1r.png', x:838, y:250 },
                                            {src: './top1r.png', x:1038, y:490 },
                                            {src: './top1r.png', x:1121, y:600 },
                                            {src: './top1r.png', x:845, y:658 },




                                            {src: './top2r.png', x:700, y:135 },
                                            {src: './top2r.png', x:1000, y:160 } ,
                                            {src: './top2r.png', x:500, y:340 } ,
                                            {src: './top2r.png', x:1000, y:174 } ,
                                            {src: './top2r.png', x:970, y:360 } ,
                                            {src: './top2r.png', x:1160, y:441 } ,
                                            {src: './top2r.png', x:667, y:560 } ,
                                            {src: './top2r.png', x:794, y:519 } ,
                                            {src: './top2r.png', x:548, y:650 } ,
                                            {src: './top2r.png', x:968, y:600 } ,
                                            {src: './top2r.png', x:796, y:770 } ,
                                            {src: './top2r.png', x:1038, y:750 } 
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        ],
                                            
                                            {
                                            Canvas: Canvas 
                                            })
                                            .then(function(b64){
                                                var b64data = b64.replace(/^data:image\/png;base64,/, "");
                                                fs.writeFile('./result.png', b64data, 'base64', function(err)
                                                {
                                                    //console.log(b64);
                                                    //now upload it.
                                                    var description = selectedToppings[0].emojiName + ' and ' + selectedToppings[1].emojiName + ' pizza';
                                                    console.log(description);
                                                    upload_image('./result.png', description);
                                                    
                                                    
                                                    console.log('yay');
                                                    console.log(err);
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

function upload_image(imagePath, descrip)
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
