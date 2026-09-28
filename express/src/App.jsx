import { useState } from "react";

const App = () => {
  const [searchId, setSearchId] = useState("1");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchUser = async function () {
    try {
      setError("");
      setSuccessMessage("");
      setUser(null);

      const response = await fetch(`http://localhost:5009/api/user/${searchId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "User not found");
      }

      setUser(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addUser = async function () {
    if (!newName.trim()) {
      setError("Please enter a name");
      return;
    }

    try {
      setError("");
      setSuccessMessage("");

      const response = await fetch("http://localhost:5009/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: searchId, name: newName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add user");
      }

      setSuccessMessage(`User "${data.name}" added successfully with ID: ${data.id}`);
      setNewName("");
      setUser(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Search User</h2>
      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Enter User ID (1-4)"
      />
      <button onClick={fetchUser} style={{ marginLeft: "8px" }}>
        Fetch User
      </button>

      <h2 style={{ marginTop: "30px" }}>Add User</h2>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter name of new user"
      />
      <button onClick={addUser} style={{ marginLeft: "8px" }}>
        Add User
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {user && (
        <pre id="res">{JSON.stringify(user, null, 2)}</pre>
      )}
    </div>
  );
};

export default App;
