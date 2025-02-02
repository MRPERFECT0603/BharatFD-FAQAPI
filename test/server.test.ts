import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
chai.use(chaiHttp); 

const { expect } = chai; 
chai.use(chaiHttp); 

describe('API Routes', () => {


  it('should return 200 status for the root route', (done) => {
    chai.request(server)
      .get('/')
      .end((err: Error, res: Response) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Welcome to BharatFD API'); 
        done();
      });
  });


  it('should fetch FAQs', (done) => {
    chai.request(server)
      .get('/api/faqs')
      .end((err: Error, res: Response) => {
        expect(res).to.have.status(200); 
        expect(res.body).to.be.an('array'); 
        done();
      });
  });


  it('should create a new FAQ', (done) => {
    const faq = {
      question: "What is Node.js?",
      answer: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
    };

    chai.request(server)
      .post('/api/faqs')
      .send(faq)
      .end((err: Error, res: Response) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').eql('FAQ created successfully');
        done();
      });
  });


  it('should return a 400 for missing FAQ data', (done) => {
    const faq = { answer: "This is a test answer" };

    chai.request(server)
      .post('/api/faqs')
      .send(faq)
      .end((err: Error, res: Response) => {
        expect(res).to.have.status(400); 
        expect(res.body).to.have.property('error').eql('Invalid Question format. Must be of Length greater than 10 characters.');
        done();
      });
  });

});