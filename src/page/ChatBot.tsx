import React, { useState, useRef, useEffect } from "react";
import "../styles/chatBot.scss"; // 스타일 파일 임포트

// --- [제공해주신 스피너 컴포넌트] ---
type SpinnerProps = {
  title?: string;
  iconWidth?: number;
  iconHeight?: number;
};

const CarimaLoadingSpinner = ({
  title,
  iconWidth = 12,
  iconHeight = 12,
}: SpinnerProps) => {
  const isPurple = title === "purple";
  const gradientId = isPurple
    ? "spinner-gradient-purple"
    : "spinner-gradient-rainbow";

  return (
    <div className="spinner-wrapper">
      <svg className="spinner-svg" viewBox="25 25 50 50">
        <defs>
          <linearGradient
            id="spinner-gradient-rainbow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#26e5f3" />
            <stop offset="25%" stopColor="#2b5bf7" />
            <stop offset="50%" stopColor="#354796" />
            <stop offset="75%" stopColor="#0966a0" />
            <stop offset="100%" stopColor="#4BC3DA" />
          </linearGradient>

          <linearGradient
            id="spinner-gradient-purple"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#8f33d8" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>

        <circle
          className="spinner-circle"
          cx="50"
          cy="50"
          r="20"
          style={{ stroke: `url(#${gradientId})` }}
        />
      </svg>
    </div>
  );
};

// --- [채팅 봇 메인 컴포넌트] ---

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "안녕하세요! 무엇을 도와드릴까요?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 스크롤 자동 이동을 위한 Ref
  const scrollRef = useRef<HTMLDivElement>(null);

  // 스크롤 함수 수정 (화면 전체가 아니라, 박스 내부만 스크롤)
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 메시지 전송 핸들러
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. 사용자 메시지 추가
    const newUserMsg: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true); // 로딩 시작 (스피너 표시)

    // 2. 봇 응답 시뮬레이션 (여기서 실제 API 호출 가능)
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: `"${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다."${newUserMsg.text}"라고 말씀하셨군요. \n이것은 Gemini 스타일의 예시 답변입니다.`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false); // 로딩 종료
    }, 1500); // 1.5초 딜레이
  };

  return (
    <div className="chatbot-whole-container">
      <div className="chatbot-container">
        {/* 헤더 */}
        <header className="chat-header">
          <h3>Carima AI Chat</h3>
        </header>

        {/* 메시지 영역 */}
        <div className="messages-area" ref={scrollRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}

          {/* ✨ 로딩 중일 때 스피너 표시 ✨ */}
          {isLoading && (
            <div className="message-row bot">
              <div className="loading-indicator">
                <CarimaLoadingSpinner
                  title="rainbow"
                  iconWidth={20}
                  iconHeight={20}
                />
                <span className="thinking-text">생각하는 중...</span>
              </div>
            </div>
          )}
        </div>

        {/* 입력 영역 */}
        <form className="input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading} // 로딩 중 입력 방지
          />
          <button type="submit" disabled={isLoading || !inputValue.trim()}>
            전송
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
