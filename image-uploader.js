const express = require("express");
const multer = require("multer");

const app = express();
app.use(express.json());

const fileStorage = multer.diskStorage({
 destination:function(req, file, cb){
    cb(null,"./images/");
 },
 filename:function(req,file,cb){
    cb(null, file.originalname);
 },
});

const upload = multer({storage:fileStorage});

//for Single file
app.post("/single", upload.single("image"), (req,res)=>{
    console.log(req.file);
    res.status(200).json({
        status:"Success",
        message:"Single file uploaded successfully"
    })
})


//for Multiple file
app.post("/multiple", upload.array("images", 3), (req,res)=>{
    console.log(req.file);
    res.status(200).json({
        status:"Success",
        message:"Multiple file uploaded successfully"
    })
})


app.listen(4000, ()=>{
    console.log("Backend is listening on port 4000");
})

