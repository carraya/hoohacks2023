import { useState, useContext } from "react";
import { DataContext } from "../contexts/dataContext";

function Union() {
  const { username, pair, unions, createUnion, changeCurrentUnion } =
    useContext(DataContext);
  const [unionName, setUnionName] = useState("");
  const unionMap = Array.from(new Set(unions));

  return (
    <div>
      <h1>Union Page</h1>
      <div>
        <h2>Create Union</h2>
        <input
          type="text"
          placeholder="union name"
          value={unionName}
          onChange={(e) => setUnionName(e.target.value)}
        />
        <button onClick={() => createUnion(unionName)}>Create Union</button>
      </div>
      <div>
        <h2>Unions</h2>
        {unionMap.map((unionid) => (
          <div key={unionid}>
            <h3>{unionid}</h3>
            <button
              onClick={() => {
                changeCurrentUnion(unionid);
                localStorage.setItem("currentUnion", unionid);
              }}
            >
              Set Union
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Union;
