var express = require('express');
var router = express.Router();


express.static("/public");

/* GET home page. */
router.get('/home', (req, res, next)=>{
  var value= insertSQL()
  res.render('home', { result:  value });
})



/* GET home page. */
router.get('/senators', (req, res, next)=>{
  res.render('election', { candidates:  'Senators' });
})

/* GET home page. */
router.get('/councilors', (req, res, next)=>{
  res.render('election', { candidates:  'Sangguniang Bayan' });
})


router.get('/random', (req, res, next)=>{
  var query = task.runQuery("SELECT * from TestItems where TestItems_ID=?", [task.getRandom(1, 70)]);
  query.then( (result) => {
    console.log(result.length);
    res.render('home', { "result": result.length });
    res.end;
  });
})


router.get('/senatorsTally', (req, res, next)=>{
  var query = task.runQuery("CALL ELECTION_SENATORS");
  query.then( (result) => {
    //console.log("RESULT", result , result.length);
    res.type("json"); 
    res.send(result); 
    res.end();
  });
})

router.get('/councilorsTally', (req, res, next)=>{
  var query = task.runQuery("CALL ELECTION_COUNCILORS");
  query.then( (result) => {
    //console.log("RESULT", result , result.length);
    res.type("json"); 
    res.send(result); 
    res.end();
  });
})


router.get('/haveVoted/:pos', (req, res)=>{
  var pos = req.params.pos
  const ip = req.headers['x-forwarded-for'] || 
              req.connection.remoteAddress || 
              req.socket.remoteAddress ||
              (req.connection.socket ? req.connection.socket.remoteAddress : null);

      var sql = "select * from Election_Councilors where IP_Address='"+ ip +"'"
      if(pos=="Senators") {
        sql = "select * from Election_Senators where IP_Address='" + ip + "'"
      }  
      console.log("SQL", sql)
      var query = task.runQuery(sql);
        query.then( (result) => {
          console.log("HAVE VOTED RESULT", result , result.length);
          res.type("json"); 
          res.send(result); 
          res.end();
        });
})

router.get('/voteSubmit/:votes', (req, res)=>{
  let votes = req.params.votes;
  votes = votes.split("~")
  const ip = req.headers['x-forwarded-for'] || 
              req.connection.remoteAddress || 
              req.socket.remoteAddress ||
              (req.connection.socket ? req.connection.socket.remoteAddress : null);
  
  var Q62=""
  for(let x=1; x<=62; x++){
    Q62 += "?"
    if(x!=62) Q62+=","
  }
  var Q14=""
  for(let x=1; x<=14; x++){
    Q14 += "?"
    if(x!=14) Q14+=","
  }

  var sql1 = "  insert into Election_Senators (IP_Address, email, Name,"
    + "Senator_1, Senator_2, Senator_3,Senator_4,Senator_5,Senator_6,Senator_7,Senator_8, Senator_9, Senator_10,"
    + "Senator_11, Senator_12, Senator_13,Senator_14,Senator_15,Senator_16,Senator_17,Senator_18, Senator_19, Senator_20,"
    + "Senator_21, Senator_22, Senator_23,Senator_24,Senator_25,Senator_26,Senator_27,Senator_28, Senator_29, Senator_30,"
    + "Senator_31, Senator_32, Senator_33,Senator_34,Senator_35,Senator_36,Senator_37,Senator_38, Senator_39, Senator_40,"
    + "Senator_41, Senator_42, Senator_43,Senator_44,Senator_45,Senator_46,Senator_47,Senator_48, Senator_49, Senator_50,"
    + "Senator_51, Senator_52, Senator_53,Senator_54,Senator_55,Senator_56,Senator_57,Senator_58, Senator_59, Senator_60,"
    + "Senator_61, Senator_62)"
    + "values(?,?,?," 
    + Q62 + ")"

  var sql2 = "  insert into Election_Councilors (IP_Address, email, Name,"
    + "Councilor_1, Councilor_2, Councilor_3,Councilor_4,Councilor_5,Councilor_6,Councilor_7,Councilor_8, Councilor_9, Councilor_10,"
    + "Councilor_11, Councilor_12, Councilor_13, Councilor_14)"
    + "values(?,?,?," 
    + Q14 + ")"
  
    const name = (votes[0].trim() + " " + votes[1].trim()).toUpperCase()
    const email = votes[2].trim().toUpperCase()
    const vals= votes[3]
    var params = []
    params.push(ip)
    params.push(email)
    params.push(name)
    for(let x=0; x<vals.length; x++){
      let v= vals.substr(x,1)
      v = (v=="Y")? 1 : 0
      params.push(v)
    }
    var sql= sql2
    if(vals.length>20) {
      sql=sql1
    }
  console.log("SQL", sql)
  console.log("PARAMS", params)
  var query = task.runQuery(sql, params);
  query.then( (result) => {
    console.log("RESULT", result , result.length);
    res.type("json"); 
    res.send(result); 
    res.end();
  });
})




