import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import {Switch,Route} from 'react-router-dom';
import Header from './components/Header/Header';
function App() {
  return<div className="App">
    {/* <Header/> */}
    <Route path="/" component={Header}/>
     <Switch>
         <Route path="/login" component={LoginPage}/>
         <Route path="/register" component={RegistrationPage}/>
     </Switch>
   </div>

}

export default App;
