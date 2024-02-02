# AverageVisitingAPI

1.clone project in your system
2. Make changes in utils/db.js file and change database credentials.
3 Insert some data in Visitors Table in formate
  enterTime= 'yyyy-mm-ddThh:mm:ss'
  exitTime= 'yyyy-mm-ddThh:mm:ss'
  or BY QUIRY
  insert into "Visitors" ("entryTime","exitTime")values
   ('yyyy-mm-ddThh:mm:ss',''yyyy-mm-ddThh:mm:ss');

4. check api by hitting POST method 
      http://localhost:PORT/average_visit_times
   add body,
       {
           "startDate" : "yyyy-mm-dd",
           "endDate": "yyyy-mm-dd"
        }
   the diffrent is not more then 10 days
6. you can add visitor entry and exit time by hitting
      http://localhost:PORT/add_visitors
    add body,
       {
         "entryTime": "yyyy-mm-ddThh:mm:ss",
         "exitTime": "yyyy-mm-ddTh:mm:ss"
   }







   
