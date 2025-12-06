// define CreateSurvey component
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config.js';

function CreateSurvey(){
    const navigate = useNavigate(); // allows navigations
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleSub = async(e) => {
        e.preventDefault(); // prevents pages from refreshing after submission
        setError(null);
        setSuccessMessage('');
        
        const questionTxt = document.getElementById('surveyQuestionBox').value; // variable that gets what the user typed into the question box
        
        if (!questionTxt.trim()) {
            setError('Please enter a question');
            return;
        }
        
        const survey = {};
        survey.surveynumber = Math.floor(Math.random()*1000);
        survey.question = questionTxt;
        survey.yes = 0;
        survey.no = 0;
        
        try {
            const surveySubmission = await fetch(`${API_BASE_URL}/api/surveyquestions`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(survey)
            });
            //^ tells the server that a new data, json data and json string has been added
            if (surveySubmission.ok) {
                setSuccessMessage('Your survey has been successfully created!');
                document.getElementById('surveyQuestionBox').value = ''; // Clear the input
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setError('There was an error in creating your survey');
            }
        } catch (err) {
            setError('The server had an error');
            console.error(err);
        }
    };
    
    const DeleteSurvey = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setError(null);
        setSuccessMessage('');
        
        // Get the survey number from a text field
        const surveyNumber = document.getElementById('deleteQuestionBox').value;
        
        if (!surveyNumber) {
            setError("Please enter a survey number to delete.");
            return;
        }
        
        try {
            // Send DELETE request to backend
            const response = await fetch(`${API_BASE_URL}/api/surveyquestions/number/${parseInt(surveyNumber)}`, {
                method: 'DELETE'
            });
     
            if (response.ok) {
                setSuccessMessage('Survey successfully deleted!');
                document.getElementById('deleteQuestionBox').value = ''; // Clear the input
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to delete survey');
            }
        } catch (err) {
            setError('Server error occurred');
            console.error(err);
        }
    };
    
    return(
        <>
        <article id="stars">
            {/*heading*/}
            <h2 className="stars">Create Survey</h2>
            
            {/*display error message*/}
            {error && (
                <div style={{ 
                    padding: '10px', 
                    margin: '10px auto', 
                    maxWidth: '850px',
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    borderRadius: '5px',
                    border: '1px solid #f5c6cb'
                }}>
                    {error}
                </div>
            )}
            
            {/*display success message*/}
            {successMessage && (
                <div style={{ 
                    padding: '10px', 
                    margin: '10px auto', 
                    maxWidth: '850px',
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    borderRadius: '5px',
                    border: '1px solid #c3e6cb'
                }}>
                    {successMessage}
                </div>
            )}
            
            {/*labelled textfields*/}
            <form id="stars">
                <table id="stars">
                    <tbody>
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
                    <td><label htmlFor="deleteQuestionBox">Enter question number to be deleted:</label></td>
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
                    </tbody>
                </table>
            </form>
        </article>
        </>
    )
}
// export the CreateSurvey component as default
export default CreateSurvey
