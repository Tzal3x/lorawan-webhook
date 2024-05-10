import { SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { fromB64 } from "@mysten/sui.js/utils";
import "dotenv/config";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = 3000;

const suiClient = new SuiClient({ url: "https://fullnode.testnet.sui.io:443" });
const keypair = getKeyPair(process.env.ADMIN_SECRET!);

function getKeyPair(privateKey: string): Ed25519Keypair {
  const privateKeyArray = Array.from(fromB64(privateKey));
  privateKeyArray.shift();
  return Ed25519Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));
}

app.post("/", async (req, res) => {
  const arduinoLedState =
    req.body.uplink_message.decoded_payload.ledState == "on" ? 1 : 0;
  console.log(
    "Led state:",
    arduinoLedState,
    `(${req.body.uplink_message.decoded_payload.ledState})`,
  );

  const txb = new TransactionBlock();
  txb.moveCall({
    target: `${process.env.PACKAGE_ID!}::lora_led::${arduinoLedState == 1 ? "set_led_on" : "set_led_off"}`,
    arguments: [
      txb.object(process.env.BOARD_ID!),
      txb.object(process.env.ADMIN_CAP_ID!),
    ],
  });

  await suiClient
    .signAndExecuteTransactionBlock({
      transactionBlock: txb,
      signer: keypair,
      requestType: "WaitForLocalExecution",
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    })
    .then((txRes) => {
      const status = txRes.effects?.status?.status;
      if (status !== "success") {
        throw new Error("Error calling smart contract!");
      }
      console.log(txRes.digest);
    })
    .catch((e) => {
      throw new Error("Error calling smart contract:", e);
    });

  res.send("Express: POST received!");
});

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
