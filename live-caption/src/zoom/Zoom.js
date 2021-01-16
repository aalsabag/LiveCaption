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
          ZoomMtg.getAttendeeslist({
            success: (success) => {
              console.log("Attendees")
              console.log(success.result.attendeesList)
            }
          })
          ZoomMtg.record({
            success: (success) => {
              console.log("recording success")
              console.log(success)
            },
            error: (error) => {
              console.log("failed to record")
              console.log(error)
            }
          })
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
      ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.1/lib", "/av");
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();

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
