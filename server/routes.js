const Person = require('./models/post');

module.exports = function (app) {

  app.get('/persons',function (req,res) {
    Person.find().exec(function(err, persons) {
      res.json({persons})
    })
  })

  app.post('/persons',function (req,res) {
    const person = new Person(req.body);
    person.save();
    Person.find().exec(function(err, persons) {
      res.json({persons})
    })
  })

  app.get('/persons/:id',function (req,res) {
    Person.findById(req.params.id).exec(function (err,person) {
      res.json({person})
    })
  })

  app.put('/persons/:id',function (req,res) {
    Person.findOneAndUpdate({_id:req.params.id},req.body,function (err) {
      if (err) res.status(500).json({error:'更新失败'})
      res.send('updata sunccess!')
    })
  })

  app.delete('/persons/:id',function (req,res) {
    Person.findOneAndRemove({_id:req.params.id},function (err) {
      if (err) res.status(500).json({error:'删除失败'})
      res.send('删除成功!')
    })
  })
}
