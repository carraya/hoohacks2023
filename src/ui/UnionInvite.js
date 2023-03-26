import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/dataContext";

function UnionInvite({ inv }) {
  const { getUnionName, acceptInvitation, declineInvitation } =
    useContext(DataContext);
  const [unionName, setUnionName] = useState("");
  useEffect(() => {
    console.log(inv);
    const unionNameGettter = async (union_id) => {
      const union_name = await getUnionName(union_id);
      setUnionName(union_name);
    };

    unionNameGettter(inv.unionId);
  });
  return (
    <div>
      <div class="flex flex-row py-6">
        <dt class="mb-1 font-semibold text-gray-500 md:text-lg dark:text-gray-400">
          {unionName}
        </dt>
        <dd>
          <div className="flex flex-row px-8 gap-x-6">
            <button
              onClick={() => {
                acceptInvitation(inv);
              }}
              className="rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold border-2 rounded-none border-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Accept
            </button>
            <button
              onClick={() => {
                declineInvitation(inv);
              }}
              className="rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold border-2 rounded-none border-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Decline
            </button>
          </div>
        </dd>
      </div>
    </div>
  );
}

export default UnionInvite;
