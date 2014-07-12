// #Mock Server application
//load globals
require('./utils/globals');

//get configured express
var app = require('./config/express')();

//attach routes
require('./routes')(app);

//run mock-server
app.listen(app.get('port'), function(){
    console.log('Express MOCKS mock-server running on http://' + require('./utils').localIp() + ':' + app.get('port') + ', in ' + process.env.NODE_ENV);
});
