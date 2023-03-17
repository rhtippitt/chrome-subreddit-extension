chrome.tabs.onCreated.addListener(function(tab) {
  if (tab.url === "https://www.reddit.com/") {
    chrome.tabs.update(tab.id, {url: "https://www.reddit.com/r/YOUR_SUBREDDIT"});
  }
});
