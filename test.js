var express = require('express');
var router = express.Router();

var questionNumber =0;
var qandA= ""
router.post("/submitPaper", (req, res, next)=>{
    var answers = req.body.answer; 
    // get the Faculty Name, Test Type, and Template from Database Table: TestRequest

    var answeredItems = []
    for(var i=0; i< answers.length; i++){
        var value= answers[i]; 
        if(value!="0") {
            answeredItems.push( (i+1) + "-" + value[0])
        }
    }
    var testReport ="<div>Number of Questions:" +  answers.length + "</div>";
    testReport+= "<div>Answered Items:" +  JSON.stringify(answeredItems) + "</div>";
    res.render('test', { facultyName: "AMADOR RAGA", testType: "Multiple Choice", testItems: qandA, testScore : testReport + "(" +task.getRandom(50, 100) + "%)"  });
    console.log("Show The Score")
    console.log("Update the Database with The Score")
    res.end;
    
})

router.get('/gen', (req, res, next)=>{
  res.render('testRequest', {displayYN: "none", testCount: 20} );
});


router.get('/gen/YN', (req, res, next)=>{
  res.render('testRequest', {displayYN: "none", quizTypeDisplay: "none", quizType:2} );
});

router.get('/gen/MC', (req, res, next)=>{
  res.render('testRequest', {displayYN: "none", quizTypeDisplay: "none", quizType:1} );
});

router.get('/gen/Satisfaction', (req, res, next)=>{
  res.render('testRequest', {displayYN: "none", quizTypeDisplay: "none", quizType:4} );
});

router.get('/gen/TF', (req, res, next)=>{
  res.render('testRequest', {displayYN: "none", quizTypeDisplay: "none", quizType:3} );
});



router.get('/ageOfB', (req, res, next)=>{
  res.render('test', { testItems: quiz.ageOfB() } );
});




router.get('/request/Testtakers', (req, res, next)=>{
  const  students=  quiz.quiz_StudentsRandom(100);
    let result =""
    for(let x=0; x<99; x++){
        result = "<div>" + students[x] +"</div>"
        const params = [students[x], students[x].replace(/ /g, "")+".gmail.com" ]
        task.runQuery("INSERT INTO TestTakers (idTestTaker, Name, Email, JoinedDT) VALUES(" + x + ", ?,?,NOW())", params)
    }
  res.render('test', {testItems: result } );
});



var MathQuestions = [
  "Square Root of 81~9^21^7^6^23^11",
  "Square of 10~100^121^117^26^223^11",
  "Cube Root of 156~16^121^71^62^123^21"
]

var QuestionsPool = [
""

]

router.post('/requestSubmitQA', (req, res, next)=>{
  let result = req.body.QA_ITEM_1  
   res.render('test', { testItems: result } );
});




