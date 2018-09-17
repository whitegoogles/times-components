import React from "react";
import LazyLoad from "./src/lazy-load";

export default {
  name: "LazyLoad",
  children: [
    {
      type: "story",
      name: "LazyLoad",
      component: () => <LazyLoad />
    }
  ]
};
