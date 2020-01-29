module.exports = {


    getRandom: (min, max) => {
      if(min==undefined) min=0;
      if(max==undefined) max=10;
      
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    dbConnect: ()=>{
      if( !alreadyConnected){
        connection.connect(function(err) {
          if (err) {
            //console.error('Error connecting: ' + err.stack);
            return;
          }
          else{
            alreadyConnected = true;
            console.log('Connected as id ' + connection.threadId);
          } 
        });
      }
    }, 

    
    runQuery: async (SQL, params) => {
      if( !alreadyConnected){
        connection.connect(function(err) {
          if (err) {
            //console.error('Error connecting: ' + err.stack);
            return;
          }
          else{
            alreadyConnected = true;
            console.log('Connected as id ' + connection.threadId);
          } 
        });
      }

      return new Promise( (resolve, reject) => {
        connection.query(SQL, params, (error, rows, fields) => {
          if (error) return reject(error);
          resolve(rows); 
        });
        
      });

    }


}