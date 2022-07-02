const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/search', (req, res) => {
    const servicedate = req.query.servicedate;
    const policynumber = req.query.policynumber;
    const cardnumber = req.query.cardnumber;
    
    const result = findMembers(servicedate,policynumber,cardnumber);
    res.send(result);
});


const findMembers = (servicedate,policynumber,cardnumber) => {
    let query = '';

    if(policynumber!=null){
        query = {...query,policyNumber:policynumber};
    }else{
        throw ("Policy number is required.");
    }

    if(cardnumber!=null){
        query = {...query,memberCardNumber:cardnumber};
    }

    db.read()

    return db.get('members').find(query).value();
}

describe('App', function() {

    // find by policynumber
    it('should find members by policynumber', function(done) {
        
      const policynumber = '0628889739';
      const result = findMembers(null,policynumber,null);
    
      if (result!=undefined && result.policyNumber==='0628889739' && result.id===9) {
        // If the behavior is as expected, call done with no argument.
        done();
      } else {
        // Otherwise, call done with an error.
        done(new Error("Not sure what's happened."));
      }
  
    });
  
    // find by policynumber and cardnumber
    it('should find members by cardnumber', function(done) {
        
        const policynumber = '2962112838';
        const cardnumber = '2807656978';
        const result = findMembers(null,policynumber,cardnumber);
      
        if (result!=undefined && result.policyNumber==='2962112838' && result.memberCardNumber==='2807656978' && result.id===8) {
          // If the behavior is as expected, call done with no argument.
          done();
        } else {
          // Otherwise, call done with an error.
          done(new Error("Not sure what's happened."));
        }
    
      });

    // find by policynumber should be mandantory
    it('should find members by cardnumber', function(done) {
        const assert = require("assert");
        const policynumber = null;
        const cardnumber = '2807656978';

        assert.throws(
            ()=>findMembers(null,policynumber,cardnumber)
        );
        done();
    
      });
  });

  app.listen(port, () => console.log(`api listen on ${port}!`));