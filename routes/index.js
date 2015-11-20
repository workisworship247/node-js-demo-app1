
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Home', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};

exports.listEmployees = function (req, res) {
    //app.set('appdata', require('./Employees.json'));
    var file = "./Employees.json";
    var fs = require('fs');
    fs.readFile(file, function (err, data) {
        if (err) throw err;
        
        var fileObj = JSON.parse(data.toString());
        res.render('listEmployees', { title: 'Employees', year: new Date().getFullYear(), message: 'It shows all present list of employees', dataset: fileObj });
    });
    
    
};

exports.addEmployee = function (req, res) {
    res.render('addEmployee', { title: 'Add Employee', year: new Date().getFullYear(), message: 'It is used to add new record to employees' });
};


