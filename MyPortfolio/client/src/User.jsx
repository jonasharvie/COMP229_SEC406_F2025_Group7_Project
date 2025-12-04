import { useEffect, useState } from "react";
import { getUser } from "./userService";

function getFullURL(path) {
    return `http://localhost:5000${path}`;
}

export default function User() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    fetch(getFullURL("/me"), {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`}
        })
        
    .then(response => response.json())
    .then(data => setUser(data.data.user))
    .catch(error => console.error("Error fetching user:", error));
  }, []);

  return (
    <article id="stars">
      <h2 className="stars">User Profile</h2>
      <br></br>
      <table id="stars">
        {user ? (
          <>
            <p>Name: {user.name}</p>
            <br></br>
            <p>Email: {user.email}</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </table>
    </article>
  );
}
