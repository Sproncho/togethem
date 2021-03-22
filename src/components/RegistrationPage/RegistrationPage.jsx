import './RegistrationPage.css'

export default function RegistrationPage(){
    return <div className="RegistrationPage">
        <form action="/registration" method="post">
            <input type="text" name="E-mail" placeholder="type E-mail"/>
            <input type="text" name="userName" placeholder="type username"/>
            <input type="password" name="password" placeholder="type password"/>
            <input type="password" name="password" placeholder="confirm password"/>
            <select name="userChoise" id="" required>
                <option value="consumer">Consumer</option>
                <option value="seller">Seller</option>
            </select>
            <br/>
            <button id="registerButton">Register</button>
        </form>
        
    </div>
}