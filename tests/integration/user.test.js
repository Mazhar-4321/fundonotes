import request from 'supertest';
import mongoose from 'mongoose';
const chai = require('chai')
const expect = chai.expect;
import app from '../../src/index';
import { describe } from '@hapi/joi/lib/base';

var globalVariable = ''
var token = ''
var noteId = ""
var resetLink = ""

describe('Fundo APIs Test', () => {
  describe('User Api Test', () => {
    before((done) => {
      const clearCollections = () => {
        for (const collection in mongoose.connection.collections) {
          mongoose.connection.collections[collection].deleteOne(() => { });
        }
      };

      const mongooseConnect = async () => {
        await mongoose.connect(process.env.DATABASE_TEST);
        clearCollections();
      };

      if (mongoose.connection.readyState === 0) {
        mongooseConnect();
      } else {
        clearCollections();
      }

      done();
    });

    describe('User Registration', () => {
      it('whenGivenValidUserDetailsItShouldReturnStatusCode200', (done) => {
        let userDetails = {
          "firstName": "Mazhar",
          "lastName": "Ali",
          "email": "rebecca.asely2@gmail.com",
          "password": "Mazhar@1234567"
        }
        request(app)
          .post('/api/v1/users/')
          .send(userDetails)
          .end((err, res) => {
            res.msg = "mama"
            globalVariable = "amamamam"
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('User Registration', () => {
      it('whenGivenInvalidFirstNameItShouldReturnStatusCode400', (done) => {
        let userDetails = {
          "firstName": "mazhar",
          "lastName": "Ali",
          "email": "rebecca.asely2@gmail.com",
          "password": "Mazhar@1234567"
        }
        request(app)
          .post('/api/v1/users/')
          .send(userDetails)
          .end((err, res) => {
            console.log("ressssssssssssss", globalVariable)
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('User Registration', () => {
      it('whenGivenInvalidLastNameItShouldReturnStatusCode400', (done) => {
        let userDetails = {
          "firstName": "Mazhar",
          "lastName": "ali",
          "email": "rebecca.asely2@gmail.com",
          "password": "Mazhar@1234567"
        }
        request(app)
          .post('/api/v1/users/')
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });




    });

    describe('User Registration', () => {
      it('whenGivenInvalidEmailItShouldReturnStatusCode400', (done) => {
        let userDetails = {
          "firstName": "Mazhar",
          "lastName": "Ali",
          "email": "rebecca.asely2gmail.com",
          "password": "Mazhar@1234567"
        }
        request(app)
          .post('/api/v1/users/')
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('User Registration', () => {
      it('whenGivenInvalidPasswordItShouldReturnStatusCode400', (done) => {
        let userDetails = {
          "firstName": "Mazhar",
          "lastName": "Ali",
          "email": "rebecca.asely2gmail.com",
          "password": "aazhar@1234567"
        }
        request(app)
          .post('/api/v1/users/')
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('User Registration', () => {
      it('whenGivenOneOfTheUserDetailsNullItShouldReturnStatusCode400', (done) => {
        let userDetails = {
          "firstName": null,
          "lastName": "Ali",
          "email": "rebecca.asely2gmail.com",
          "password": "Mazhar@1234567"
        }
        request(app)
          .post('/api/v1/users/')
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('User Login', () => {
      it('whenGivenValidEmailAndPasswordItShouldReturnStatusCode200', (done) => {
        let userDetails = {
          "email": "rebecca.asely2@gmail.com",
          "password": "Mazhar@1234567"
        }
        request(app)
          .post('/api/v1/users/login')
          .send(userDetails)
          .end((err, res) => {
            var data = JSON.parse(res.text)
            process.env.TOKEN = data.token
            token = data.token
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('User Login', () => {
      it('whenGivenInValidEmailItShouldReturnStatusCode404', (done) => {
        let userDetails = {
          "email": "rebecca.asely@gmail.com",
          "password": "Mazhar@1234567"
        }
        request(app)
          .post('/api/v1/users/login')
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(404);
            done();
          });
      });
    });

    describe('User Login', () => {
      it('whenGivenInvalidPasswordItShouldReturnStatusCode400', (done) => {
        let userDetails = {
          "email": "rebecca.asely2@gmail.com",
          "password": "mazhar@1234567"
        }
        request(app)
          .post('/api/v1/users/login')
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('Forget Password', () => {
      it('whenGivenValidEmailItShouldReturnStatusCode200', (done) => {
        let userDetails = {
          "email": "rebecca.asely2@gmail.com",
        }
        request(app)
          .put('/api/v1/users/forget')
          .send(userDetails)
          .end((err, res) => {
            var data = JSON.parse(res.text)
            resetLink = data.token.token
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Forget Password', () => {
      it('whenGivenInvalidEmailItShouldReturnStatusCode404', (done) => {
        let userDetails = {
          "email": "rebecca.asely@gmail.com",
        }
        request(app)
          .put('/api/v1/users/forget')
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(404);
            done();
          });
      });
    });

    describe('Reset Password', () => {
      it('whenGivenValidResetLinkItShouldReturnStatusCode200', (done) => {
        let userDetails = {
          "password": "Kukaburra@12345",
        }
        request(app)
          .put(`/api/v1/users/reset/${resetLink}`)
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Reset Password', () => {
      it('whenGivenInvalidResetLinkItShouldReturnStatusCode400', (done) => {
        let userDetails = {
          "password": "Kukaburra",
        }
        request(app)
          .put(`/api/v1/users/reset/123123`)
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('Reset Password', () => {
      it('whenGivenValidResetLinkButInvalidPasswordItShouldReturnStatusCode400', (done) => {
        let userDetails = {
          "password": "kukaburra@12345",
        }
        request(app)
          .put(`/api/v1/users/reset/${resetLink}`)
          .send(userDetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });
  });
  describe('Note API Test', () => {

    after((done) => {
      const clearCollections = () => {
        for (const collection in mongoose.connection.collections) {
          mongoose.connection.collections[collection].deleteOne(() => { });
        }
      };

      clearCollections();


      console.log("finally")

      done();
    });

    describe('Note Registration', () => {
      it('whenGivenTitleAndDescriptionItShouldReturnStatusCode200', (done) => {
        let note = {
          "title": "Title 1",
          "description": "Desc Title 1"
        }
        request(app)
          .post('/api/v1/notes/')
          .set('Authorization', `Bearer ${token}`)
          .send(note)
          .end((err, res) => {
            var data = JSON.parse(res.text)
            noteId = data.data._id
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Note Registration', () => {
      it('whenGivenTitleNullItShouldReturnStatusCode400', (done) => {
        let note = {
          "title": null,
          "description": "Desc Title 1"
        }
        request(app)
          .post('/api/v1/notes/')
          .set('Authorization', `Bearer ${token}`)
          .send(note)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('Note Registration', () => {
      it('whenGivenTitleNullItShouldReturnStatusCode400', (done) => {
        let note = {
          "title": null,
          "description": "Desc Title 1"
        }
        request(app)
          .post('/api/v1/notes/')
          .set('Authorization', `Bearer ${token}`)
          .send(note)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('Note Retrieval By Id', () => {
      it('whenGivenValidIdShouldReturnStatusCode200', (done) => {
        request(app)
          .get(`/api/v1/notes/${noteId}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Note Retrieval By Id', () => {
      it('whenGivenInvalidIdShouldReturnStatusCode400', (done) => {
        request(app)
          .get(`/api/v1/notes/${process.env.TOKEN}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('Notes Retrieval', () => {
      it('whenCalledNotesApiShouldReturnStatusCode200', (done) => {
        request(app)
          .get(`/api/v1/notes/`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Note Update', () => {
      it('whenGivenValidIdShouldReturnStatusCode200', (done) => {
        let note = {
          title: "Updated Title",
          description: "Samakala"
        }
        request(app)
          .put(`/api/v1/notes/${process.env.NOTE_ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(note)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Note Update', () => {
      it('whenGivenInvalidIdShouldReturnStatusCode400', (done) => {
        let note = {
          title: "Updated Title",
          description: "Samakala"
        }
        request(app)
          .put(`/api/v1/notes/123456`)
          .set('Authorization', `Bearer ${token}`)
          .send(note)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('Note Update', () => {
      it('whenGivenTitleNullShouldReturnStatusCode400', (done) => {
        let note = {
          title: null,
          description: "Samakala"
        }
        request(app)
          .put(`/api/v1/notes/${process.env.NOTE_ID}`)
          .set('Authorization', `Bearer ${token}`)
          .send(note)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });


    describe('Note Delete', () => {
      it('whenGivenValidIdShouldReturnStatusCode200', (done) => {
        request(app)
          .delete(`/api/v1/notes/${process.env.NOTE_ID}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Note Delete', () => {
      it('whenGivenInvalidIdShouldReturnStatusCode400', (done) => {
        request(app)
          .delete(`/api/v1/notes/123456`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('Note Archive', () => {
      it('whenGivenValidIdShouldReturnStatusCode200', (done) => {
        request(app)
          .put(`/api/v1/notes/archive/${process.env.NOTE_ID}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Note Archive', () => {
      it('whenGivenInvalidIdShouldReturnStatusCode400', (done) => {
        request(app)
          .put(`/api/v1/notes/archive/12345`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });

    describe('Note Trash', () => {
      it('whenGivenValidIdShouldReturnStatusCode200', (done) => {
        request(app)
          .put(`/api/v1/notes/trash/${process.env.NOTE_ID}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Note Trash', () => {
      it('whenGivenInvalidIdShouldReturnStatusCode400', (done) => {
        request(app)
          .put(`/api/v1/notes/trash/12321`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(400);
            done();
          });
      });
    });



  });
});



