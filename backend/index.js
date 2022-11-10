import express from "express";
import mysql from "mysql";
import cors from "cors"
const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"SGupta@8586",
    database:"pensieve"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hello this is the backend ")
})

app.get("/gpssummary", (req,res)=>{
    const q = "SELECT * FROM gpsdata "
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
   
})

app.post("/register", (req, res) => {
    const q = "INSERT INTO registation (`Name` , `Email`, `Password`) VALUES (?)";
    const values = [
        req.body.Name,
        req.body.Email,
        req.body.Password,
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Registration successfully.");
    });
});


app.get("/login", (req,res)=>{
    const q = "SELECT * FROM registation"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend12!..");
})