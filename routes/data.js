var express = require('express');
var router = express.Router();


router.post('/saveQuestion', (req, res, next)=>{
  
  const  students=  quiz.quiz_StudentsRandom(100);
    let result =""
    for(let x=0; x<20; x++){
        result = "<div>" + students[x] +"</div>"
        const params = [students[x], quiz.shuffleN(20)[0] ]
        task.runQuery("INSERT INTO CannedQuestions ( QuestionCategory, Question, Answer) VALUES('1',  ?,?)", params)
    }
    res.end();
//  res.render('test', {testItems: "Successful" } );
});


router.post('/saveQuestionPool', (req, res, next)=>{
        const params = [req.body.Question]
        task.runQuery("INSERT INTO TestQuestions_Pool ( TestCategory, TestQuestion) VALUES('1',  ?)", params)
        res.end();
  //res.render('test', {testItems: "Successful" } );
});


//ar ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
router.get('/AddTestStart/:mat', (req, res, next)=>{
  const materialID = req.params.mat;
  //const ip = client.handshake.headers['x-forwarded-for'] || client.handshake.address.address;
  const ip = req.headers['x-forwarded-for'] || 
              req.connection.remoteAddress || 
              req.socket.remoteAddress ||
              (req.connection.socket ? req.connection.socket.remoteAddress : null);
  let params = []
  params.push(materialID)
  params.push(ip)
  //task.runQuery("INSERT INTO TestsCompleted ( Started_DT, MaterialID, IP_Address) VALUES(NOW(),  ?, ?)", params)
  task.runQuery("INSERT INTO TestsCompleted ( Started_DT, MaterialID, IP_Address) VALUES(NOW(),  ?, ?)", params).then( (result)=>{
    let testID = result.insertId;
    console.log("TESTID", testID)
    return testID;
  }).catch( (err) => { console.log(err); });
  res.end();
});


router.get('/UpdateTestStart/:mat/:score', (req, res)=>{
  const materialID = req.params.mat;
  //const ip = client.handshake.headers['x-forwarded-for'] || client.handshake.address.address;
  const score = req.params.score;  
  const ip = req.headers['x-forwarded-for'] || 
              req.connection.remoteAddress || 
              req.socket.remoteAddress ||
              (req.connection.socket ? req.connection.socket.remoteAddress : null);
  let params = []
  params.push(ip)
  params.push(materialID)
  params.push(score)
  //task.runQuery("INSERT INTO TestsCompleted ( Started_DT, MaterialID, IP_Address) VALUES(NOW(),  ?, ?)", params)
  task.runQuery("CALL TESTCOMPLETED_UPDATE (?, ?, ?)", params).then( (result)=>{
        //// 
  }).catch( (err) => { console.log(err); });
  res.end();
});



router.get('/fillIn', (req, res, next)=>{
  let result = quiz.fillInTheBlanks(12,task.getRandom(1,5))
  console.log(result)
  res.render("home", {result:result})

  res.end();
//res.render('test', {testItems: "Successful" } );
});


  
module.exports = router;