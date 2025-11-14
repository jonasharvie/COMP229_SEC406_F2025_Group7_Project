
// import image
import Jonas from './images/Jonas.jpg'

// define Home component
function Home(){
    return(
        <>
        <article>
            {/*heading*/}
            <h2 class="stars">Home</h2>

            
            <div class="image-text-row">
                {/*image*/}
                <img src={Jonas} alt="" width="300" />
                {/*mission statement text*/}
                <div class="text-content">
                    <h2 class="stars">Mission Statement</h2>
                    <p>
                    Mechanical designer with focus on developing automation processes in the aerospace industry. 
                    My goal is to gain more knowledge of software and A.I development to apply what I learn to the aerospace industry.
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