var express=require('express');
var mongoose=require('mongoose');
var bp=require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/Enquiry');
var db=mongoose.connection;

//db.on("error", console.log.bind(console,"connection error"));
db.once('open', function(callback) //listner
{
  console.log("connected");
});

var app=express();
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res)
{
    res.set({"Access-Control-Allow-Origin":'*'});

     return res.redirect('index.html');
}).listen(3000);

app.post('/save', function(req, res)
{
    // var name=req.body.name;
    var phoneNo=req.body.phoneNo;
    var email=req.body.email;
    var course=req.body.course;

    var data={"name":req.body.name,
                 "phoneNo":phoneNo,
                 "email":email,
                "course":course
            };
    db.collection('Details').insertOne(data,function(err, collecton)
    {
        if (err) throw err;
        console.log("Data Recorded");
        
    });
    return res.redirect('success.html');

});

console.log("server running")