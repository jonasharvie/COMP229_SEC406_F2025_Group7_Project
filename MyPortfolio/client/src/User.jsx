import { useEffect, useState } from "react";
import { getUser } from "./userService";

export default function User() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getUser(token)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
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
