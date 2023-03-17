// background.js
chrome.action.onClicked.addListener(async (tab) => {
    const subreddits = await getSubreddits();
    const randomIndex = Math.floor(Math.random() * subreddits.length);
    const randomSubreddit = subreddits[randomIndex];
    const url = `https://www.reddit.com/r/${randomSubreddit}/`;
    await chrome.tabs.update(tab.id, { url });
  });
  
  async function getSubreddits() {
    const cachedSubreddits = await getCachedSubreddits();
    if (cachedSubreddits) {
      return cachedSubreddits;
    }
  
    const response = await fetch("https://www.reddit.com/subreddits.json?limit=100");
    const json = await response.json();
    const subreddits = json.data.children.map((child) => child.data.display_name);
    await cacheSubreddits(subreddits);
    return subreddits;
  }
  
  async function getCachedSubreddits() {
    const result = await chrome.storage.local.get("subreddits");
    return result.subreddits;
  }
  
  async function cacheSubreddits(subreddits) {
    await chrome.storage.local.set({ subreddits });
  }
  