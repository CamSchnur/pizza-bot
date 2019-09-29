var pizza_maker = require(__dirname + '/pizza_maker.js'),
express = require('express');

const POST_RESULT_TO_TWITTER = false;

app.use(express.static('public'));

app.get('/', (request, response) => {
  return response.send('ping');
});

app.all(`${process.env.BOT_ENDPOINT}`, function(req, res) {

    pizza_maker.make_pizza(POST_RESULT_TO_TWITTER, true);
    return res.send('success!');
});

var listener = app.listen(process.env.PORT, function()
{
    console.log('bot is listening on port #' + listener.address().port);
});
