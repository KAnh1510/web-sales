import React, { useState } from "react";
import Viewer from "react-viewer";

import "./ZoomIn.scss";
import Images from "~/components/Images";

function ZoomIn({ props }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState("false");

  return (
    <>
      {props.map((item, index) => (
        <div key={index} className="img-item">
          <Images
            alt="aaaaa"
            src={item.src}
            width="100%"
            cursor="pointer"
            onClick={() => {
              setVisible("true");
              setActiveIndex(index);
            }}
          />
        </div>
      ))}
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        zoomSpeed={0.2}
        images={props}
        activeIndex={activeIndex}
      />
    </>
  );
}

export default ZoomIn;
