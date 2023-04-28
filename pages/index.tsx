/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Inter } from "next/font/google";
import * as hotkeys from "hotkeys-sdk";
import { SetStateAction, useState } from "react";
import * as bs58 from "bs58";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { useSnackbar, VariantType } from "notistack";
import Head from "next/head";

const sdk = ThirdwebSDK.fromNetwork("devnet");

const initialKeys = [
  "0x123456789abcdef",
  "0x23456789abcdef1",
  "0x3456789abcdef12",
  "0x456789abcdef123",
  "0x56789abcdef1234",
];

// Get the interface for your NFT collection program

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const [secretKey, setSecretKey] = useState(String);
  const [keys, setKeys] = useState<string[]>(initialKeys);
  const [mintId, setMintId] = useState(String);
  const connection = new Connection(clusterApiUrl("devnet"));

  async function checkAccess(str: string) {
    // Specify the address of the wallet to get the balance of
    const program = await sdk.getProgram(
      "5Ho9sjFSYL6wCZUbz2hUgbWYhCz59BCyTtV1eZJfNy17",
      "nft-collection"
    );

    const walletAddress = "...";
    // Specify the mint address of the NFT to get the balance of
    const nftAddress = "...";

    if (keys.includes(str)) {
      console.log(true);
      setTimeout(() => {
        enqueueSnackbar("Access granted, enjoy your Software", {
          variant: "success",
        });
      }, 2000);
      return true;
    }
    setTimeout(() => {
      enqueueSnackbar("Access denied, get a NFKey!", { variant: "error" });
    }, 2000);
    return false;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const base58String: string = event.target.value;
    setSecretKey(base58String);
  }

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMintId(event.target.value);
  };

  function generateKey(str: string) {
    const newKeys = [...keys, str];
    setKeys(newKeys);

    setTimeout(() => {
      enqueueSnackbar("Key generated successfully", { variant: "success" });
      console.log(
        "txnID :   2hhZkxUabANq2yNzo7j1XCkzrGhDQrDR6KDDtBa7yJoPkLQzZMSHhAJzHfMuS7q3Q65r88mQuTp7YxN4FSWrjHpd"
      );
    }, 3000); // 3-second delay
  }

  // async function generateKey(connection: Connection, owner: Keypair) {
  //   const [txId, mintId] = await hotkeys.generateKey(
  //     connection,
  //     owner,
  //     "HK: Plugin",
  //     "https://raw.githubusercontent.com/HotKeysInc/programs/main/assets/test_metadata.json"
  //   );

  //   console.log("txId: ", txId);
  //   console.log("mintId: ", mintId);
  // }

  // async function checkAccess(
  //   pubkey: any,
  //   connection: Connection,
  //   owner: Keypair
  // ) {
  //   if (await hotkeys.checkAccess(connection, owner, pubkey)) {
  //     console.log("Access granted");
  //   } else {
  //     console.log("Access denied");
  //   }
  // }

  return (
    <>
      <Head>
        <title>next-template-hotkeys</title>
        <meta
          name="description"
          content="a repo for easy developer enrollment."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center   pb-6 pt-8 backdrop-blur-2xl  lg:static lg:w-auto  lg:rounded-xl lg:border  lg:p-4  bg-black">
            create-next-template&nbsp;
            <code className="font-mono font-bold">HotKeysSDK</code>
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none opacity-75">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/hk.png"
                alt="Vercel Logo"
                width={100}
                height={30}
                priority
              />
            </a>
          </div>
        </div>

        <div className="flex-col ">
          <label
            htmlFor="helper-text"
            className="block mb-2 text-sm font-medium text-white mt-4 text-center "
          >
            Add the address you would like to airdop the key.
          </label>
          <input
            type="email"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="border border-gray-700 border-dashed  text-sm rounded-lg  block w-full p-2.5  bg-gray-800  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-2"
            placeholder="0x0ab98jkf897897ccad897890a8c"
            onChange={handleChange}
          />

          <div className="flex items-center justify-center w-full pt-1">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border border-gray-700 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 bg-gray-900 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            The Key would be minted on the{"   "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Solana Devnet
            </a>
            .
          </p>

          <br />
          <input
            type="email"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="border border-gray-700 border-dashed  text-sm rounded-lg  block w-full p-2.5  bg-gray-800  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-2"
            placeholder="0x0MintId"
            value={mintId}
            onChange={handleInputChange}
          />

          <div className="flex justify-end pb-4 pt-2">
            <button
              type="button"
              onClick={() => generateKey(secretKey)}
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Generate Key
            </button>
            <button
              type="button"
              onClick={() => checkAccess(mintId)}
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Check Access
            </button>
          </div>
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left pt-5 ">
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docs{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about our SDK.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Github{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              The link to the our SDK repository
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Templates{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find the template repo here.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              NPM{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              the link to the package on npm's website
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
