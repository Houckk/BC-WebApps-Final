import { Carousel } from "react-responsive-carousel";
import React from "react";
//import Faq1 from "./PreviewImages/Faq1.png"

export default () => (
  <Carousel autoPlay>
    <div>
      <img src={"./PreviewImages/Faq1.png"} />
      {/* <img src={require("./PreviewImages/Faq1.png")} /> */}
      {/* <img src={Faq1} /> */}
      <p className="legend">FAQ Template 1</p>
    </div>
    <div>
      <img src={"./PreviewImages/Faq2.png"} />
      <p className="legend">FAQ Template 2</p>
    </div>
    <div>
      <img src={"./PreviewImages/Faq3.png"} />
      <p className="legend">FAQ Template 3</p>
    </div>
    <div>
      <img src={"./PreviewImages/Faq4.png"} />
      <p className="legend">FAQ Template 4</p>
    </div>
    <div>
      <img src="./PreviewImages/soccer-ball-ss-img.jpg" />
      <p className="legend">FAQ Template 5.....</p>
    </div>
  </Carousel>
);
