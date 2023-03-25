import { useState, useContext } from "react";
import { DataContext } from "../contexts/dataContext";

function Union() {
  const { username, pair, unions, createUnion } = useContext(DataContext);
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
        {unionMap.map((name) => (
          <div key={name}>
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Union;
