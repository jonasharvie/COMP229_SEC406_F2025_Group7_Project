import React, { useEffect, useState } from "react";

function Surveyanswers() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    fetch("/api/surveyquestions")
      .then(async (res) => {
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload.error || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setQuestions(data || []))
      .catch((err) => {
        console.error("Error loading surveys:", err);
        setError(err.message || "Failed to load surveys");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handleSubmit = async (questionId) => {
    const answer = selectedAnswers[questionId];
    
    if (!answer) {
      alert("Please select Yes or No before submitting");
      return;
    }

    try {
      // Find the question to get current vote counts
      const question = questions.find(q => q._id === questionId);
      
      // Update the vote count
      const updatedQuestion = {
        ...question,
        yes: answer === 'yes' ? question.yes + 1 : question.yes,
        no: answer === 'no' ? question.no + 1 : question.no
      };

      const response = await fetch(`/api/surveyquestions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuestion)
      });

      if (response.ok) {
        // Update the local state to reflect the new vote
        setQuestions(questions.map(q => 
          q._id === questionId ? updatedQuestion : q
        ));
        
        // Clear the selected answer for this question
        const newSelectedAnswers = { ...selectedAnswers };
        delete newSelectedAnswers[questionId];
        setSelectedAnswers(newSelectedAnswers);
        
        setSubmitMessage(`Thank you for voting on Survey #${question.surveynumber}!`);
        setTimeout(() => setSubmitMessage(""), 3000);
      } else {
        alert("Failed to submit your vote");
      }
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert("Error submitting your vote");
    }
  };

  return (
    <>
      <article id="stars">
        <h2 className="stars">Survey Questions</h2>

        {loading && <p>Loading survey questions...</p>}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {submitMessage && (
          <p style={{ color: "green", fontWeight: "bold" }}>{submitMessage}</p>
        )}

        {!loading && !error && questions.length === 0 && (
          <p>No surveys available.</p>
        )}

        {!loading && !error && questions.length > 0 && (
          <table id="stars">
            <tbody>
              {questions.map((q) => (
                <tr key={q._id}>
                  <td style={{ padding: "15px" }}>
                    <p>
                      <strong>Survey #{q.surveynumber}:</strong> {q.question}
                    </p>

                    <div
                      style={{
                        fontSize: 13,
                        color: "#555",
                        marginTop: 6,
                        marginBottom: 10
                      }}
                    >
                      Current Results — Yes: {q.yes} | No: {q.no}
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <label style={{ marginRight: 20 }}>
                        <input
                          type="radio"
                          name={`question-${q._id}`}
                          value="yes"
                          checked={selectedAnswers[q._id] === 'yes'}
                          onChange={() => handleAnswerChange(q._id, 'yes')}
                        />
                        Yes
                      </label>
                      <label style={{ marginRight: 20 }}>
                        <input
                          type="radio"
                          name={`question-${q._id}`}
                          value="no"
                          checked={selectedAnswers[q._id] === 'no'}
                          onChange={() => handleAnswerChange(q._id, 'no')}
                        />
                        No
                      </label>
                      <button
                        onClick={() => handleSubmit(q._id)}
                        style={{
                          marginLeft: 10,
                          padding: "5px 15px",
                          cursor: "pointer"
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </article>
    </>
  );
}

export default Surveyanswers;
