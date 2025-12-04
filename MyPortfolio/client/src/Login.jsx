import { useState } from 'react';

// Helper function to get full URL
function getFullURL(path) {
    return `http://localhost:5000${path}`;
}

// Helper function to save token
function saveToken(token) {
    localStorage.setItem('accessToken', token);
}

// Helper function to remove token
function removeToken() {
    localStorage.removeItem('accessToken');
}

// define Login component
function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [message, setMessage] = useState('');

    // Handle signup
    async function handleSignupFormSubmission(e) {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
        
        if (!name) {
            setError('Please enter your name for signup');
            return;
        }

        try {
            const res = await fetch(getFullURL("/users/signup"), {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password, name})
            });
            
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error?.message || data.error || "Signup failed");
            }
            
            const data = await res.json();
            setSuccessMessage(`Signup successful! User ID: ${data.data.userId}`);
            setEmail('');
            setPassword('');
            setName('');
            setNewPassword('');
        } catch(error) {
            setError(error.message || "Signup Failed");
        }
    }

    // Handle login
    async function handleLoginFormSubmission(e) {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
        
        try {
            const res = await fetch(getFullURL("/users/login"), {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            });
            
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Login failed");
            }
            
            const data = await res.json();
            const token = data.data.accessToken;
            console.log("token", token);
            saveToken(token);
            setSuccessMessage('Login successful!');
            
            
        } catch(error) {
            setError(error.message || "Login Failed");
        }
    }

    // Handle logout
    async function handleLogoutFormSubmission(e) {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
        
        try {
            const res = await fetch(getFullURL("/auth/signout"), {
                method: "GET",
            });
            
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Logout failed");
            }
            
            removeToken();
            setSuccessMessage('Logout successful!');
            setEmail('');
            setPassword('');
            setName('');
            setNewPassword('');
        } catch(error) {
            setError(error.message || "Logout Failed");
        }
    }

    // Handle delete user
   async function handleDeleteuserFormSubmission(e) {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    
    try {
        // Step 1: Login
        const loginRes = await fetch(getFullURL("/users/login"), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });
        
        if (!loginRes.ok) {
            const data = await loginRes.json();
            throw new Error("Login failed: " + (data.error || "Unknown error"));
        }
        
        const loginData = await loginRes.json();
        const token = loginData.data.accessToken;

        // Step 2: Get user ID
        const meRes = await fetch(getFullURL("/me"), {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`}
        });
        
        if (!meRes.ok) {
            throw new Error("Could not retrieve user information");
        }
        
        const meData = await meRes.json();
        const userId = meData.data.user.id;
        
        // Step 3: Delete the user
        const deleteRes = await fetch(getFullURL(`/api/users/${userId}`), {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`}
        });
        
        if (!deleteRes.ok) {
            const data = await deleteRes.json();
            throw new Error(data.error || "Delete failed");
        }
        
        setSuccessMessage('User deleted successfully!');
        setEmail('');
        setPassword('');
        setName('');
        setNewPassword('');
        
    } catch(error) {
        setError(error.message || "Delete Failed");
    }
}
    async function handleUpdateuserFormSubmission(e){
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
    
        try {
            const updateToken = localStorage.getItem("accessToken");
            if (!updateToken) throw new Error("You must logged in to update your account");

            // Get user ID
            const meRes = await fetch(getFullURL("/me"), {
                method: "GET",
                headers: {"Authorization": `Bearer ${updateToken}`}
            });
        
            if (!meRes.ok) {
                throw new Error("Could not retrieve user information");
            }

            const meData = await meRes.json();
            const userId = meData.data.user.id;

            const fullURL = getFullURL(`/api/users/${userId}`);

            if (password == newPassword || !newPassword) {
                throw new Error("New password cannot be the same as the old password or empty");
            }
        
            console.log("Id: ", userId);
            console.log("Token: ", updateToken);
            //Update Username & Password
            const updateRes = await fetch(getFullURL(`/api/users/${userId}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${updateToken}`
                },
                body: JSON.stringify({email, name, password: newPassword})
            });

            if (!updateRes.ok) {
                const data = await updateRes.json();
                throw new Error(data.error || "Update failed");
            }

            console.log("Update Res: ", updateRes);

            setSuccessMessage('User information updated successfully! Please sign in again.');
            removeToken();
            setName('');
            setEmail('');
            setPassword('');
            setNewPassword('');
        
        } catch(error) {
            setError(error.message || "Update Failed");
        }
    }

    return(
        <>
        <article id="stars">
            {/*heading*/}
            <h2 className="stars">Login</h2>

            {/*display error message*/}
            {error && (
                <div style={{ 
                    padding: '10px', 
                    margin: '10px auto', 
                    maxWidth: '500px',
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
                    maxWidth: '500px',
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
                    <td><label htmlFor="nameBox">Name:</label></td>
                    <td><input name="name" id="nameBox" type="text" value={name} onChange={(e) => setName(e.target.value)}/></td>
                    </tr>
                    <tr>
                    <td><label htmlFor="emailBox">Email:</label></td>
                    <td><input name="email" id="emailBox" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></td>
                    </tr>
                    <tr>
                    <td><label htmlFor="passwordBox">Password:</label></td>
                    <td><input name="password" id="passwordBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></td>
                    </tr>
                    <tr>
                    <td><label htmlFor="newPasswordBox">New Password:</label></td>
                    <td><input name="newPassword" id="newPasswordBox" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                    <td>
                        <br />
                        <input id="Login" type="button" value="Log in" onClick={handleLoginFormSubmission}/>
                        <br />
                        <input id="Logout" type="button" value="Log out" onClick={handleLogoutFormSubmission}/>
                        <br />
                        <input id="Signup" type="button" value="Sign up" onClick={handleSignupFormSubmission}/>
                        <br />
                        <input id="Deleteuser" type="button" value="Delete User" onClick={handleDeleteuserFormSubmission}/>
                        <br />
                        <input id="Updateuser" type="button" value="Update User" onClick={handleUpdateuserFormSubmission}/>
                    </td>
                    
                    </tr>
                    </tbody>
                </table>
            </form>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </article>
        <br />
        <br />
        <br />
        </>
    )
}
// export the Login component as default
export default Login