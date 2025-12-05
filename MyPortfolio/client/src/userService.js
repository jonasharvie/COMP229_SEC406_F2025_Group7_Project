import API_BASE_URL from './config.js';

async function getUser(userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
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

