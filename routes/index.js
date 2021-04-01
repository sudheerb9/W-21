var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var request = require('request');
var session = require('cookie-session');
var fileUpload = require('express-fileupload');
var fs = require('fs')
var path = require('path');

const conn = mysql.createPool({
  host: "localhost",
  user: "wissenaire_sudheer",
  password: "sudheer@wissenaire",
  database: "wissenaire_wissenaire21"
});

const caconn = mysql.createPool({
  host: "localhost",
  user: "wissenaire_sudheer",
  password: "sudheer@wisenaire",
  database: "wissenaire_ca21"
});

/* GET home page. */
function ensureAuthenticated(req, res, next) {
  if (req.user) { 
    console.log('loggedin')
    return next();
  }
  res.redirect('/auth/google')
}

function ensureProfile(req,res,next){
  const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
  conn.query(qr, (err, rows) => {
    if(err) throw err;
    console.log(rows[0])
    if(rows[0].wissid) return next();
    res.redirect ('/profile');
  })
}

function ensureTesttaker (req,res,next){
  if(req.session.testtakerid) next();
  res.redirect('/acd/login');
}

//start
router.get('/', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('index', {participant : rows[0]});
    })
  }
  else res.render('index', {participant: false})
  
})

router.get('/competitions', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('competitions', {participant : rows[0]});
    })
  }
  else res.render('competitions', {participant: false})
})

router.get('/arduinohackathon', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('ah', {participant : rows[0]});
    })
  }
  else res.render('ah', {participant: false})
})

router.get('/cad', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('cad', {participant : rows[0]});
    })
  }
  else res.render('cad', {participant: false})
})

router.get('/analogcircuitdesign', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('acd', {participant : rows[0]});
    })
  }
  else res.render('acd', {participant: false})
})

router.get('/colloquiacs', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('collcs', {participant : rows[0]});
    })
  }
  else res.render('collcs', {participant: false})
})

router.get('/colloquiace', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('collce', {participant : rows[0]});
    })
  }
  else res.render('collce', {participant: false})
})

router.get('/colloquiaee', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('collee', {participant : rows[0]});
    })
  }
  else res.render('collee', {participant: false})
})

router.get('/colloquiame', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('collme', {participant : rows[0]});
    })
  }
  else res.render('collme', {participant: false})
})

router.get('/countercypher', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('ccyp', {participant : rows[0]});
    })
  }
  else res.render('ccyp', {participant: false})
})

router.get('/csgo', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('csgo', {participant : rows[0]});
    })
  }
  else res.render('csgo', {participant: false})
})

router.get('/mathsolympiad', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('mo', {participant : rows[0]});
    })
  }
  else res.render('mo', {participant: false})
})

router.get('/artelligence', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('ml', {participant : rows[0]});
    })
  }
  else res.render('ml', {participant: false})
})


router.get('/invstr', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('invstr', {participant : rows[0]});
    })
  }
  else res.render('invstr', {participant: false})
})

router.get('/pioneersplan', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('pio', {participant : rows[0]});
    })
  }
  else res.render('pio', {participant: false})
})

router.get('/schoolchamp', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('schoolchamp', {participant : rows[0]});
    })
  }
  else res.render('schoolchamp', {participant: false})
})

router.get('/sciencetoons', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('sciencetoons', {participant : rows[0]});
    })
  }
  else res.render('sciencetoons', {participant: false})
})

router.get('/sherlock', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('sherlock', {participant : rows[0]});
    })
  }
  else res.render('sherlock', {participant: false})
})

router.get('/shutter', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('shutter', {participant : rows[0]});
    })
  }
  else res.render('shutter', {participant: false})
})

router.get('/valorant', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('valorant', {participant : rows[0]});
    })
  }
  else res.render('valorant', {participant: false})
})

router.get('/quizzaire', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('quizzaire', {participant : rows[0]});
    })
  }
  else res.render('quizzaire', {participant: false})
})

router.get('/workshops', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('workshops', {participant : rows[0]});
    })
  }
  else res.render('workshops', {participant: false})
})

router.get('/aiml', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('aiml', {participant : rows[0]});
    })
  }
  else res.render('aiml', {participant: false})
})

router.get('/android', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('android', {participant : rows[0]});
    })
  }
  else res.render('android', {participant: false})
})

