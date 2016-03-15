// var map;
//   function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//     	// 25.721316, 90.194303
//       center: {lat: 25.721316, lng: 90.194303},
//       zoom: 8
//     });
//   }

var all_circles = [];
var all_infos = [];
var all_colors = ['red', 'orange', 'yellow', 'green'];

var villages = {

	Dadenggre: {
		center: {lat: 25.721316, lng: 90.194303},
		rainfall: 1.5
	},
	Rongram: {
		center: {lat: 25.593040, lng: 90.263311},
		rainfall: 2.0
	},
	Hatsingimari: {
		center: {lat: 25.711882, lng: 89.898015},
		rainfall: 1.2
	},
	Jongchipara: {
		center: {lat: 25.875096, lng: 90.318242},
		rainfall: 0.9
	},
	Tikrikilla: {
		center: {lat: 25.917099, lng: 90.149328},
		rainfall: 1.8
	},
	Mankachar: {
		center: {lat: 25.538532, lng: 89.858190},
		rainfall: 1.7
	},
	Dingok: {
		center: {lat: 25.873860, lng: 90.483037},
		rainfall: 2.5
	}

  // chicago: {
  //   center: {lat: 41.878, lng: -87.629},
  //   population: 2714856
  // },
  // newyork: {
  //   center: {lat: 40.714, lng: -74.005},
  //   population: 8405837
  // },
  // losangeles: {
  //   center: {lat: 34.052, lng: -118.243},
  //   population: 3857799
  // },
  // vancouver: {
  //   center: {lat: 49.25, lng: -123.1},
  //   population: 603502
  // }
};

function circleColor(rainfall) {
	return all_colors[Math.floor(Math.random() * all_colors.length)];
	// if (rainfall >= 2.5) {
	// 	return 'red'
	// } else if (rainfall >= 2.0 && rainfall < 2.5) {
	// 	return 'orange'
	// } else if (rainfall >= 1.5 && rainfall < 2.0) {
	// 	return 'yellow'
	// } else {
	// 	return 'green'
	// }
}

function randrange(min, max, dec) {
	// return Math.floor(Math.random() * max)
	return (Math.random() * (max - min) + min).toFixed(dec);
}

function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function circleSize(rainfall) {
	return Math.pow(10,3)*5;
}

function showVillageDetails(event) {



	// $('#village-name').text($(this)[0].data);

	// $('#flood-val').text(randint(0,100) + '%');
	// $('#rainfall-val').text(randrange(0,3,1) + ' mm ('+randint(0,100) + '%)');
	// $('#windspeed-val').text(randint(0,20) + ' km/h');
	// $('#maxtemp-val').text(randint(0,100) + ' C');
	// $('#mintemp-val').text(randint(0,100) + ' C');
	// $('#humidity-val').text(randint(0,100) + '%');

	// console.log(event);
	// console.log($(this)[0].data);
	// console.log(event.data);
	// console.log(data);
}

function controlLine(ui, type, params) {

	var line = document.createElement('div');
	line.style.color = 'rgb(25,25,25)';
  line.style.fontFamily = 'Roboto,Arial,sans-serif';
  line.style.fontSize = '16px';
  line.style.fontWeight = '300';
  line.style.lineHeight = (type == 'legendLine') ? '24px' : '38px';
  line.style.paddingLeft = (type == 'legendLine') ? '20px' : '10px';
  line.style.paddingRight = (type == 'legendLine') ? '20px' : '10px';
  
  // line.style.paddingTop = '5px';
  // line.style.paddingBottom = '5px';
  if (type == 'legendLine') {
  	if (params.color == 'red') {
  	line.style.paddingTop = '10px';
	  }
	  if (params.color == 'green') {
	  	line.style.paddingBottom = '10px';
	  }
  	line.innerHTML = '<svg height="20" width="30"><circle cx="10" cy="10" r="8" stroke='
  	+ params.color + ' stroke-width="3" fill=' + params.color + ' /></svg>' + params.text;

  }
  else {
  	line.innerHTML = params.text;
  }
  ui.appendChild(line);

}

function controlTable(controlDiv, params) {
	var table = document.createElement('table');
	table.style.color = 'rgb(25,25,25)';
  table.style.fontFamily = 'Roboto,Arial,sans-serif';
  table.style.fontSize = '14px';
  table.style.fontWeight = '300';
  table.style.paddingLeft = '10px';
  table.style.paddingRight = '10px';
  // table.style.paddingTop = '20px';
  table.style.paddingBottom = '10px';
  table.style.textAlign = 'left';


	for (var param of params) {
		// console.log(param, param.name, param.value)
		var tr = document.createElement('tr');
		var td1  = document.createElement('td');
		var td2 = document.createElement('tr');
		var text1 = document.createTextNode(param.name);
		var text2 = document.createTextNode(param.value);
		td1.appendChild(text1);
		td2.appendChild(text2);
		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
	}

	controlDiv.appendChild(table);
}

