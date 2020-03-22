var csv = require("csvtojson");
var shell = require('shelljs');
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use('/',express.static(__dirname + '/frontend'));

// app.get('/',function(req,res){
//     res.send("Hello");
// });

app.get('/api/regions',function(req,res){

    var link = 'https://raw.githubusercontent.com/aboullaite/Covid19-MA/master/stats/regions.csv';
    var path = './regions.csv';
    shell.exec('./update_data.sh '+ link + " " + path);
    csv()
    .fromFile(path)
    .then(function(result){
        res.send(result);
    });
});

app.get('/api/cities',function(req,res){

    var link = 'https://raw.githubusercontent.com/aboullaite/Covid19-MA/master/stats/cities.csv';
    var path = './cities.csv';
    shell.exec('./update_data.sh '+ link + ' ' + path);
    csv()
    .fromFile(path)
    .then(function(result){
        res.send(result);
    });
});

app.get('/api/time',function(req,res){

    var link = 'https://raw.githubusercontent.com/aboullaite/Covid19-MA/master/stats/MA-times_series.csv';
    var path = './time.csv';
    shell.exec('./update_data.sh '+ link + ' ' + path);
    csv()
    .fromFile(path)
    .then(function(result){
        res.send(result);
    });
});

app.listen(3000,function(){
    console.log('Listening on port 3000');
})
