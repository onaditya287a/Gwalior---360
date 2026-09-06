import { useState } from "react";
import { askGwaliorGuide } from "@/lib/ai.functions";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! 👋 I am your Gwalior AI Guide. Ask me anything about Gwalior, its forts, palaces, temples, history, food, and tourist places!",
    },
  ]);

  const handleSend = async () => {
  if (!input.trim()) return;

  const question = input;

  const userMessage: Message = {
    role: "user",
    content: question,
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  try {
    const result = await askGwaliorGuide({
      data: {
        question: question,
      },
    });

    const aiMessage: Message = {
      role: "assistant",
      content: result.answer,
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    console.error("Error fetching AI response:", error);

    const aiMessage: Message = {
      role: "assistant",
      content:
        "Sorry, I could not find an answer right now. Please try again later.",
    };

    setMessages((prev) => [...prev, aiMessage]);
  }
};



    // Temporary reply
    // setTimeout(() => {
    //   const aiMessage: Message = {
    //     role: "assistant",
    //     content:
    //       "Thank you for your question! 🤖 The AI connection will be added next. Then I will be able to answer your question using Gwalior tourism information.",
    //   };

    //   setMessages((prev) => [...prev, aiMessage]);
    // }, 500);
  //};

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          fontSize: "25px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        🤖
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            maxWidth: "90vw",
            height: "500px",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "15px",
              background: "#1e3a5f",
              color: "white",
              fontWeight: "bold",
            }}
          >
            🤖 Gwalior AI Guide
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "12px",
                  textAlign:
                    message.role === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "10px",
                    borderRadius: "12px",
                    maxWidth: "80%",
                    background:
                      message.role === "user" ? "#e5e7eb" : "#f3f4f6",
                  }}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ddd",
              gap: "8px",
            }}
          >
            <input
              type="text"
              placeholder="Ask about Gwalior..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />

            <button
              onClick={handleSend}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}