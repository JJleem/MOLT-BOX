import React, { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import "../styles/ScrollInfo.scss";

/** ---- Mock API (댓글형 데이터) ---- */
type CommentItem = {
  id: number;
  author: string;
  avatar: string; // url or data uri
  message: string;
  createdAt: string; // ISO string
};

type ApiResponse = { items: CommentItem[]; nextPage?: number };

const AUTHORS = ["Daisy", "Evan", "Noah", "Liam", "Olivia", "Mia", "Leo"];
const AVATAR = (seed: number) =>
  `https://api.dicebear.com/8.x/shapes/svg?seed=${seed}&size=64`;

const MOCK_DB: CommentItem[] = Array.from({ length: 123 }, (_, i) => {
  const author = AUTHORS[i % AUTHORS.length];
  return {
    id: i + 1,
    author,
    avatar: AVATAR(i + 7),
    message:
      i % 5 === 0
        ? `긴 댓글 예시입니다. 아이템 ${
            i + 1
          } — 가변 높이 테스트용으로 줄을 조금 더 늘려볼게요. 프론트엔드 무한스크롤 + 가상화 + framer-motion 스프링 조합!`
        : `아이템 ${i + 1}의 짧은 메시지`,
    createdAt: new Date(Date.now() - i * 1000 * 60).toISOString(),
  };
});

async function mockFetchComments(page: number): Promise<ApiResponse> {
  const PAGE_SIZE = 5;
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const slice = MOCK_DB.slice(start, end);
  await new Promise((r) => setTimeout(r, 150));
  return {
    items: slice,
    nextPage: end < MOCK_DB.length ? page + 1 : undefined,
  };
}

/** ---- Row(가상 아이템) + Motion 스프링 ---- */
type RowProps = {
  v: VirtualItem;
  children: React.ReactNode;
  measure: (el: Element | null) => void;
  index: number;
};

const Row = React.memo(function Row({ v, children, measure, index }: RowProps) {
  const prefersReduced = useReducedMotion();
  const y = useSpring(v.start, {
    stiffness: 220,
    damping: 28,
    mass: 0.35,
    restDelta: prefersReduced ? 1 : 0.5,
  });

  useEffect(() => {
    y.set(v.start);
  }, [v.start, y, prefersReduced]);

  return (
    <motion.div
      ref={measure} // ✅ 실측 연결
      data-index={index} // ✅ react-virtual이 어떤 행인지 알게 해줌
      className="vlist-row"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",

        y,
        willChange: "transform",
        padding: "8px 16px 4px 16px",
      }}
      initial={{ opacity: 0.0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
});
/** ---- 단일 댓글 아이템 ---- */
const CommentCard = React.memo(function CommentCard({ c }: { c: CommentItem }) {
  const time = new Date(c.createdAt);
  const hh = time.getHours().toString().padStart(2, "0");
  const mm = time.getMinutes().toString().padStart(2, "0");

  return (
    <article className="comment-card">
      <img className="avatar" src={c.avatar} alt={`${c.author} avatar`} />
      <div className="body">
        <header className="meta">
          <strong className="author">{c.author}</strong>
          <span className="dot">•</span>
          <time className="time">{`${hh}:${mm}`}</time>
        </header>
        <p className="message">{c.message}</p>
        <footer className="actions">
          <button className="action-btn" type="button">
            Like
          </button>
          <button className="action-btn" type="button">
            Reply
          </button>
        </footer>
      </div>
    </article>
  );
});

/** ---- 스크롤 리스트 ---- */
export default function ScrollInfo() {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      ApiResponse,
      Error,
      InfiniteData<ApiResponse, number>,
      [string],
      number
    >({
      queryKey: ["comments"],
      queryFn: ({ pageParam }) => mockFetchComments(pageParam),
      getNextPageParam: (last) => last.nextPage ?? undefined,
      initialPageParam: 0,
    });

  const pages: ApiResponse[] = data?.pages ?? [];
  const items: CommentItem[] = useMemo(
    () => pages.flatMap((p) => p.items),
    [pages]
  );

  const rowVirtualizer = useVirtualizer({
    count: items.length + (hasNextPage ? 1 : 0),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88 + 14, // 🔸 카드(88) + 간격(14) 대략치
    overscan: 8,
    measureElement: (el) => el.getBoundingClientRect().height, // 실제로는 이것이 정답!
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  // 바닥 감지 → 다음 페이지 로드
  useEffect(() => {
    if (!virtualItems.length) return;
    const last = virtualItems[virtualItems.length - 1];
    const isLoaderRowVisible = hasNextPage && last.index >= items.length;
    if (isLoaderRowVisible && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    virtualItems,
    items.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <div className="vlist" ref={parentRef}>
      {/* 상단에 고정 입력창(선택) */}
      {/* <div className="composer">
        <input className="composer-input" placeholder="Add a comment…" />
        <button className="composer-send" type="button">
          Send
        </button>
      </div> */}

      <div
        className="vlist-phantom"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {rowVirtualizer.getVirtualItems().map((v) => {
          const isLoader = v.index > items.length - 1;
          return (
            <Row
              key={v.key}
              v={v}
              measure={rowVirtualizer.measureElement} // ✅ 전달
              index={v.index} // ✅ 전달
            >
              {isLoader ? (
                hasNextPage ? (
                  <div className="loader">Loading…</div>
                ) : (
                  <div className="end">End</div>
                )
              ) : (
                <CommentCard c={items[v.index]} />
              )}
            </Row>
          );
        })}
      </div>
    </div>
  );
}
