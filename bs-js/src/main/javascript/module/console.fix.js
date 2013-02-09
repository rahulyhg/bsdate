/*global window*/
(function () {
    "use strict";
    if (typeof window.console !== 'function') {
        window.console = {
            log : function (data) {
            }
        };
    }
}());