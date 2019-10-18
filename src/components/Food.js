import React from 'react';
import '../App.css'
import 'font-awesome/css/font-awesome.min.css';
class Food extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            foods: [
                {
                  name: "Xoi ga" ,
                  price: 15000,
                },
                {
                  name: "Banh my",
                  price: 10000
                },
                {
                  name: "Bun bo",
                  price: 20000
                },
                {
                  name: "My quang",
                  price: 20000
                },
                {
                  name: "onichan",
                  price: 10000000
                }
            ],
            name: "",
            price: null,
            isDisplayForm: false,
            filterName: "",
            filterPrice: 0
        }
    }
  onChange = (e)=>{
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (name === "price") value = parseInt(value);
    e.preventDefault();
    this.setState({
      [name]: value
    })
  }
  onFilter = (e)=>{
    let target = e.target;
    let name = target.name
    let value = target.value;
    console.log(name)
    this.setState({
      [name]: value,
    })
  }
  onClick = (e)=>{
    var target = e.target;
    var name = target.name;
    if(name === "OK"){
      var {foods} = this.state;
      var food = {
        name: this.state.name,
        price: this.state.price,
      }
      if(food.name !== "" &&  (food.price !== "" && food.price !== null && food.price !== "NaN")){
        foods.unshift(food);
        this.setState({
          foods: foods
        })
      }else{
        alert("Loi")
      }
    }
    else if (name === "Cancel"){
      this.setState({
        name: "",
        price: 0
      })
    }
    else if (name == "Add"){
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
      })
    }
  }
  componentDidUpdate(e){
  }
  onKeyDown = (e) =>{
    if ( e.keyCode === 69 || e.keyCode === 190 )  e.preventDefault()
  }
  render(){
    var {isDisplayForm,foods,filterName,filterPrice} = this.state
    var fullWidth = {width: "100%"}
    foods = foods.filter((food,index)=>{
      return food.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
    })
   /*  foods = foods.filter((food,index)=>{
      return food.price >= parseInt(filterPrice);
    }) */
    var menu = foods.map((food,index)=>{
      return (
        <tr key={index}>
          <td>{food.name}</td>
          <td>{food.price}</td>
          <td>
            <span >
                <button type="button" className="btn btn-danger"  style={{margin: "0 30px"}}>Delete</button>
              <button type="button" className="btn btn-warning">Edit</button>
            </span>
          </td>
        </tr>
      )
    })
    var addForm =  
    (
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title ">Add food <i className="fa fa-times-circle" style={{float:"right"}}></i></h3>
          </div>
          <div className="panel-body">
            
            <input onKeyUp={this.onChange}type="text" name="name" className="form-control" />
            <br/>
            <input onKeyUp={this.onChange} onClick={this.onChange} onKeyDown={this.onKeyDown}  defaultValue="0"type="number" name="price"  className="form-control" />
            <br/>
            <button onClick={this.onClick} type="button" name="Cancel" className="btn btn-danger">Cancel</button>
            <button onClick={this.onClick} type="button" name="OK"className="btn btn-success">OK</button>                        
          </div>
      </div>
    </div>
    )

    return(
      <div id="header">
          <h1><i className="fas fa-utensils"></i> Foody</h1>
          <button 
            onClick={this.onClick}
            type="button" 
            className="btn btn-info" 
            name ="Add"
            style={{
              marginBottom: "10px",
              width: "100px",
              marginRight: "-80%"
            }}
          >ADD</button>
          <div className ="food-menu">
          
            
            <div className="row">
              {isDisplayForm === true ? addForm: ""}

              <div className={isDisplayForm === false ? "col-xs-11 col-sm-11 col-md-11 col-lg-11" :"col-xs-8 col-sm-8 col-md-8 col-lg-8" }>
        
                  <table className="table table-bordered table-hover">  
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="input" onKeyUp={this.onFilter}  name="filterName"className="form-control" style={fullWidth}/></td>
                        <td><input type="number" onKeyUp={this.onFilter}  onKeyDown={this.onKeyDown} name="filterPrice"className="form-control" style={fullWidth}/></td>
                        <td></td>
                      </tr>
                     {menu}
                    </tbody>
                  </table>
                  
              </div>
            </div>
          
            
          </div>
      </div>
    )
  }
}
export default Food;
