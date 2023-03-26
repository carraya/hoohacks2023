import { useState, useContext } from "react";
import { ethers } from "ethers";
import { DataContext } from "../contexts/dataContext";

const startPayment = async ({ address, ether, setTx }) => {
  try {
    if (!window.ethereum) {
      console.log("Please install MetaMask first.");
    }
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(address);
    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, address });
    console.log("tx", tx);
    setTx([tx]);
  } catch (error) {}
};

function EtherTrans() {
  const { address } = useContext(DataContext);
  const [ether, setEther] = useState("");
  const [tx, setTx] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await startPayment({ address, ether, setTx });
    } catch (error) {}
  };

  return (
    <div>
      <h1>Send Ether</h1>
      <input
        value={ether}
        onChange={(e) => setEther(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleSubmit}>Pay Union</button>
      {tx && tx.length > 0 && (
        <div>
          {tx.map((tx) => (
            <div key={tx.hash}>
              <p>Transaction Hash: {tx.hash}</p>
              <p>Transaction Status: {tx.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EtherTrans;
