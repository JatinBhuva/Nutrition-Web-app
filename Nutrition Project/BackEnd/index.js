const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');


const app = express();

app.use(express.json());
app.use(cors());

// schema for foods collection
const foodSchema =new mongoose.Schema({
    name:String,
    calories:Number,
    protein:Number,
    carbs:Number,
    fats:Number,
    fiber:Number,
    weight:Number

})

const foodModel=new mongoose.model("food",foodSchema);

//connection of nodejs with mongodb
mongoose.connect("mongodb://127.0.0.1:27017/nutrition",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connected");
})

//route create food
app.post("/food/create",(req,res)=>{
    const food = req.body;
    let foodObj=new foodModel(food);
    foodObj.save().then(()=>{
        res.send({status:"Food Stored!!!!"});
    })
})

//route get food

app.get("/food",async (req,res)=>{
    let foods=await foodModel.find();
    
    res.send({foods:foods});
})

app.listen(8000);