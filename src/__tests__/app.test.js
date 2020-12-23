import request from 'supertest'
import app from '../app'
jest.mock('../libraries/request')

describe('GET /', () => {
    it('status should be 200 with no query parameters', done => {
        request(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.text).toMatch('[]')
                done()
            })
    })

    it('status should be 200', done => {
        request(app)
            .get('/?origin=localhost:3000')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.text).toMatchSnapshot()
                done()
            })
    })
})