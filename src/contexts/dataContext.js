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

  // on mount
  useEffect(() => {
    user.get("alias").on((e) => setUsername(e));
    user.get("pair").on((e) => setPair(e));

    return () => {
      setUsername("");
      setPair(null);
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
    user.leave();
    setUsername("");
    setPair(null);
  }

  const value = {
    username,
    pair,
    login,
    signup,
    logout,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataContext };
