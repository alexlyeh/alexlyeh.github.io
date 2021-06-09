onload = function () {

	var margin = {top: 30, right: 70, bottom: 30, left: 70};
	var width = 1200 - margin.left - margin.right;
	var height = 670 - margin.top - margin.bottom;
	var i;
	var hoverPoint;


	var dataArray = [];
	var timesArray = [];


	var fillData = function (emptyArray0, emptyArray1) {
		var randMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var randMonthPicker = Math.floor(Math.random() * 11);
		var dateNum = Math.floor((Math.random() *20) + 1);
		var monthIncrease = 0;
		var year = Math.floor((Math.random() *20) + 1);
		for (i = 0; i < 5; i++) {
			if ((monthIncrease + randMonthPicker) >= 11) {
				emptyArray0.push({"date":  (dateNum + i) + "-" + randMonth[randMonthPicker + monthIncrease -11] + "-" + (year + 1), "val": Math.random() * 500});
				emptyArray1.push({"date":  (dateNum + i) + "-" + randMonth[randMonthPicker + monthIncrease -11] + "-" + (year + 1), "val": Math.random() * 300});
				monthIncrease++;
			}else{
				emptyArray0.push({"date":  (dateNum + i) + "-" + randMonth[randMonthPicker + monthIncrease] + "-" + year, "val": Math.random() * 500});
				emptyArray1.push({"date":  (dateNum + i) + "-" + randMonth[randMonthPicker + monthIncrease] + "-" + year, "val": Math.random() * 300});			
				monthIncrease++;
			}
		}

	}

	fillData(dataArray, timesArray);

	var parseDate = d3.time.format("%d-%b-%y").parse;

	for (i = 0; i < dataArray.length; i++) {
		dataArray[i].date = parseDate(dataArray[i].date);
	}

	for (i = 0; i < timesArray.length; i++) {
		timesArray[i].date = parseDate(timesArray[i].date);
	}

	var initialArrayViews = [];
	for(i = 0; i < dataArray.length; i++){
		initialArrayViews.push({"date": dataArray[i].date, "val": 0});
	}

	var initialArrayTimes = [];
	for(i = 0; i < timesArray.length; i++){
		initialArrayTimes.push({"date": timesArray[i].date, "val": 0});
	}

	var svg = d3.select("#linechart")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	var maxArray = [];

	for (i = 0; i < dataArray.length; i++) {
		maxArray.push(dataArray[i].val);
	}

	maxArray.sort();

	var x = d3.time.scale()
		.domain([dataArray[0].date, dataArray[dataArray.length - 1].date])
		.range([0, width]);

	var y = d3.scale.linear()
		.domain([0, width])
		.range([height, 0])
		.clamp(true);

	var xaxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.ticks(d3.time.months, 1)
		.tickPadding(8)
		.tickSize(0, 0, 0)
		.tickSubdivide(1)
		.tickFormat(d3.time.format("%b"));

	var viewaxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickSize(0, 0)
		.ticks(0);

	var timeaxis = d3.svg.axis()
		.scale(y)
		.orient("right")
		.tickSize(0, 0)
		.ticks(0);

	var group = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var background = group.append("g");

	background.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "#f1f1f1");

	background.selectAll("line")
		.data(x.ticks(3))
		.enter()
		.append("line")
		.attr("x1", x)
		.attr("x2", x)
		.attr("y1", height)
		.attr("y2", 0)
		.attr("stroke-width", 3)
		.attr("stroke", "#b3b3b3");

	var line = d3.svg.line()
		.x(function (d) { return x(d.date); })
		.y(function (d) { return y(d.val); });

	var xAxisLine = group.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xaxis);

	var yAxisLine = group.append("g")
		.attr("class", "y axis")
		.call(viewaxis);

	var viewsLine = group.append("g")
		.selectAll("path")
		.data([initialArrayViews])
		.enter()
		.append("path")
		.attr("d", line)
		.attr("fill", "none")
		.attr("stroke", "#da1700")
		.attr("stroke-width", 1);

	var timesLine = group.append("g")
		.selectAll("path")
		.data([initialArrayTimes])
		.enter()
		.append("path")
		.attr("d", line)
		.attr("fill", "none")
		.attr("stroke", "gray")
		.attr("stroke-width", 1);

	var area = d3.svg.area()
		.x(function (d) { return x(d.date); })
		.y0(height)
		.y1(function (d) { return y(d.val); });

	var viewArea = group.append("path")
		.datum(initialArrayViews)
		.attr("d", area)
		.attr("fill", "#da1700")
		.style("fill-opacity", 0.8)
		.attr("stroke-width", 0);

	var timesArea = group.append("path")
		.datum(initialArrayTimes)
		.attr("d", area)
		.attr("fill", "gray")
		.style("fill-opacity", 0.7)
		.attr("stroke-width", 0);

	var viewPoints = group.append("g")
		.selectAll("circle")
		.data(initialArrayViews)
		.enter()
		.append("circle")
		.attr("r", 7)
		.attr("cx", function(d) { return x(d.date); })
		.attr("cy", function(d) { return y(d.val); })
		.attr("stroke", "black")
		.attr("stroke-width", 2)
		.attr("fill", "white")
		.attr("opacity", 1)
		.on("mouseenter", function() {
			d3.select(this)
				.transition()
				.duration(400)
				.attr("r", 9);	
			hoverPoint = true;
		})
		.on("mouseleave", function() {
			d3.select(this)
				.transition()
				.duration(400)
				.attr("r", 7);
			hoverPoint = false
		});

	var timesPoints = group.append("g")
		.selectAll("circle")
		.data(initialArrayTimes)
		.enter()
		.append("circle")
		.attr("r", 7)
		.attr("cx", function(d) { return x(d.date); })
		.attr("cy", function(d) { return y(d.val); })
		.attr("stroke", "black")
		.attr("stroke-width", 2)
		.attr("fill", "white")
		.attr("opacity", 1)
		.on("mouseenter", function() {
			d3.select(this)
				.transition()
				.duration(400)
				.attr("r", 9);	
			hoverPoint = true;
		})
		.on("mouseleave", function() {
			d3.select(this)
				.transition()
				.duration(400)
				.attr("r", 7);
			hoverPoint = false;
		});

	var update = function () {

		x = d3.time.scale()
			.domain([dataArray[0].date, dataArray[dataArray.length - 1].date])
			.range([0, width]);

		y = d3.scale.linear()
			.domain([0, width])
			.range([height, 0])
			.clamp(true);

		xaxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(d3.time.months, 1)
			.tickPadding(8)
			.tickSize(0, 0, 0)
			.tickSubdivide(1)
			.tickFormat(d3.time.format("%b"));

		viewaxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.tickSize(0, 0)
			.ticks(0);

		xAxisLine.call(xaxis);
		yAxisLine.call(viewaxis);

		viewsLine.data([dataArray])
			.transition()
			.duration(800)
			.delay("250")
			.attr('d', line); 

		timesLine.data([timesArray])
			.transition()
			.duration(800)
			.delay("250")
			.attr('d', line); 

		viewArea.datum(dataArray)
			.transition()
			.duration(800)
			.delay("250")
			.attr('d', area);

		timesArea.datum(timesArray)
		.transition()
		.duration(800)
		.delay("250")
		.attr('d', area);

		viewPoints.data(dataArray)
			.transition()
			.duration(800).delay("250")
			.attr('cx', function(d) { return x(d.date); })
			.attr('cy', function(d) { return y(d.val); });

		timesPoints.data(timesArray)
			.transition()
			.duration(800)
			.delay("250")
			.attr('cx', function(d) { return x(d.date); })
			.attr('cy', function(d) { return y(d.val); });

	}; 
	update();

	setInterval(function () {
		dataArray = [];
		timesArray = [];
		fillData(dataArray, timesArray);

		var parseDate = d3.time.format("%d-%b-%y").parse;

		for (i = 0; i < dataArray.length; i++) {
			dataArray[i].date = parseDate(dataArray[i].date);
		}

		for (i = 0; i < timesArray.length; i++) {
			timesArray[i].date = parseDate(timesArray[i].date);
		}

		if(!hoverPoint)
			update();
	}, 2000);
};
