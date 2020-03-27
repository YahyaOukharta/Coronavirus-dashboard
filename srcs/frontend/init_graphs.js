var init_regions = function(){
    //fetch data from local api
    $.getJSON('http://localhost:3000/api/regions',function(data){

        let jsondata = data;
        let labels = []; //for labels // x axis
        let active_cases = []; //for datapoints // y axis
        let recoveries = []; //for datapoints // y axis
        let deaths = []; //for datapoints // y axis
        
        //sort data by number of active cases 
        var sorted = jsondata.slice(0);
        sorted.sort(function(a,b) {
            return Number(b["Active Cases / الحالات النشطة"]) - Number(a["Active Cases / الحالات النشطة"]);
        });
        jsondata = sorted;

        //fill 'labels' array with all region names
        jsondata.forEach(line => {
            labels.push(line["Region / الجهة"]);
        });
        //fill 'active_cases' array with number of active cases per region
        jsondata.forEach(line => {
            active_cases.push(line["Active Cases / الحالات النشطة"]);
        });
        //fill 'deaths' array with number of deaths per region
        jsondata.forEach(line => {
            deaths.push(line["Total Deaths / إجمالي الوفيات"]);
        });
        //fill 'recoveries' array with number of recoveries per region
        jsondata.forEach(line => {
            recoveries.push(line["Total Recovered / إجمالي المعافين"]);
        });

        //select canvas by id
        var ctx = document.getElementById('regions');
        //init chart
        var chart = new Chart(ctx, {
            type: 'bar',

            data: {
                labels: labels, // Regions names
                datasets: [
                    {
                        label: 'Number of active cases',
                        data: active_cases,
                        backgroundColor: 'rgba(255,0,0,.5)',
                        borderWidth: 2
                    },
                    {
                        label: 'Total recoveries',
                        data: recoveries,
                        backgroundColor: 'rgba(0,255,0,.5)',
                        borderWidth: 2
                    },
                    {
                        label: 'Total deaths',
                        data: deaths,
                        backgroundColor: 'rgba(50,0,0,.5)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                aspectRatio: 1.9,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                          autoSkip: false,
                          maxRotation: 20,
                          minRotation: 0
                        }
                    }]
                }
            }
        });
    });
};

