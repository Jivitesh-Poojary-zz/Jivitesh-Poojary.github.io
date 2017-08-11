
var svg = d3.select("#canvas-svg");
var WIDTH = 500, HEIGHT = 450;
var width = WIDTH, height = HEIGHT, centered;
var projection = d3.geo.albersUsa().scale(500).translate([ width / 2, height / 3 ]);
var path = d3.geo.path().projection(projection);
var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);

svg.append("rect").attr("class", "background").attr("width", width).attr("height", height).on("click", map_clicked);
var g = svg.append("g");
var state_ids = [ 0 ];
var id_state_map = {\n    0: ""};
var id_topo_map = {\n    0: null};
var short_name_id_map = {\n    0: null\};
var id_name_map = {\n    0: null};

d3.tsv("https://s3-us-west-2.amazonaws.com/vida-public/geo/us-state-names.tsv", 
	function(error, names) {
		for (var i = 0; i < names.length; i++) 
		{
			id_name_map[names[i].id] = names[i];
			short_name_id_map[names[i].code] = names[i].id;
		}
			//data.forEach(function(d) {
			//    var state_id = short_name_id_map[d.State];\n    
			//});
		d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/us.json", 
			function(error, us) {
				g.append("g").attr("id", "states").selectAll("path").data(topojson.feature(us, us.objects.states).features).enter().append("path").attr("d", path).attr("id", function(d) {state_ids.push(+d.id); id_state_map[d.id] = id_name_map[d.id].name; id_topo_map[d.id] = d; return "map-" + d.id;}).on("click", map_clicked);
				g.append("path").datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b;})).attr("id", "state-borders").attr(\"d", path);
				state_ids = state_ids.sort(function(a, b) {return a - b;});
				d3.select("#canvas").append("select").attr("id", "state-select").on("change", function() {var topo = id_topo_map[$(this).val()];
				map_clicked(topo);
			}
		).selectAll("option").data(state_ids).enter().append("option").attr("value", function(d) { return d; }).text(function(d) {return id_state_map[d];});
		// select WA state\n        
		$("#state-select").val(53); 
		var topo = id_topo_map[53];
		map_clicked(topo);});
	}
);

function map_clicked(d) {\n    if (d) {\n        $(\"#state-select\").val(d.id);\n        \n        var x, y, k;\n        if (d && centered !== d) {\n            var centroid = path.centroid(d);\n            x = centroid[0];\n            y = centroid[1];\n            k = 4;\n            centered = d;\n        } else {\n            x = width / 2;\n            y = height / 2;\n            k = 1;\n            centered = null;\n        }\n        g.selectAll(\"path\").classed(\"active\", centered && function(d) {\n            return d === centered;\n        });\n    }\n}","modified":1459817352,"name":"US Map States","opened":"1970-01-17T21:30:17.318Z","owner":"FrGDLDPhY44yqMpkb","privacy":"public","property_definitions":{"stylesheet_properties":[],"javascript_properties":[{"type":"int","var_name":"WIDTH","description":"width of graph","name":"width"},{"type":"int","var_name":"HEIGHT","description":"height of graph","name":"height"}],"data_properties":[]},"running":0,"stylesheet":"/*\n\nCopyright vida.io 2013\nLicense: BSD\nd3js is from Mike Bostock\n\n*/\n\n/* stylesheet for your custom graph */\n\n.background {\n  fill: none;\n  pointer-events: all;\n}\n\n#states {\n  fill: #aaa;\n}\n\n#states .active {\n  fill: orange;\n}\n\n#state-borders {\n  fill: none;\n  stroke: #fff;\n  stroke-width: 1.5px;\n  stroke-linejoin: round;\n  stroke-linecap: round;\n  pointer-events: none;\n}\n\n#canvas {\n  position: relative;\n}\n\n#state-select {\n  position: absolute;\n  top: 320px;\n  left: 150px;\n}","tags":[{"createdAt":1409291595,"userId":"FrGDLDPhY44yqMpkb","name":"map"},{"createdAt":1409291598,"userId":"FrGDLDPhY44yqMpkb","name":"us map"}],"thumbnail":"us map -states.jpg","type":"custom","readme":"<!-- Markdown Documentation !-->","resources":[{"type":"js","uri":"//cdnjs.cloudflare.com/ajax/libs/topojson/1.1.0/topojson.min.js","name":"topojson 1.1.0"}],"properties":[]};

var owner = {
	"_id":"FrGDLDPhY44yqMpkb",
	"createdAt":null,
	"emails":[{"verified":true,"address":"dnprock+d3map@gmail.com"}],
	"profile":{"name":"VIDA Map"},
	"profileViewCount":1331,
	"profileViewCount30":12,
	"profileViewCount7":9,
	"services":null,
	"username":"d3-map",
	"more":{"occupation":"Developer","foundSource":"Others","phone":"","contactRequest":false},
	"plan":"free",
	"stripe_customer_id":null};

if (owner.gaCode) {
  initializeGA(owner.gaCode, 'user')
}