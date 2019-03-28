var express = require('express');
var app = express()
var path = require('path')
const database = require('./lib/database')
var bodyparser = require('body-parser')
var espressValidator = require('express-validator')
var flash = require('express-flash')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'View'));
app.use(express.static(__dirname+'/public'));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extented:true}))

app.get('/alimentation',(req, res) => {
    res.render('alimentation')
})
app.get('/index',(req, res) => {
    res.render('index')
})
app.get('/offres',(req, res) => {
    res.render('offres')
})
app.get('/programmes',(req, res) => {
    res.render('programmes')
})
app.get('/serviceLivraison',(req, res) => {
    res.render('serviceLivraison')
})

app.get("/s'identifier",(req, res) => {
    res.render("s'identifier",{
        errors:""
    })
})
app.post("/s'identifier",(req,res) => {
    let error = [];
    const{ email, password } = req.body
        if(!(email.length > 0)){
            error.push({
                email: "Vous n'avez rien rempli le champs " 
            })
        }
         if(!(password.length > 0)){
            error.push({
                password: "Vous n'avez rien rempli le champs " 
            })
        }
    if(!(error.length > 0)){
        if(email && password){ 
            database.query("INSERT INTO utilisateur(email,password) values(?,?)",[email,password],(err,rows) => {
                if(err){
                    res.locals.errors = "Nous n'avons pas pu enregistré vos données veillez resaisir les informations"
                    res.redirect('back')}
                else{
                    res.redirect('/presentation')}
            })
        }else{
            res.locals.errors = "Certains champs ne sont pas definie"
            res.redirect('back');
        }
    }else{
        res.locals.errors = error
        res.redirect('back');
    }
})
//*************************************************************
app.get("/s'inscrit",(req, res) => {
    res.render("s'inscrit",{
        errors:""
    })
})
app.post("/s'inscrit",(req,res) => {
    let error = [];
    const{ firstname, name, date, commune, quartier, email, password, adresse, city, code, country } = req.body
    
        if(!(firstname.length > 0)){
            error.push({
                firstname: "Vous n'avez rien rempli le champs " 
            })
        } 
       if(!(name.length > 0)){
            error.push({
                name: "Vous n'avez rien rempli le champs " 
            })
        }
       if(!(date.length > 0)){
            error.push({
                date: "Vous n'avez rien rempli le champs " 
            })
        }
       if(!(commune.length > 0)){
            error.push({
                commune: "Vous n'avez rien rempli le champs " 
            })
        }
       if(!(quartier.length > 0)){
            error.push({
                quartier: "Vous n'avez rien rempli le champs " 
            })
        }
       if(!(email.length > 0)){
            error.push({
                email: "Vous n'avez rien rempli le champs " 
            })
        }
       if(!(password.length > 0)){
            error.push({
                password: "Vous n'avez rien rempli le champs " 
            })
        }
       if(!(city.length > 0)){
            error.push({
                city: "Vous n'avez rien rempli le champs " 
            })
        }
       if(!(code.length > 0)){
            error.push({
                code: "Vous n'avez rien rempli le champs " 
            })
        }
       if(!(country.length > 0)){
            error.push({
                firstname: "Vous n'avez rien rempli le champs " 
            })
        }
       if(!(country.length > 0)){
            error.push({
                firstname: "Vous n'avez rien rempli le champs " 
            })
        }

    if(!(error.length > 0)){
          
        if(firstname && name && date && commune && quartier && email && password && adresse && city && code && country){ 
            database.query("INSERT INTO utilisateur(firstname,name,date,commune,quartier,email,password,adresse,city,code,country) values(?,?,?,?,?,?,?,?,?,?,?)",[firstname,name,date,commune,quartier,email,password,adresse,city,code,country],(err,rrows) => {
                if(err){
                    res.locals.errors = "Nous n'avons pas pu enregistré vos données veillez resaisir les informations"
                    res.redirect('back')
                }else{
                    res.locals.message = "Votre inscription, un defi a relevé profiter bien de nos programmes!!"
                    res.redirect('/presentation')
                }
            })
        }else{
            res.locals.errors = "Certains champs ne sont pas definie"
            res.redirect('back');
        }
    }else{
        res.locals.errors = error
        res.redirect('back');
    }
})

app.get("/presentation",(req, res) => {
   res.render("presentation")
})
app.get("/coaching",(req, res) => {
    res.render("coaching")
})



app.listen(3000,() => {
    console.log('marie ')
})