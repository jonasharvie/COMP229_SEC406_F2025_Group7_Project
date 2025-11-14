
// import the Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';

// import image
import JHLogo from './images/logo_transparent.png'

// define NavBar component
function NavBar(){
    return(
        <header>
        {/*logo and name*/}
        <div class="image-text-row">
        <img src={JHLogo} alt="JH_logo" width="100" height="100" />
            <div class="text-content">
                <h1>JONAS HARVIE   </h1>
            </div>
        </div>
        {/*links in a list*/}
        <nav>
            <ul class="mainmenu">
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/about">ABOUT ME</Link></li>
                <li><Link to="/projects">PROJECTS</Link></li>
                <li><Link to="/services">SERVICES</Link></li>
                <li><Link to="/contact">CONTACT ME</Link></li>
            </ul>
        </nav>
    </header>
    )
}

// export the NavBar component as default
export default NavBar