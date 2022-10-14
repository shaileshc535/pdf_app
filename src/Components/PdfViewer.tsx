import React, { useRef, useEffect } from "react";

const PdfViewer = (props) => {
  const containerRef = useRef();

  useEffect(() => {
    const newContainer = containerRef.current;
    let instance, PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      instance = await PSPDFKit.load({
        newContainer,
        document: props.document,
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(newContainer);
  }, []);
  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}></div>
  );
};

export default PdfViewer;
