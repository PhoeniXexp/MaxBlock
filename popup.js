const ALLOWED_HOST = "gorzdrav.spb.ru";

const setStatus = (isActive) => {
  const dot = document.getElementById("status-dot");
  const title = document.getElementById("status-title");

  if (!dot || !title) {
    return;
  }

  dot.classList.toggle("status__dot--active", isActive);
  dot.classList.toggle("status__dot--inactive", !isActive);
  title.textContent = isActive
    ? "Активно на этом сайте"
    : "Не активно на этом сайте";
};

const updateStatus = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const [tab] = tabs;
    if (!tab?.url) {
      setStatus(false);
      return;
    }

    try {
      const url = new URL(tab.url);
      setStatus(url.host === ALLOWED_HOST);
    } catch {
      setStatus(false);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  updateStatus();
});