router.post('/SubmitMaterial', (req, res, next)=>{
  
    var params = []
    params.push(req.body.name)
    params.push(req.body.emailAddress)
    params.push(req.body.type)
    params.push("URL HERE SOON")
    let category= req.body.type
    console.log("=========Quiz Type", category)
    var qSeparator=""//"<div><a onclick='toggleHideShow(1234567)'>Toggle</a></div>"
    //task.runQuery("INSERT INTO TESTREQUESTS (TESTREQUESTID, TESTREQUESTDT, NAME, EMAIL, TESTTYPE, TESTURL ) VALUES(DEFAULT, NOW(), ?,?,?,?)", params)
    var QuestionsAndAnswers = ""
    const questionCategory = ["Multiple Choice", "Yes or No", "True or False", "Rating/Survey","Certified I.Q. Test",  "Math", "Odd Man Out"]
                function generateQuestions(numItems){
                    let questions =  "<form id='submitDB' method='POST' action='/test/RequestSubmit'><input style='display:none' name='testCount' value='"+ numItems + "'>"
                    questions += "<questionsPart></questionsPart>"
                    questions += "<answersPart></answersPart></form>"
                    
                    const defaultText = "Please type your Question here"
                    for(var x=1; x<= numItems; x++){
                        let categoryRandom
                        if(category==20) {
                          categoryRandom=task.getRandom(1,10);
                        } 
                        else {
                          categoryRandom=category;
                        }
                        console.log("Quiz Type", categoryRandom)
                        questions +=  "<div><input style='display:none' name='quizType_"+ x +"' value='"+ categoryRandom + "'></div>"
                       
                        if(categoryRandom>=6 && categoryRandom<=9){
                          questions+= "<div id='testQuestionNumber_" + x +"'><div><b style='font-size:24px;width:45px; height:45px; background:white; border:ridge 1 silver; border-radius:10px'>"+ x +".</b>&nbsp;"
                        }
                        else{
                          const value = ""
                          if (category==6)
                          {
                                value = (MathQuestions[x-1]==undefined)? "" : MathQuestions[x-1].split("~")[0] 
                          }   
                          questions+= "<div id='testQuestionNumber_" + x +"'><b style='width:55px; height:45px; border:ridge 1px silver; border-radius:20px; background:white'>"+ x +".</b>&nbsp;<question category='"+ categoryRandom +"' id='question_"+ x +"' title='Question "
                                    +x+"' data-toggle='popover' data-placement='bottom' data-trigger='focus' data-html='true' >"+ defaultText +"</question>"
                        }
                        
                        questions+= generateAnswers(x, categoryRandom)  + "</div>"
                        
                    }
                    return questions
                }
                function generateAnswers(currentNumber, options){
                    var answers = "<QA_Answer id='QA_" + currentNumber + "'>"
                    function Name(number){
                      return  " name='answer_"+ currentNumber +"_"+ number +"' "
                    }
                    function ID(number){
                      return  " id='answer_"+ currentNumber +"_"+ number +"' "
                    }
                    function Name2(number){
                      return  " value="+ number +" name='answer_"+ currentNumber +" ' "
                    }
                    function answerStyle(style){
                      if(style==1) {
                        for(var n=1; n<=6; n++){
                          let correctMark=""
                          let correctText =""
                          let title= ""
                          if(n==1) {
                             correctMark="<i style='color: red'>(Correct Answer)</i>";
                             correctText = 'Type the correct answer here'
                             title="title='Correct Answer'" 
                            }
                            else{
                              correctText = 'Answer Option'
                              title="title='Answer Choice'" 
                            }
                            correctText = "<answer data-toggle='popover' data-placement='bottom' data-trigger='focus' data-html='true'  "+ title + ID(n) + ">"+ correctText +"</answer>"

                             answers += "<div style='margin-left:50px'><b>"+ String.fromCharCode(n + 64)  
                                     +".</b>&nbsp;"+ correctText + " " + correctMark +"</div>"
                        }
                      }
                      if(style==2) {
                        var YN = ['Yes','No']
                        for(var n=1; n<=2; n++){
                          answers += "<div quizStyle="+ style +" style='margin-left:50px'><input class='QA QA_Answer'  "+ Name2(n) +" type='radio' ><b>"+YN[n-1]+ "</b></div>"
                        }
                      }
                      if(style==3) {
                        var YN = ['True','False']
                        for(var n=1; n<=2; n++){
                          answers += "<div quizStyle="+ style +" style='margin-left:50px'><input class='QA QA_Answer' "+ Name2(n) +" type='radio' ><b>"+YN[n-1]+ "</b></div>"
                        }
                      }
                      if(style==4) {
                        for(var n=1; n<=5; n++){
                          if(n==1) answers += "<span style='margin-left:50px'></span>"
                          answers += "<b class='QA QA_Answer QA_star' "+ Name(n) +" >&#9733;</b>"
                        }
                      }
                      if(style==6) {
                        for(var n=1; n<=6; n++){
                          let correctMark=""
                          let correctText =""
                          if(n==1) {
                             correctMark="<i style='color: red'>(Correct Answer)</i>";
                          }
                          correctText =   (MathQuestions[currentNumber-1]==undefined)? "" : MathQuestions[currentNumber-1].split("~")[1].split("^")[n-1]
                          answers += "<div style='margin-left:50px'><b>"+ String.fromCharCode(n + 64)  +".</b>&nbsp;<input class='QA QA_Answer' size=30 value='"+ correctText 
                          +"' type='text' "+ Name(n) +" >"+ correctMark +"</div>"
                        }
                      }
                      if(style==7) {
                        answers+= quiz.getOddMan(6,currentNumber,true)
                      }
                      if(style==8) {
                        answers+= quiz.relationships(currentNumber,true)
                      }
                    
                      if(style==9) {
                        answers+= quiz.yearsDiff(currentNumber, true)
                      }
                    
                      if(style==10) {
                        answers+= quiz.relationships()
                      }
                      if(style==11) {
                        answers+= quiz.abstract(currentNumber, true)
                      }
                     
                      return answers
                    }
                    return  answerStyle(options) + "</QA_Answer>" + qSeparator.replace("1234567", currentNumber)  
                }

    let dbQuestions =[]
    let dbAnswers=[]
    let dbTypes = []
    let type 
    let somethingToSave =false
    console.log("TO BE SUBMITTED", req.body["question_1"], req.body["question_2"])
    console.log("TYPE", req.body["quizType_1"])
    if(req.body["question_1"]>"")  {
      somethingToSave = true
    }
   console.log("TO SAVE?", somethingToSave)
   console.log("CATEGORY", category)


    if(!somethingToSave)
    {
          if(category=='5')
          {
            type= questionCategory[category-1]
            QuestionsAndAnswers +=  quiz.showQuestions(quiz.getQuestions(parseInt(req.body.testCount)) ) + 
            "<input id='formSubmit' type='submit' value='Save to DB'>"; 
          }            
          else
          {
            type= questionCategory[category-1]
            if(category==20) type ="RANDOMIZED"
           //QuestionsAndAnswers +="<div style='color:maroon'>Please fill out the Questions and the corresponding Answer choices. Then assign the correct answer for each and every question.</div>"
          
            QuestionsAndAnswers += generateQuestions(req.body.testCount) 
            //+ "<input type='submit' id='saveToDB' value='Save to DB'>"; 
          }
    }
    else
    {
          const SQL = "insert into TestMaterials (ClientID, TestCreated_DT, NumberOfQuestions,TestMaterialLetterhead) values (11, NOW(), "+ req.body.testCount+", 'THIS IS JUST AN EXAMPLE')"
          task.runQuery(SQL).then( (result)=>{
          let materialId = result.insertId;
          console.log("MaterialID====>>>>>>>", materialId)
          for(let x=1; x<= req.body.testCount; x++){
            let options =""
            let params = []
            if(req.body["question_"+x ]>"")
            {   
              if(req.body["quizType_"+x]==4)
              {
              }
              if(req.body["quizType_"+x]==3  || req.body["quizType_"+x]==2){
                options = (req.body["answer_"+x + " " ])
              }
              else{
                for(let y=1; y<=6; y++){
                  options += (req.body["answer_"+x+ "_" + y])
                  if (y<6) options += "^"
                }
              }
             
                params.push( req.body["question_"+x ] )
                params.push( req.body["quizType_"+x] )
                params.push( options )
                console.log(params)
                task.runQuery("INSERT INTO TestQuestions (MaterialID, TestQuestion, TestType, AnswerOptions) VALUES("+ materialId +", ?, ?,?)", params).then( (result) => {
                  let questionId = result.insertId;
                  console.log("QuestionId", questionId)
                          task.runQuery("CALL MATERIAL_QUESTIONS(?)", [questionId]).then( ()=>{
                          //res.render('testRequest', {generateQuestions: res.});
                          })
                  });
            }
            
          }
         
          }).catch( (err) => { console.log(err); });
    }   
    
       
 
    

    res.render('testRequest', {facultyName: req.body.name , testType: type,  testCount:req.body.testCount,
      fullName: req.body.name, displayYN: "",
      emailAddress: req.body.emailAddress, 
      email:req.body.emailAddress, 
      quizType: req.body.type,
      generateQuestions: QuestionsAndAnswers});
    //res.end();
  });


  


