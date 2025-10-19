import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideos = async (pageNum) => {
    try {
      setLoading(true);
      const response = await axios.get(`/videos?page=${pageNum}&limit=8`);
      console.log("API response:", response.data);
      const data = response.data.data;
      const meta = response.data.meta;

      if (pageNum === 1) {
        setVideos(data);
      } else {
        setVideos(prev => [...prev, ...data]);
      }

      // If this is the last page, disable further loading
      if (meta.current_page >= meta.last_page) {
        setHasMore(false);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Could not load videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchVideos(1);
  }, []);

  // load more when scroll near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading) return;

      // detect when scroll near bottom
      if (
        window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - 500
      ) {
        // load next page
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // trigger fetch when page increments
  useEffect(() => {
    if (page === 1) return;  // already loaded
    fetchVideos(page);
  }, [page]);

  if (loading && page === 1) return <p>Loading videos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="section_all_cat_vdo pt-3">
      <div className="container">
        <div className="category-heading">
            <Link to="/videos">
                ভিডিও
            </Link>
        </div>
        <div className="row">
          {videos.map(video => (
            <div key={video.id} className="col-md-3 col-6">
              <div className="item mb-4 position-relative">
                <Link to={`/video/${video.uniqid}`}>
                  <i className="bi bi-play-fill"></i>
                  <LazyLoadImage
                    className="img-fluid w-100"
                    src={video.thumbnail}
                    alt={video.title}
                    effect="blur"
                    placeholderSrc="/placeholder.jpg"
                  />
                  <div className="caption">
                    <h4>{video.title}</h4>
                  </div>    
                </Link>
              </div>
            </div>
          ))}
          {loading && page > 1 && <p>Loading more videos...</p>}
          {!hasMore && <p className="text-center">No more videos.</p>}
        </div>
      </div>
    </div>
  );
};

export default Videos;
