;(async function () {
  async function getRecentBlogPost () {
    // using Google Apps Script (https://script.google.com) to create
    // proxy service to get around CORS
    const response = await fetch('https://script.google.com/macros/s/AKfycbwQhvR3uIKojHC3OebxmDhYRZzWDRbx0i66obgNBEvvfNjK51WkxAMySWmuU5SYFayo/exec')
    const data = await response.json();
    const latest = data.feed.entry[0];

    if (!latest) {
      throw new Error("No posts found in the feed.");
    }

    // Extract the title and link
    const title = latest.title.$t;
    const link = latest.link[4].href;
    const date = latest.updated.$t.substr(0, 10);
    const content = `${latest.content.$t.substr(0, 150)}...`;

    return { title, link, date, content };
  }

  const blog = await getRecentBlogPost();

  document.querySelector('#recent-blog').innerHTML = `
  <div class="contents"><h4>Most Recent Post (${blog.date})</h4><a href="${blog.link}" target="_blank">${blog.title}</a><p>${blog.content}</p></div>`;
})()
