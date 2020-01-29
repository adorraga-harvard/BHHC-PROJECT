
module.exports = {
   validateAngle: (angle) => {  // to make sure that angle is translated to anything between 0 and 360 integer 
    angle = parseInt(angle)
    if(angle>=360) angle = angle-360
    if(angle<0) angle = angle+360
      return parseInt(angle)
   },
  // ABSTRACT REASONING
  abstract: (recno,YN) => {
    let lineAngle = task.getRandom(0,18)*20
    let arcStart = task.getRandom(0,18)*20
    let arcEnd = task.getRandom(0,10)*35
    const onOff1 = task.getRandom(0,1)
    const onOff2 = task.getRandom(0,1)
    const width = task.getRandom(1,4) * 2
    const radius = task.getRandom(4,8)*6
    const inc1 = task.getRandom(0,3)*30 -45
    const inc2 = task.getRandom(0,3)*30 -45
    //const inc3 = task.getRandom(0,3)*30 -45
    let xxx = task.getRandom(1,5)
    let absValues =[]
    let result = "<question id='question_" + recno +"' style='display:inline-block; vertical-align:top; width:550px' data-ask='"+ xxx +"' >" 
    let UNKNOWN = ""    
    for(let x=1; x<=5; x++){
      lineAngle += inc1
      arcStart += inc2
      arcEnd += inc2//3
      lineAngle = quiz.validateAngle(lineAngle)
      arcStart = quiz.validateAngle(arcStart)
      arcEnd = quiz.validateAngle(arcEnd)
      let item = lineAngle + ":" + arcStart + ":" + arcEnd + ":" + onOff1 + ":" + onOff2 + ":" + width + ":" + radius  
      if(xxx==x) {
        absValues.push(item)
        UNKNOWN = item
      }
      result += "<div id='question_"+ recno +"_" + x + "'>"  +item + "</div>"
    }
    result += "</question><h3 style='display:inline-block; vertical-align:top'>SELECT THE BEST ANSWER:<answer>"  
    UNKNOWN  = UNKNOWN.split(":")
    let change1= 30* task.getRandom(1,3)
    let change2 = 45 * task.getRandom(1,3)
    for(let x=1; x<=5; x++){
         const a1 = (x==1)? lineAngle + change1: lineAngle
         const a2 = (x==2)? arcStart + change2: arcStart 
         const a3 = (x==3)? arcEnd + change2: arcEnd 
         const a4 = (x==4)? width +2 : width
         const a5 = (x==5)? radius-5: radius
         let item =  a1 + ":" + a2 + ":" + a3 + ":" + onOff1 + ":" + onOff2 + ":" + a4 + ":" + a5 + ":" + (x+1)
         console.log("ITEM", item)
         absValues.push(item)
    }
    absValues = quiz.shuffle(absValues)
    console.log(absValues)
    for(let x=1; x<=6; x++){
      let abs = absValues[x-1]//(x==xxx)?1:0
      abs = abs.split(":")[7]
      abs = (abs==undefined) ? 1: 0 
      let btnClick = ' onclick="showOnDashboard('+ recno +','+ x +','+ abs +')" ' 
      result+= "<h3 id='questionAbs_"+ recno + "_" + x +"'><a style='display:inline-block; vertical-align:top' class='answerClass scrollLink' href='#Question_"+ (recno+1) +"'><button id='answer_"
          + recno + "_" + (x) +"'" + btnClick + " data-draw='"+ absValues[x-1] +"' class='answerBtn'>" +String.fromCharCode(64+x)+"</button></a></h3>"     
    }
    result += "</answer></h3>"
      return result
  },
  // FILL IN THE BLANKS
  fillInTheBlanks: (recno, freq, maxQ, matlID)=>{
    let paraPool = []
    paraPool.push("Preamble Philippine Constitution^^^We, the sovereign Filipino people, imploring the aid of Almighty God, in order to build a just and humane society, and establish a Government that shall embody our ideals and aspirations, promote the common good, conserve and develop our patrimony, and secure to ourselves and our posterity, the blessings of independence." )
    if(matlID==13){  // Panganan Questions
      paraPool.push("Province of Pangasinan^^^At the close of the 17th century, San Quintin was still a wilderness inhabited by fierce man-eating tribes called “Ubilaos”.  At the beginning of the 18th century, the first Christian settlers from the coastal towns of La Union and Ilocos Sur arrived.  An exodus of immigrants from the Ilocos coastal towns found their way to the fast growing village.  As a result of the great exodus, the “Ubilaos” and the other smaller minority tribes deserted their dwelling places and settled deeper into the safety of the vast forests.  They left behind their settlements.  The different settlements were organized into one entity and was named Lango-lango. ")
      paraPool.push("Province of Pangasinan^^^The union was made to promote closer understanding and amiable relationship among the settlers because trade was flourishing.  Due to the rapid growth of the population, Lango-lango was transformed into a barrio under the jurisdiction of the municipality of Umingan which was then a town of Nueva Ecija.")
      paraPool.push("Province of Pangasinan^^^In 1861, Don Quintin Lictawa called for a “Great Conference” attended by all the leaders of the different settlements to plan to press the Spanish government to recognize the barrio as a town and to name it as San Quintin.  In 1863, a Spanish decree was enacted giving birth to the municipality of San Quintin.")
      paraPool.push("Dipalo River <img src='https://assets.explora.ph/xp-images/600xautox90/images-dev/entry-attraction-gallery/1498824715_explora-dipalo-river-3.jpg'>^^^A river that flows from the Caraballo Mountains, Dipalo River is San Quintin, Pangasinan’s upcoming tourist attraction. The local government is at the moment eyeing to improve infrastructure and develop its surrounding areas; hence for now, visitors should expect beauty in its rawest form. It is already a popular hang out spot among locals though.")
      paraPool.push("Dipalo River <img src='https://assets.explora.ph/xp-images/600xautox90/images-dev/entry-attraction-gallery/1498824715_explora-dipalo-river-4.jpg'^^^Despite the rough roads, it is not uncommon to find here groups enjoying a picnic and a cool swim. The adventure-seeking ones follow the river upstream, where the hike eventually leads to several waterfalls. Since there are no official trails yet, tourists are advised to coordinate with the local tourism office if planning an excursion of the area.")
      paraPool.push("Kalipkip Falls <img src='https://assets.explora.ph/xp-images/600xautox90/images-dev/entry-attraction-carousel/1501476796_kalipkip-falls.JPG'>^^^A 10 ft waterfall called the KALIPKIP waterfalls that is about 10 minutes cliff walking away from the katukakan falls. Mountaineers named the falls kalipkip came from the word “masikip” or “narrow”. But never underestimate this waterfalls because its depth believed 15- 18 ft. To those who wants to experience an adrelanine rush while having fun, you can swim to its water as long as you have the strong mind and have the guts to dive. If you want to dive or swim to this waterfall you must be accompanied by your friends or any mountaineers.© LUMAYAO INTEGRATED SCHOOL, SAN QUINTIN, PANGASINAN ‘THE JUMPERS")
      paraPool.push("Katukakakan Falls <img style='width:400px' src='https://assets.explora.ph/xp-images/600xautox90/images-dev/entry-attraction-carousel/1501476199_katukakan-falls.JPG'>^^^A two storey falls is the Katukakan Falls. A 15ft tall waterfall that believed to be enchanting because o its origin that the waterfall got its name from the farm frogs or an ilocan term “tokak”, living at the top area of the said falls. According to the people near falls, long ago, they are scared of this waterfall because frogs might fell into the water while you are swimming.© LUMAYAO INTEGRATED SCHOOL, SAN QUINTIN, PANGASINAN ")
      }
    else{
      paraPool.push("Beyond Forgetting^^^For a moment I thought I could forget you.<br>For a moment I thought I could still the restlessness in my heart.<br><br>I thought the past could no longer haunt me – nor hurt me.<br>How wrong I was!")
      paraPool.push("Beyond Forgetting^^^For the past, no matter how distant, is as much a part of me as life itself.<br>And you are part of that life. You are so much a part of me — <br>of my dreams, my early hopes, my youth and my ambitions - <br>that in all tasks I can’t help remembering you.")
      paraPool.push("Beyond Forgetting^^^Many little delights and things remind me of you. Yes, I came. And would my pride mock my real feelings?<br>Would the love song, the sweet and lovely smile on your face, be lost among the deepening shadows?<br>I have wanted to be alone. <br>I thought I could make myself forget you In silence and in song…<br>And yet I remembered.")
      paraPool.push("Are You Resigning?^^^Sir, I came from the land of the Kings, where everyone can do what he wishes. I hike the plains of Luzon and hurdled the mountains of Baguio just to reach my precious destination ... The Philippine Military Academy. Now, I am here as a plebe, a ducrot to the thirdclassmen, a chicken to the secondclassmen and a good neighbor to the firstclassmen. Now, are you resigning? No sir, over the dead and rotten body of fourthclassman ...")
      paraPool.push("Desiderata^^^Go placidly amid the noise and haste & remember what peace there may be in silence. As far as possible without surrender be on good terms with all persons. Speak you truth quietly & clearly; and listen to others, even the dull & ignorant; they too have their story. Avoid loud & aggressive persons, they are vexatious to the spirit. If you compare yourself with others, you may become vain & bitter; for always there will be greater & lesser persons than yourself.<br>Enjoy your achievements as well as your plans. Keep interested in your own career, however humble; it is a real possession in the changing fortunes of time. Exercise caution in your business affairs; for the world is full of trickery. But let this not blind you to what virtue there is; many persons strive for high ideals; and everywhere life is full of heroism. Be yourself. Especially do not feign affection.")
      paraPool.push("Desiderata^^^Neither be cynical about love; for in the face of all aridity & disenchantment it is perennial as the grass. Take kindly the counsel of the years, gracefully surrendering the things of youth. Nurture strength of spirit to shield you in sudden misfortune. But do not distress yourself with imaginings. Many fears are born of fatigue & loneliness. Beyond a wholesome discipline, be gentle with yourself.<br>You are a child of the universe, no less than the trees & the stars; you have a right to be here. And whether or not it is clear to you, no doubt the universe is unfolding as it should. Therefore be at peace with God, whatever you conceive Him to be, and whatever your labors & aspirations, in the noisy confusion of life keep peace with your soul. With all its sham, drudgery & broken dreams, it is still a beautiful world. Be cheerful. Strive to be happy.")
      paraPool.push("What Is A Kiss?^^^Sir, a kiss! When all is said, what is a kiss? An oath of allegiance taken at closer proximity, a promise more precise, a seal upon a confession, a rose red dot upon the letter 'i' in loving; an instant of eternity murmuring like a bee, a balmy communion with the flavor of the flowers, a secret which elects the mouth for the ears, a fashion of inhaling each other's heart and of tasting the brink of each other's lips, each other's soul. This, Sir, is a kiss.")
      paraPool.push("Don't Quit^^^When things go wrong as they sometimes will, When the road you're trudging seems all uphill, When the funds are low and the debts are high, And you want to smile but you have to sigh, When care is pressing you down a bit, Rest if you must, but don't you quit. Life is queer with its twists and turns, As everyone of us sometimes learns, And many a failure turns about, When he might have won had he stuck it out; Don't give up though the pace seems slow - You may succeed with another blow.<br>Often the goal is nearer than, It seems to a faint and faltering man, Often the struggler has given up, When he might have won the victor's cup. And he learned too late when the light came down, How close he was to the golden crown. Success is failure turned inside out. The silver tint of the clouds of doubt, And you never can tell how close you are, It maybe near when is seems far; So stick to the fight when you're hardest hit - It's when things seem worst that you must not quit.")
      paraPool.push("How Long Is Eternity?^^^Sir, if it takes a bird from outer space travelling at the speed of a turtle that is taking his time and picks a grain of sand from the earth and brings it back to the place where he came from and deposits it there and does the process once in every million years, and after picking all the minute grains of sand on earth and depositing them on the bank of the galaxies of heaven, he brings them back to their places, eternity shall have just begun. I hope that the lazy and dumb bird will travel forth and my chinning and double-timing be made shorter than the beginning of eternity, Sir.")
      paraPool.push("Do You Have A Sister?^^^Sir, that question has been languishing in my heart, devouring myself totally and fatally polluting my mind. I became your untaxable property and that surging question could be the cause of all evils that might beseech my family; its sparkle will be lost to a demon like you - whom I would like to ram from head to throat - asking that question with a ten peso balance in your checking account, we might be on the same boat Sir. So may I ask you the same question, Do you have a sister or a daughter, Sir?")
      paraPool.push("What is Bukayo?^^^Sir, if the fresh and tender meat of a matured coconut, cleaned and divested of all extraneous materials be grated into fine particles and immersed in the concentrated solution sugar (C12 H22 O11) boiled to the nth degree centigrade, a sticky substance is produced. If the quantity be made into a rectangular brick of a form of a parallelopiped, the volume of which is ABC minus the circumference of the plebe's mouth will result to a Pangasinan's delicacy stored and kept for many days at the back of the locker of the triple-timing, boodle-hungry, tremendously-dehydrated plebe. This, Sir, is bukayo.")
      paraPool.push("Cadet's Prayer^^^Grant us, Oh God, that we may worship Thee to the utmost of faith and the limits of truth and suffer us not to fail to see the light of our true religion. Guide us that we may live this life to the fullest in devotion to Thee, in service to humanity and country and in the realization of our true self.")
      paraPool.push("Cadet's Prayer^^^Let the light of Thy divine wisdom direct us to a firm resolve to live up at all times to the creeds of our institution and teach us never to fail to measure up to the ideals of the profession we have chosen through life to follow. Make us do or think or say of others that which we want done, or thought, or said of us. Help us to live each day in the passing years in useful efforts that our lives may be spent in accord with the pattern of our creeds -the true, the noble, and the high. Give us that honest purpose in life which seeks fair deal with everyone and spurns all forms of hypocrisy that will enkindle our fighting faith, and smother all seeds of cowardice and fear in our hearts; the loyalty to our principles that places all issues above personal considerations, and shuns compromise with vice and injustice. Strengthen our hearts with fortitude that we may discipline our lives to trail the difficult paths rather than to stray on the easier ways. Teach us to aspire above the levels of common lives. Help us to see all things in their true light that we may guard against the frivolity in the sacred things of life even as we may enjoy in clear laughter its many delights. Teach us to make our play in every game, whether in mere sports or in life's mightier struggles, one where our desire to win is second only to our love of the game itself, where we triumph as considerate victors or lose with grace and a determined will to win. Endow our hearts with kindness that we may sympathize with those who sorrow and suffer; unite us in friendship, with all and help us share the merriment of those with cheerful countenance that we may partake of their joy. All of which we ask with faith to the everlastingness of Thine fount of grace to all men. Amen.")
    }

    let para = paraPool[task.getRandom(0,paraPool.length-1)]
    let header 
    console.log("PARA", para)
    para = para.replace(/  /g, " ")
    para = para.split("^^^")
    if(para.length>0){
      header = para[0]
      para = para[1]
      console.log("header", header)
    }
    console.log("PARA", para)
    para = para.split(" ")
    let recFreq = parseInt(para.length/200)
    if(recFreq>freq) freq = recFreq
    if((recno + freq) >maxQ) freq = ( maxQ-recno + 1) 
    //console.log(para)
    const number = para.length-1    
    let locs = quiz.shuffleN(number)
    let taken=0;
    for(let x=1; x<number-2; x++) {
      let y = locs[x]
      console.log(y, para[y])
      if ( para[y].indexOf("-")<0 && para[y].indexOf("?")< 0  && para[y].indexOf(";")< 0 
        && para[y].indexOf("<br>")<0 && para[y].indexOf(".")<0 && para[y].indexOf("'")<0 )
      {
        if(para[y].length>=4  )
        {
          taken++
          if(para[y].indexOf(",")>0)
          {
            para[y] = "|" + para[y].replace(",", "") + "|" + ","
          }
          else{
            para[y] = "|" + para[y] + "|"
          }
          if(taken==freq) x= number
        }
      }
     
    }

    let sentence =""
    for(let x=0; x< para.length; x++){
      sentence += para[x] + " "
    }
   
    sentence = sentence.split("|")
    let result = (header>"")? "<h2>Source: <i>"+ header +"</i></h2>":""

    let counter = 0
    for(let x=0; x< sentence.length; x++){
      if(x % 2== 0)
      {
        result+= sentence[x]
      } 
      else {
        const clicker= "onfocus='highlightIt(" + (recno + counter) + ")'   onchange='showOnDashboard2("+ (recno + counter) +",this.value, this.name , "+ recno +")'  class='answerBtn2' id='answer_" + (recno + counter) + "' "
        result += "<span><b id='Question_" + (recno + counter)+"' data-multiple="+ recno +"  style='font-size:smaller;color:Maroon'>" + (recno + counter) 
                + "</b><input "+ clicker +" style='width:"+ 10*(sentence[x].length+4)+"px;' name='"+ sentence[x] +"_"+(recno + counter)+"' type='text' ></span>" 
        counter++
      }
    }
    return result
  },
  // HOW OLD IS?
  ageOfB: ()=>{
    const sentenceA= "XXX years ago, nameA was YYY times as young as nameB."
    const sentenceB= "XXX years from now, nameA will be YYY times as old as nameB."
    //const sentenceC= "nameB is XXX years oldYoung than nameA now."
    const sentenceC= "How old is nameB now?"
    let XXX = [2,2,2]
    let YYY = [2,2]
    const oy=["older", "younger"]
    const oldYoung1 = task.getRandom(0,1)
    const oldYoung2 = task.getRandom(0,1)
     XXX[0] = task.getRandom(1,10)
     YYY[0] = task.getRandom(2,4)
     XXX[1] = task.getRandom(1,10)
     YYY[1] = task.getRandom(2,4)
     XXX[2] = task.getRandom(1,10)
    let names=["Alpha", "Bravo", "Charlie", "Delta","Jordan", "Alex", "Oakley","Cameron","Skyler","Jessie", "Lesley"]
    names = quiz.shuffle(names) 
    let Question = ( "<div>" + sentenceA.replace("XXX", XXX[0]).replace("YYY", YYY[0]) + "</div>" + 
                    "<div>" + sentenceB.replace("XXX", XXX[1]).replace("YYY", YYY[1]) + "</div>" +
                    "<div><br>" + sentenceC + "</div>" ).replace(/nameA/g, names[0]).replace(/nameB/g, names[1]).replace(/1 years/g, "1 year")
    let result = Question
    return result;
  },

  relationships: (recno,YN) => {
    const status = ["son", "daughter", "mother", "father", "brother", "sister"]
    const rel = "son, daughter, mother, father, brother, sister, aunt, uncle, niece, nephew, grandmother, grandfather, grandson, granddaughter, wife, husband, cousin"
    const logic = "1^1=13, 1^2=13, 1^3=5, 1^4=5, 1^5=10, 1^6=10, 2^1=14, 2^2=14, 2^3=6, 2^4=6, 2^5=9, 2^6=9, 3^1=15, 3^2=15, 3^3=11, 3^4=11, 3^5=3, 3^6=3, 4^1=16, 4^2=16, 4^3=12, 4^4=12, 4^5=4, 4^6=4, 5^1=1, 5^2=1, 5^3=8, 5^4=8, 5^5=5, 5^6=5, 6^1=2, 6^2=2, 6^3=7, 6^4=7, 6^5=6, 6^6=6"
    const first = task.getRandom(0,5) 
    const second = task.getRandom(0,5)
    status1 = status[first]
    status2 = status[second]
    let relAdj1 = ( status1 == "mother"  || status1 == "father") ? " the " + status1 : " a " + status1
    let relAdj2= ( status2 == "mother"  || status2 == "father") ? " the " + status2 : " a " + status2
    let names=["Alpha", "Bravo", "Charlie", "Delta","Jordan", "Alex", "Oakley","Cameron","Skyler","Jessie", "Lesley"]
    names = quiz.shuffle(names)
    const nameA = names[0]
    const nameB = names[1]
    const nameC = names[2]
    let question = "<div class='questionText' name='answer_"+ recno +"'><div>"+ nameA +" is " + relAdj1 + " of "+ nameB+".</div>"
    question += "<div>" + nameB +" is " + relAdj2 + " of "+ nameC + ".</div></div>"
    const finder = (first + 1) + "^" + (second + 1) 
                  function makeItHarder(obj)
                  {
                          let item = obj
                        .replace(" is niece",  relAdj2.indexOf("brother")>=0? "'s father is a brother" : "'s mother is a sister"  )
                       // .replace(" is uncle", "'s brother is the father")
                       // .replace(" is aunt", "'s sister is the mother")
                        .replace(" is grandson",       relAdj2.indexOf("son")>=0? "'s father is a son":  "'s mother is a daughter" )
                        .replace(" is grandmother", (relAdj2.indexOf("mother")>=0) ? "'s daughter is" + relAdj2 : "'s son is" + relAdj2)
                        return item      
                  }
    const resFinder = logic.split(",")
    for(let x=0; x<resFinder.length; x++){
      if( resFinder[x].indexOf(finder)>=0){
        const val= resFinder[x].split("=")[1]
        const Relationship = rel.split(",")
        const correctLocation = val-1 
        let answerItem = nameA + " is " + Relationship[ correctLocation].trim() + " of "+ nameC 
        let item = makeItHarder(answerItem)
            .replace("wife", "the wife")
            .replace("husband", "the husband")
        
        let answerItems =[]
        answerItems.push(item)
        for(let x=1; x<=5; x++){
            let y= correctLocation + x
            if(y>=Relationship.length) {
              y = y - Relationship.length
            }
            answerItems.push(makeItHarder(nameA + " is " + Relationship[y].trim() + " of " + nameC ))
        }
        answerItems = quiz.shuffle(answerItems)
        let result= ""
        for(let x=0; x<6; x++){
          console.log(recno + "_" + x, answerItems[x], answerItem)
          const YN= (answerItems[x]==item)?1:0
          result+= "<div class='answerClass answer_" + recno +"'><a class='scrollLink' href='#Question_"+ (recno +1) 
                + "'><button data-ask='200_"+ YN +"'  onclick='showOnDashboard("+ (recno) +"," + (x+1) + ","+ YN +")'  class='answerBtn' id='answer_"
                + recno + "_"+ (x+1) +"'>"+ String.fromCharCode(65 + x) +"</button></a>&nbsp;<font  class='questionText'>"+ answerItems[x] +"</font></div>"
    
        }   
        //YN = true;  // remove this after testing....
        return question + "<hr><h3>SELECT THE BEST ANSWER: <b>"+ ((YN==undefined)?"":item)+"</b></h3>" + result;
      }
    }    
    return question
  },
  // FOOLED WITH AGE
  yearsDiff: (recno, YN)=>{
    const twentyNumbers = quiz.shuffleN(20);
    const rel1= task.getRandom(1,2)==1 ? "older" : "younger"
    const rel2= task.getRandom(1,2)==1 ? "older" : "younger"
    const rel3= task.getRandom(1,2)==1 ? "older" : "younger"
    const  students=  quiz.quiz_StudentsRandom(100);
    const nameA= students[1]
    const nameB= students[2]
    const nameC= students[3]
    const nameD= students[4]
    const M = twentyNumbers[1]
    const N = twentyNumbers[2]
    const O = twentyNumbers[3]
    const tense= ["is", "was", "will be"]
    var useTense=""
    var extraPhrase=""
    var numberForm = ["","1", "Two", "Three", "Four", "Five"]
        function addExtraPhrase(){
            function numberForm(number){
              //console.log(number)
              if(number==1) return "1"
              if(number==2) return "Two"
              if(number==3) return "Three"
              if(number==4) return "Four"
              if(number==5) return "Five"
            }
           useTense="is"
           extraPhrase=""
          const condition = task.getRandom(0,2)
          //console.log("CONDITION", condition)
          if(condition>0) {
            useTense = tense[condition]
            const extra  = quiz.shuffleN2(5)[2]
            //console.log("EXTRA", extra)
            if(condition==2){
              extraPhrase = "In " + Math.abs(extra) + " years, " 
            }
            if(condition==1){
              extraPhrase = (numberForm(Math.abs(extra)) + " years ago, " ).replace("1 years", "A year")
            }
          }
        }
    let question =""//= "<h2>Find the Age Difference:</h2>"
    addExtraPhrase()
    question += "<questionSec id='question_"+ recno +"' class='questionText' name='answer_"+ recno +"'><div>"+ extraPhrase + nameA +  " " + useTense + " " + M + " years "+ rel1 +  " than " + nameB + ".</div>"
    addExtraPhrase()
    question += "<div>"+ extraPhrase + nameB +  " " + useTense + " " + N + " years "+ rel2 + " than " + nameC + ".</div>"
    addExtraPhrase()
    question += "<div>"+ extraPhrase + nameC +  " "+ useTense+" " + O + " years "+ rel3 + " than " + nameD + ".</div>"
    question += '</questionSec>'
    let answer = 0
    answer = ( rel1== "older") ? answer + M:  answer - M;
    answer = ( rel2== "older") ? answer + N:  answer - N;
    answer = ( rel3== "older") ? answer + O:  answer - O;
    const answerA = Math.abs(answer)
    const answerB = (answer<0) ? "younger" : "older"
    const rev = (answerB=="younger") ?"older":"younger" 
    if(task.getRandom(0,2)==1){
      answer =  nameA + " is " + answerA + " years " + answerB + " than " + nameD  
    }
    else{
      answer =  nameD + " is " + answerA + " years " + rev + " than " + nameA  
    }
    let correctAnswer = answer.replace("1 years", "a year")
    let answerOptions = []
    answerOptions.push(answer.replace("1 years", "a year"))
    const diff= quiz.shuffleN3(3,2)
    answerOptions.push( (nameA + " is " + (answerA + diff[4]) + " years " + answerB + " than " + nameD))
    answerOptions.push( (nameA + " is " + (answerA + diff[0]) + " years " + answerB + " than " + nameD))
    answerOptions.push( (nameD + " is " + (answerA + diff[1]) + " years " + rev + " than " + nameA))
    answerOptions.push( (nameA + " is " + (answerA + diff[2]) + " years " + answerB + " than " + nameD))
    answerOptions.push( (nameD + " is " +  (answerA+ diff[3])+ " years " + rev + " than " + nameA))
    answerOptions = quiz.shuffle(answerOptions)
    let result ="<hr><h3>SELECT THE BEST ANSWER:</h3>"
    for(let x=0; x<answerOptions.length; x++){
      const YorN= ( answerOptions[x] ==correctAnswer)?1:0
      result+= "<div class='answerClass answer_" + recno +"'><a class='scrollLink' href='#Question_"+ (recno +1) 
            + "'><button  data-ask='200_"+ YorN +"'   onclick='showOnDashboard("+ (recno) +"," + (x+1) + ","+ YorN+")'  class='answerBtn' id='answer_"
            + recno + "_"+ (x+1) +"'>"+ String.fromCharCode(65 + x) +"</button></a>&nbsp;<font  class='questionText' name='answer_"+recno+"_"+ x +"'>"+ answerOptions[x] +"</font></div>"
          if(YN!=undefined){
            result+="<answer style='display:none' id='answer_"+ recno + "_"+ (x+1) + "'>" + answerOptions[x] + "</answer>"
          }
    }   
    result = question.replace(/ 1 years/g, " a year") + result.replace(/ 1 years/g, " a year")
    return "<div>" + result + "</div>"
  }, 

 
  shuffleN: (N)=>{
    let Numbers =[]
    for(let n=1; n<=N; n++)
    {
      Numbers.push(n)
    }
    return quiz.shuffle(Numbers)
  },
  shuffleN2: (N)=>{
    let Numbers =[]
    for(let n=-N; n<=N; n++)
    {
      if(n!=0) Numbers.push(n)
    }
    return quiz.shuffle(Numbers)
  },
  shuffleN3: (N, multi)=>{
    let Numbers =[]
    for(let n=-N; n<=N; n++)
    {
      if(n!=0) Numbers.push(n * multi)
    }
    return quiz.shuffle(Numbers)
  },
  
  quiz_StudentsRandom: (N)=>{
    let names = "Santos,Lara, Azurin,Guzman,Raga,Cruz,Sanchez,Querol,Aquino,Pimentel,Puno,Salop,Dalupan,Obena,Marques,Pacquiao,Marcos,Alipio,Horton,Jimenez,Mendoza,Meyer,Howe,Merritt,Mccall,Larson,Murphy,Mejia,Ball,Christensen,Gallegos,Benson,Wyatt,Duncan,Oconnell,Doyle,Andrews,Delgado,Palmer,Baird,Quinn,Reed,Gaines,Kramer,Beard,Moon,Salas,Cameron,Carrillo,Melendez,Hamilton,Buchanan,Norman,Li,Park,Sandoval,Dillon,Steele,Marshall,Frey,Mckenzie,Mcknight,Henderson,Pratt,Phillips,Munoz,Greer,Acevedo,Bolton,Hepherd,Avery,Brooks,Brewer,Lara,Farmer,Lynch,Wolf,Joseph,Arnold,Burnett,Cowan,Oconnor,Rollins,Harding,Mccormick,Avila,Gardner,Roy,Smith,Welch,Obrien,Church,Moran,Hanna,Mcfarland,Mills,Wilkins,Rios,Macias,Hanson,Faulkner,Evans,Huffman,Carson,Costa,Leach,Hendricks,Vincent,Stone,Levine,Randall,Le,Wood,Estrada,Kane,Conner,Matthews,Guerrero"
    let lastNames = names.split(",")
    lastNames = quiz.shuffle(lastNames)
    names = "Amador,Agapito,Barok,Korokan,Tarzan,Rizal,Andres,Balagtas,Fernando,Lino,Tirso,Chris,Miracle,Elle,Macy,Matilda,Delilah,Jazmine,Leticia,Makaila,Dalia,Sariah,Laney,Litzy,Selena,Kaliyah,Jessie,Angel,Emily,Laci,Zoe,Kendal,Corinne,Cassidy,Chelsea,Jamie,Jacey,Charlee,Jamya,Caroline,Giada,Serena,Kristen,Sylvia,Isabell,Alma,Cynthia,Miah,Zion,Kierra,Zariah,Olivia,Kadence,Shirley,Adison,Annabelle,Araceli,Ryleigh,Ashleigh,Avery,Juliette,Julianne,Sandy,Freddie,Barry,Daron,Werner,Drew,Agustin,Theron,Dalton,Lindsay,Cody,Ricardo,Jonathon,Harlan,Emile,Zane,Elwood,Ferdinand,Benny,Rusty,Colin,Kristopher,Elias,Basil,Otis,Mel,Reynaldo,Miquel,Mary,Kim,Brett,Milo,Claude,Efrain,Graig,Percy,Caleb,Clinton,Kevin,Emilio,Franklin,Leigh,Waldo,Elden,Rupert,Palmer ,Arnoldo,Dorsey,Santiago ,William"
    let firstNames = names.split(",")
    firstnames = quiz.shuffle(firstNames)
    if (N== undefined){
      return firstNames[task.getRandom(1, firstNames.length-1) ] + " " +  lastNames[task.getRandom(1, firstNames.length-1) ]
    }
    else
    {
      let result=[]
      for(let x=1; x<= N; x++){
        result.push(firstNames[task.getRandom(1, firstNames.length-1) ] + " " +  lastNames[task.getRandom(1, firstNames.length-1) ])
      }
      return result
    }
  },
  // ODD MAN OUT
  getOddMan: (N, recno, YN)=>{
    let v = []
    const oddman= quiz.shuffleN(14)
 
    const correctAnswer = quiz.getOddManFrom(oddman[2], 1)[0]
    if(YN==undefined)
    {
      v = quiz.getOddManFrom(oddman[0], N-1)
      v.push(correctAnswer)
      v = quiz.shuffle(v)
    }
    else{
      v.push(correctAnswer)
      const arr = quiz.getOddManFrom(oddman[0], N-1)
      for( let x=0; x< N-1; x++){
        v.push(arr[x])
      }
    }
    let result ="<h2><questionSec id='question_"+ recno +"'>Find the Odd Man out:</questionSec></h2>"
    for(let x=0; x<v.length; x++){
      const YorN = (correctAnswer == v[x]  )?1:0
      result+= "<div class='answerClass answer_" + recno +"'><a class='scrollLink' href='#Question_"+ (recno +1) 
            + "'><button   data-ask='200_"+ YorN +"'   onclick='showOnDashboard("+ (recno) +"," + (x+1) + ","+ YorN +")'  class='answerBtn' id='answer_"
            + recno + "_"+ (x+1) +"'>"+ String.fromCharCode(65 + x) +"</button></a>&nbsp;"+ (v[x]+"").toUpperCase() +"</div>"
            if(YN!=undefined){
              result+= "<answer style='display:none' id='answer_"+ recno+"_"+ (x+1) + "'>" + (v[x]+"").toUpperCase() + "</answer>"
            }
    }
    return "<div>" + result + "</div>"
  }, 

  

  getOddManFrom: (category, howMany)=> {
      let obj=""
      if(category==1){
        obj = "dog, cat, giraffe, lion, elephant, tiger, zebra, monkey, donkey, cow, horse, giraffe, coyote, wolf, leopard, puma"
      }
      if(category==2){
        obj = "tilapia, milkfish, tuna, salmon, trout, sardine, lobster, crab, shrimp, eel, oyster, jellyfish, whale, shark, octopus, catfish, salmon"
      }
      if(category==3){
        obj = "hemp, marijuana, coconut, dogwood, jasmine, banana, cypress, evergreen, pine, oak, maple"
      }
      if(category==4){
        obj = "Philippines, Malaysia, Indonesia, Brunei, Singapore, USA, Canada, France, Japan, Russia, Germany, Belgium, Hungary"
      }
      if(category==5){
        obj = "cancer, diabetes, diarrhea, ulcer, seizure, blindness, spam, cholera, toothache, headache, cramps"
      }
      if(category==6){
        obj =  "Plus, Minus, Divide, Multiply, Square Root, Denominator, Percentage, Ratio, Prime, Even, Odd"
      }
      if(category==7){
        obj = "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Galaxy, Andromeda, Orion, Moon, Comet, Star, Sun"
      }
      if(category==8){
        obj = "Guitar, Ukulele, Piano, Violin, Xylophone, Saxophone, Flute, harmonica, Banjo, Violin, Harmonica"
      }
      if(category==9){
        obj = "Guava, Papaya, Peach, Mango, Apple, Apricot, Prunes, Grapes, Strawberry, Blackberry"
      }
      if(category==10){
        obj = "Guard, Captain, Private, Major, Admiral, Fleet,  Camp, Bivouac, Headquarters, Grenade, Ambuscade, Barracks, Corporal, Howitzer, Armalite, Garand, Pistol, Rifle, Battleship, Commander"
      }
      if(category==11){
        obj = "East, West, North, South, Left, Right,  Front, Back, Push, Pull, Top, Bottom, Diagonal, Rear, Starboard, Portside, Past, Future"
      }
      if(category==12){
        obj = "wonderful, beautiful, ugly, pretty, terrific, horrific, awesome, fearless, swift, fast, quick, cumbersome, slow"
      }
      if(category==13){
        obj = "biology, botany, zoology, astronomy, astrology, philosophy, economics, statistics, trigonometry, history, topology, numerology, psychiatry"
      }
      if(category==14){
        obj = "miles, inches, centimeter, minutes, hours, meter, pounds, years, weeks, months, cubits, calories, decibels"
      }
      let oddCategory  = quiz.shuffle((obj.replace(/ /g,"")).split(","))  
      let result = []
      for(let x=0; x<howMany; x++) {
          result.push(oddCategory[x])
      }
      return result
  },


  shuffleAlpha: ()=>{
    let Alpha =[]
    for(let n=1; n<=26; n++)
    {
      Alpha.push( String.fromCharCode(64+n) )
    }
    return quiz.shuffle(Alpha)
  },
  shuffle: (array)=> {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there are remaining elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
,  
  showQuestions: (q, dividerHeight, YN, matlID) => {
    if(dividerHeight==undefined) 
      dividerHeight=""
    else
      dividerHeight = " height:"+ dividerHeight+"px;"
    let questions =   q.split("<BR>")
    let questionStyles = (questions[0].split("=>")[1]).split(",");
    let questionItems = (questions[1].split("=>")[1]).split(",");
    let questionAlphas = (questions[2].split("=>")[1]).split(",");
    let Hidden = (questions[3].split("=>")[1]).split(",");
    let answerSection = ""
    let result=""
    let recno = 0
                    function manipulateItem(item)
                    {
                      let result=""
                      item = (item + "").trim()
                      for(let x=1; x<=item.length; x++ )
                      {
                        result+= item.substr(x-1,1)
                      }
                      return result
                    } 
                    function generateAnswerOptions(item,numItems, recno){
                      let result=""
                      let cards=[]
                      cards.push(item)
                      const shuffledNumbers = quiz.shuffleN3(40,3)
                      //const Tens = quiz.shuffleN(10)
                      const shuffledAlphas = quiz.shuffleAlpha()
                      //console.log("SHUFFLED ALPHAS:", shuffledAlphas)
                      let start= task.getRandom(1,5)
                      const step = task.getRandom(1,2)
                      for(let x=1; x<numItems; x++){
                        let card=""
                        if(!isNaN(item)){
                          card= parseInt(item) + shuffledNumbers[x]
                        }
                        else {
                          start += step;
                          for(let i=1; i<=item.length; i++) {
                            if(i>1){
                                if(item.substr(0,1)==item.substr(1,1)){
                                      card = shuffledAlphas[start] + shuffledAlphas[start]
                                }
                                else{
                                  card += shuffledAlphas[start]
                                }
                            }
                            else{
                              card += shuffledAlphas[start]
                            }
                          }
                        }
                        cards.push(card)
                      }
                      //console.log("CARDS", cards)
                      cards= quiz.shuffle(cards)
                      //console.log("SHUFFLED CARDS", cards)
                      for(let x=1; x<=numItems; x++){
                        const YorN = (item==cards[x-1])? 1:0
                        result+= "<div class='answerClass  answer_" + recno +"'><a href='#Question_"+ (recno +1) +"'  class='scrollLink'><button  data-ask='200_"+ YorN +"'    onclick='showOnDashboard("+ (recno) +"," + x + ","+ YorN +")'  class='answerBtn' id='answer_"+ recno + "_"+ x +"'>"+ String.fromCharCode(64+ x) +"</button></a>&nbsp;"+ cards[x-1]+"</div>"
                      }
                      //console.log("RESULT", result)
                      return result 
                    }
  for(let recno = 0; recno < questionItems.length ; recno++)
    {
      if(questionStyles[recno]==10){
        const numQFill = task.getRandom(1,4)
        let multiple = ""
        for(let x=1; x<= numQFill; x++){
          multiple += (recno + x)
          if(x<numQFill) multiple+= ", "
        }
        result += "<h1 id='Question_"+ (recno+1)+"' >Question <b style='color:Maroon; width:50px; border:2px;'>"+ multiple + "</b></h1>";
        result+= "<div style='width:800px; "+ dividerHeight +"font-size:18px; display:inline-block; vertical-align:top'>"  
        console.log("MATERIAL ID:", matlID)
        result += quiz.fillInTheBlanks(recno+1, numQFill, questionItems.length, matlID  )
        recno = recno +  numQFill -1
        result += "</div>"
      }
      else {
        result += "<h1 id='Question_"+(recno +1)+"'>Question <b style='color:Maroon; width:50px; border:2px;'>"+ (recno + 1) + "</b></h1>";
        if(questionStyles[recno]>=7 && questionStyles[recno]<=11) {
            if(questionStyles[recno]==11){
              result+= "<div style='width:1000px; "+ dividerHeight +" display:inline-block; vertical-align:top'>"  
              result += quiz.abstract(recno+1,YN)
              result += "</div>"
          }
            if(questionStyles[recno]==9){
                  result+= "<div style='width:800px; "+ dividerHeight +" display:inline-block; vertical-align:top'>"  
                  result += quiz.getOddMan(6, recno+1,YN)
                  result += "</div>"
              }
              if(questionStyles[recno]==8){
                result+= "<div style='width:800px; "+ dividerHeight +" display:inline-block; vertical-align:top'>"  
                result += quiz.relationships(recno+1,YN)
                result += "</div>"
              }
              if(questionStyles[recno]==7){
                result+= "<div style='width:800px; "+ dividerHeight +" display:inline-block; vertical-align:top'>"  
                result += quiz.yearsDiff(recno+1,YN)
                result += "</div>"
              }
          } 
          else
          {
                result+= "<div style='width:530px; "+ dividerHeight +" display:inline-block; vertical-align:top'>"
                      const rows = questionItems[recno].split("~").length;
                      let cols = questionItems[recno].split("~")[0].split("^").length
                      if(rows==0) { rows=1; } 
                      let randomLocation = Hidden[recno];

                      for(let m=1; m<=rows; m++ )
                      {
                      let questionRow = questionItems[recno].split("~")[m-1]
                      result += "<div style='vertical-align:top; margin-bottom:2px'>"
                      for( let n=1; n<=cols; n++){
                        let item = questionRow.split("^")[n-1]
                        if( ((m-1)* cols) + n == randomLocation) {
                          result += "<button class='btnQ unknown' style='font-size:35px' >&nbsp;</button>&nbsp;"
                          const left= questionRow.split("^")[n-2]
                          const right= questionRow.split("^")[n]
                          //YN= true; // testing;;;
                          answerSection = "<h3>SELECT THE BEST ANSWER : " + ((YN==undefined)?"": item )+"</h3>" + generateAnswerOptions(item,6, (recno+1))

                        }
                        else
                        {
                          let l = ""
                          if(item.length>4) l= " style='font-size:"+ (35- 6*(item.length-4))+"px' "
                          result += "<button class='btnQ'  "+ l +">" + item + "</button>&nbsp;"
                        }
                      }
                      result += "</div>"
                      }
                      result+= "</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style='display:inline-block;  vertical-align:top'>" +answerSection + "</div>"
          }
        }
      result+="<hr>"
    }
  return "<div style=''>" +  result + "</div>"
  },

  getQuestions: (number, setQ) => {
    //=================================
          function getRandom(min, max){
            if(min==undefined) min=0;
            if(max==undefined) max=10;
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          function generateTimesAplusB() {
            const a = getRandom(2,5);
            const b= getRandom(2,5);
            for(let i=1; i<100; i++){
              const value  = (i * (3 +a))  + (b + 2* a) ;
              TimesPlus.push(value);
            }
          }
          function generatePlusAtimesB() {
            const a = getRandom(2,5);
            const b = a + getRandom(2,5);
            for(let i=1; i<100; i++){
              const  value  = (i + a) * (2+ b) ;
              PlusAtimesB.push(value);
            }
          }
          function generateFib(n){
            for(let i=2; i<n; i++){
              var value = fibList[i-1] + fibList[i-2];
              fibList.push(value);
            }
            return fibList;
          }
          function questionAlphabet(number){
                  number = number % 26
                  let value = number + 65;
                  value = String.fromCharCode(value);
                  return value;
          }
          function questionAlphabet2(number){
            if(number<0) number=number + 26
            let value = number % 26;
            let value2 = (value + alphaDiff) % 26;
            value = String.fromCharCode(value+65);
            value2 = String.fromCharCode(value2+65);
            return value+ alphaDelimiter +value2;
          }
          function getSingleQuestion(number, style, layout){
            let cols;
            let result = "";
            let adj = 0;
            ////==================================================================================
                      function generateQuestionStyle( firstLoc, numItemsPerLine, rowStyle){
                                ///=======================
                                    function getValue(rowStyle, starter){
                                      if(rowStyle==0) {
                                        return fibList[starter];
                                      }
                                      if(rowStyle==1) {
                                        return TimesPlus[starter]
                                      }
                                      if(rowStyle==2) {
                                        return PlusAtimesB[starter]
                                      }
                                      if(rowStyle==3) {
                                        return questionAlphabet(starter)
                                      }
                                      if(rowStyle>=4) {
                                        return questionAlphabet2(starter)
                                      }
                                    }
                        let lineValue = "";
                        let starter = firstLoc;
                          for(let x=1; x<=numItemsPerLine; x++) {
                            lineValue += getValue(rowStyle, starter)
                            if(x!==numItemsPerLine){
                              lineValue += "^"
                              starter += step;
                            }
                        }
                        return lineValue
                      }
            ////=====================================================================================          
            if(style==3) {
              adj=1; //  Alpha Quiz is easy that we don't allow very close letters, at least one char between
            }
            if(layout>=0 && layout<3 ) {    //==> 3x3
              cols =  3
              if(layout==1) cols= 4
              if(layout==2) cols= 5
              step = getRandom(1+adj,2+adj)
              start = getRandom(1,15)
              if(layout==1) start = getRandom(1,10)
              if(layout==2) start = getRandom(1,6)
              for(let y=1; y<= cols; y++) {
                result += generateQuestionStyle( start,  cols, style);
                if(y< cols){
                  result += "~";
                  start += (1 + getRandom(1,2) ) *  step;
                }
              }
            }
            if(layout==3   ) {   // 6 items on a line
              step = getRandom(1+adj,2+adj)
              start = getRandom(1,15)
              result += generateQuestionStyle( start,  5, style);
            }
            if(layout==4  ) {
              result += ""   //quiz.getOddMan(6)
            }
            return result
          }
    ///=====================
    if(setQ==undefined)
    {
      // prepare the random IQ resources
      var fibList = [1, 1];
      var TimesPlus = [];
      var PlusAtimesB = [];
      generateFib(50);
      generateTimesAplusB();
      generatePlusAtimesB();
    }
      var step = 0;
      var start=0;
      var StylesName = ["Fibonacci", "Math1", "Math2", "Alphabet1", "Alphabet2"];
      // for IQ Test, the plan is to use the above types
      var Questions = [];
      var Styles = [];
      var Alpha = [];
      var Answers = [];
      var alphaDiff;
      var alphaDelimiter
    for(let x=1; x<=number; x++){
      console.log("=================", x)
      let quizStyle = getRandom(0, 4);
      const quizLayout = getRandom(0, 7);  /// 0. 3x3, 1. 4x4, 2 5x5  3. 6 on a record  4. 10 on a record
      if(quizLayout>=4) quizStyle=quizLayout+3;
      if(quizStyle>=10) quizStyle=11;
      if(setQ!= undefined) {
        quizStyle = setQ
      }
      alphaDiff = getRandom(0, 2);
      /// make it more fun by randomly creating more character in between
      const delimiterStyle = getRandom(0, 1);
      let limit = "";
      alphaDelimiter = limit;
      const result = getSingleQuestion(x, quizStyle, quizLayout);
        Questions.push(result)
        Alpha.push(alphaDiff + ":" + limit)
        //console.log("QUIZ STYLE", quizStyle)
      Styles.push(quizStyle)
    }
    const Hidden = []
    for(let x=0; x<Questions.length; x++) {
      const q = Questions[x]
      const rows = q.split("~").length;
      let cols = q.split("~")[0].split("^").length
      let randomLocation = task.getRandom(1, rows * cols );  
      Hidden.push(randomLocation)
    }
    return "STYLES=>" + Styles + "<BR>Questions=>" + Questions + "<BR>Alpha=>" + Alpha + "<BR>Hidden=>" + Hidden;
  }
}