import './LoginPage.css'
import{useState} from 'react';
import {login} from '../../services/auth-service'
import {useHistory} from 'react-router-dom'


export default function LoginPage(){
    const history = useHistory();
    const [state,setState] = useState({email:'',password:''});
    return <div className="loginPage">
        <input type="text" value={state.email} name="E-mail" placeholder="type E-mail"
         onChange={(e)=>{
            setState(s => ({...s,email:e.target.value}));
        }}/>
        <input type="password" value={state.password} name="password" placeholder="type password" onChange={(e)=>{
            setState(s => ({...s,password:e.target.value}))
        }}/>
        <button id="registerButton" onClick = {() => history.push('/register')}>Register</button>
        <button id="loginButton" onClick={() =>{login(state.email,state.password)}}>Login</button>
    </div>
}