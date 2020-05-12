import React, { useContext } from "react";
import { StoreContext } from "./Contexts/Context";

export default function SetAccessToken(shopUrl, accessToken) {
  let { updateOrCreateAccessToken } = useContext(StoreContext);

  console.log("Shop Param", shopUrl);
  console.log("AccessToken Param", accessToken);

  updateOrCreateAccessToken(shopUrl, accessToken);
}
