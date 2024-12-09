import { Workbox } from "workbox-window";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");

  wb.addEventListener("installed", (event) => {
    if (event.isUpdate) {
      console.log("New content is available, please refresh.");
    } else {
      console.log("Content is cached for offline use.");
    }
  });

  wb.register();
}
