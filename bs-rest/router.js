var url = require('url');
var controller = require('./controller');

var routes = {};
routes['/'] = controller.index;
routes['bikram'] = controller.bikram;
routes['ad'] = controller.ad;


function route(request, response) {
    var path = url.parse(request.url);
    var matched = path.pathname.split("/");

    if (matched.length == 1) {
        matched[1] = '/';
    }
    var handler = routes[matched[1]];


    if (typeof handler === 'function') {
        try {
            var query = [];
            if (path.query) {
                query = path.query.split('=');
            }
            handler(request, response, matched.splice(2), query);

        } catch (e) {
            response.writeHead(500, {"Content-Type":"text/html"});
            response.write("Internal Server Error "+e);
            response.end();
        }
    } else {
        response.writeHead(404, {"Content-Type":"text/html"});
        response.write("<h1>404: Resource not found.</h1>");
        response.end();
    }
}
exports.route = route;
