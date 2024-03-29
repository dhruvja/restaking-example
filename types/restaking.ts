export type Restaking = {
  "version": "0.1.0",
  "name": "restaking",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "whitelistedTokens",
          "type": {
            "vec": "publicKey"
          }
        },
        {
          "name": "stakingCap",
          "type": "u128"
        }
      ]
    },
    {
      "name": "deposit",
      "docs": [
        "Stakes the amount in the vault and if guest chain is initialized, a CPI call to the service is being",
        "made to update the stake.",
        "",
        "We are sending the accounts needed for making CPI call to guest blockchain as [`remaining_accounts`]",
        "since we were running out of stack memory. Note that these accounts dont need to be sent until the",
        "guest chain is initialized since CPI calls wont be made during that period.",
        "Since remaining accounts are not named, they have to be",
        "sent in the same order as given below",
        "- Chain Data",
        "- trie",
        "- Guest blockchain program ID"
      ],
      "accounts": [
        {
          "name": "depositor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Only token mint with 9 decimals can be staked for now since",
            "the guest chain expects that.  If a whitelisted token has 6",
            "decimals, it would just be invalid."
          ]
        },
        {
          "name": "depositorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instruction",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "service",
          "type": {
            "defined": "Service"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "withdrawer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "guestChain",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "trie",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "withdrawerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositorRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "guestChainProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instruction",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateTokenWhitelist",
      "docs": [
        "Whitelists new tokens",
        "",
        "This method checks if any of the new token mints which are to be whitelisted",
        "are already whitelisted. If they are the method fails to update the",
        "whitelisted token list."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newTokenMints",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateGuestChainInitialization",
      "docs": [
        "Sets guest chain program ID",
        "",
        "After this method is called, CPI calls would be made to guest chain during deposit and stake would be",
        "set to the validators. Users can also claim rewards or withdraw their stake",
        "when the chain is initialized."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "guestChainProgramId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "changeAdminProposal",
      "docs": [
        "Updating admin proposal created by the existing admin. Admin would only be changed",
        "if the new admin accepts it in `accept_admin_change` instruction."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "acceptAdminChange",
      "docs": [
        "Accepting new admin change signed by the proposed admin. Admin would be changed if the",
        "proposed admin calls the method. Would fail if there is no proposed admin and if the",
        "signer is not the proposed admin."
      ],
      "accounts": [
        {
          "name": "newAdmin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Validation would be done in the method"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "claimRewards",
      "accounts": [
        {
          "name": "claimer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "guestChain",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositorRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "guestChainProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setService",
      "docs": [
        "This method sets the service for the stake which was deposited before guest chain",
        "initialization",
        "",
        "This method can only be called if the service was not set during the depositing and",
        "can only be called once. Calling otherwise would panic.",
        "",
        "The accounts for CPI are sent as remaining accounts similar to `deposit` method."
      ],
      "accounts": [
        {
          "name": "depositor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instruction",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "service",
          "type": {
            "defined": "Service"
          }
        }
      ]
    },
    {
      "name": "withdrawRewardFunds",
      "docs": [
        "This method would only be called by `Admin` to withdraw all the funds from the rewards account",
        "",
        "This would usually be called when a wrong amount of funds are transferred in the rewards account.",
        "This is a safety measure and should only be called on emergency."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminRewardsTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateStakingCap",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newStakingCap",
          "type": "u128"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stakingParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "whitelistedTokens",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "guestChainProgramId",
            "docs": [
              "None means the guest chain is not initialized yet."
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "rewardsTokenMint",
            "type": "publicKey"
          },
          {
            "name": "stakingCap",
            "type": "u128"
          },
          {
            "name": "totalDepositedAmount",
            "type": "u128"
          },
          {
            "name": "newAdminProposal",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeTimestampSec",
            "type": "i64"
          },
          {
            "name": "service",
            "type": {
              "option": {
                "defined": "Service"
              }
            }
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "stakeMint",
            "type": "publicKey"
          },
          {
            "name": "lastReceivedRewardsHeight",
            "docs": [
              "is 0 initially"
            ],
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Service",
      "docs": [
        "Unused for now"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "GuestChain",
            "fields": [
              {
                "name": "validator",
                "type": "publicKey"
              }
            ]
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TokenAlreadyWhitelisted",
      "msg": "Token is already whitelisted"
    },
    {
      "code": 6001,
      "name": "TokenNotWhitelisted",
      "msg": "Can only stake whitelisted tokens"
    },
    {
      "code": 6002,
      "name": "OperationNotAllowed",
      "msg": "This operation is not allowed until the guest chain is initialized"
    },
    {
      "code": 6003,
      "name": "SubtractionOverflow",
      "msg": "Subtraction overflow"
    },
    {
      "code": 6004,
      "name": "InvalidTokenMint",
      "msg": "Invalid Token Mint"
    },
    {
      "code": 6005,
      "name": "InsufficientReceiptTokenBalance",
      "msg": "Insufficient receipt token balance, expected balance 1"
    },
    {
      "code": 6006,
      "name": "MissingService",
      "msg": "Service is missing. Make sure you have assigned your stake to a \\\n         service"
    },
    {
      "code": 6007,
      "name": "StakingCapExceeded",
      "msg": "Staking cap has reached. You can stake only when the staking cap is \\\n         increased"
    },
    {
      "code": 6008,
      "name": "NewStakingCapShouldBeMoreThanExistingOne",
      "msg": "New staking cap should be more than existing one"
    },
    {
      "code": 6009,
      "name": "GuestChainAlreadyInitialized",
      "msg": "Guest chain can only be initialized once"
    },
    {
      "code": 6010,
      "name": "AccountValidationFailedForCPI",
      "msg": "Account validation for CPI call to the guest chain"
    },
    {
      "code": 6011,
      "name": "ServiceAlreadySet",
      "msg": "Service is already set."
    },
    {
      "code": 6012,
      "name": "NoProposedAdmin",
      "msg": "There is no proposal for changing admin"
    }
  ]
};

export const IDL: Restaking = {
  "version": "0.1.0",
  "name": "restaking",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "whitelistedTokens",
          "type": {
            "vec": "publicKey"
          }
        },
        {
          "name": "stakingCap",
          "type": "u128"
        }
      ]
    },
    {
      "name": "deposit",
      "docs": [
        "Stakes the amount in the vault and if guest chain is initialized, a CPI call to the service is being",
        "made to update the stake.",
        "",
        "We are sending the accounts needed for making CPI call to guest blockchain as [`remaining_accounts`]",
        "since we were running out of stack memory. Note that these accounts dont need to be sent until the",
        "guest chain is initialized since CPI calls wont be made during that period.",
        "Since remaining accounts are not named, they have to be",
        "sent in the same order as given below",
        "- Chain Data",
        "- trie",
        "- Guest blockchain program ID"
      ],
      "accounts": [
        {
          "name": "depositor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Only token mint with 9 decimals can be staked for now since",
            "the guest chain expects that.  If a whitelisted token has 6",
            "decimals, it would just be invalid."
          ]
        },
        {
          "name": "depositorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instruction",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "service",
          "type": {
            "defined": "Service"
          }
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "withdrawer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "guestChain",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "trie",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "withdrawerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositorRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "guestChainProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instruction",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateTokenWhitelist",
      "docs": [
        "Whitelists new tokens",
        "",
        "This method checks if any of the new token mints which are to be whitelisted",
        "are already whitelisted. If they are the method fails to update the",
        "whitelisted token list."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newTokenMints",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateGuestChainInitialization",
      "docs": [
        "Sets guest chain program ID",
        "",
        "After this method is called, CPI calls would be made to guest chain during deposit and stake would be",
        "set to the validators. Users can also claim rewards or withdraw their stake",
        "when the chain is initialized."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "guestChainProgramId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "changeAdminProposal",
      "docs": [
        "Updating admin proposal created by the existing admin. Admin would only be changed",
        "if the new admin accepts it in `accept_admin_change` instruction."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "acceptAdminChange",
      "docs": [
        "Accepting new admin change signed by the proposed admin. Admin would be changed if the",
        "proposed admin calls the method. Would fail if there is no proposed admin and if the",
        "signer is not the proposed admin."
      ],
      "accounts": [
        {
          "name": "newAdmin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Validation would be done in the method"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "claimRewards",
      "accounts": [
        {
          "name": "claimer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "guestChain",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "depositorRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformRewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "guestChainProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setService",
      "docs": [
        "This method sets the service for the stake which was deposited before guest chain",
        "initialization",
        "",
        "This method can only be called if the service was not set during the depositing and",
        "can only be called once. Calling otherwise would panic.",
        "",
        "The accounts for CPI are sent as remaining accounts similar to `deposit` method."
      ],
      "accounts": [
        {
          "name": "depositor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakeMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "instruction",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "service",
          "type": {
            "defined": "Service"
          }
        }
      ]
    },
    {
      "name": "withdrawRewardFunds",
      "docs": [
        "This method would only be called by `Admin` to withdraw all the funds from the rewards account",
        "",
        "This would usually be called when a wrong amount of funds are transferred in the rewards account.",
        "This is a safety measure and should only be called on emergency."
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminRewardsTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateStakingCap",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingParams",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newStakingCap",
          "type": "u128"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stakingParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "whitelistedTokens",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "guestChainProgramId",
            "docs": [
              "None means the guest chain is not initialized yet."
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "rewardsTokenMint",
            "type": "publicKey"
          },
          {
            "name": "stakingCap",
            "type": "u128"
          },
          {
            "name": "totalDepositedAmount",
            "type": "u128"
          },
          {
            "name": "newAdminProposal",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeTimestampSec",
            "type": "i64"
          },
          {
            "name": "service",
            "type": {
              "option": {
                "defined": "Service"
              }
            }
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "stakeMint",
            "type": "publicKey"
          },
          {
            "name": "lastReceivedRewardsHeight",
            "docs": [
              "is 0 initially"
            ],
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Service",
      "docs": [
        "Unused for now"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "GuestChain",
            "fields": [
              {
                "name": "validator",
                "type": "publicKey"
              }
            ]
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TokenAlreadyWhitelisted",
      "msg": "Token is already whitelisted"
    },
    {
      "code": 6001,
      "name": "TokenNotWhitelisted",
      "msg": "Can only stake whitelisted tokens"
    },
    {
      "code": 6002,
      "name": "OperationNotAllowed",
      "msg": "This operation is not allowed until the guest chain is initialized"
    },
    {
      "code": 6003,
      "name": "SubtractionOverflow",
      "msg": "Subtraction overflow"
    },
    {
      "code": 6004,
      "name": "InvalidTokenMint",
      "msg": "Invalid Token Mint"
    },
    {
      "code": 6005,
      "name": "InsufficientReceiptTokenBalance",
      "msg": "Insufficient receipt token balance, expected balance 1"
    },
    {
      "code": 6006,
      "name": "MissingService",
      "msg": "Service is missing. Make sure you have assigned your stake to a \\\n         service"
    },
    {
      "code": 6007,
      "name": "StakingCapExceeded",
      "msg": "Staking cap has reached. You can stake only when the staking cap is \\\n         increased"
    },
    {
      "code": 6008,
      "name": "NewStakingCapShouldBeMoreThanExistingOne",
      "msg": "New staking cap should be more than existing one"
    },
    {
      "code": 6009,
      "name": "GuestChainAlreadyInitialized",
      "msg": "Guest chain can only be initialized once"
    },
    {
      "code": 6010,
      "name": "AccountValidationFailedForCPI",
      "msg": "Account validation for CPI call to the guest chain"
    },
    {
      "code": 6011,
      "name": "ServiceAlreadySet",
      "msg": "Service is already set."
    },
    {
      "code": 6012,
      "name": "NoProposedAdmin",
      "msg": "There is no proposal for changing admin"
    }
  ]
};
