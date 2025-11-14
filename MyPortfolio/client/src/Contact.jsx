// define Contact component
function Contact(){
    return(
        <>
        <article>
            {/*heading*/}
            <h2 class="stars">Contact Me</h2>
            
            {/*labelled textfields*/}
            <form id="myForm">
                <table>
                    <tr>
                    <td><label for="fnBox">First Name:</label></td>
                    <td><input name="firstName" id="fnBox" type="text" required /></td>
                    </tr>
                    <tr>
                    <td><label for="lnBox">Last Name:</label></td>
                    <td><input name="lastName" id="lnBox" type="text" required /></td>
                    </tr>
                    <tr>
                    <td><label for="phoneBox">Phone Number:</label></td>
                    <td><input name="phone" id="phoneBox" type="text" required /></td>
                    </tr>
                    <tr>
                    <td><label for="emailBox">Email:</label></td>
                    <td><input name="email" id="emailBox" type="text" required /></td>
                    </tr>
                    <tr>
                    <td><label for="messageBox">Message:</label></td>
                    <td><input name="message" id="messageBox" type="text" required /></td>
                    </tr>
                    <tr>
                    <td>
                        <br />
                        <input id="Send" type="submit" value="Send" />
                    </td>
                    </tr>
                    
                </table>
            </form>
            <br />
            <br />
        </article>
        <br />
        <br />
        </>
    )
}
// export the Contact component as default
export default Contact