function createControl(controlDiv, map, controlType, text) {
	// Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginRight = '22px';
  controlUI.style.marginTop = '22px';
  controlUI.style.marginLeft = (controlType == 'measurement') ? '0px' : '22px';
  controlUI.style.marginBottom = '22px';

  controlUI.style.textAlign = (controlType == 'legend') ? 'left' : 'center';
  controlUI.title = '';
  controlDiv.appendChild(controlUI);

  if (controlType == 'legend') {

  	var legendLine1 = new controlLine(controlUI, 
  		'legendLine', {'text': 'Very high', 'color': 'red'});
  	var legendLine2 = new controlLine(controlUI, 
  		'legendLine', {'text': 'High', 'color': 'orange'});
  	var legendLine3 = new controlLine(controlUI, 
  		'legendLine', {'text': 'Average', 'color': 'yellow'});
  	var legendLine4 = new controlLine(controlUI, 
  		'legendLine', {'text': 'Low', 'color': 'green'});
	  // var legendLine1 = new legendLine(controlUI, 'Very High', 'red');
	  // var legendLine2 = new legendLine(controlUI, 'High', 'orange');
	  // var legendLine3 = new legendLine(controlUI, 'Average', 'yellow');
	  // var legendLine4 = new legendLine(controlUI, 'Low', 'green');

  }
  else if (controlType == 'details') {

  	var detailsLine = new controlLine(controlUI, 'detailLine', {'text': 'Dadenggre'})
  	var detailsTable = new controlTable(controlUI, [
  		{'name': 'Chance of flood', 'value': '40%'},
  		{'name': 'Rainfall', 'value': '1.5 mm (50%)'},
  		{'name': 'Windspeed', 'value': '13 km/h'},
  		{'name': 'Max temp', 'value': '30 C'}, 
  		{'name': 'Min temp', 'value': '22 C'},
  		{'name': 'Humidity', 'value': '48%'}
  	]);
  	// controlUI.appendChild(detailsTable);

  }
  else {

  	var generalLine = new controlLine(controlUI, 'general', {'text': text});

  }

  controlUI.addEventListener('click', function() {
    // map.setCenter(chicago);
    // alert('clicked');
  });
}

function initMap() {
  // Create the map.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 25.721316, lng: 90.194303},
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl: false,
	  zoomControl: true,
	  zoomControlOptions: {
	  	position: google.maps.ControlPosition.LEFT_BOTTOM
	  },
	  scaleControl: true,
	  streetViewControl: false,
	  fullScreenControl: true
  });


  // Construct the circle for each value in citymap.
  // Note: We scale the area of the circle based on the population.
  var index = 0
  for (var village in villages) {

  	var villageColor = circleColor(villages[village].rainfall);

    var villageInfo = new google.maps.InfoWindow({
    	content: '<div id="content">'
    	+'<h3>' + village + '</h3>'
    	+ '<i>Updated: 15/03/2016 at 10:56</i><br />'
    	+ '<a href="#">Download data</a>'
    	+ '<br /><br />'
    		+ '<table>'
    			+'<tr><td>Chance of flood</td><td>40%</td></tr>'
    			+'<tr><td>Rainfall</td><td>1.5 mm (50%)</td></tr>'
    			+'<tr><td>Windspeed</td><td>13 km/h</td></tr>'
    			+'<tr><td>Max Temp</td><td>30 C</td></tr>'
    			+'<tr><td>Min Temp</td><td>22 C</td></tr>'
    			+'<tr><td>Humidity</td><td>48%</td></tr>'
    		+ '</table>'
    	+ '</div>'
    });
    all_infos.push(villageInfo);

    // Add the circle for this city to the map.
    var villageCircle = new google.maps.Circle({
      strokeColor: villageColor,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: villageColor,
      // fillColor: circleColor(),
      fillOpacity: 0.35,
      map: map,
      center: villages[village].center,
      position: villages[village].center,
      radius: circleSize(villages[village].rainfall),
      data: village
      // raidius: 
      // radius: Math.sqrt(villages[village]*1000000) * 100
    });
    all_circles.push(villageCircle);

    // if (village == 'Dingok') {
  	// villageCircle.addListener('click', function() {
  	google.maps.event.addListener(all_circles[index], 'click', function(innerKey) {
  		// console.log('derp');
    	// console.log(i,e,h);
    	// console.log(all_infos, this)
    	return function() {
    		all_infos[innerKey].open(map, all_circles[innerKey]);
    	}
    	// all_infos[all_infos.length-1].open(map, this);
    }(index));
    // }

    index++;
    
  }
  // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
	// var downloadDiv = document.createElement('div');
	// var downloadControl = new createControl(downloadDiv, map, 'download', 'Download Data');
	// downloadDiv.index = 1;
 //  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(downloadDiv);

  var legendDiv = document.createElement('div');
	var legend = new createControl(legendDiv, map, 'legend', '');
	legendDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);

  var paramsDiv = document.createElement('div');
  var paramsControl = new createControl(paramsDiv, map, 'params', '24 hours');
  paramsDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(paramsDiv);

  var measurementDiv = document.createElement('div');
  var measureControl = new createControl(measurementDiv, map, 'measurement', 'Rainfall');
  measurementDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(measurementDiv);

  // var detailsDiv = document.createElement('div');
  // var detailControl = new createControl(detailsDiv, map, 'details', '');
  // detailsDiv.index = 1;
  // map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(detailsDiv);

  // map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('legend'));
}

$('#display-param').change(function() {
	for (circle of all_circles) {
		circle.setOptions({fillColor: circleColor(0)});
	}
})