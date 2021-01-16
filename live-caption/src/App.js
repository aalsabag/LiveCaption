import React, { useState } from "react";
import Zoom from "./zoom/Zoom";

const zoomConfig = {
  apiKey: "Fmi1OXaeQU6p08mEKNA-Lg",
  apiSecret: "vH3RdefeZdI1vpfvOm3fXC5IddM2KO2pDH0t",
  meetingNumber: "87023102513",

  leaveUrl: "https://zoom.us/",
  userName: "LiveCaption", 
  userEmail: "", 
  passWord: "J2c7cy",
  role: 0,
};

const App = () => {

  return (
    <div>
      <Zoom  meetConfig={zoomConfig} />
    </div>
  );
};

export default App;
