
async function getUser(userId) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Server error:", data.message);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
}

export { getUser };

