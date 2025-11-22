// define Login component
import{useNavigate} from'react-router-dom';
function CreateSurvey(){
    const navigator = useNavigate(); // allows navigations
    const handleSub= async(e)=>{
        e.preventDefault();// prevents pages from refreshing after submission
        const questionTxt = e.target.surveyQuestion.value; // variable that gets what the user typed into the question box
        const survey = {};
        survey.surveynumber= Math.floor(Math.random()*1000);
        survey.question= questionTxt;
        survey.yes=0;
        survey.no=0;
        try{
            const suverySubmission = await fetch('/api/surveyquestions',{method:'POST',
                 headers:{'Content-Type': 'application/json'},
                  body: JSON.stringify(survey)});
            //^ tells the server that a new data, json data and json string has been added
            if(suverySubmission.ok){
                alert('your survey has been succesfully created');
                navigator('/');
            }else
                { 
                    alert('there was a error in creating your survey');
                }
            }  catch (err)
            {
                alert('the server had an error');
            }
        };
    
    return(
        <>
        <article id="stars">
            {/*heading*/}
            <h2 class="stars">Create Survey</h2>
            
            {/*labelled textfields*/}
            <form id="stars" onSubmit={handleSub}>
                <table id="stars">
                    
                    <tr>
                    <td><label for="surveyQuestionBox">Write a question that can be answered by Yes/No:</label></td>
                    </tr>
                    <tr>
                    <td><input name="surveyQuestion" style={{width: "850px"}} id="surveyQuestionBox" type="text" required /></td>
                    </tr>
                    <tr>
                    <td>
                        <br />
                        <input id="SubmitQuestion" type="submit" value="Submit Question" />
                        <br />
                    </td>
                    </tr>
                </table>
            </form>
        </article>
        </>
    )
}
// export the Login component as default
export default CreateSurvey