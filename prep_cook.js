module.exports = 
  {
    get_prepared_ingredients: function(hostedOnGlitch)
    {
        var background;
        if(hostedOnGlitch)
        {
            background = 'https://cdn.glitch.com/d4b86d30-396d-47c5-a181-d845c506ec1b%2Fwhite.png?v=1569695143892';
        }
        else
        {
            background = './.data/1.png';
        }
        return [

            //add the basic ingredients
            {src: background, x:0, y:0 },
            {src: './.data/crust.png', x:388, y:0 },
            {src: './.data/sauce2.png', x:438, y:50 },
            {src: './.data/cheese2.png', x:463, y:75 },

            //add the first topping repeatedly.
            //using a manually selected layout rather than true random positioning for better aesthetic
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

            //add the second topping repeatedly
            //using a manually selected layout rather than true random positioning for better aesthetic 
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

        ]
    }
};

//helps to position ingredients on the pizza with some element of randomness
function get_random_offset()
{
    var offset = (Math.random() * 10);
    return offset - 5;
}
