var pizza_maker = require(__dirname + '/pizza_maker.js'),
express = require('express'),
app = express();

const POST_RESULT_TO_TWITTER = true;
const HOSTED_ON_GLITCH = true;

app.use(express.static('public'));

//Ping endpoint
app.get('/', (request, response) => {
  return response.send('ping');
});

//Main endpoint
app.all(`${process.env.BOT_ENDPOINT}`, function(req, res) {

    pizza_maker.make_pizza(POST_RESULT_TO_TWITTER, HOSTED_ON_GLITCH);
    return res.send('success!');
});

var listener = app.listen(process.env.PORT, function()
{
    console.log('bot is listening on port #' + listener.address().port);
});
