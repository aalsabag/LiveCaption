import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

function joinMeeting  (signature, meetConfig) {
  ZoomMtg.init({
    leaveUrl: meetConfig.leaveUrl,
    isSupportAV: true,
    success: function (success) {
      console.log("Init Success ", success);
      ZoomMtg.join({
        meetingNumber: meetConfig.meetingNumber,
        userName: meetConfig.userName,
        signature: signature,
        apiKey: meetConfig.apiKey,
        passWord: meetConfig.passWord,

        success: (success) => {
          console.log(success);
        },

        error: (error) => {
          console.log(error);
        },
      });
    },
  });
}

function Zoom ({meetConfig}) {

  useEffect(() => {
      // setZoomJSLib version 1.8.1 caused breaking, must be same as installed package verision
      // installing this of version 1.7.x caused breaking
      ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.1/lib", "/av");
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();
  
      /**
       * You should not visible api secret key on frontend
       * Signature must be generated on server
       * https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
       */
      ZoomMtg.generateSignature({
        meetingNumber: meetConfig.meetingNumber,
        apiKey: meetConfig.apiKey,
        apiSecret: meetConfig.apiSecret,
  
        role: meetConfig.role,
        success: function (res) {
          console.log("res", res);
  
          setTimeout(() => {
            joinMeeting(res.result, meetConfig);
          }, 1000);
        },
      });

  }, [meetConfig]);

  return <></>;
}

export default Zoom;
