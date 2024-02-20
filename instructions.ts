import * as anchor from "@coral-xyz/anchor";
import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as spl from "@solana/spl-token";
import { Restaking } from "./types/restaking";
import {
  getMasterEditionPDA,
  getNftMetadataPDA,
  getStakingParamsPDA,
  getVaultParamsPDA,
  getVaultTokenAccountPDA,
} from "./utils";

export const depositInstruction = async (
  program: anchor.Program<Restaking>,
  stakeTokenMint: anchor.web3.PublicKey,
  staker: anchor.web3.PublicKey,
  stakeAmount: number,
  receiptTokenKeypair?: anchor.web3.Keypair | undefined
) => {
  if (!receiptTokenKeypair) {
    receiptTokenKeypair = anchor.web3.Keypair.generate();
  }
  const receiptTokenPublicKey = receiptTokenKeypair.publicKey;
  /// PDA which stores the stake information derived from the receipt
  /// token address
  const { vaultParamsPDA } = getVaultParamsPDA(receiptTokenPublicKey);
  /// PDA which stores the generalized information for staking like staking
  /// cap and whitelisted tokens
  const { stakingParamsPDA } = getStakingParamsPDA();
  const { vaultTokenAccountPDA } = getVaultTokenAccountPDA(stakeTokenMint);
  const { masterEditionPDA } = getMasterEditionPDA(receiptTokenPublicKey);
  const { nftMetadataPDA } = getNftMetadataPDA(receiptTokenPublicKey);

  const receiptTokenAccount = await spl.getAssociatedTokenAddress(
    receiptTokenPublicKey,
    staker
  );

  const stakerTokenAccount = await spl.getAssociatedTokenAddress(
    stakeTokenMint,
    staker
  );

  const tx = await program.methods
    .deposit(
      { guestChain: { validator: staker } }, // the validator argument is not used until the guest chain is intialized (which as of now its not)
      new anchor.BN(stakeAmount) // amount how much they are staking
    )
    .preInstructions([
      anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
        units: 1000000,
      }),
    ])
    .accounts({
      depositor: staker, // staker
      vaultParams: vaultParamsPDA,
      stakingParams: stakingParamsPDA,
      tokenMint: stakeTokenMint, // token which they are staking
      depositorTokenAccount: stakerTokenAccount,
      vaultTokenAccount: vaultTokenAccountPDA,
      receiptTokenMint: receiptTokenPublicKey, // NFT
      receiptTokenAccount,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
      masterEditionAccount: masterEditionPDA,
      nftMetadata: nftMetadataPDA,
      instruction: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
      metadataProgram: new anchor.web3.PublicKey(
        mpl.MPL_TOKEN_METADATA_PROGRAM_ID
      ),
    })
    .transaction();

  return { tx, receiptTokenKeypair };
};