router.get('/SAMPLE', (req, res, next)=>{
  res.render('test', { facultyName: "AMADOR RAGA", numItems:20,  testType: "Multiple Choice", testItems: showTest()  });
});

router.get('/CERT/:name/:subject/:logo/:host/:raw/:extra', (req, res, next)=>{
  const name= req.params.name;
  const subj = req.params.subject;
  const logo = req.params.logo;
  const host = req.params.host;
  const raw = req.params.raw;
  const extra = req.params.extra;
  if(extra!="Harvard2018!"){
    // to avoid hackers! Find if this certificate exists
    let whatToFind = "/test/cert/" + name + "/" + subj + "/" + logo + "/" + host + "/" + raw
    whatToFind = whatToFind.replace(/%20/g," ").replace(/%7C/g,"|")
    params= []
    param = params.push(whatToFind)
    console.log("FIND: [" + whatToFind + "]")
    task.runQuery("CALL CERTIFICATE_FIND(?)", params).then( (result)=>{
      console.log("RESULT", result[0], result[0][0]["Count"])
      if(result[0][0]["Count"]>=1)
      {
       // let found = "<iframe style='width:900px; height:750px; border:0px' src='"+ (whatToFind + "/HereAmI!") + "'></iframe>" 
       // console.log(found)
       // res.render("home", { result: found }   )
        res.render('cert', { name: name, course: host, subject: subj, logo:logo, totalScore : raw });
      }
      else{
        res.render("home", {result:"SOMETHING IS WRONG..."})
      }
    })
  }
  else{
    res.render('cert', { name: name, course: host, subject: subj, logo:logo, totalScore : raw });
  }
});


