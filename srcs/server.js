var csv = require("csvtojson");
var shell = require('shelljs');
var express = require('express');
var cors = require('cors');
var fs = require('fs');

var app = express();

app.use(cors());
app.use(express.static('public'));
app.use('/',express.static(__dirname + '/frontend'));
//app.use('/',express.static(__dirname + '/frontend/mdb'));

// app.get('/',function(req,res){
//     res.send("Hello");
// });

function update_data(){
    console.log("Retrieving data");
    var link_regions = 'https://raw.githubusercontent.com/aboullaite/Covid19-MA/master/stats/regions.csv';
    var path_regions = './backend/data/regions.csv';
    shell.exec('bash ./backend/update_data.sh '+ link_regions + " " + path_regions);
    var link_cities = 'https://raw.githubusercontent.com/aboullaite/Covid19-MA/master/stats/cities.csv';
    var path_cities = './backend/data/cities.csv';
    shell.exec('bash ./backend/update_data.sh '+ link_cities + ' ' + path_cities);
    var link_time = 'https://raw.githubusercontent.com/aboullaite/Covid19-MA/master/stats/MA-times_series.csv';
    var path_time = './backend/data/time.csv';
    shell.exec('bash ./backend/update_data.sh '+ link_time + ' ' + path_time);
    var link_geo = 'https://raw.githubusercontent.com/aboullaite/Covid19-MA/master/ma-convid19-state.geojson';
    var path_geo = './backend/data/geo.json';
    shell.exec('bash ./backend/update_data.sh '+ link_geo + ' ' + path_geo);
}

app.get('/api/geo',function(req,res)
{
    var path = './backend/data/geo.json';
    var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
    res.send(obj);
});

app.get('/api/regions',function(req,res)
{
    var path = './backend/data/regions.csv';
    csv()
    .fromFile(path)
    .then(function(result){
        res.send(result);
    });
});

app.get('/api/cities',function(req,res){
    var path = './backend/data/cities.csv';
    csv()
    .fromFile(path)
    .then(function(result){
        res.send(result);
    });
});

app.get('/api/time',function(req,res){
    var path = './backend/data/time.csv';
    csv()
    .fromFile(path)
    .then(function(result){
        res.send(result);
    });
});

app.listen(3000,function(){
    //update_data();
    //setInterval(update_data, 1000 * 60 * 5); // 5 minutes
    console.log('Listening on port 3000');
})
