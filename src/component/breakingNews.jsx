
import { useState, useEffect } from "react";
import axios from "axios";

export default function BreakingNews() {
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    axios
      .get(`/breakingnews`) // adjust if you have a base URL
      .then((response) => {
        setBreakingNews(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching breaking news:", error);
      });
  }, []);

  if (!breakingNews.length) {
    return null; // No breaking news to show
  }

  return (
    <div className="container">
      <div className="breaking__news pt-0 position-relative">
        <div className="scroll__news d-flex">
          <div className="title">// BREAKING NEWS //</div>
          <marquee
            scrollAmount="6"
            scrolldelay="5"
            direction="left"
            onMouseOver={(e) => e.target.stop()}
            onMouseOut={(e) => e.target.start()}
          >
            <ul className="list-inline">
              {breakingNews.map((post, index) => (
                <li key={index}>
                  <a style={{ color: "var(--bs-black)" }} href={post.news_link}>
                    {post.news_text}
                  </a>
                </li>
              ))}
            </ul>
          </marquee>
        </div>
      </div>
    </div>
  );
}