router.post('/CERTIFICATE', (req, res, next)=>{
  const name=  res.body.name;
  const subj = res.body.subject;
  const logo = res.body.logo;
  const host = res.body.host;
  const raw =  res.body.raw;
  res.render('cert', { name: name, course: host, subject: subj, logo:logo, totalScore : name });
});


router.get('/CERTVIEW/:ID/:clientID/:materialID', (req, res, next)=>{
      const ID= req.params.ID;
      const clientID = req.params.clientID;
      const materialID = req.params.materialID;
      const params= []
      params.push(ID)
      params.push(clientID)
      params.push(materialID)
      task.runQuery("CALL  CERTIFICATE_VIEW(?,?, ?)", params).then( (result)=>{
        console.log("RESULT", result[0][0])
        if(result[0][0]==undefined) {
            res.render('home', {result: "That does not exist!"} );
        } 
        else {
          const URL =  result[0][0]["CertURL"]
          console.log("CERT VIEW", URL)
       
          res.redirect(URL + "/wonDERful")
        }
      })
      res.end;
    //res.render('cert', { name: name, course: host, subject: subj, logo:logo, totalScore : name });
});


router.get('/PNP_IQ', (req, res, next)=>{
      const numQ = 30// task.getRandom(1,4)*5 +15
      const materialID = 2
      task.runQuery('CALL leaderboard(?,?)',[materialID,3]).then( (result)=>{
        console.log("LEADERBOARD", result[0])
        let r="<b>Top 3 Leaders:&nbsp;&nbsp;</b>"
        let ret = result[0]
        for(let x=0; x<ret.length; x++)
        {
          r +=""+ ret[x].Name + " (" +  ret[x].TestScore +   ")&nbsp;&nbsp;&nbsp;&nbsp;"
        }
        res.render('test', { leaderBoard:r, 
        logoName:"pnplogo.png", 
        providerName:"PHILIPPINE NATIONAL POLICE PROMOTIONAL EXAM",  
        materialID: materialID,
        origURL : "PNP_IQ",
        countdownTimer: 60*10,
        facultyName: quiz.quiz_StudentsRandom(), numItems:numQ,  
        testType: "TEST YOUR INTELLIGENCE QUOTIENT (IQ)", 
        testItems: quiz.showQuestions(quiz.getQuestions( numQ ), 800 ) });
      })
});


