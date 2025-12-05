// define Login component
import{useNavigate} from'react-router-dom';
import API_BASE_URL from './config.js';

function CreateSurvey(){
    const navigate = useNavigate(); // allows navigations
    const handleSub= async(e)=>{
        e.preventDefault();// prevents pages from refreshing after submission
        const questionTxt = document.getElementById('surveyQuestionBox').value; // variable that gets what the user typed into the question box
        const survey = {};
        survey.surveynumber= Math.floor(Math.random()*1000);
        survey.question= questionTxt;
        survey.yes=0;
        survey.no=0;
        try{
            const surveySubmission = await fetch(`${API_BASE_URL}/api/surveyquestions`,{method:'POST',
                 headers:{'Content-Type': 'application/json'},
                  body: JSON.stringify(survey)});
            //^ tells the server that a new data, json data and json string has been added
            if(surveySubmission.ok){
                alert('your survey has been succesfully created');
                navigate('/');
            }else
                { 
                    alert('there was a error in creating your survey');
                }
            }  catch (err)
            {
                alert('the server had an error');
            }
        };
   const DeleteSurvey = async (e) => {
    e.preventDefault(); // Prevent page refresh
    // Get the survey number from a text field
    const surveyNumber = document.getElementById('deleteQuestionBox').value;
    if (!surveyNumber) {
        alert("Please enter a survey number to delete.");
        return;
    }
    try {
        // Send DELETE request to backend (fixed: fetch is a function, not template literal)
        const response = await fetch(`/api/surveyquestions/number/${parseInt(surveyNumber)}`, {
            method: 'DELETE'
        });
 
        if (response.ok) {
            alert('Survey successfully deleted!');
            document.getElementById('deleteQuestionBox').value = ''; // Clear the input
        } else {
            const data = await response.json();
            alert(data.error || 'Failed to delete survey');
        }
    } catch (err) {
        alert('Server error occurred');
        console.error(err);
    }
};
    return(
        <>
        <article id="stars">
            {/*heading*/}
            <h2 className="stars">Create Survey</h2>
            
            {/*labelled textfields*/}
            <form id="stars">
                <table id="stars">
                    
                    <tr>
                    <td><label htmlFor="surveyQuestionBox">Write a question that can be answered by Yes/No:</label></td>
                    </tr>
                    <tr>
                    <td><input name="surveyQuestion" style={{width: "850px"}} id="surveyQuestionBox" type="text" required /></td>
                    </tr>
                    <tr>
                    <td>
                        <br />
                        <input id="SubmitQuestion" type="button" value="Submit Question" onClick={handleSub}/>
                        <br />
                    </td>
                    </tr>
                    <tr>
                    <td><label htmlFor="deleteQuestionBox">Enter question number to be deleted :</label></td>
                    </tr>
                    <tr>
                    <td><input name="deleteQuestion" style={{width: "850px"}} id="deleteQuestionBox" type="text" required /></td>
                    </tr>
                    <tr>
                    <td>
                        <br />
                        <input id="DeleteQuestion" type="button" value="Delete Question" onClick={DeleteSurvey}/>
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