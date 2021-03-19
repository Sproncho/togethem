import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage'
import {Switch,Route} from 'react-router-dom';
function App() {
  return<div className="App">
     <Switch>
         <Route path="/login" component={LoginPage}/>
         <Route path="/register" component={RegistrationPage}/>
     </Switch>
   </div>
}

export default App;