router.get('/PMA_IQ', (req, res, next)=>{
      const numQ = 30// task.getRandom(1,4)*5 +15
      const materialID = 1
      task.runQuery('CALL leaderboard(?,?)',[materialID,3]).then( (result)=>{
        console.log("LEADERBOARD", result[0])
        let r="<b>Top 3 Leaders:&nbsp;&nbsp;</b>"
        let ret = result[0]
        for(let x=0; x<ret.length; x++)
        {
          r +=""+ ret[x].Name + " (" +  ret[x].TestScore +   ")&nbsp;&nbsp;&nbsp;&nbsp;"

        }
        res.render('test', { leaderBoard:r, logoName:"pmalogo.jpg", providerName:"ACADEMY CAVALIERS HANGOUT",  
        //facultyName: quiz.quiz_StudentsRandom(),
        facultyName: "WHO ART THOU!", 
        numItems:numQ,  testType: "LOAKAN INTELLIGENCE QUOTIENT (LIQ)", 
        origURL : "PMA_IQ",
        materialID: materialID,
        countdownTimer: 60*10 ,
        testItems: quiz.showQuestions(quiz.getQuestions( numQ ), 800 ) });
      })
});


router.get('/PMA_IQ2', (req, res, next)=>{
  const numQ = 30// task.getRandom(1,4)*5 +15
  const materialID = 11
    res.render('test', { leaderBoard:"SAMPLE LEADERBOARD", logoName:"pmalogo.jpg", providerName:"ACADEMY CAVALIERS HANGOUT",  
    //facultyName: quiz.quiz_StudentsRandom(),
    facultyName: "WHO ART THOU!", 
    numItems:numQ,  testType: "LOAKAN INTELLIGENCE QUOTIENT (LIQ)", 
    origURL : "PMA_IQ",
    materialID: materialID,
    countdownTimer: 60*10,
    testItems: quiz.showQuestions(quiz.getQuestions( numQ ), 800 ) });
  
});



