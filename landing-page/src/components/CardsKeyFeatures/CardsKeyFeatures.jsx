/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const CardsKeyFeatures = ({
  features,
  active,
  className,
  frame = "https://c.animaapp.com/bADEbyrk/img/frame-52.svg",
  divClassName,
  img = "https://c.animaapp.com/bADEbyrk/img/frame-53.svg",
  frame1 = "https://c.animaapp.com/bADEbyrk/img/frame-54.svg",
}) => {
  return (
    <div className={`cards-key-features ${features} ${className}`}>
      <img
        className="frame-46"
        alt="Frame"
        src={
          features === "date" ? img : features === "discount" ? frame1 : frame
        }
      />

      <div className="frame-47">
        <div className={`select-many-location ${divClassName}`}>
          {features === "location" && <>Select many location</>}

          {features === "date" && <>Schedule your trip</>}

          {features === "discount" && <>Big discount</>}
        </div>

        <div className="chooce-your-favorite">
          {features === "location" && <>Chooce your favorite location</>}

          {features === "date" && (
            <p className="text-wrapper-36">Set the date you want</p>
          )}

          {features === "discount" && (
            <p className="text-wrapper-36">Get discount for every services</p>
          )}
        </div>
      </div>
    </div>
  );
};
