
// import images
import ttam from './images/TTAM_Cover_Image.png'
import rps from './images/rock_paper_scissors.png'
import portfolio from './images/portfolio_home.png'

// define Projects component
function Projects(){
    return(
        <>
        <article>
            {/*heading*/}
            <h2 class="stars">Projects</h2>
            {/*table of projects with descriptions*/}
            <table class="stars">
                <tr>
                    <td>
                    <img class="animate" src={portfolio} width="275" height="275" alt="portfolio" />
                    <p class="small">
                        Portfolio Site<br />Role: Developer<br />Result: Submitted<br /><br />A personal portfolio page written in Javascript and HTML, uploaded to GitHub, and hosted on Netlify.
                    </p>
                    </td>
                    <td>
                    <img class="animate" src={ttam} width="275" height="275" alt="ttam" />
                    <p class="small">
                        Tic Tac A Mole<br />Role: Developer<br />Result: Released<br /><br />Video game for mobile phones built using Godot 3 and available on <a href="https://jonas-h.itch.io/tic-tac-a-mole" target="_blank">Itch.io</a>.
                    </p>
                    </td>
                    <td>
                    <img class="animate" src={rps} width="275" height="275" alt="rps" />
                    <p class="small">
                        Rock Paper Scissors<br />Role: Developer<br />Result: Had fun<br /><br />PC video game written in C# using WPF. 
                    </p>
                    </td>
                </tr>
                
            </table>
            <br />
            <br />
        </article>
        <br />
        <br />
        </>
    );
}

// export the Projects component as default
export default Projects