import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

function ScrollableBox({ children, maxHeight, scrollAmount = 100 }) {
  const scrollRef = useRef();
  const [showTopIcon, setShowTopIcon] = useState(false);
  const [showBottomIcon, setShowBottomIcon] = useState(false);

  // Update icon visibility on scroll
  const handleScroll = () => {
    const element = scrollRef.current;
    setShowTopIcon(element.scrollTop > 0);

    // More precise check for when to hide bottom icon
    const atBottom =
      element.scrollTop >= element.scrollHeight - element.clientHeight - 1;
    setShowBottomIcon(!atBottom);
  };

  // Scroll the content up or down and adjust visibility
  const scroll = (direction) => {
    const element = scrollRef.current;
    element.scrollTop += scrollAmount * direction;
  };

  useEffect(() => {
    const element = scrollRef.current;
    // Check initial visibility of the bottom icon
    if (element.scrollHeight > element.clientHeight) {
      setShowBottomIcon(true); // Show bottom icon only if scrollable
    }

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box position="relative" sx={{ maxHeight }}>
      {showTopIcon && (
        <IconButton
          onClick={() => scroll(-1)}
          sx={{
            position: "absolute",
            top: -20,
            right: "45%",
            zIndex: 1,
            color: "grey",
            backgroundColor: "white",
            "&:hover": { backgroundColor: "lightgrey" },
          }}
        >
          <ExpandLess />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        sx={{
          maxHeight,
          overflowY: "auto",
          scrollBehavior: "smooth",
          pr: 0,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {children}
      </Box>

      {showBottomIcon && (
        <IconButton
          onClick={() => scroll(1)}
          sx={{
            position: "absolute",
            bottom: -20,
            right: "45%",
            zIndex: 1,
            color: "grey",
            backgroundColor: "white",
            "&:hover": { backgroundColor: "lightgrey" },
          }}
        >
          <ExpandMore />
        </IconButton>
      )}
    </Box>
  );
}

export default ScrollableBox;
