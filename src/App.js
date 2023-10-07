import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';



import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pagesize =6
  country = 'in'
  // apikey= process.env.REACT_APP_NEWS_API
  apikey= 'c3484c9144934ba4a502bc46818696ae'
  state ={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      
      <div>
      <Router>
        
       <Navbar/>
       <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        
        
      />

       <Switch>
       <Route exact path="/"><News setProgress = {this.setProgress} apikey={this.apikey} key="general" pagesize={this.pagesize} country={this.country}category='general'/> </Route>
            <Route exact path="/business"><News setProgress = {this.setProgress} apikey={this.apikey} key="business" pagesize={this.pagesize} country={this.country}category='business'/></Route>
            <Route exact path="/entertainment"><News setProgress = {this.setProgress} apikey={this.apikey}key="entertainment"pagesize={this.pagesize} country={this.country}category='entertainment'/></Route>
        <Route exact path="/general"><News setProgress = {this.setProgress} apikey={this.apikey} key="general" pagesize={this.pagesize} country={this.country}category='general'/></Route>
              <Route exact path="/health"><News setProgress = {this.setProgress} apikey={this.apikey} key="health" pagesize={this.pagesize} country={this.country}category='health'/></Route>
            <Route exact path="/science"><News setProgress = {this.setProgress} apikey={this.apikey} key="science" pagesize={this.pagesize} country={this.country}category='science'/></Route>
            <Route exact path="/sports"><News setProgress = {this.setProgress} apikey={this.apikey} key="sports" pagesize={this.pagesize} country={this.country}category='sports'/></Route>
            <Route exact path="/technology"><News setProgress = {this.setProgress} apikey={this.apikey} key="technology" pagesize={this.pagesize} country={this.country}category='technology'/></Route>
          
         
          
          </Switch>
          </Router>  
      </div>
      
      
    )
  }
}

