
// import images
import Jonas from './images/Jonas.jpg'
import resume from './assets/Jonas Harvie Resume 2024-12-19.pdf'


// define About component
function About(){
    return(
        <>
        <article>
            {/*heading*/}
            <h2 class="stars">About Me</h2>

            <div class="image-text-row">
                {/*image*/}
                <img src={Jonas} alt="" width="300" />
                {/*About Me text*/}
                <div class="text-content">
                    <p>
                    I am a mechanical designer working on automation processes in the aerospace industry. 
                    I am enrolled in Centennial College's software engineering technology A.I program to apply what I learn to the aerospace industry.
                    </p>
                    <br />
                    <a href={resume} target="_blank">Open my resume in a new tab.</a>
                </div>
            </div> 
            <br />
        </article>
        <br />
        <br />
        </>
    );
}

// export the About component as default
export default About