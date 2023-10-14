import React, { useState, useEffect } from "react";
import TextTruncate from "react-text-truncate";
import { Tooltip } from "react-tippy";

import "./POAPBadge.css";

const POAPBadge = ({ poap }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 599);

  const optimizedImage = `${poap.image}?size=small`;

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      if (currentWidth > 599 && !isDesktop) {
        setIsDesktop(true);
      } else if (currentWidth <= 599 && isDesktop) {
        setIsDesktop(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesktop]);

  return (
    <Tooltip
      className="tooltip-container"
      position="top"
      trigger="mouseenter touch"
      html={
        <div className="badge-tooltip">
          <p>{poap.card_title}</p>
        </div>
      }
    >
      <div className="badge-container">
        <a
          href={`https://poap.gallery/r/event/${poap.event_ids}`}
          target="_blank"
          rel="noreferrer"
        >
          <img className="badge-image" src={optimizedImage} alt={poap.slug} />
        </a>
        <div className="badge-text">
          {isDesktop ? (
            <TextTruncate
              line={2}
              element="span"
              truncateText="…"
              text={poap.card_title}
            />
          ) : (
            <span>{poap.card_title}</span>
          )}
          <div className="badge-id">Event ID: {poap.event_ids}</div>
        </div>
      </div>
    </Tooltip>
  );
};

export default POAPBadge;
