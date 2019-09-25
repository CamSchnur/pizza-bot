twemoji = require('twemoji'),
cheerio = require('cheerio');

class emoji
{
    constructor(emojiName, emojiUnicode)
    {
        var div = twemoji.parse(emojiUnicode, { folder: 'svg', ext: '.svg'});
        var parsed = cheerio.load(div);
        var src = parsed('img').attr('src');
    
        this.emojiName = emojiName;
        this.emojiPath = src;
    }
}
module.exports = emoji