router.get('/IQ', (req, res, next)=>{
  const numQ = task.getRandom(1,7)*5 +15
  const materialID = 5
  res.render('test', { facultyName: quiz.quiz_StudentsRandom(), numItems:numQ,  
    logoName:"sample.png", 
    providerName:"SOCIETY OF GREY",  
    materialID: materialID,
    origURL : "IQ",
    countdownTimer: numQ*10,
    leaderBoard:"", 
    testType: "INTELLIGENCE QUOTIENT (IQ)", testItems: quiz.showQuestions(quiz.getQuestions( numQ ), 800 ) });
});
router.get('/Blessed', (req, res, next)=>{
  const numQ = task.getRandom(1,3)*5 +15
  const materialID = 13
  task.runQuery('CALL leaderboard(?,?)',[materialID,3]).then( (result)=>{
    console.log("LEADERBOARD", result[0])
    let r="<b>Top 3 Leaders:&nbsp;&nbsp;</b>"
    let ret = result[0]
    for(let x=0; x<ret.length; x++)
    {
      r +=""+ ret[x].Name + " (" +  ret[x].TestScore +   ")&nbsp;&nbsp;&nbsp;&nbsp;"

    }
    res.render('test', { facultyName: quiz.quiz_StudentsRandom(), numItems:numQ,  
      logoName:"sample.png", 
      providerName:"BLESSED QUINTINIANS",  
      materialID: materialID,
      origURL : "IQ",
      countdownTimer: numQ*10,
      leaderBoard:r, 
      testType: "SAN QUINTIN, PANGASINAN", testItems: quiz.showQuestions(quiz.getQuestions( numQ, 10),800, 3,13) });
  })
});
router.get('/ODDMAN', (req, res, next)=>{
  const numQ= 20 //+  5 *task.getRandom(0,7)
  const materialID = 9
  res.render('test', { facultyName: quiz.quiz_StudentsRandom(), numItems:numQ,  
    logoName:"sample.png", 
    providerName:"SOCIETY OF GREY",  
    materialID: materialID,
    origURL : "ODDMAN",
    countdownTimer: numQ*10,
    leaderBoard:"", 
    testType: "IT IS AN ODD WORLD AFTER ALL.", testItems: quiz.showQuestions(quiz.getQuestions( numQ, materialID ), 800 ) });
});
router.get('/abstract', (req, res, next)=>{
  const numQ= 20  // +  5 *task.getRandom(0,7)
  const materialID = 11
  res.render('test', { facultyName: quiz.quiz_StudentsRandom(), numItems:numQ,  
    logoName:"sample.png", 
    providerName:"SOCIETY OF GREY",  
    materialID: materialID,
    origURL : "abstract",
    countdownTimer: numQ*10,
    leaderBoard:"", 
    testType: "DELECTABLE ABSTRACT YET INSANELY REASONABLE.", testItems: quiz.showQuestions(quiz.getQuestions( numQ, materialID ), 800 ) });
});
router.get('/yearsDiff', (req, res, next)=>{
  const numQ= 15 +  5 *task.getRandom(0,7)
  const materialID = 7
  res.render('test', { facultyName: quiz.quiz_StudentsRandom(), numItems:numQ,  
    logoName:"sample.png", 
    providerName:"SOCIETY OF GREY",  
    materialID: materialID,
    origURL : "yearsDiff",
    countdownTimer: numQ*10,
    leaderBoard:"", 
    testType: "ARE YOU FOOLED WITH AGE.", testItems: quiz.showQuestions(quiz.getQuestions( numQ, materialID ), 800 ) });
});
router.get('/relationships', (req, res, next)=>{
  const numQ= 15 +  5 *task.getRandom(0,7)
  const materialID = 8
  res.render('test', { facultyName: quiz.quiz_StudentsRandom(), numItems:numQ,  
    logoName:"sample.png", 
    providerName:"SOCIETY OF GREY",  
    materialID: materialID,
    origURL : "relationships",
    countdownTimer: numQ*10,
    leaderBoard:"", 
    testType: "HOW GOOD ARE YOU WITH RELATIONSHIPS.", testItems: quiz.showQuestions(quiz.getQuestions( numQ, materialID ), 800 ) });
});
router.get('/fitb', (req, res, next)=>{
  const numQ= 15 +  5 *task.getRandom(0,7)
  const materialID = 10
  res.render('test', { facultyName: quiz.quiz_StudentsRandom(), numItems:numQ,  
    logoName:"sample.png", 
    providerName:"SOCIETY OF GREY",  
    materialID: materialID,
    origURL : "fitb",
    countdownTimer: numQ*10,
    leaderBoard:"", 
    testType: "FILL IN THE BLANKS", testItems: quiz.showQuestions(quiz.getQuestions( numQ, materialID ), 800 ) });
});
function showTest(result){ 
  qandA = "<div style='font-weight:999'>Select the best answer:</div><hr><div style='height:800px; overflow:hidden;'>"   
  questionNumber = getRandom(20,50)
  var qSeparator="<br><br>"
  for(let x=1; x<=questionNumber; x++ ){
    qandA += "<div id='Question_"+ x +"'>"
    var item="<b>Question "+x+"</b>: "
    item += "<form action='/test/submitPaper' method=post>"
    for(n=1; n<=getRandom(5,30); n++){
            item += words[getRandom(0,words.length-1)] + " "; 
    }
    qandA += item + " ?"
    answers.forEach( function(answer, y){
        let name='answer_'+ x;
        qandA += `<div style='margin-left:50px' ><input onclick='document.getElementById("dashBoard_`+ x + `").style.background="Gold"; ' name='answer[${x}]' type='radio' value='${y+1}'>&nbsp;${answer}</div>`
    });
    qandA +=  `<input type='hidden' name='answer[${x}]' value='0'>`;
    qandA +=  "</div>" + qSeparator;
  }
  qandA +=  "</div><hr>"
  qandA += "<input name='submitItem' type='submit' value='Submit My Paper' >";
  return qandA
}
let words = "The United States Constitution is the supreme law of the United States Constitution , originally comprising seven articles, delineates the national frame of government. Its first three articles embody the doctrine of the separation of powers, whereby the federal government is divided into three branches: the legislative, consisting of the bicameral Congress; the executive, consisting of the President; and the judicial, consisting of the Supreme Court and other federal courts. Articles Four, Five and Six embody concepts of federalism, describing the rights and responsibilities of state governments, the states in relationship to the federal government, and the shared process of constitutional amendment. Article Seven establishes the procedure subsequently used by the thirteen States to ratify it. It is regarded as the oldest written and codified national constitution in force.";
words = words.split(" ") 
let answers = ["very easy", "moderately easy", "easy I think", "hard", "overly hard" ]
function getRandom(min, max) {
    if(min==undefined) min=0;
    if(max==undefined) max=10;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
module.exports = router;