router.get('/automobiles', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('automob', {participant : rows[0]});
    })
  }
  else res.render('automob', {participant: false})
})

router.get('/bridgedesign', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('bridge', {participant : rows[0]});
    })
  }
  else res.render('bridge', {participant: false})
})

router.get('/cybersecurity', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('cyber', {participant : rows[0]});
    })
  }
  else res.render('cyber', {participant: false})
})

//done.

router.get('/about', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('about', {participant : rows[0]});
    })
  }
  else res.render('about', {participant: false})
})

router.get('/guestlectures', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('guestlectures', {participant : rows[0]});
    })
  }
  else res.render('guestlectures', {participant: false})
})

router.get('/exhibits', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('comingsoon', {participant : rows[0]});
    })
  }
  else res.render('comingsoon', {participant: false})
})

router.get('/initiatives', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('comingsoon', {participant : rows[0]});
    })
  }
  else res.render('comingsoon', {participant: false})
})

router.get('/highlights', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('highlights', {participant : rows[0]});
    })
  }
  else res.render('highlights', {participant: false})
})

router.get('/team', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('team', {participant : rows[0]});
    })
  }
  else res.render('team', {participant: false})
})

router.get('/sponsors', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('sponsors', {participant : rows[0]});
    })
  }
  else res.render('sponsors', {participant: false})
})

router.get('/contact', function(req, res, next){
  if (req.user) { 
    console.log('loggedin')
    const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
    conn.query(qr, (err, rows) => {
      if(err) throw err;
      console.log(rows[0])
      res.render('contact', {participant : rows[0]});
    })
  }
  else res.render('contact', {participant: false})
})

router.post('/contact', function(req,res,next) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  const qr = ("INSERT into `contact` (name, email, message) VALUES('" + name + "', '" + email + "','" + message + "');");
  conn.query(qr, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.sendStatus(200);
  })
})

router.get('/profile',ensureAuthenticated, function(req, res, next) {
  const qr = ("SELECT * from users where email ='" + req.user.emails[0].value + "';");
  conn.query(qr, (err, rows) => {
    if(err) throw err;
    const reg =  ("SELECT * from reg where wissid ='" + rows[0].wissid + "';");
    conn.query(reg, (err,result)=>{
      if(err) throw err;
      console.log(result)
      res.render('profile', {participant : rows[0], events: result});
    })
  })
});

router.post('/profile', ensureAuthenticated, function(req,res,next){
  const id = ("SELECT * FROM `users` WHERE email = '"+ req.user.emails[0].value+"'");
  conn.query(id, (err, rows)=>{
    if(err) throw err;
    console.log('ok')
    var wissid;
    if (rows[0].id < 10) wissid = 'W21R1000' + rows[0].id;
    else if (rows[0].id < 100) wissid = 'W21R100' + rows[0].id;
    else if(rows[0].id < 1000) wissid = 'W21R10' + rows[0].id;
    else wissid = 'W21R1' + rows[0].id;
    const qr = ("UPDATE `users` SET wissid = '"+wissid+"', phone = '"+req.body.phone+"', institute = '"+req.body.institute+"', year = '"+req.body.year+"', city = '"+req.body.city+"', caref = '"+req.body.caref+"' WHERE email = '"+req.user.emails[0].value+"' ;");
    conn.query(qr, (err, res)=>{
      if(err) throw err;
      console.log(res);
      request.get("https://fundraiser.wissenaire.org/mainmail.php?name="+rows[0].name+"&phone="+req.body.phone+"&wissid="+wissid+"&email="+req.body.email+"")
        .on('response', function(response) {
          console.log(response.statusCode) ;
          
      })
    })
    res.send('success');
  })
})

