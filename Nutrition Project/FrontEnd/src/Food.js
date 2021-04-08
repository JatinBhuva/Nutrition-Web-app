import React, { Component } from 'react'

export default class Food extends Component {

constructor(props){
        super(props);

        this.state={
            foods:[],
            searchedFoods:[],
            currentFood:{
                name:"-",
                calories:0,
                protein:0,
                carbs:0,
                fats:0,
                fiber:0,
                weight:0
           }
        }
}

selectFood(food){
    this.setState({currentFood:food});
}

calculateChanges(weight){
    let currFood=this.state.currentFood;
    if(weight!==""&&weight!==0){
        currFood.calories=Number((currFood.calories*weight)/currFood.weight);
        currFood.carbs=Number((currFood.carbs*weight)/currFood.weight);
        currFood.protein=Number((currFood.protein*weight)/currFood.weight);
        currFood.fats=Number((currFood.fats*weight)/currFood.weight);
        currFood.fiber=Number((currFood.fiber*weight)/currFood.weight);
        currFood.weight=Number(weight);
       
        console.log(currFood);
        this.setState({currentFood:currFood});
    }
    //   else{
    //    this.setState({currentFood:currFood});
    //    }
}

searchFood(value){
    console.log(value)
    if(value!==""){
        let searchedFoodsArray=this.state.foods.filter((food,index)=>{
        return food.name.toLowerCase().includes(value.toLowerCase());
        })
        this.setState({searchedFoods:searchedFoodsArray});
    }
    else{
     this.setState({searchedFoods:[]});
    }
}

componentDidMount(){
    fetch("http://localhost:8000/food")
    .then((response=>response.json()))
    .then((foodsresponse)=>{
        this.setState({foods:foodsresponse.foods})
        console.log(foodsresponse);
    })
    .catch((err)=>{
        console.log(err);
    })
}

render() {
    return (
    <div className="container">
    <div className="form-group" style={{marginTop:"30px"}}>
    <input className="form-control" onChange={(event)=>{
        this.searchFood(event.target.value)
    }} placeholder="Serach Folder"/>
    </div>
    <div className="search-result">
    <header className="Search-header">
        {
            this.state.searchedFoods.map((food,index)=>(
            <div className="result" style={{cursor:"pointer",padding:"8px"}} onClick={()=>{
                this.selectFood(food);
                }} key={index}>
            {food.name}
            </div>
            ))
        }
     </header>                
    </div>

        <div className="product-display">
        <table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Calories</th>
                <th>Protien</th>
                <th>carbs</th>
                <th>Fibers</th>
                <th>Fat</th>
                <th>Weight</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{this.state.currentFood.name}</td>
                <td>{this.state.currentFood.calories.toFixed(2)}</td>
                <td>{this.state.currentFood.protein.toFixed(2)}</td>
                <td>{this.state.currentFood.carbs.toFixed(2)}</td>
                <td>{this.state.currentFood.fiber.toFixed(2)}</td>
                <td>{this.state.currentFood.fats.toFixed(2)}</td>
                <td>
                    <input type="text"  value={this.state.currentFood.weight}
                    onChange={(event)=>{
                        this.calculateChanges(Number(event.target.value));
                    }}/>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
    )
    }
}
