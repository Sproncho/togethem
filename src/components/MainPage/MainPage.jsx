import "./MainPage.css";
import Good from '../Good/Good.jsx';
import { useHistory } from "react-router-dom";


export default function MainPage(){
    const history = useHistory();
    return (
        <div className="MainPage">
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
            <Good className="Good"/>
        </div>
    )
}