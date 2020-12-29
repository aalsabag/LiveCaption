import React, { useState } from "react";
import Zoom from "./zoom/Zoom";

const zoomConfig = {
  apiKey: "",
  apiSecret: "",
  meetingNumber: "85790688274",

  leaveUrl: "https://zoom.us/",
  userName: "LiveCaption", 
  userEmail: "", 
  passWord: "",
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
