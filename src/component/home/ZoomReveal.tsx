import React, { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/zoomReveal.scss";

type Item = {
  name: string;
  route: string;
};

type ZoomRevealProps = {
  title: string;
  items: Item[];
  // 카드의 고유 id (layoutId로 공유 애니메이션)
  id?: string;
};

const ZoomReveal: React.FC<ZoomRevealProps> = ({
  title,
  items,
  id = "zoom-box",
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      {/* 닫힌 상태의 카드 */}
      <motion.button
        type="button"
        className="zr-card"
        onClick={handleOpen}
        layoutId={`${id}-card`}
        aria-expanded={open}
      >
        <motion.div className="zr-card-inner">
          <motion.h3 className="zr-card-title" layoutId={`${id}-title`}>
            {title}
          </motion.h3>
          <motion.div className="zr-card-hint" layoutId={`${id}-hint`}>
            Click to open
          </motion.div>
        </motion.div>
      </motion.button>

      {/* 오버레이 + 확대된 카드 */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="zr-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden
              onClick={handleClose}
            />
            <motion.div
              className="zr-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-dialog-title`}
              onClick={handleClose}
            >
              {/* 확대된 카드 본체 (클릭 버블링 막기) */}
              <motion.div
                className="zr-modal-card"
                layoutId={`${id}-card`}
                onClick={(e) => e.stopPropagation()}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              >
                <motion.div className="zr-card-inner">
                  <motion.h3
                    id={`${id}-dialog-title`}
                    className="zr-card-title"
                    layoutId={`${id}-title`}
                  >
                    {title}
                  </motion.h3>
                  <motion.div className="zr-card-hint" layoutId={`${id}-hint`}>
                    Pick a demo
                  </motion.div>

                  {/* 링크 리스트: 촤라락 등장 (stagger) */}
                  <motion.ul
                    className="zr-list"
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                      hidden: {
                        transition: {
                          staggerChildren: 0.03,
                          staggerDirection: -1,
                        },
                      },
                      show: {
                        transition: {
                          delayChildren: 0.05,
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                  >
                    {items.map((it) => (
                      <motion.li
                        key={it.name}
                        className="zr-list-item"
                        variants={{
                          hidden: { opacity: 0, y: 10, scale: 0.98 },
                          show: { opacity: 1, y: 0, scale: 1 },
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Link to={it.route} className="zr-link">
                          {it.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <div className="zr-actions">
                    <button className="zr-close" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZoomReveal;
