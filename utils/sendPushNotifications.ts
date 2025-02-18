export const sendPushNotification = async (expoPushToken: string, message: { title: string; body: string }) => {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken,
        title: message.title,
        body: message.body,
        sound: "default",
      }),
    });
  
    const data = await response.json();
    return data;
};