router.post('/addreg', function(req,res,next) {
  // console.log(req.body)
  const addpart = ("INSERT INTO reg (email, name, ticketname, eventname, ticketprice, wissid, year, institute, state, phone, orderid, timestamp) VALUES ?");
  console.log('ok')
  var values = [];
  console.log(req.body)
  var arr = JSON.parse(req.body.data);
  if (Array.isArray(arr)){
    console.log('json array');
    arr.forEach(element => { 
      console.log(element); 
      var regarray = [element.userEmailId, element.userName, element.ticketName, element.eventName, element.ticketPrice,  element.answerList[4].answer, element.answerList[3].answer, element.answerList[0].answer, element.answerList[1].answer,  element.answerList[2].answer, element.uniqueOrderId, element.registrationTimestamp];
      values.push(regarray);
      request.get("https://wissenaire.org/addcapoints?wissid='"+element.answerList[3].answer+"'")
        .on('response', function(response) {
          console.log(response.statusCode) ;
      });
    }); 
  }
  else {
    console.log('else')
    var element = JSON.parse(req.body.data);
    console.log(element)
    var regarray = [element.userEmailId, element.userName, element.ticketName, element.eventName, element.ticketPrice, element.answerList[4].answer,  element.answerList[3].answer, element.answerList[0].answer, element.answerList[1].answer,  element.answerList[2].answer, element.uniqueOrderId, element.registrationTimestamp];
    console.log(regarray);
    values.push(regarray);
    request.get("https://wissenaire.org/addcapoints?wissid='"+element.answerList[3].answer+"'")
        .on('response', function(response) {
          console.log(response.statusCode) ;
    });
  }
  conn.query(addpart, [values], (err,rows)=>{
    console.log('query')
    if (err) throw err;
    console.log(rows);
    res.sendStatus(200);
  })
})

router.get('/addcapoints', function(req,res,next){
  var wissid = req.query.wissid;
  var ref;
  const id = ("SELECT * FROM `users` WHERE wissid = '"+ wissid+"'");
  conn.query(id, (err, rows)=>{
    if(err) throw err;
    if(rows[0]){
      ref = rows[0].caref;
      if(ref){
        const part = ("SELECT points from users WHERE wissid = '"+ref+"' ;");
        caconn.query(part, (err,data) =>{
          if(err) throw err;
          if(data) {
            console.log(data[0].points);
            var points = data[0].points + 30;
            const update = ("UPDATE `users` SET points = '"+points+"' WHERE wissid = '"+ref+"';");
            caconn.query(update, (err,result)=>{
              if (err) throw err;
              console.log(result);
            })
          }
        })
      }
    }
    res.sendStatus(200);
  })
})


//tests
router.get('/acd/login', function(req,res,next){
  res.render('acdlogin');
})

router.post('/acd/login', function(req,res,next){
  var username = req.body.username;
  var password = req.body.password;
  const checkauth = ("SELECT * from `reg` WHERE eventname = 'Analog Circuit Design' AND wissid = '"+username+"';");
  conn.query(checkauth, (err,rows)=>{
    if (err) throw err;
    console.log(rows[0]);
    if(rows[0].phone == password){
      req.session.testtakerid = rows[0].wissid;
      const checklog = ("SELECT * from `acd` WHERE wissid = '"+username+"';");
      conn.query(checklog,(err, rows)=>{
        if(err) throw err;
        if(rows[0]) res.send('Already Logged in');
        else res.send('You are all set');
      })
    }
    else res.send('Invalid Credentials');
  })
})

router.get('/acd/rules', function(req,res,next){
  res.render('acdrules', {id: req.session.testtakerid});
})

router.post('/acd/notetime', function(req,res,next){
  const wissid = req.body.wissid;
  const time = req.body.time;
  const insertquery = ("INSERT INTO `acd` (wissid, time) VALUES ('"+wissid+"', '"+time+"');");
  conn.query(insertquery, (err,rows)=>{
    if (err) throw err; 
    res.send ('success');
  })
})

router.get('/acd/test', function(req,res,next){
  const quer = ("SELECT * FROM `acd` WHERE wissid = '"+req.session.testtakerid+"';");
  conn.query(quer, (err,rows)=>{
    var time = rows[0].time;
    res.render('acdtest', {starttime: time, id: req.session.testtakerid});
  })
  
})

router.post('/acd/submission', function(req,res,next){
  console.log('upload')
  const wissid = req.body.wissid;
  const qno = req.body.question; 
  var name = wissid + '-' + qno ;
  let file;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log('not found')
    return res.send('No files were uploaded.');
  }
  file = req.files.file;
  __dirname = path.dirname(__dirname) ;
  uploadPath = path.normalize( __dirname + '/public/uploads/' + name + '.pdf') 
  file.mv(uploadPath, function(err) {
    if (err){
      console.log(err)
      return res.send(err);
    }
    console.log('yaay ')
    res.send('success');
  });
})

module.exports = router;