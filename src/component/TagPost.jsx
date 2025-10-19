import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getBanglaAgoTime, formatBanglaDateTime } from "../utils/bnTime";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Preloader from "./Preloader";
import axios from "axios";

function TagPost() {


      const { tagSlug } = useParams();
      const [setting, setSetting] = useState(null);
      const [tag, setTag] = useState(null);
      const [posts, setPosts] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [lastPage, setLastPage] = useState(1);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      const [page, setPage] = useState(1);
      const [hasMore, setHasMore] = useState(true);
      const [pageLoading, setPageLoading] = useState(false);
    
      const fetchPosts = async (pageNum ,isTagChange = false) => {
        try {

            if (isTagChange) {
                setPageLoading(true); // show full-page loader
            } else {
                setLoading(true); // show small loader for infinite scroll
            }
          
          const response = await axios.get(
            `/tag-posts/${tagSlug}?page=${pageNum}`
          );
    
          const {
            setting,
            posts,
            meta,
            tag,
          } = response.data;
    
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
          setTag(tag);
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
        fetchPosts(1, true); // true = category change
      }, [tagSlug]);
    
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
    <div>
      {pageLoading ? (
        <Preloader />   
      ) : (
    <>

        {tag && setting && (
            <Helmet>
            <title>{`${tag.name} | ${setting.site_title}`}</title>

            <meta name="keywords" content={setting.meta_keywords} />
            <meta name="description" content={setting.meta_description} />
            <meta name="classification" content="Magazine, Newspaper, Article" />
            <meta name="author" content={setting.site} />
            {/* Open Graph */}
            <meta  property="og:title"  content={`${tag.name} | ${setting.meta_title}`} />
            <meta property="og:description" content={setting.meta_description} />
            <meta property="og:image" content={setting.meta_image} />
            <meta property="og:url" content={setting.site_url} />
            <meta property="og:site_name" content={setting.site} />
            {/* Twitter */}
            <meta name="twitter:url" content={setting.site_url} />
            <meta name="twitter:title" content={`${tag.name} | ${setting.site_title}`} />
            <meta name="twitter:description"  content={setting.meta_description} />
            <meta name="twitter:image" content={setting.meta_image} />
            </Helmet>
        )}
        <section className="tag__page">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="breadcrumb">
                            {tag ? (
                            <h5 to={`/${tag.slug}`}    style={{ fontSize: '30px', color: 'red', textTransform: 'capitalize', margin:0 }}>{tag.name}</h5>
                            ) : (
                            <span>লোড হচ্ছে...</span>
                            )}
                        </div>
                        <hr/>

                        {posts.map((post) => {
                            const categorySlug = post.categories && post.categories.length > 0 
                                ? post.categories[0].slug 
                                : "undefine"; // fallback if no category

                            return (
                                <div key={post.id} className="callout-card">
                                    <div
                                        className="row"
                                        style={{ marginBottom: "15px", borderBottom: "1px solid #ececec", paddingBottom: "5px" }}
                                    >
                                        <div className="col-md-3 col-xs-4 col-sm-4">
                                        <Link to={`/${categorySlug}/article/${post.uniqid}`}>
                                            <div className="media">
                                            <LazyLoadImage
                                                className="img-fluid"
                                                src={post.featured_image}
                                                alt={post.headline}
                                                effect="blur"
                                                placeholderSrc="/placeholder.jpg"
                                            />
                                            </div>
                                        </Link>
                                        </div>

                                        <div className="col-md-9 col-xs-8 col-sm-8">
                                        <div className="media-body">
                                            <h3>
                                            <Link to={`/${categorySlug}/article/${post.uniqid}`}>{post.headline}</Link>
                                            </h3>

                                            <div className="pull-right">
                                                <i className="bi bi-clock me-1"></i> 
                                                {formatBanglaDateTime(post.created_at)}
                                            </div>

                                            <p
                                            className="d-none d-none d-md-block"
                                            style={{ margin: "8px 0 5px 0" }}
                                            >
                                            {post.excerpt.length > 110
                                                ? post.excerpt.substring(0, 110) + "..."
                                                : post.excerpt}{" "}
                                            <Link
                                                to={`/${categorySlug}/article/${post.uniqid}`}
                                                className="text-danger"
                                            >
                                                বিস্তারিত
                                            </Link>
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                            );
                        })}
                        

                    </div>
                </div>
            </div>
        </section>
    </>
     )}
    </div>
  )
}

export default TagPost