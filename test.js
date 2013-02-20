
/* test dependencies */

var copy = require('./');
var expect = require('expect.js');

/* tests */

describe('copy', function(){

  describe('with to',function(){

    it('simple',function(){
      var from = {
        a:1
      }
      var to = {
        b:123
      }
      copy(from,to)

      expect(to).to.have.property('a',1)
      expect(to).to.have.property('b',123)
    })

    it('nested',function(){
      var from = {
        a:1,
        c:['hello','there']
      }
      var to = {
        b:123
      }
      copy(from,to)

      expect(to).to.have.property('a',1)
      expect(to).to.have.property('b',123)
      expect(to).to.have.property('c').eql(['hello','there'])
    })


    it('complex',function(){
      var from = {
        a:1,
        c:['hello','there'],
        d:{
          date: new Date(),
          regex: /matcher/gm
        }
      }
      var to = {
        b:123,
        c:['one','two','three'],
        d:{
          e: true
        }
      }
      var instance = to;
      var out = copy(from,to)

      expect(to).to.have.property('a',1)
      expect(to).to.have.property('b',123)
      expect(to).to.have.property('c').eql(['hello','there'])
      expect(to).to.have.property('d')
      expect(to.d).to.have.property('e',true)
      expect(to.d).to.have.property('date')
      expect(to.d).to.have.property('regex').eql(/matcher/gm)
      expect(to).to.equal(instance)
      expect(to).to.equal(out)
    })

    it('should remove with `clean`',function(){
      var from = {
        a: 1,
        b: 2,
        d:{
          date: new Date(),
          regex: /matcher/gm
        }
      }
      var to = {
        a: 'a',
        b: 'b',
        d: {
          extra: {},
          date: new Date(),
          regex: /matcher/gm
        }
      }

      copy(from,to,true)

      expect(to).to.have.property('a',1)
      expect(to).to.have.property('b',2)
      expect(to).to.have.property('d')
      expect(to.d).to.have.property('date')
      expect(to.d).to.have.property('regex').eql(/matcher/gm)
      expect(to.d).to.not.have.property('extra')
    })

  })

  describe('without to',function(){

    it('date', function(){
      var obj = new Date;
      var cloned = copy(obj);
      expect(cloned.getTime()).to.be(obj.getTime());
      expect(cloned).not.to.be(obj);
    });

    it('regexp', function(){
      var obj = /hello/i;
      var cloned = copy(obj);
      expect(cloned.toString()).to.be(obj.toString());
      expect(cloned).not.to.be(obj);
    });

    it('array', function(){
      var obj = [1, 2, 3, '4'];
      var cloned = copy(obj);
      expect(cloned).to.eql(obj);
      expect(cloned).not.to.be(obj);
    });

    it('object', function(){
      var obj = {
        a: 1,
        b: 2,
        c: 3
      };
      var cloned = copy(obj);
      expect(cloned).to.eql(obj);
      expect(cloned).not.to.be(obj);
    });

    it('object combined', function(){
      var date = new Date;
      var obj = {
        a: {
          b: [1, 2, date, { hello: 'world' }]
        }
      };
      var cloned = copy(obj);
      expect(cloned).to.eql(obj);
      expect(cloned.a).not.to.be(obj.a);
      expect(cloned.a.b).not.to.be(obj.a.b);
      expect(cloned.a.b[2]).not.to.be(obj.a.b[2]);
      expect(cloned.a.b[2].getTime()).to.be(obj.a.b[2].getTime());
      expect(cloned.a.b[3]).to.eql(obj.a.b[3]);
      expect(cloned.a.b[3]).not.to.be(obj.a.b[3]);
    });

  })

});
