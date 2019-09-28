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
                                            {src: './white.png', x:0+get_random_offset(), y:0+get_random_offset() },
                                            {src: './crust.png', x:388+get_random_offset(), y:0+get_random_offset() },
                                            {src: './sauce2.png', x:438+get_random_offset(), y:50+get_random_offset() },
                                            {src: './cheese2.png', x:463+get_random_offset(), y:75+get_random_offset() },


                                            {src: './top1r.png', x:848+get_random_offset(), y:102+get_random_offset() },
                                            {src: './top1r.png', x:1121+get_random_offset(), y:290+get_random_offset() },
                                            {src: './top1r.png', x:920+get_random_offset(), y:787+get_random_offset() },
                                            {src: './top1r.png', x:688+get_random_offset(), y:730+get_random_offset() },
                                            {src: './top1r.png', x:516+get_random_offset(), y:501+get_random_offset() },
                                            {src: './top1r.png', x:602+get_random_offset(), y:220+get_random_offset() },
                                            {src: './top1r.png', x:667+get_random_offset(), y:387+get_random_offset() },
                                            {src: './top1r.png', x:838+get_random_offset(), y:407+get_random_offset() },
                                            {src: './top1r.png', x:865+get_random_offset(), y:268+get_random_offset() },
                                            {src: './top1r.png', x:1038+get_random_offset(), y:490+get_random_offset() },
                                            {src: './top1r.png', x:1121+get_random_offset(), y:600+get_random_offset() },
                                            {src: './top1r.png', x:845+get_random_offset(), y:658+get_random_offset() },




                                            {src: './top2r.png', x:700+get_random_offset(), y:135+get_random_offset() },
                                            {src: './top2r.png', x:1000+get_random_offset(), y:160+get_random_offset() } ,
                                            {src: './top2r.png', x:500+get_random_offset(), y:340+get_random_offset() } ,
                                            {src: './top2r.png', x:750+get_random_offset(), y:288+get_random_offset() } ,
                                            {src: './top2r.png', x:970+get_random_offset(), y:360+get_random_offset() } ,
                                            {src: './top2r.png', x:1160+get_random_offset(), y:441+get_random_offset() } ,
                                            {src: './top2r.png', x:667+get_random_offset(), y:560+get_random_offset() } ,
                                            {src: './top2r.png', x:794+get_random_offset(), y:519+get_random_offset() } ,
                                            {src: './top2r.png', x:548+get_random_offset(), y:650+get_random_offset() } ,
                                            {src: './top2r.png', x:968+get_random_offset(), y:600+get_random_offset() } ,
                                            {src: './top2r.png', x:796+get_random_offset(), y:770+get_random_offset() } ,
                                            {src: './top2r.png', x:1038+get_random_offset(), y:750+get_random_offset() } 
                                        
                                        
                                        
                                        
                                        
                                        
                                        
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

function get_random_offset()
{
    var offset = (Math.random() * 10);

    return offset - 5;

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

    
    addTopping('Cherry Blossom', '\ud83c\udf38');
    addTopping('Cactus', '\ud83c\udf35');
    addTopping('Herb', '\ud83c\udf3f');
    addTopping('Snail', '\ud83d\udc0c');
    addTopping('Rose', '\ud83c\udf39');
    addTopping('Hibiscus', '\ud83c\udf3a');
    addTopping('Pumpkin', '\ud83c\udf83');

    addTopping('Peanut', '\ud83e\udd5c');
    addTopping('Chestnut', '\ud83c\udf30');
    addTopping('Leafy Green', '\ud83e\udd6c');
    addTopping('Garlic', '\ud83e\uddc4');
    addTopping('Onion', '\ud83e\uddc5');
    addTopping('Crab', '\ud83e\udd80');
    addTopping('Shrimp', '\ud83e\udd90');
    addTopping('Lobster', '\ud83e\udd9e');
    addTopping('Oyster', '\ud83e\uddaa');
    addTopping('Ear of Corn', '\ud83c\udf3d');
    addTopping('Hot Pepper', '\ud83c\udf36\ufe0f');
    addTopping('Cucumber', '\ud83e\udd52');
    addTopping('Potato', '\ud83e\udd54');
    addTopping('Avocado', '\ud83e\udd51');
    addTopping('Duck', '\ud83e\udd86');
    addTopping('Stuffed Flatbread', '\ud83e\udd59');
    addTopping('Birthday Cake', '\ud83c\udf82');
    addTopping('Falafel', '\ud83e\uddc6');
    addTopping('Pie', '\ud83e\udd67');
    addTopping('Egg', '\ud83e\udd5a');
    addTopping('Bagel', '\ud83e\udd6f');
    addTopping('Waffle', '\ud83e\uddc7');
    addTopping('Ice', '\ud83e\uddca');
    addTopping('Baguette', '\ud83e\udd56');
    addTopping('Bread', '\ud83c\udf5e');
    addTopping('Turkey Leg', '\ud83c\udf57');
    addTopping('Hamburger', '\ud83c\udf54');
    addTopping('Rice Ball', '\ud83c\udf59');
    addTopping('Rice Cracker', '\ud83c\udf58');
    addTopping('Moon Cake', '\ud83e\udd6e');
    addTopping('Hot Dog', '\ud83c\udf2d');
    addTopping('Sandwich', '\ud83e\udd6a');
    addTopping('Sushi', '\ud83c\udf63');
    addTopping('Fish Cake with Swirl', '\ud83c\udf65');
    addTopping('Roasted Sweet Potato', '\ud83c\udf60');

    addTopping('Strawberry', '\ud83c\udf53');
    addTopping('Kiwi Fruit', '\ud83e\udd5d');
    addTopping('Tomato', '\ud83c\udf45');
    addTopping('Banana', '\ud83c\udf4c');
    addTopping('Lemon', '\ud83c\udf4b');
    addTopping('Pineapple', '\ud83c\udf4d');
    addTopping('Apple', '\ud83c\udf4e');
    addTopping('Mango', '\ud83e\udd6d');
    addTopping('Green Apple', '\ud83c\udf4f');
    addTopping('Pear', '\ud83c\udf50');
    addTopping('Cherries', '\ud83c\udf52');
    addTopping('Steak', '\ud83e\udd69');
    addTopping('Cookie', '\ud83c\udf6a');
    addTopping('Grapes', '\ud83c\udf47');
    addTopping('Melon', '\ud83c\udf48');
    addTopping('Tangerine', '\ud83c\udf4a');
    addTopping('Oden', '\ud83c\udf62');

    //use sparingly? they have plates
    addTopping('Salt', '\ud83e\uddc2');
    addTopping('Chocolate Bar', '\ud83c\udf6b');
    addTopping('Butter', '\ud83e\uddc8');
    addTopping('Salad', '\ud83e\udd57');
    addTopping('Spaghetti', '\ud83c\udf5d');
    //spaghetti
    //flan
  
}
function addTopping(emojiName, emojiUnicode)
{
    allToppings.push(new emoji(emojiName, emojiUnicode));
    console.log('added topping ' + emojiName)
}
