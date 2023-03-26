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
  const [invitations, setInvitations] = useState([]);
  const [currentUnion, setCurrentUnion] = useState(
    localStorage.getItem("currentUnion")
  );
  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);

  // on mount
  useEffect(() => {
    setCurrentUnion(localStorage.getItem("currentUnion"));
    user.get("alias").on((e) => setUsername(e));
    user.get("pair").on((e) => setPair(e));
    // user.get("union_memberships").on((e) => set);
    // console.log("currentUnion: ", localStorage.getItem("currentUnion"));
    user
      .get("union_memberships")
      .map()
      .once((data, key) => {
        setUnions((unions) => [...unions, key]);
      });

    return () => {
      setUsername("");
      setPair(null);
      setUnions([]);
      setCurrentUnion(null);
    };
  }, []);

  useEffect(() => {
    if (currentUnion) {
      console.log("currentUnion exists: ", currentUnion);
      const messageRef = db.get("chats").get(currentUnion).map();

      // Define a function to handle new messages
      const handleMessage = (data, id) => {
        console.log("New message:", data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: id, message: data.message, user: data.user, time: data.time },
        ]);
      };

      // Subscribe to new messages
      messageRef.on(handleMessage);

      // Cleanup function to unsubscribe from messages when the component is unmounted or currentUnion changes
      return () => {
        messageRef.off(handleMessage);
        setMessages([]); // Clear the messages state when switching unions or unmounting the component
      };
    }
  }, [currentUnion]);

  useEffect(() => {
    // either generate keys or put public keys in db
    async function onAuth() {
      // user.get("alias").once((alias) => setUsername(alias));

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

  useEffect(() => {
    if (username) {
      const invitationRef = db
        .get("users")
        .get(username)
        .get("invitations")
        .map();

      const handleInvitation = (data, id) => {
        if (data && data.unionId && data.inviter) {
          setInvitations((prevInvitations) => [
            ...prevInvitations,
            { id: id, unionId: data.unionId, inviter: data.inviter },
          ]);
        }
      };

      invitationRef.on(handleInvitation);

      return () => {
        invitationRef.off(handleInvitation);
        setInvitations([]);
      };
    }
  }, [username]);

  // useEffect(() => {
  //   if (currentUnion) {
  //     const eventRef = db.get("unions").get(currentUnion).get("events").map();

  //     const handleEvent = (data, id) => {
  //       setEvents((prevEvents) => [...prevEvents, { ...data, id }]);
  //     };

  //     eventRef.on(handleEvent);

  //     return () => {
  //       eventRef.off(handleEvent);
  //       setEvents([]);
  //     };
  //   }
  // }, [currentUnion]);
  useEffect(() => {
    if (currentUnion) {
      const eventsRef = db.get("unions").get(currentUnion).get("events").map();

      const handleEvent = (data, id) => {
        setEvents((prevEvents) => [...prevEvents, { ...data, id }]);
      };

      eventsRef.on(handleEvent);

      return () => {
        eventsRef.off(handleEvent);
        setEvents([]); // Clear the events state when switching unions or unmounting the component
      };
    }
  }, [currentUnion]);

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
      setMessages([]);
      setCurrentUnion(null);
      localStorage.removeItem("currentUnion");
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

  // union functions
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
      })
      .then(() => {
        // db.get("chats").put({ [uuid]})
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

    setUnions((prev) => [...prev, uuid]);
  }

  function changeCurrentUnion(unionid) {
    console.log(unionid);
    setCurrentUnion(unionid);
  }

  function inviteToUnion(unionId, inviteeUsername) {
    if (!unionId || !inviteeUsername) {
      console.log("No union ID or invitee username");
      return;
    }

    // Store the invitation in the invited member's data
    db.get("users")
      .get(inviteeUsername)
      .get("invitations")
      .set({ unionId, inviter: username }, (ack) => {
        if (ack.err) {
          console.error("Error sending invitation:", ack.err);
        } else {
          console.log("Invitation sent");
        }
      });
  }

  function acceptInvitation(invitation) {
    // Remove the invitation from the user's data
    db.get("users")
      .get(username)
      .get("invitations")
      .get(invitation.id)
      .put(null);

    // Add the user to the union's member list
    db.get("unions")
      .get(invitation.unionId)
      .get("members")
      .put({ [username]: true }, (ack) => {
        if (ack.err) {
          console.error("Error adding user to union member list:", ack.err);
        } else {
          console.log("User added to union member list");
        }
      });

    // Add the union to the user's union memberships
    user.get("union_memberships").put({ [invitation.unionId]: true }, (ack) => {
      if (ack.err) {
        console.error("Error adding union membership to user:", ack.err);
      } else {
        console.log("Union membership added to user");
        setUnions((prev) => [...prev, invitation.unionId]);
      }
    });

    // Remove the accepted invitation from the invitations state
    setInvitations((prevInvitations) =>
      prevInvitations.filter((inv) => inv.id !== invitation.id)
    );
  }

  function declineInvitation(invitation) {
    // Remove the invitation from the user's data
    db.get("users")
      .get(username)
      .get("invitations")
      .get(invitation.id)
      .put(null);

    // Remove the declined invitation from the invitations state
    setInvitations((prevInvitations) =>
      prevInvitations.filter((inv) => inv.id !== invitation.id)
    );
  }

  async function getUnionName(unionId) {
    if (!unionId) {
      return null;
    }

    const unionName = await new Promise((resolve) => {
      db.get("unions")
        .get(unionId)
        .get("name")
        .once((name) => {
          resolve(name);
        });
    });

    return unionName;
  }

  // chat functions
  function handleMessageSend(message) {
    if (!currentUnion) {
      console.log("no current union");
      return;
    }
    if (message) {
      db.get("chats")
        .get(currentUnion)
        .set({ message: message, user: username, time: Date.now() }, (ack) => {
          if (ack.err) {
            console.error("Error sending message:", ack.err);
          } else {
            console.log("message sent");
          }
        });
    } else {
      console.log("no message");
    }
  }

  // event functions
  function createEvent(title, description, eventDate, eventTime, location) {
    if (!currentUnion || !title) {
      return;
    }

    const eventId = generateUUID();

    const event = {
      title,
      description,
      eventDate,
      eventTime,
      location,
    };

    // Save the event in the database
    db.get("unions")
      .get(currentUnion)
      .get("events")
      .get(eventId)
      .put({ ...event, id: eventId }, (ack) => {
        if (ack.err) {
          console.error("Error creating event:", ack.err);
        } else {
          console.log("Event created:", ack);
        }
      });
  }

  const value = {
    user,
    username,
    pair,
    unions,
    currentUnion,
    messages,
    invitations,
    events,
    login,
    signup,
    logout,
    createUnion,
    changeCurrentUnion,
    handleMessageSend,
    inviteToUnion,
    acceptInvitation,
    declineInvitation,
    getUnionName,
    createEvent,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataContext };
