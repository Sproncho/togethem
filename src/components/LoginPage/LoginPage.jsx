import './LoginPage.css'


export default function LoginPage(){
    return <div className="loginPage">
        <input type="text" name="E-mail" placeholder="type E-mail"/>
        <input type="password" name="password" placeholder="type password"/>
        <button id="registerButton">Register</button>
        <button id="loginButton">Login</button>
    </div>
}