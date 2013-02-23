var dateutil = require('./bsdate');
var output = require('./output');

var service = {
    convert:function (fn, pathvars) {
        if (pathvars.length !== 3) {
            return output.error('Invalid Request. Date Path Required.');
        }
        var year = parseInt(pathvars[0], 10);
        var month = parseInt(pathvars[1], 10);
        var date = parseInt(pathvars[2], 10);
        if (isNaN(year) || isNaN(month) || isNaN(date)) {
            return output.error('Invalid date.');
        }
        var dateValue = dateutil.convertToAd(year, month, date);
        return output.json({date:dateValue, value:dateValue.displayValue()});
    }
};


var controller = (function () {

    function show(request, response, content) {
        response.writeHead(content.status || 200, {"Content-Type":content.contentType || 'text/html'});
        response.write("" + (content.body || 'No data'));
        response.end();
    }

    return {
        index:function (request, response) {
            var content = {
                body:"<h3>AD BS Date converter - Rest API</h3>" +
                    "Send requests like /bikram/2069/12/10 or /ad/2013/2/10"
            };
            show(request, response, content);
        },
        bikram:function (request, response, pathvars, queryvars) {
            show(request, response, service.convert(dateutil.convertToAd, pathvars));
        },
        ad:function (request, response, pathvars, queryvars) {
            console.log(this.toString());
            show(request, response, service.convert(dateutil.convertToBikram, pathvars));
        }
    };
}());

module.exports = controller;

