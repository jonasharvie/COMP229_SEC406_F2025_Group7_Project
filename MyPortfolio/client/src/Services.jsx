import React, { useEffect, useState } from "react";

function Services() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <>
      <article id="stars">
        <h2 className="stars">Survey Questions</h2>

        {loading && <p>Loading survey questions...</p>}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

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
                      }}
                    >
                      Current Results — Yes: {q.yes} | No: {q.no}
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

export default Services;
