import React, {useEffect } from "react";
import { createPortal } from "react-dom";

// 'Overlay-root' is a sibling to 'root'
const OverlayRoot = document.getElementById("Overlay-root");

function Overlay({ children, isLoading }) {
  //element to which the Overlay will be rendered
  const el = document.createElement("div", { height: "100%", width: "100%" });

  useEffect(() => {
    // append to root when the children of Overlay are mounted
    OverlayRoot.appendChild(el);
    document.body.style.overflow = "hidden";

    // do a cleanup
    return () => {
      OverlayRoot.removeChild(el);
      document.body.style.overflow = "visible";
    };
  }, [el]);

  return createPortal(
    // child elemenet
    <div
      style={{
        position: "absolute",
        top: 0,
        height: isLoading ? "100%" : "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px",
        background: "rgb(0,0,0,0.5)",
      }}
    >
      <div>{children}</div>
    </div>,
    // target container
    el
  );
}

export default Overlay;
