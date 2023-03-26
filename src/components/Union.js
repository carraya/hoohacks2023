import { useState, useContext } from "react";
import { DataContext } from "../contexts/dataContext";

function Union() {
  const {
    username,
    pair,
    unions,
    createUnion,
    changeCurrentUnion,
    currentUnion,
    inviteToUnion,
    invitations,
    acceptInvitation,
    declineInvitation,
  } = useContext(DataContext);
  const [unionName, setUnionName] = useState("");
  const [invitee, setInvitee] = useState("");
  const unionMap = Array.from(new Set(unions));

  const uniqueInvitations = invitations.filter(
    (obj, index, arr) => index === arr.findIndex((o) => o.id === obj.id)
  );

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
      <div>
        <h2>Current Union: {currentUnion}</h2>
        <div>
          <p>Invite Members</p>
          <input
            type="text"
            placeholder="invitee"
            value={invitee}
            onChange={(e) => setInvitee(e.target.value)}
          />
          <button
            onClick={() => {
              console.log("inviting to union...");
              inviteToUnion(currentUnion, invitee);
            }}
          >
            Invite
          </button>
        </div>
        <div>
          <p>Union Invites</p>
          {uniqueInvitations.map((invite) => (
            <div key={invite.id}>
              <p>From: {invite.inviter}</p>
              <p>Union: {invite.unionId}</p>
              <button
                onClick={() => {
                  acceptInvitation(invite);
                }}
              >
                Accept
              </button>
              <button
                onClick={() => {
                  declineInvitation(invite);
                }}
              >
                Decline
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Union;
