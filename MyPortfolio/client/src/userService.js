
async function getUser(userId) {
  try {
    const res = await fetch(`http://localhost:4000/users/${userId}`);
    const data = await res.json();

    if (res.ok) {
      console.log("User retrieved:", data.data);
      return data.data;
    } else {
      console.error("Error:", data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

export { getUser };