var init_cities = function(){
    $.getJSON('http://localhost:3000/api/cities',function(data){

        let jsondata = data;
        let labels = []; //for labels // x axis
        let active_cases = []; //for datapoints // y axis
        let recoveries = []; //for datapoints // y axis
        let deaths = []; //for datapoints // y axis

        //sort data by number of active cases 
        var sorted = jsondata.slice(0);
        sorted.sort(function(a,b) {
            return Number(b["Active Cases / الحالات النشطة"]) - Number(a["Active Cases / الحالات النشطة"]);
        });
        jsondata = sorted;

            // Since a lot of cities have zero cases,
            // we'll ignore them until their stats change

        jsondata.forEach(line => {
            if (Number(line['Active Cases / الحالات النشطة']) +
                Number(line['Total Deaths / إجمالي الوفيات']) +
                Number(line['Total Recovered / إجمالي المعافين']) != 0)
            {
                //fill 'labels' array with all city names
                labels.push(line["City / المدينة"])

                //fill 'active_cases' array with number of active cases per region
                active_cases.push(line["Active Cases / الحالات النشطة"]);

                //fill 'deaths' array with number of deaths per region
                deaths.push(line["Total Deaths / إجمالي الوفيات"]);

                //fill 'recoveries' array with number of recoveries per region
                recoveries.push(line["Total Recovered / إجمالي المعافين"]);
            }
        });

        //select canvas by id
        var ctx = document.getElementById('cities');
        //init chart
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels, // cities names
                datasets: [
                    {
                        label: 'Number of active cases',
                        data: active_cases,
                        backgroundColor: 'rgba(255,0,0,.5)',
                        borderWidth: 2
                    },
                    {
                        label: 'Total recoveries',
                        data: recoveries,
                        backgroundColor: 'rgba(0,255,0,.5)',
                        borderWidth: 2
                    },
                    {
                        label: 'Total deaths',
                        data: deaths,
                        backgroundColor: 'rgba(50,0,0,.5)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                aspectRatio: 2.3,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });
}

 var init_time = function(){
            //fetch data from local api
    $.getJSON('http://localhost:3000/api/time',function(data){

        let jsondata = data;
        let dates = []; //for time points // x axis
        let active_cases = []; //for datapoints // y axis
        let recoveries = []; //for datapoints // y axis
        let deaths = []; //for datapoints // y axis
    
    
        for(var i = 0; i < jsondata.length; i++)
        {
            //fill 'dates' array with all dates
            var line = jsondata[i];
            date = line["Dates / التواريخ"];
    
            var date = moment(line["Dates / التواريخ"], "DD/MM/YYYY"); //parse date using momentjs
            //get diff between two dates entries , missing days are diff - 1
            var diff = (i != jsondata.length - 1 ? Math.abs(date.diff(moment(jsondata[i + 1]["Dates / التواريخ"], "DD/MM/YYYY"), 'days')) : 1);
    
            for(var j = 0; j < diff; j++)
            {
                var tmp = date.add(Math.min(j,1), 'days').format("DD/MM"); //add missing dates by adding one day
                dates.push(tmp);
                //fill 'active_cases' array with objects {x:date,y:number of active cases}
                active_cases.push(
                    {
                        x: tmp,
                        y: line["Cases / الحالات"]
                    });
                
                //fill 'deaths' array with objects {x:date,y:number of deaths}
                deaths.push(
                    {
                        x: tmp,
                        y: line["Deaths / الوفيات"]
                    }
                    );
    
                //fill 'recoveries' array with objects {x:date,y:number of recoveries}
                recoveries.push(
                    {
                        x: tmp,
                        y: line["Recovered / تعافى"]
                    }); 
            }
        }
        //init graph ...
        var ctx = document.getElementById('time');
    
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates, // Dates
                datasets: [
                    {
                        label: 'Total recoveries',
                        data: recoveries,
                        backgroundColor: 'rgba(0,255,0,.5)',
                        borderWidth: 2,
                        width:2
                    },
                    {
                        label: 'Total deaths',
                        data: deaths,
                        backgroundColor: 'rgba(50,0,0,.5)',
                        borderWidth: 2
                    },
                    {
                        label: 'Number of active cases',
                        data: active_cases,
                        backgroundColor: 'rgba(255,0,0,.5)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                aspectRatio:1.5,
    
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        display: true,
                    }],
                    yAxes: [{
                        display: true,
                    }]
                }
            }
        });
    });
}

var init_map = function(){
    $.getJSON('http://localhost:3000/api/geo',function(data){

        var mymap = L.map('mapid').setView([28.84467, -9.93164], 5);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> , Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 5,
        minZoom: 5,
        id: 'mapbox/streets-v8',
        tileSize: 512,
        zoomOffset: -1,
        zoomControl: false,
        accessToken: 'pk.eyJ1IjoieWFoeW95byIsImEiOiJjazg5OTQ2eDAwNDN5M2ZxbGNpMWR1YXE4In0.tltpBUEFu4GxFiu8PJqb-g'
    }).addTo(mymap);

    L.geoJSON(data,{
        onEachFeature: function (feature, layer){
        var content = feature.properties['Name-FR'] + "<br>";
            content += feature.properties['Name-AR'] + "<br>";
            content+= "Active cases: " + feature.properties['Active cases'] + "<br>";
            content+= "Recoveries  : " + feature.properties['Total Recovered'] + "<br>";
            content+= "Deaths      : " + feature.properties['Total Deaths'] + "<br>";
        layer.bindPopup(content);
        //console.log(feature.properties);
        }
    }).addTo(mymap);
    });
}

var init_everything = function(){
        init_map();
    init_time();
    init_cities();
    init_regions();
}