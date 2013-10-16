(function() {
    var bandPoll = massrel.Poller;
    var pollResults = [];
    var tableArray = null;

    var $bandChartRows;
    var $bandChart = $('#band-chart');


    function updatePollData(bandChart) {
        console.log('data pulled');
        pollResults = bandChart;
        if (tableArray) drawTable(pollResults);
    }

    function drawTable(pollResults) {
        var _bandI;
        for (_bandI = 0; _bandI < pollResults.length; _bandI += 1) {
            tableArray[_bandI][0].html(pollResults[_bandI].name);
            tableArray[_bandI][1].find('span').html(pollResults[_bandI].count);
        }
    }

    function initTable() {
        var _rowI;
        for (_rowI = 0; _rowI < pollResults.length; _rowI += 1) {
            $bandChart.append('<tr></tr>');
            $bandChart.find('tr').eq(_rowI).append('<td></td><td><span></span> Mentions</td>')
        }
        $bandChartRows = $bandChart.find('tr');
    }

    function initTableArray() {
        var _rowI;
        var _results = new Array($bandChartRows.length);
        for (_rowI = 0; _rowI < _results.length; _rowI += 1) {
            _results[_rowI] = new Array(2);
            for (_cellI = 0; _cellI < _results[_rowI].length; _cellI += 1) {
                _results[_rowI][_cellI] = $bandChartRows.eq(_rowI).children().eq(_cellI);
            }
        }
        return _results;
    }

    $(document).ready(function() {
        var poll = new bandPoll({'frequency':15}, updatePollData);
        poll.start();
        initTable();
        tableArray = initTableArray();
        drawTable(pollResults); 
    });
})();