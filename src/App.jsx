/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);

  // Fetching
  const fetchFromAPI = async (prompt) => {
    const url = "https://open-ai21.p.rapidapi.com/conversationgpt";

    const options = {
      method: "POST",

      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "a0bd01d45amshcf8ae2d6e7a5e9bp1c10dajsn1d2877b423a3",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        web_access: false,
        stream: false,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "bot", message: result.GPT },
      ]);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);
    fetchFromAPI(inputValue);
    setInputValue(" ");
  };

  return (
    <div className="w-[500px] h-[600px]">
      <div className="flex flex-col h-screen bg-gray-900">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-4xl">
          ChatBuddy
        </h1>
        <div className="flex-grow p-6 h-screen overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.type === "user" ? "bg-purple-500" : "bg-gray-800"
                  }  px-4 rounded-xl rounded-br-none py-1 text-white max-w-sm`}
                >
                  {message.message}
                </div>
              </div>
            ))}
            {/* {isLoading && (
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                  <TypingAnimation />
                </div>
              </div>
            )} */}
          </div>
        </div>
        {/* <form onSubmit={handleSubmit} className="flex-none p-6"> */}
        <div className="flex rounded-lg border border-gray-700 bg-gray-800">
          <input
            type="text"
            className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300 "
          >
            Send
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}
