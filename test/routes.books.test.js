process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : books', () => {

    beforeEach(() => {
        return knex.migrate.rollback()
            .then(() => { return knex.migrate.latest(); })
            .then(() => { return knex.seed.run(); });
    });

    afterEach(() => {
        return knex.migrate.rollback();
    });

    describe('GET /api/v1/books', () => {
        it('should return all books', (done) => {
            chai.request(server)
                .get('/api/v1/books')
                .end((err, res) => {
                    // there should be no errors
                    should.not.exist(err);
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a
                    // key-value pair of {"status": "success"}
                    res.body.status.should.eql('success');
                    // the JSON response body should have a
                    // key-value pair of {"data": [3 movie objects]}
                    res.body.data.length.should.eql(3);
                    // the first object in the data array should
                    // have the right keys
                    res.body.data[0].should.include.keys(
                        'id', 'title', 'author', 'genre', 'goodreads_id'
                    );
                    done();
                });
        });
    });
    describe('GET /api/v1/books/:id', () => {
        it('should respond with a single book', (done) => {
            chai.request(server)
                .get('/api/v1/books/1')
                .end((err, res) => {
                    // there should be no errors
                    should.not.exist(err);
                    // there should be a 200 status code
                    res.status.should.equal(200);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a
                    // key-value pair of {"status": "success"}
                    res.body.status.should.eql('success');
                    // the JSON response body should have a
                    // key-value pair of {"data": 1 movie object}
                    res.body.data[0].should.include.keys(
                        'id', 'title', 'author', 'genre', 'goodreads_id'
                    );
                    done();
                });
        });
        it('should throw an error if the book does not exist', (done) => {
            chai.request(server)
                .get('/api/v1/books/9999999')
                .end((err, res) => {
                    // there should an error
                    //should.exist(err);
                    // there should be a 404 status code
                    res.status.should.equal(404);
                    // the response should be JSON
                    res.type.should.equal('application/json');
                    // the JSON response body should have a
                    // key-value pair of {"status": "error"}
                    res.body.status.should.eql('error');
                    // the JSON response body should have a
                    // key-value pair of {"message": "That book does not exist."}
                    res.body.message.should.eql('That book does not exist.');
                    done();
                });
        });
    });

});