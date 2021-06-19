import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {useDispatch, useSelector}from 'react-redux'
import NavBar from './Components/NavBar.js'
import {Increment,Change} from './action/index.js'
import Categories from './Components/Categories.js'

function App() {
  const counter=useSelector(state=>state.Counter);
  const change=useSelector(state=>state.ChangeCat);
  const UseDispatch=useDispatch();
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <Route path='/categories'>
      <Categories/>
      </Route>
     <h1>anas</h1>
     <button onClick={()=>UseDispatch(Increment())}>increment</button>
     {counter}
     
     
    </div>
    </Router>
  );
}

export default App;
