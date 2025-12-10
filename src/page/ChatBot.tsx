import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "../styles/chatBot.scss";

// --- [TypewriterText] ---
const TypewriterText = ({
  text,
  onScroll,
}: {
  text: string;
  onScroll: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText("");
    indexRef.current = 0;
    const intervalId = setInterval(() => {
      if (indexRef.current >= text.length) {
        clearInterval(intervalId);
        return;
      }
      const nextChar = text.charAt(indexRef.current);
      setDisplayedText((prev) => prev + nextChar);
      indexRef.current++;
      // 글자가 찍힐 때마다 부모의 레이아웃 계산을 유도하기 위해 필요하다면 콜백
      onScroll();
    }, 20);
    return () => clearInterval(intervalId);
  }, [text, onScroll]);

  return <>{displayedText}</>;
};

// --- [Spinner] ---
type SpinnerProps = { title?: string };
const CarimaLoadingSpinner = ({ title }: SpinnerProps) => {
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

// --- [Main Component] ---

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

  // ✨ [추가] 봇 메시지의 실시간 높이와 컨테이너 높이 저장
  const [botMessageHeight, setBotMessageHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600); // 기본값
  const userQuestionIdRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // ✨ [스크롤 로직] 질문을 상단으로 올리기
  const scrollToMessageTop = (id: number) => {
    const container = containerRef.current;
    const targetElement = messageRefs.current[id];

    if (container && targetElement) {
      const topPosition = targetElement.offsetTop;

      container.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. 새 질문 시작 시 봇 높이 리셋
    setBotMessageHeight(0);

    const userMsgId = Date.now();
    const newUserMsg: Message = {
      id: userMsgId,
      text: inputValue,
      sender: "user",
    };
    userQuestionIdRef.current = userMsgId;
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);

    // 2. 질문 등록 직후 스크롤을 질문 위치로 이동
    setTimeout(() => {
      scrollToMessageTop(userMsgId);
    }, 100);

    // 3. 봇 응답 시뮬레이션
    setTimeout(() => {
      const botMsgId = Date.now() + 1;
      const botResponse: Message = {
        id: botMsgId,
        text: `"${newUserMsg.text}"에 대한 답변입니다.\n\n이 답변이 작성되는 동안 아래의 빈 공간(Spacer)이 줄어듭니다.\n\n[원리]\n봇 메시지 높이 + 스페이서 높이 = 일정함(상수)\n\n이 원리를 통해 전체 스크롤 높이가 변하지 않으므로, 사용자님의 질문이 상단에 고정된 채로 답변이 아래를 채우는 듯한 시각적 효과를 줍니다.\n\nCSS Transition을 제거했기 때문에 떨림 현상 없이 매우 부드럽습니다.`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // ✨ [컨테이너 높이 측정] 창 크기가 변할 때 대응
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✨ [핵심 로직] ResizeObserver로 봇 메시지 높이 실시간 감지
  useLayoutEffect(() => {
    const lastMsg = messages[messages.length - 1];

    if (lastMsg && lastMsg.sender === "bot" && isLoading) {
      const targetElement = messageRefs.current[lastMsg.id];

      if (targetElement) {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            let newHeight = 0;
            if (entry.borderBoxSize) {
              newHeight = entry.borderBoxSize[0].blockSize;
            } else {
              newHeight = entry.contentRect.height;
            }

            setBotMessageHeight((prev) => {
              if (Math.abs(prev - newHeight) > 1) {
                return newHeight;
              }
              return prev;
            });

            // 🔥 [여기가 포인트] 높이가 변하는 순간, 스크롤을 강제로 제자리로 돌려놓습니다.
            // 리렌더링 사이의 찰나에 튀는 것을 막아줍니다.
            if (containerRef.current && userQuestionIdRef.current) {
              const userMsgEl = messageRefs.current[userQuestionIdRef.current];
              if (userMsgEl) {
                // animation 없이 즉시 이동 (auto)
                containerRef.current.scrollTo({
                  top: userMsgEl.offsetTop,
                  behavior: "auto",
                });
              }
            }
          }
        });

        observer.observe(targetElement);
        return () => observer.disconnect();
      }
    }
  }, [messages, isLoading]); // 의존성 배열에 isLoading 추가

  // ✨ [높이 계산 함수]
  // Spacer 높이 = (컨테이너 높이 * 0.8) - 봇 메시지 높이
  // * 0.8은 헤더 등을 제외하고 얼추 화면을 꽉 채우기 위한 비율입니다.
  const getSpacerHeight = () => {
    const lastMsg = messages[messages.length - 1];

    // 유저가 질문한 직후(로딩 중 포함)에는 꽉 찬 공간 유지
    if (lastMsg.sender === "user") {
      return containerHeight * 0.7 - 6;
    }

    // 봇 답변 중일 때는 "고정된 전체 공간 - 현재 답변 높이"
    const initialSpace = containerHeight * 0.7;
    const remainingSpace = initialSpace - botMessageHeight;

    return Math.max(0, remainingSpace);
  };

  return (
    <div className="chatbot-whole-container">
      <div className="chatbot-container">
        <header className="chat-header">
          <h3>Carima AI Chat</h3>
        </header>

        <div className="messages-area" ref={containerRef}>
          {messages.map((msg, index) => {
            const isLastMessage = index === messages.length - 1;
            const isBot = msg.sender === "bot";
            const showTypingEffect = isBot && isLastMessage && !isLoading;

            return (
              <div
                key={msg.id}
                ref={(el) => {
                  messageRefs.current[msg.id] = el;
                }}
                className={`message-row ${msg.sender}`}
              >
                <div className="message-bubble">
                  {showTypingEffect ? (
                    <TypewriterText text={msg.text} onScroll={() => {}} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="message-row bot">
              <div className="loading-indicator">
                <CarimaLoadingSpinner title="rainbow" />
                <span className="thinking-text">생각하는 중...</span>
              </div>
            </div>
          )}

          {/* ✨ [Spacer] 
              transition을 절대 넣지 마세요. JS와 충돌합니다.
              flexShrink: 0을 줘서 flexbox 레이아웃 내에서 찌그러지지 않게 합니다. 
          */}
          <div
            className="scroll-spacer"
            style={{
              height: getSpacerHeight(),
              width: "100%",
              flexShrink: 0,
            }}
          ></div>
        </div>

        <form className="input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
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
