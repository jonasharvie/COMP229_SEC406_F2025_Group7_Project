import { useEffect, useState } from "react";
import { getUser } from "./userService";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser("67a3f89d1283be1cff0092e3").then((data) => {
        console.log("API RESPONSE:", data);
      if (data.status === "ok") setUser(data.data);
    });
  }, []);

  return (
        <article id="stars">
            {/*heading*/}
            <h2 className="stars">User Profile</h2>
            <div>
                {user && <p>Name: {user.name}</p>}
            </div>
        </article>
  );
}