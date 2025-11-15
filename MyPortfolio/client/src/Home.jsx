
// import image
import SurvUp from './images/SurvUp_Logo.png'

// define Home component
function Home(){
    return(
        <>
        <article>
            {/*heading*/}
            <h2 class="stars">Home</h2>

            
            <div class="image-text-row">
                {/*image*/}
                <img src={SurvUp} alt="" width="300" />
                {/*mission statement text*/}
                <div class="text-content">
                    <p>
                    Welcome to SurvUp!<br /><br />
                    You can:<br /><br />
                    Sign up, log in, log out, view, update, or delete your user profile.<br /><br />
                    Create, view, update, or delete your survey.<br /><br />
                    Answer surveys(not yet functional).<br /><br />
                    </p>
                </div>
            </div>
            <br />
        </article>
        <br />
        <br />
        </>
    )
}

// export the Home component as default
export default Home