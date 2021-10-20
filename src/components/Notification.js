import React from "react";

function Notification({notification}) {
  if (notification.message === null) {
      return null
  }
  return <div className={notification.type}>{notification.message}</div>;
}

export default Notification;
