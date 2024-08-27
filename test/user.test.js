const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const { expect } = chai
chai.use(chaiHttp)

describe('User API', () => {
	it('should return 200 and all users', (done) => {
		chai.request(app)
			.get('/users')
			.end((err, res) => {
				expect(res).to.have.status(200)
				expect(res.body).to.have.property('data').to.be.an('array')
				done()
			})
	})

	it('should return 200 and a specific user for valid ID', (done) => {
		chai.request(app)
			.get('/users?id=1')
			.end((err, res) => {
				expect(res).to.have.status(200)
				expect(res.body).to.have.property('data').to.be.an('array').that.has.lengthOf(1)
				done()
			})
	})

	it('should return 404 for non-existent user ID', (done) => {
		chai.request(app)
			.get('/users?id=9999')
			.end((err, res) => {
				expect(res).to.have.status(404)
				expect(res.body).to.have.property('message').eql('User not found')
				done()
			})
	})
})
