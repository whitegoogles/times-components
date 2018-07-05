import "react-native";
import React from "react";
import { Dimensions } from "react-native";
import Interactive from "./src/interactive";

export default {
  name: "Primitives/Interactive",
  children: [
    {
      type: "story",
      name: "Web",
      component: () => (
        <Interactive
          element="times-qwiz-rounds"
          attributes={{ "deck-id": "5761" }}
          source="//components.timesdev.tools/lib2/times-qwiz-rounds-1.0.0/times-qwiz-rounds.html"
        />
      )
    },
    {
      type: "story",
      name: "Native",
      component: () => (
        <Interactive height={Dimensions.get("window").height} />
      )
    }
  ]
};
