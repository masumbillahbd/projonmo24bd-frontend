import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatBanglaDateTime } from "../utils/bnTime";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

const PostSearch = () => {
  const [query, setQuery] = useState("");
  const [firstAd, setFirstAd] = useState(null);
  const [setting, setSetting] = useState(null);
  const [secondAd, setSecondAd] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset page
    fetchPosts(query, 1, true); // fresh search
  };

  const fetchPosts = (searchTerm, pageNum = 1, reset = false) => {
    setLoading(true);
    axios
      .get(`/post-search`, {
        params: {
          query: searchTerm,
          page: pageNum,
          limit: 12,
        },
      })
      .then((res) => {
        const { firstAd, secondAd, setting, posts, meta } = res.data;
        setFirstAd(firstAd || null);
        setSecondAd(secondAd || null);
        setSetting(setting || null);

        if (reset) {
          setPosts(posts || []);
        } else {
          setPosts((prev) => [...prev, ...(posts || [])]);
        }

        setHasMore(meta.current_page < meta.last_page);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setLoading(false);
      });
  };

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

  // fetch when page changes (for infinite scroll)
  useEffect(() => {
    if (page > 1 && query) {
      fetchPosts(query, page);
    }
  }, [page]);
  

  return (
    <>
      {query && setting && (
        <Helmet>
          <title>{`${query} | ${setting.site_title}`}</title>

          <meta name="keywords" content={setting.meta_keywords} />
          <meta name="description" content={setting.meta_description} />
          <meta name="classification" content="Magazine, Newspaper, Article" />
          <meta name="author" content={setting.site} />
          {/* Open Graph */}
          <meta
            property="og:title"
            content={`${query} | ${setting.meta_title}`}
          />
          <meta property="og:description" content={setting.meta_description} />
          <meta property="og:image" content={setting.meta_image} />
          <meta property="og:url" content={setting.site_url} />
          <meta property="og:site_name" content={setting.site} />

          {/* Twitter */}
          <meta name="twitter:url" content={setting.site_url} />
          <meta
            name="twitter:title"
            content={`${query} | ${setting.site_title}`}
          />
          <meta
            name="twitter:description"
            content={setting.meta_description}
          />
          <meta name="twitter:image" content={setting.meta_image} />
        </Helmet>
      )}
      
      {/* Ads Section */}
      <div className="ads__section single_page py-3">
        <div className="container">
          <div className="col-md-12">
            {firstAd && (
              <div key={firstAd.id} className="matter__square text-center">
                {firstAd.url ? (
                  <a href={firstAd.url} target="_blank" rel="noopener noreferrer">
                    <LazyLoadImage
                      className="img-fluid"
                      src={firstAd.photo}
                      alt={firstAd.name || "Advertisement"}
                      effect="blur"
                      placeholderSrc="/placeholder.jpg"
                    />
                  </a>
                ) : (
                  <LazyLoadImage
                    className="img-fluid"
                    src={firstAd.photo}
                    alt={firstAd.name || "Advertisement"}
                    effect="blur"
                    placeholderSrc="/placeholder.jpg"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Page */}
      <section className="search__page">
        <div className="container">
          <div className="row">
            {/* Left */}
            <div className="col-md-8 search__left">
              <div className="well well-sm text-left position-relative mb-4">
                <h3>বিষয়: "{query}"</h3>
              </div>

              <form onSubmit={handleSearch} className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="form-control"
                    placeholder="অনুসন্ধান..."
                  />
                  <button className="searchIcon" type="submit">
                    <BiSearch />
                  </button>
                </div>
              </form>

              <div className="search__items py-5">
                {loading && page === 1 && <p>অনুসন্ধান...</p>}
                {!loading && posts.length === 0 && <p>দুঃখিত, আপনার অনুসন্ধানে কোনো তথ্য পাওয়া যায়নি।</p>}

                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="news__item my-3 pb-3 border__btm"
                  >
                    <div className="row">
                      <div className="col-lg-4">
                        <Link
                          to={`/${post.category?.[0]?.slug}/article/${post.uniqid}`}
                        >
                          <div className="media">
                            <LazyLoadImage
                              className="img-fluid w-100"
                              src={post.featured_image}
                              alt={post.headline}
                              effect="blur"
                              placeholderSrc="/placeholder.jpg"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-8">
                        <div className="media-body">
                            <Link to={`/${post.category?.[0]?.slug}/article/${post.uniqid}`}>
                                <h4 className="text-600 mb-1">{post.headline}</h4>
                            </Link>
                            <span className="text-muted small d-flex align-items-center">
                                <i className="bi bi-clock me-1"></i>
                                {formatBanglaDateTime(post.created_at)}
                            </span>
                        </div>
                        <p className="caption mb-2">
                          {post.excerpt && post.excerpt.length > 150
                            ? post.excerpt.slice(0, 150) + "..."
                            : post.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {loading && page > 1 && (
                  <p className="text-center">আরও পোস্ট লোড হচ্ছে...</p>
                )}
                {!hasMore && posts.length > 0 && (
                  <p className="text-center">আর কোন পোস্ট নেই।</p>
                )}
              </div>
            </div>

            {/* Right (ads) */}
            <div className="col-md-4">
              {secondAd && (
                <div key={secondAd.id} className="matter__square text-center">
                  {secondAd.url ? (
                    <a
                      href={secondAd.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LazyLoadImage
                        className="img-fluid"
                        src={secondAd.photo}
                        alt={secondAd.name || "Advertisement"}
                        effect="blur"
                        placeholderSrc="/placeholder.jpg"
                      />
                    </a>
                  ) : (
                    <LazyLoadImage
                      className="img-fluid"
                      src={secondAd.photo}
                      alt={secondAd.name || "Advertisement"}
                      effect="blur"
                      placeholderSrc="/placeholder.jpg"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSearch;