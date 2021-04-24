# sales-statics
sales static is nodeJs project developed using javascript language for retriving sales statistics from database.

# installation
To run this program you need to install nodeJs and Mysql server with sample table and afetr that use npm i to install packages. 

# execution
This program can be executed using following command

```npm start```

# working
Add sales into table with (user_name, amount)
Use postmen with post method "http:/localhost:5000/api/sales" with json raw body{"name":"user_name", "amount":amount}
This will create a record of sales in database.

Retrive sales with statistics
Daily Statistics: This will return hourly sales amount and also total amount of the day
Use postmen with get method "http:/localhost:5000/api/statsales/daily"

Weekly Statistics: This will return 7 days sales amount and also total amount of the week
Use postmen with get method "http:/localhost:5000/api/statsales/weekly"

Monthly Statistics: This will return Month days sales amount and also total amount of the Month
Use postmen with get method "http:/localhost:5000/api/statsales/monthly"
