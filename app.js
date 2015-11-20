
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//set locals
app.locals.websiteTitle = "Demo NODE JS website";
//var data = require('./Employees.json');
//app.locals.appdata = data;


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/listEmployees', routes.listEmployees);
app.get('/addEmployee', routes.addEmployee);

//app.post('/', handlePostOnRoot);
//[function (req, res, next) {

app.post('/addEmployee', function (req, res) {
        var UserId = req.body.UserId;
        var JobTitle = req.body.JobTitle;
        var FirstName = req.body.FirstName;
        var LastName = req.body.LastName;
        var EmployeeCode = req.body.EmployeeCode;
        var Region = req.body.Region;
        var Phone = req.body.Phone;
        var Email = req.body.Email;
        // Prepare output in JSON format
        response = {
            userId: UserId,
            jobTitleName: JobTitle,
            firstName: FirstName,
            lastName: LastName,
            employeeCode: EmployeeCode,
            region: Region,
            phoneNumber: Phone,
            emailAddress: Email
        };
        console.log(JSON.stringify(response));
        
        var file = "./Employees.json";
        console.log(file);
        //var data1 = require('./Employees.json');
        //console.log(data1);
        fs.readFile(file, function (err, data) {
            if (err) throw err;
            
            var fileObj = JSON.parse(data.toString());
            
            fileObj.Employees.push(response);
            console.log('after push');
            console.log(fileObj);
            
            var returnjson = JSON.stringify(fileObj);
            fs.writeFile(file, returnjson, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    response1 = {
                        message: 'Employee is added successfully!'
                    };
                }
                console.log(response1);
                res.end(JSON.stringify(response1));
            });
            console.log('after write');
        });
        //res.end(JSON.stringify(response));
        app.set('appdata', require('./Employees.json'));
        
        //next();
});
//, function (req, res) {
//        res.send('Hello World!');
//    }]);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
