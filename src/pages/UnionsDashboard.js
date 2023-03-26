import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";

import UnionPreview from "../ui/UnionPreview";
import UnionInvite from "../ui/UnionInvite";
import { useContext, useState } from "react";
import { DataContext } from "../contexts/dataContext";
// TESTING
import Auth from "../components/Auth";
import Union from "../components/Union";

function UnionsDashboard() {
  const { username, unions, invitations, createUnion } =
    useContext(DataContext);
  const [unionName, setUnionName] = useState("");
  const unionMap = Array.from(new Set(unions));
  const uniqueInvitations = invitations.filter(
    (obj, index, arr) => index === arr.findIndex((o) => o.id === obj.id)
  );

  return (
    <div class="bg-tPurple">
      <Navbar />
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center justify-center min-h-50% pt-32 pb-2 bg-tPurple">
          <h1 class="text-4xl font-bold text-white py-6 underline">
            Union Memberships for {username ? username : "BLANK"}
          </h1>
          <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            {unionMap.map((unionid) => (
              <UnionPreview union_name="HEy" union_id={unionid} />
            ))}
          </dl>
        </div>
        <div className="mb-12 flex items-center justify-center gap-x-6">
          <div className="gap-x-2">
            <button
              onClick={() => {
                if (unionName === "") {
                  console.log("Union name cannot be blank");
                  return;
                }
                createUnion(unionName);
                setUnionName("");
              }}
              className="rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold border-2 rounded-none border-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
          <div className="mt-2.5">
            <input
              type="text"
              name="union_name"
              id="union_name"
              className="block w-full rounded-none border-black border-2 py-2 px-3.5 text-gray-900"
              placeholder="Union Name"
              value={unionName}
              onChange={(e) => setUnionName(e.target.value)}
            />
          </div>
        </div>

        <div class="flex flex-col items-center justify-center min-h-screen py-2 bg-tPurple">
          <h1 class="text-4xl font-bold text-white py-6 underline">
            Union Invites for {username ? username : "BLANK"}
          </h1>
          <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            {uniqueInvitations.map((invite) => (
              <UnionInvite inv={invite} />
            ))}
          </dl>
        </div>
      </div>
      {/* <Auth />
      <Union /> */}
      <Footer />
    </div>
  );
}

export default UnionsDashboard;
