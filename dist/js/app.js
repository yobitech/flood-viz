// var map;
//   function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//     	// 25.721316, 90.194303
//       center: {lat: 25.721316, lng: 90.194303},
//       zoom: 8
//     });
//   }

var all_circles = [];
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

function updateVillage(event) {
	$('#village-name').text($(this)[0].data);

	$('#flood-val').text(randint(0,100) + '%');
	$('#rainfall-val').text(randrange(0,3,1) + ' mm ('+randint(0,100) + '%)');
	$('#windspeed-val').text(randint(0,20) + ' km/h');
	$('#maxtemp-val').text(randint(0,100) + ' C');
	$('#mintemp-val').text(randint(0,100) + ' C');
	$('#humidity-val').text(randint(0,100) + '%');

	// console.log(event);
	// console.log($(this)[0].data);
	// console.log(event.data);
	// console.log(data);
}

function initMap() {
  // Create the map.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 25.721316, lng: 90.194303},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  // Construct the circle for each value in citymap.
  // Note: We scale the area of the circle based on the population.
  for (var village in villages) {
    // Add the circle for this city to the map.
    var villageCircle = new google.maps.Circle({
      // strokeColor: circleColor(villages[village].rainfall),
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: circleColor(villages[village].rainfall),
      // fillColor: circleColor(),
      fillOpacity: 0.35,
      map: map,
      center: villages[village].center,
      radius: circleSize(villages[village].rainfall),
      data: village
      // raidius: 
      // radius: Math.sqrt(villages[village]*1000000) * 100
    });
    villageCircle.addListener('click', updateVillage);
    // all_circles.push({circle: villageCircle, village: village});
    all_circles.push(villageCircle);
		// var marker = new google.maps.Marker({
	 //    position: villages[village].center,
	 //    map: map,
	 //    title: 'Hello World!'
	 //  });
  }
}

$('#display-param').change(function() {
	for (circle of all_circles) {
		circle.setOptions({fillColor: circleColor(0)});
	}
})