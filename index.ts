import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { IDL } from "./types/restaking";
import { depositInstruction } from "./instructions";
import { restakingProgramID } from "./utils";
import { Connection, clusterApiUrl } from "@solana/web3.js";
const bs58 = require("bs58");

// Address of token which is going to be staked
const STAKE_TOKEN_MINT = new anchor.web3.PublicKey(
  "edge86g9cVz87xcpKpy3J77vbp4wYd9idEV562CCntt"
);
/// Amount of tokens to be staked. If a token has 6 decimals, 1 token would be 1000000
/// Below amount corresponds to 0.000001 considering above token mint has 9 decimals
const STAKE_AMOUNT = 1000;

const deposit = async () => {
  /// For testing the script, make sure you add the private key.
  const authorityPrivateKey =
    "";
  const authority = anchor.web3.Keypair.fromSecretKey(
    new Uint8Array(bs58.decode(authorityPrivateKey))
  );
  const network = clusterApiUrl("mainnet-beta");
  let connection = new Connection(network, "confirmed");
  /*
  * Using a local provider now. But in the frontend, the provider should be similar to below.
  * First you choose the network, create a connection and use the same for creating a provider.
  * Note that you use window.solana which refers the injected wallet.
  
   const provider = new AnchorProvider(
      connection,
      window.solana,
      {}
    );
  */
  const provider = new anchor.AnchorProvider(
    connection,
    new anchor.Wallet(authority),
    {}
  );
  const program = new Program(IDL, restakingProgramID, provider);

  let { tx, receiptTokenKeypair } = await depositInstruction(
    program,
    STAKE_TOKEN_MINT,
    authority.publicKey,
    STAKE_AMOUNT
  );

  try {
    tx.feePayer = authority.publicKey;
    /* 
      * During depositing into the vault, a NFT is minted whose address
      * would be used to reference the data stored on the chain. The NFT
      * is the receipt token for the deposit. So during the signing of the
      * transaction, there would be 2 signers with the receipt token keypair
      * as the additional signer. 
      * 
      * Since the keypair of the signing wallet wouldnt be accessible in the 
      * frontend, the code below should be used for signing the transactions.
      * 
        const signedTx = await provider.signTransaction(tx);
       
  			// partial sign for Receipt Token keypair
  			signedTx.partialSign(receiptTokenKeypair);
       
  			const rawTransaction = signedTx.serialize({ requireAllSignatures: false });
  			//works like txHash
       
  			const signature = await connection.sendRawTransaction(rawTransaction);
    */
    const sig = await anchor.web3.sendAndConfirmTransaction(
      provider.connection,
      tx,
      [authority, receiptTokenKeypair]
    );
    console.log("  Signature for Depositing: ", sig);
  } catch (error) {
    console.log(error);
  }
};

deposit();
