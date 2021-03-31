import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import {Switch,Route} from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import CardAdder from './components/CardAdder/CardAdder';


function App() {
  return<div className="App">
    <Route path="/" component={Header}/>
     <Switch>
         <Route path="/" exact component={MainPage}/>
         <Route path="/login" component={LoginPage}/>
         <Route path="/register" component={RegistrationPage}/>
         <Route path="/addCard" component={CardAdder}/>
     </Switch>
   </div>

}

export default App;
