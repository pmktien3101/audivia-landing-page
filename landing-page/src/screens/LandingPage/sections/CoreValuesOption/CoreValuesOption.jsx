import React from "react";
import "./style.css";
import { CoreValues } from "../../../../components/CoreValues/CoreValues";

export const CoreValuesOption = () => {
  return (
    <div className="services-option">
      <CoreValues
        services="emotion"
      />
      <CoreValues
        services="history"
      />
      <CoreValues
        groupClassName="cards-services-instance"
        services="personal"
      />
    </div>
  );
};
