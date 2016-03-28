$(document).ready(function() {
  var stockData = [];
  
  var getDate = function(d) {
    return new Date(d);
  };

  var filterLastThirtyDays = function(apiData) {
    var dateFrom = Date.now() - 30*24*60*60*1000;
    var dateTo = Date.now();

    stockData = apiData.filter(function(val) {
      var unixDate = Date.parse(val.price_date);
      return ((unixDate <= dateTo) && (unixDate >= dateFrom));
    });
  };

  function drawStockChart() {
    var vis = d3.select("#visualization"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    };

    var minDate = getDate(stockData[0].price_date);
    var maxDate = getDate(stockData[stockData.length - 1].price_date);

    var stockPrices = stockData.map(function(val) {
      return parseInt(val.price);
    });

    var minPrice = Math.min.apply(null, stockPrices);
    var maxPrice = Math.max.apply(null, stockPrices);

    var xScale = d3.time.scale().domain([minDate, d3.time.day.offset(maxDate, 1)]).rangeRound([MARGINS.left, WIDTH - MARGINS.left - MARGINS.right]);;
    var yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([minPrice,maxPrice]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(d3.time.days, 1)
      .tickFormat(d3.time.format('%b %d'));

    var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

    vis.html('');

    vis.append("svg:g")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis)
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)" );


    vis.append("svg:g")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);

    var lineGen = d3.svg.line()
      .x(function(d) {
        return xScale(getDate(d.price_date));
      })
      .y(function(d) {
        return yScale(d.price);
      });
  

    vis.append('svg:path')
      .attr('d', lineGen(stockData))
      .attr('stroke', '#6495ed')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  }

  function getStockTrends(stockSymbol) {
    var trendUrl = 'http://' + location.host + '/api/stocks/' + stockSymbol + '/trends';
    var formAuthenticityToken = $('meta[name=csrf-token]').attr('content');
    $.ajax({
      url: trendUrl,
      method: 'GET',
      data: {
        authenticity_token: formAuthenticityToken
      } 
    })
    .done(function(apiData) {
      filterLastThirtyDays(apiData);   
      drawStockChart();
    });
  }

  getStockTrends('AAPL');

  $('select').change(function() {
    var selectedSymbol = $('select option:selected').val();
    // $('#visualization').remove();
    // var newSvgD3 = $('<svg></svg');
    // newSvgD3.attr({id: 'visualization', width: '1000', height: '800'});
    // $('body').append(newSvgD3);
    getStockTrends(selectedSymbol);
  }); 
});