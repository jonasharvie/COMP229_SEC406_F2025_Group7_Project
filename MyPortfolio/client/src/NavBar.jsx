
// import the Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';

// import image
import SurvUp_Logo from './images/SurvUp_Logo.png'

// define NavBar component
function NavBar(){
    return(
        <header>
        {/*logo and name*/}
        <div class="image-text-row">
        <img src={SurvUp_Logo} alt="SurvUp_Logo" width="100" height="100" />
            <div class="text-content">
                <h1>SurvUp</h1>
            </div>
            
        </div>
        {/*links in a list*/}
        <nav>
            <ul class="mainmenu">
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/user">USER</Link></li>
                <li><Link to="/login">LOGIN</Link></li>
                <li><Link to="/createsurvey">CREATE SURVEY</Link></li>
                <li><Link to="/surveyanswers">ANSWER SURVEYS</Link></li>
            </ul>
        </nav>
    </header>
    )
}

// export the NavBar component as default
export default NavBar