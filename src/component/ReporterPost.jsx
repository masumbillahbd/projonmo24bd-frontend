import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link, useParams } from "react-router-dom"; // ✅ import useParam
import { Helmet } from "react-helmet-async";
import axios from "axios";
import profileImg from "../assets/images/avatar01.png";

function ReporterPost() {
  const { reporterId } = useParams(); // ✅ now works
  const [setting, setSetting] = useState(null);
  const [reporter, setReporter] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchPosts = async (pageNum, isReporterChange = false) => {
    try {
      if (isReporterChange) {
        setPageLoading(true); // show full-page loader
      } else {
        setLoading(true); // show small loader for infinite scroll
      }

      const response = await axios.get(
        `/reporter-posts/${reporterId}?page=${pageNum}`
      );

      console.log("API response:", response.data); 

      const { setting, posts, meta, reporter } = response.data;

      console.log("API reporter:", reporter); 

      if (!meta) {
        console.warn("No meta found in API response", response.data);
        return;
      }

      if (pageNum === 1) {
        setPosts(posts);
      } else {
        setPosts((prev) => [...prev, ...posts]);
      }

      setSetting(setting);
      setReporter(reporter);

      setLastPage(meta.last_page);
      setHasMore(meta.current_page < meta.last_page);

      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Could not load posts. Please try again later.");
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  // reset page when slug changes
  useEffect(() => {
    setCurrentPage(1);
    setPage(1);
    setHasMore(true);
    fetchPosts(1, true); // 👈 true = category change
  }, [reporterId]);

  // load more on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading) return;

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // fetch when page changes (except first page, handled above)
  useEffect(() => {
    if (page > 1) {
      fetchPosts(page);
    }
  }, [page]);
  

  return (
    <>
      {reporter && setting && (
        <Helmet>
          <title>{`${reporter.name} | ${setting.site_title}`}</title>
          <meta name="keywords" content={setting.meta_keywords} />
          <meta name="description" content={setting.meta_description} />
          <meta name="classification" content="Magazine, Newspaper, Article" />
          <meta name="author" content={setting.site} />
          {/* Open Graph */}
          <meta property="og:title" content={`${reporter.name} | ${setting.meta_title}`} />
          <meta property="og:description" content={setting.meta_description} />
          <meta property="og:image" content={setting.meta_image} />
          <meta property="og:url" content={setting.site_url} />
          <meta property="og:site_name" content={setting.site} />
          {/* Twitter */}
          <meta name="twitter:url" content={setting.site_url} />
          <meta name="twitter:title" content={`${reporter.name} | ${setting.site_title}`} />
          <meta name="twitter:description" content={setting.meta_description} />
          <meta name="twitter:image" content={setting.meta_image} />
        </Helmet>
      )}

      <section className="reporter__post pt-0">
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-12 my-5">
              <div className="profile__info text-center">
                <div className="photo mb-3">
                  <img
                    src={
                      reporter?.photo
                        ? `/reporter/${reporter.photo}`
                        : profileImg
                    }
                    alt={reporter?.name || "Reporter"}
                  />
                </div>
                <div className="name">
                  <h3>{reporter?.name}</h3>
                  <h4>{reporter?.designation}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* // post content */}
          <div className="reporters__post__content">
            <div className="heading">
                <h4>প্রকাশিত প্রবন্ধসমূহ</h4>
            </div>
            <div className="row">
              {posts.map((post) => (
                <div className="col-md-2 col-6">
                  <div className="link-hover-homepage position-relative mb-3">
                    <Link to={`/${post.category?.[0]?.slug || "uncategorized"}/${post.uniqid}`}>
                      <LazyLoadImage
                        className="img-fluid w-100"
                        src={post.featured_image}
                        alt={post.headline}
                        effect="blur"
                        placeholderSrc="/placeholder.jpg"
                      />
                      <h4 className="pt-2">
                        {post.headline.length > 45
                        ? post.headline.substring(0, 45) + "..."
                        : post.headline}
                      </h4>
                    </Link>
                  </div>
                </div>
              ))}

              {loading && page > 1 && (
                <p className="text-center">আরও পোস্ট লোড হচ্ছে...</p>
              )}
              {!hasMore && (
                <p className="text-center">আর কোন পোস্ট নেই।</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReporterPost;