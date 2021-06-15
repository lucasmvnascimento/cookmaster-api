const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { expect } = chai;

const app = require('../api/app');

chai.use(chaiHttp);

describe('POST /users', () => {
  describe('when user creation is successfull', () => {
    let response;
    const DBServer = new MongoMemoryServer();
    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai
        .request(app)
        .post('/users')
        .send({
          name: 'Lucas',
          email: 'lucas@trybe.com',
          password: '123456'
        });
    });

    after(async() => {
      await MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status 201', () => {
      expect(response).to.have.status(201);
    });

    it('returns an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('the returned object has the property user', () => {
      expect(response.body).to.have.property('user')
    });

    it('the user property has all properties', () => {
      expect(response.body.user).to.have.property('_id');
      expect(response.body.user.name).to.be.equal('Lucas');
      expect(response.body.user.email).to.be.equal('lucas@trybe.com');
      expect(response.body.user.role).to.be.equal('user');
    });
  });
});
