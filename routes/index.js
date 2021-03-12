var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "wissenaire_wissenaire21"
});

const caconn = mysql.createPool({
  host: "localhost",
  user: "wissenaire_sudheer",
  password: "sudheer@wissenaire",
  database: "wissenaire_ca21"
});

/* GET home page. */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
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

router.get('/', function(req, res, next){
  if (req.isAuthenticated()) { 
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


router.get('/analogcircuitdesign', function(req, res, next){
  if (req.isAuthenticated()) { 
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
  const id = ("SELECT * FROM `users` WHERE email = '"+ req.body.email+"'");
    conn.query(id, (err, rows)=>{
      if(err) throw err;
      var wissid;
      if (rows[0].id < 10) wissid = 'W21R1000' + rows[0].id;
      else if (rows[0].id < 100) wissid = 'W21R100' + rows[0].id;
      else if(rows[0].id < 1000) wissid = 'W21R10' + rows[0].id;
      else wissid = 'W21R1' + rows[0].id;
      const qr = ("UPDATE users SET wissid = '"+wissid+"', phone = '"+req.body.phone+"', institute = '"+req.body.institute+"', year = '"+req.body.year+"', city = '"+req.body.city+"', caref = '"+req.body.caref+"' WHERE email = '"+req.user.emails[0].value+"' ;");
      conn.query(qr, (err, rows)=>{
        if(err) throw err;
        console.log(rows);
        request.get("https://fundraiser.wissenaire.org/mainmail.php?name='"+req.body.name+"'&phone='"+req.body.phone+"'&wissid='"+wissid+"'")
        .on('response', function(response) {
          console.log(response.statusCode) ;
        });
        res.send('success');
    })
  })
})

router.post('/addreg', function(req,res,next) {
  const addpart = ("INSERT INTO reg VALUES (email, name, ticketname, eventname, ticketprice, wissid, institute, city, state, orderid, timestamp) ?");
  var values = [];
  if (Array.isArray(json[req.body])){
    console.log('json array');
    arr.forEach(element => { 
      console.log(element); 
      var regarray = [element.userEmailId, element.userName, element.ticketName, element.eventName, element.ticketPrice,  element.answerList[3].answer, element.answerList[0].answer, element.answerList[1].answer,  element.answerList[2].answer, element.uniqueOrderId, element.registrationTimestamp];
      values.push(regarray);
      request.get("https://wissenaire.org/addcapoints?wissid='"+element.answerList[3].answer+"'")
        .on('response', function(response) {
          console.log(response.statusCode) ;
      });
    }); 
  }
  else {
    var element = req.body;
    var regarray = [element.userEmailId, element.userName, element.ticketName, element.eventName, element.ticketPrice,  element.answerList[3].answer, element.answerList[0].answer, element.answerList[1].answer,  element.answerList[2].answer, element.uniqueOrderId, element.registrationTimestamp];
    values.push(regarray);
    request.get("https://wissenaire.org/addcapoints?wissid='"+element.answerList[3].answer+"'")
        .on('response', function(response) {
          console.log(response.statusCode) ;
    });
  }
  conn.query(addpart, [values], (err,rows)=>{
    if (err) throw err;
    console.log(rows);
    res.sendStatus(200);
  })
})

router.get('/addcapoints', function(req,res,next){
  var wissid = req.query.wissid;
  var caref;
  const id = ("SELECT * FROM `users` WHERE wissid = '"+ wissid+"'");
  conn.query(id, (err, rows)=>{
    if(err) throw err;
    caref = rows[0].caref;
    if(caref){
      const part = ("SELECT points from users WHERE wissid = '"+caref+"' ;");
      caconn.query(part, (err,data) =>{
        if(err) throw err;
        if(data) {
          console.log(data[0].points);
          var points = data[0].points + 10;
          const update = ("UPDATE `users` SET points = '"+points+"' WHERE wissid = '"+caref+"';");
          caconn.query(update, (err,result)=>{
            if (err) throw err;
            console.log(result);
          })
        }
      })
    }
    res.sendStatus(200);
  })
})

module.exports = router;