router.post('/sendMail/', (req, res, next)=>{
console.log("URL", req.body.url);
let certURL = req.body.certURL;
let nameReplace = certURL.split("/")[3]
  certURL = certURL.replace(nameReplace,  req.body.firstName + ' ' + req.body.lastName).replace('/Harvard2018!','/thisisIT!')
  const nodemailer = require("nodemailer");
  // async..await is not allowed in global scope, must use a wrapper
  async function main(){
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "testwiz63@gmail.com", // generated ethereal user
        pass: "Harvard2018!" // generated ethereal password
      },    tls:{
        ciphers:'SSLv3'
    }
    });
    
          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Testwiz 👻" <testwiz63@gmail.com>', // sender address
            to: req.body.email.trim(), // list of receivers
            subject: "testWiz Examination ✔", // Subject line
            //text: "Hello world?", // plain text body
            html: "Hi " + req.body.firstName + ' ' + req.body.lastName + ",<br>" + 
            //req.body.content // html body
            "Congratulations for taking the Test with Courage and Integrity." + "<br></br>" +
/*
            "Please log on to 'http://testwiz.club/logon/' using your these: <br><br>" +
            "Name: " + req.body.firstName + ' ' + req.body.lastName + "<br>" +
            "Password: " + req.body.email + "<br><br><br>For your convenience, just click <a href='http://tetstwiz.club/logon/"+ req.body.firstName + ' ' + req.body.lastName 
            +"+/"+ req.body.email +"'>this link</a>. <br><br><br><br>"+
*/
            "You can directly view your Certificate online <a href='http://testwiz.club"+ certURL + "'>here</a>"
            +"<br><br><br> "+
            "Thank you very much!<br><br>Respectfully yours<br>ador.raga 1991  C-7438"
          };
          // send mail with defined transport object
          let info = await transporter.sendMail(mailOptions)
          console.log("Message sent: %s", req.body.email);
  }
  
  main().catch(console.error).then(  ()=>{

    var params =[]
    params.push( req.body.firstName.trim() + ' ' + req.body.lastName.trim() )
    params.push( req.body.email.trim() )
    task.runQuery('CALL CLIENT_FINDADD(?, ?)',params).then( (result)=>{
      console.log("WE ARE HERE", params, result[1])
      // get the ID of the Name/Email
      let clientID = result[1]['TestClient_ID'];
      if(clientID==undefined){
        clientID= result[1][0]['TestClient_ID'];
      }
      // now insert to TestsCompleted : ClientID, Score, and MaterialID with Score
      const materialID = req.body.materialID ;
      const testScore = req.body.testScore;
      console.log("WE ARE READY TO SAVE THE TEST OF", clientID, materialID, testScore)
      console.log("CERTIFICATE is at "+ certURL)
      certURL = certURL.replace('/thisisIT!',"")
      const ip = req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
      params= []
      params.push(ip)
      params.push(materialID)
      params.push(certURL)
      params.push(clientID)
      console.log(params)
        //`TESTCOMPLETED_UPDATE_CERT`(A varchar(20), B integer, C varchar(400), D integer )
        task.runQuery("CALL TESTCOMPLETED_UPDATE_CERT (?, ?, ?, ?)", params).then( (result)=> {
          const id= result.insertId;
          //res.redirect("/certview/" + id + "/" + clientID + "/" + materialID )
        })
       
        res.end();
    });
  });

const testURL = "/test/" +  req.body.url;
console.log("SEND MAIL and INSERT DB has been completed.")    
//res.render("home",{result:"Thank you. An email was sent to "+ req.body.email + ".<br>Please click <a href='"+ testURL + "'>here</a> to take the test again."} )

   
})

router.get('/BRAINEX', (req, res, next)=>{
  const numQ = 30// task.getRandom(1,4)*5 +15
  const materialID = 20
  task.runQuery('CALL leaderboard(?,?)',[materialID,3]).then( (result)=>{
    console.log("LEADERBOARD", result[20])
    let r="<b>Top 3 Leaders:&nbsp;&nbsp;</b>"
    let ret = result[0]
    for(let x=0; x<ret.length; x++)
    {
      r +=""+ ret[x].Name + " (" +  ret[x].TestScore +   ")&nbsp;&nbsp;&nbsp;&nbsp;"
    }
    res.render('test', { leaderBoard:r, 
    logoName:"nci.gif", 
    providerName:"NEURO CALISTHENICS INSTITUTE",  
    materialID: materialID,
    origURL : "PNP_IQ",
    countdownTimer: 60*10,
    facultyName: quiz.quiz_StudentsRandom(), numItems:numQ,  
    testType: "FLEX YOUR BRAIN MUSCLES", 
    testItems: quiz.showQuestions(quiz.getQuestions( numQ ), 800 ) });
  })
});


router.get("/leaderboard", (req, res, next)=>{
  task.runQuery('CALL leaderboard(?,?)',[1,5]).then( (result)=>{
    console.log("LEADERBOARD", result[0])
    let r=""
    let ret = result[0]
    for(let x=0; x<ret.length; x++)
    {
      r +="<div>"+ ret[x].Name + " : " +  ret[x].TestScore +   "</div>"
    }

    res.render('home', { result: r });      
  })
  res.end;
})



router.post("/addQuestion", (req, res, next)=>{
  console.log("ADD QUESTIONS")
  task.runQuery("INSERT INTO TestItems(ClientName, QuestionItems) VALUES(?,?)", [req.body.facultyName, req.body.qItems])
  //res.send(res.json)
  res.render('home', { result: "Result: " + req.body.facultyName + " : " + req.body.qItems });
  //res.end;
})


///=======================================
module.exports = router;
