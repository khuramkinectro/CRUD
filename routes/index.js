var express = require('express');
var router = express.Router(); 
var db=require('monk')('localhost:27017/test'); // when we import or require it database automatically created
var userData=db.get('userdata');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
//emphty {} get all data we can also define condition it for specfic data
  // now data data veribale have not actuall data
  // now we need a promic  and on function this on function listen on success
  // docs have actuall data that we retrive
  // on success hey .. bato ab kiaa karna h result ka then u call a callback function and say 
  // show in view 


//Read
router.get('/getdata',function(req,res){
  var data=userData.find({},function(e,docs){
   if (e) return next(e);
    res.render('index',{items:docs});
  });
});


//Insert
router.post('/insert',function(req,res){
var item={
  title:req.body.title,
  content:req.body.content,
  author:req.body.author
};
userData.insert(item,function(e){
if(e) return next(e);
});
res.redirect('/');
});


//Update
router.post('/update',function(req,res){
  var id=req.body.id;
  var item={
    title:req.body.title,
    content:req.body.content,
    author:req.body.author
  };
userData.update({"_id":db.id(id)},item,function(e){
  if (e) return next(e);
});
res.redirect('/');
});


//Delete
router.post('/delete',function(req,res){
  var id=req.body.id;
  userData.remove({"_id":db.id(id)},function(e)
  {
    if (e) return next(e);
     res.redirect('/');
  });
});


module.exports = router;
