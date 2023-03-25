import { useContext, useState } from "react";
import { DataContext } from "../contexts/dataContext";

function Auth() {
  const { username, pair, signup, login, logout } = useContext(DataContext);
  const [displayName, setDisplayName] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div>
      <h1>Auth</h1>
      {username && pair ? (
        <div>
          <h2>Logged in as {username}</h2>
          <p>Pair: {JSON.stringify(pair)}</p>
        </div>
      ) : (
        <div>
          <h2>Not logged in</h2>
        </div>
      )}
      <div>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button onClick={() => signup(displayName, pwd)}>Signup</button>
      </div>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button onClick={() => login(displayName, pwd)}>Login</button>
      </div>
      <br />
      {username &&
        pair && ( // if username and pair are truthy
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        )}
    </div>
  );
}

export default Auth;
