import Gun from "gun";
import "gun/sea";
import "gun/axe";

import { createContext, useState, useEffect } from "react";

// db
export const db = Gun();

// key generator
const SEA = Gun.SEA;

// user
export const user = db.user().recall({ sessionStorage: true });

// context
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [pair, setPair] = useState(null);
  const [unions, setUnions] = useState([]);

  // on mount
  useEffect(() => {
    user.get("alias").on((e) => setUsername(e));
    user.get("pair").on((e) => setPair(e));
    user.get("union_memberships").on((e) => console.log(e));
    user
      .get("union_memberships")
      .map()
      .once((data, key) => {
        setUnions((unions) => [...unions, data]);
      });

    return () => {
      setUsername("");
      setPair(null);
      setUnions([]);
    };
  }, []);

  // on username change

  useEffect(() => {
    // either generate keys or put public keys in db
    async function onAuth() {
      user.get("alias").once((alias) => setUsername(alias));

      user.get("pair").once(async (keyPair) => {
        if (!keyPair) {
          const keyPair = await SEA.pair();
          const pairData = { pub: keyPair.pub, epub: keyPair.epub };

          user.get("pair").put(pairData, (ack) => {
            console.log("put pairData if no keyPair:", ack);
            db.get("pubkeys")
              .get(username)
              .put(pairData, (res) => {
                if (res.err) {
                  console.log(
                    "error when put pairData in db (pubkeys) when user doesn't have pair:",
                    res.err
                  );
                } else {
                  console.log(
                    "success! put pairData in db (pubkeys) when user doesn't have pair:",
                    res
                  );
                  setPair(keyPair);
                }
              });
          });
        } else {
          const pairData = { pub: keyPair.pub, epub: keyPair.epub };

          db.get("pubkeys")
            .get(username)
            .put(pairData, (ack) => {
              if (ack.err) {
                console.log(
                  "error when put pairData in db (pubkeys) when user has pair:",
                  ack.err
                );
              } else {
                console.log(
                  "success! put pairData in db (pubkeys) when user has pair:",
                  ack
                );
                setPair(keyPair);
              }
            });
        }
      });
    }

    // listen for auth events
    db.on("auth", onAuth);
    return () => {
      db.off("auth", onAuth);
    };
  }, [username]);

  // authentication functions
  function signup(displayName, pwd) {
    user.create(displayName, pwd, (ack) => {
      if (ack.err) {
        console.log(ack.err);
      } else {
        login(displayName, pwd);
      }
    });
  }

  function login(displayName, pwd) {
    user.auth(displayName, pwd, (ack) => {
      if (ack.err) {
        console.log(ack.err);
      } else {
        setUsername(displayName);
      }
    });
  }

  function logout() {
    user.leave().then(() => {
      setUsername("");
      setPair(null);
      setUnions([]);
    });
  }

  // generate random id
  function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  function createUnion(name) {
    const uuid = generateUUID();
    const unionObj = {
      id: uuid,
      name: name,
      owner: username,
      members: {
        [username]: true,
      },
    };

    db.get("unions")
      .get(uuid)
      .put(unionObj, (ack) => {
        if (ack.err) {
          console.log("error when creating union:", ack.err);
        } else {
          console.log("success! created union:", ack);
        }
      });

    user.get("union_memberships").put({ [uuid]: name }, (ack) => {
      if (ack.err) {
        console.log("error when adding union membership to user:", ack.err);
      } else {
        console.log("success! added union membership to user:", ack);
      }
    });

    user.get("union_ownerships").put({ [uuid]: name }, (ack) => {
      if (ack.err) {
        console.log("error when adding union ownership to user:", ack.err);
      } else {
        console.log("success! added union ownership to user:", ack);
      }
    });

    setUnions((prev) => [...prev, name]);
  }

  const value = {
    username,
    pair,
    unions,
    login,
    signup,
    logout,
    createUnion,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataContext };
