var expect  = require("chai").expect;
var request = require("request");

describe("Reach test endpoint", function() {
    var url = "http://localhost:5000/test";
    it("returns status 200 to check if api works", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});