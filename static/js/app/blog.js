(async function () {
  async function getRecentBlogPost() {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 5000);

    try {
      // using Google Apps Script (https://script.google.com) to create
      // proxy service to get around CORS
      const url =
        "https://script.google.com/macros/s/AKfycbwQhvR3uIKojHC3OebxmDhYRZzWDRbx0i66obgNBEvvfNjK51WkxAMySWmuU5SYFayo/exec";

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });

      if (response.ok) {
        const data = await response.json();
        const latest = data.feed.entry[0];

        if (!latest) {
          throw new Error("No posts found in the feed.");
        }

        const ok = true;
        const title = latest.title.$t;
        const link = latest.link[4].href;
        const date = latest.updated.$t.substr(0, 10);
        const content = `${latest.content.$t.substr(0, 150)}...`;

        return { ok, title, link, date, content };
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.warn("Blog fetch timed out");
      } else {
        console.warn("Blog fetch failed", err);
      }

      const content = `No blog post could be fetched`;

      return { ok: false, content };
    } finally {
      clearTimeout(id);
    }
  }

  const blogHtml = document.querySelector("#recent-blog");
  const blog = await getRecentBlogPost();

  if (blog.ok) {
    blogHtml.innerHTML = `
      <div class="contents">
        <h4>Most Recent Post (${blog.date})</h4>
        <a href="${blog.link}" target="_blank">${blog.title}</a>
        <p>${blog.content}</p>
      </div>
    `;
  } else {
    blogHtml.innerHTML = `
      <div class="contents">
        <p>${blog.content}</p>
      </div>
    `;
  }
})();
