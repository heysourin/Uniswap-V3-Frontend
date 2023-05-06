import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import PageButton from "./components/PageButton";
import ConnectButton from "./components/ConnectButton";
import { GearFill } from "react-bootstrap-icons";
import ConfigModal from "./components/ConfigModal";
import { BeatLoader } from "react-spinners";

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);

  const [slippageAmount, setSlippageAmount] = useState(2);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);
  const [showModal, setShowModal] = useState(undefined);

  const [inputAmount, setInputAmount] = useState(undefined);
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  const [ratio, setRatio] = useState(undefined);
  const [wethContract, setWethContract] = useState(undefined);
  const [uniContract, setUniContract] = useState(undefined);
  const [wethAmount, setWethAmount] = useState(undefined);
  const [uniAmount, setUniAmount] = useState(undefined);

  useEffect(() => {
    const onLoad = () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log(provider);
      setProvider(provider);
    };
    onLoad();
    // getWalletAddress();
  }, []);

  //!
  const getSigner = async () => {
    const { ethereum } = window;

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Got account", accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setSigner(signer);
    setSignerAddress(await signer.getAddress());
    console.log("Signer object", signer);
    if (!ethereum) {
      console.log("Please install Metamask!");
    }
  };

  //! This whole code (isConnected()) can be replace by one single line -->   const isConnected = () => signer !== undefined;
  const isConnected = () => {
    if (signer !== undefined) {
      getWalletAddress();
      return true;
    } else {
      return false;
    }
  };

  const getWalletAddress = () => {
    // signer.getAddress().then((address) => {
    //   setSignerAddress(address);
    //todo: connect weth and uni contracts
    // });
  };

  // if (signer !== undefined) {
  //   getWalletAddress();
  // }
  return (
    <div className="App">
      <div className="appNav">
        <div className="my-2 buttonContainer buttonContainerTop">
          <PageButton name={"Swap"} isBold={true} />
          <PageButton name={"Pool"} />
          <PageButton name={"Vote"} />
          <PageButton name={"Charts"} />
        </div>
        <div className="rightNav">
          <div className="connectButtonContainer">
            <ConnectButton
              provider={provider}
              isConnected={isConnected}
              signerAddress={signerAddress}
              getSigner={getSigner}
            />
          </div>
          <div className="my-2 buttonContainer buttonContainerTop">
            <PageButton name={"..."} isBold={true} />
          </div>
        </div>
      </div>

      {/* //TODO: SWAP CONTAINER */}
      <div className="appBody">
        <div className="swapContainer">
          <div className="swapHeader">
            <span className="swapText">Swap</span>
            <span className="gearContainer" onClick={() => setShowModal(true)}>
              <GearFill />
            </span>
            {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                setDeadlineMinutes={setDeadlineMinutes}
                deadlineMinutes={deadlineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount}
              />
            )}
          </div>
        </div>

        <div className="swapBody">
          <CurrencyField
            field="input"
            tokenName="WETH"
            getSwapPrice={getSwapPrice}
            signer={signer}
            balance={wethAmount}
          />
          <CurrencyField
            field="output"
            tokenName="UNI"
            value={outputAmount}
            signer={signer}
            balance={wethAmount}
            spinner={BeatLoader}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
