var mysql=require('mysql');
var connection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'regime_alimentaire'
   });
connection.connect(function(error){
   if (!!error) {
     console.log(error);
   }else{
     console.log('connected!:)');
   }
});
module.exports = connection;