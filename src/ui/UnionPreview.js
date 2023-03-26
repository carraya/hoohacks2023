import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/dataContext";

import { useNavigate } from "react-router-dom";

function UnionPreview({ union_id }) {
  const navigate = useNavigate();
  const { getUnionName, changeCurrentUnion } = useContext(DataContext);
  const [unionName, setUnionName] = useState("");
  useEffect(() => {
    const unionNameGettter = async (union_id) => {
      const union_name = await getUnionName(union_id);
      setUnionName(union_name);
    };

    unionNameGettter(union_id);
  });
  return (
    <div>
      <div class="flex flex-row py-6">
        <dt class="mb-1 font-semibold text-gray-500 md:text-lg dark:text-gray-400">
          {unionName}
        </dt>
        <dd>
          <div className="px-8 gap-x-6">
            <button
              // to={"/unions/" + union_id}
              onClick={() => {
                try {
                  changeCurrentUnion(union_id);
                  localStorage.setItem("currentUnion", union_id);
                  navigate("/unions/" + union_id);
                } catch (error) {
                  console.log(error);
                }
              }}
              className="rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold border-2 rounded-none border-black text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Enter
            </button>
          </div>
        </dd>
      </div>
    </div>
  );
}

export default UnionPreview;
