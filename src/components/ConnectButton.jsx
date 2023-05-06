import React from 'react'
import PageButton from './PageButton'
const ConnectButton = (props) => {
  const { isConnected, signerAddress, getSigner, provider } = props
  const displayAddress = `${signerAddress?.substring(0, 5)}...${signerAddress?.substring(signerAddress.length-3)}`

  return (
    <>
      {isConnected() ? (
        <div className="buttonContainer">
          <PageButton name={displayAddress} />
        </div>
      ) : (
        <div
          className="btn my-2 connectButton"
          onClick={() => getSigner()}
        >Connect Wallet</div>
      )}
    </>
  )
}

export default ConnectButton
