var app = require('../server');
var chai = require('chai');
var assert = chai.assert;
chai.use(require('chai-http'));
var expect = chai.expect;

describe('Influence Marketing App', function () {
    it('GET /api/inbox/fetchusers', function (done) {
        chai.request(app).get('/api/inbox/fetchusers')
            .then(async function (res, body) {
                if (await res) {
                    await expect(res).to.have.status(200);
                    await expect(res.body.success).to.equal(true)
                    await expect(res.body.message.length).to.equal(78)
                    done()
                }
            });
    })

})