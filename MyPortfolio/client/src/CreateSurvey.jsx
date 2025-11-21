// define Login component
import{useNavigate} from'react-router-dom';
function CreateSurvey(){
    const nav = useNavigate();
    const handleSub= async(e)=>{
        e.preventDefault();
        const questionTxt = e.target.surveyQuestion.value;
        const SurveyData = { surveynumber: Math.floor(Math.random()*1000),question: questionTxt, yes:0, no:0};
        try{
            const responce = await fetch('/api/surveyquestions',{method:'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(SurveyData)});
            if(responce.ok){
                alert('your survey has been succesfully created');
                nav('/');
            }else
                {
                    alert('there was a error in creating your survey');
                }
            }  catch (err)
            {
                console.error(err);
                alert('server error');
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
           
            <br />
        </article>
        <br />
        <br />
        <br />
        
        </>
    )
}
// export the Login component as default
export default CreateSurvey