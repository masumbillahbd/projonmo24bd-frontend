import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee"; // ✅ Use the actual library
import axios from "axios";
import { useSettings } from "../context/SettingsContext";
const LatestMarquee = () => {
  const { settings, loading } = useSettings();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (settings?.scroll_bar === 1) {
      axios
        .get(`scroll-posts`)
        .then((res) => {
          if (res.data?.status === "success") {
            setPosts(res.data.data || []);
          }
        })
        .catch((err) => {
          console.error("Error fetching scroll posts:", err);
        });
    }
  }, [settings]);
  if (loading || settings?.scroll_bar !== 1) return null;
  return (
    <div className="newsticker pb-2">
      <div className="container">
        <div className="scroll-news">
          <Marquee pauseOnHover={true} gradient={false} speed={50}>
            <ul className="list-inline m-0 d-flex">
              {posts.map((post) => (
                <li key={post.id} className="me-4">
                  <Link to={`/news/${post.id}`}>{post.headline}</Link>
                </li>
              ))}
            </ul>
          </Marquee>
        </div>
      </div>
    </div>
  );
};
export default LatestMarquee;
