import { useState } from 'react';

const Chatbot = ({ dataset }) => {
  const [messages, setMessages] = useState([]);
  const handleNewMessage = async (event) => {
    event.preventDefault();
    const input = event.target.elements.message.value;
    if (input.trim() !== '') {
      const newMessage = { type: 'user', text: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const aiResponse = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({ prompt: input }),
        body: JSON.stringify({ "userprompt": input })
      });
      const aiMessage = await aiResponse.json();
      console.log("Json response from ai call" + JSON.stringify(aiMessage));
      if (aiResponse.status !== 200) {
        throw aiMessage.error || new Error(`Request failed with status ${aiResponse.status}`);
      }
      setMessages((prevMessages) => [...prevMessages, { text: aiMessage.message.content, type: 'system'}]);
    }
    event.target.reset();
  };

  return (
    <div className="w-128 mx-auto mt-8 bg-gray-100 p-4 rounded-md">
      <div className="h-128 overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index} className="py-1"> 
            {message.type === 'user' ? 
            <div>
              <img
                src="/anonymous_user.png" // Replace with your avatar image path
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-4" // Adjust size as needed
              />
            </div> : 
            <div className="flex justify-end">
              <img
                src="/Satoshi2.png" // Replace with your avatar image path
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-4" // Adjust size as needed
              />
            </div>
          }
            <div
                key={index} style={{ whiteSpace: 'pre-line' }} 
                className={`p-2 rounded-md pre-line ${
                message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
            >
                {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleNewMessage} className="mt-4">
        <input
          type="text"
          name="message"
          className="p-2 border rounded-md w-full"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Ask Satoshi
        </button>
      </form>
    </div>
  );
};

export default Chatbot; 