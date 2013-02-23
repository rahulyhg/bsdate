var output = {
    error:function (data) {
        var errorData = JSON.stringify({"error":true, "message":data});
        return {status:200, contentType:'application/json', body:errorData};
    },
    json:function (data) {
        var jsonData = JSON.stringify(data);
        return {status:200, contentType:'application/json', body:jsonData};
    }
};
module.exports = output;
