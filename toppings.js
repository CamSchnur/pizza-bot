var emoji = require(__dirname + '/emoji.js'),
allToppings = new Array();

module.exports = 
  {
generate_toppings_list: function()
{
    allToppings = new Array();

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
    return allToppings;

    
}
};

function addTopping(emojiName, emojiUnicode)
{
    allToppings.push(new emoji(emojiName, emojiUnicode));
    console.log('added topping ' + emojiName)
}