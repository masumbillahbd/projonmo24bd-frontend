import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getBanglaAgoTime, formatBanglaDateTime } from "../utils/bnTime";
import "react-lazy-load-image-component/src/effects/blur.css";
import CategorySkeleton from "./skeleton/CategorySkeleton";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Preloader from "./Preloader";
import axios from "axios";


const SubCategoryPost = () => {

  const { categorySlug, subCategorySlug } = useParams(); // destructure both
  const [setting, setSetting] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [postOne, setPostOne] = useState(null);
  const [adOne, setAdOne] = useState(null);
  const [adTwo, setAdTwo] = useState(null);
  const [postTwoFirst, setPostTwoFirst] = useState([]);
  const [postTwoSecond, setPostTwoSecond] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchPosts = async (pageNum, isSubCategoryChange = false) => {
    try {
      if (isSubCategoryChange) {
        setPageLoading(true); // show full-page loader
      } else {
        setLoading(true); // show small loader for infinite scroll
      }
      const response = await axios.get(
        `/sub-category-post/${categorySlug}/${subCategorySlug}?page=${pageNum}`
      );
      const {
        setting,
        posts,
        meta,
        category,
        subCategory,
        subCategories,
        adOne,
        adTwo,
        postOne,
        postTwoFirst,
        postTwoSecond,
      } = response.data;
      console.log(response)
      if (!meta) {
        console.warn("No meta found in API response", response.data);
        return;
      }
      if (pageNum === 1) {
        setPosts(posts);
      } else {
        setPosts((prev) => [...prev, ...posts]);
      }
      setSetting(setting || null);
      setCategory(category);
      setSubCategory(subCategory);
      setSubCategories(subCategories);
      setPostOne(postOne);
      setPostTwoFirst(postTwoFirst);
      setPostTwoSecond(postTwoSecond);
      setAdOne(adOne);
      setAdTwo(adTwo);
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
  }, [categorySlug, subCategorySlug]);

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
        {subCategory && setting && (
          <Helmet>
            <title>{`${subCategory.name} | ${setting.site_title}`}</title>
            <meta name="keywords" content={setting.meta_keywords} />
            <meta name="description" content={setting.meta_description} />
            <meta name="classification" content="Magazine, Newspaper, Article" />
            <meta name="author" content={setting.site} />
            {/* Open Graph */}
            <meta property="og:title" content={`${subCategory.name} | ${setting.meta_title}`}/>
            <meta property="og:description" content={setting.meta_description} />
            <meta property="og:image" content={setting.meta_image} />
            <meta property="og:url" content={setting.site_url} />
            <meta property="og:site_name" content={setting.site} />
            {/* Twitter */}
            <meta name="twitter:url" content={setting.site_url} />
            <meta name="twitter:title" content={`${subCategory.name} | ${setting.site_title}`} />
            <meta name="twitter:description" content={setting.meta_description} />
            <meta name="twitter:image" content={setting.meta_image} />
          </Helmet>
        )}

        <div className="container mt-1">
          <div className="row">
            
            <div className="col-md-3 col-lg-3"></div>
            <div className="col-md-9 col-lg-9">
              <div className="section_heading mb-4">
                {subCategory && category  ? (
                  <h2>
                    <Link to={`/${category?.slug}/${subCategory?.slug}`}>
                        {subCategory.name}
                      </Link>
                  </h2>
                ) : (
                  <Skeleton width={150} height={25} />
                )}
              </div>
              <div className="content-body pb-1">
                  {/* Show 12 skeletons only when loading and no posts yet */}
                  {loading && posts.length === 0 && (
                    <>
                      {Array.from({ length: 12 }).map((_, index) => (
                        <CategorySkeleton key={index} />
                      ))}
                    </>
                  )}

                  {/* Show actual posts once loaded */}
                  {posts.map((post) => (
                    <div key={post.id} className="card mb-3 border-0 overflow-hidden">
                      <div className="row g-0 align-items-center">
                        {/* Left image section */}
                        <div className="col-12 col-md-4">
                          <Link to={`/${category.slug}/article/${post.uniqid}`}>
                            <LazyLoadImage
                              className="img-fluid rounded w-100"
                              src={post.featured_image}
                              alt={post.headline}
                              effect="blur"
                              placeholderSrc="/placeholder.jpg"
                            />
                          </Link>
                        </div>
                        {/* Right content section */}
                        <div className="col-12 col-md-8 p-md-1 p-lg-2 pt-2 d-flex flex-column justify-content-center">
                          <div className="mb-2">{formatBanglaDateTime(post.created_at)}</div>
                          <div className="mb-0">
                            <h4 className="media-heading fw-bold">
                              <Link to={`/${category.slug}/article/${post.uniqid}`}>
                                {post.headline && post.headline.length > 90
                                ? post.headline.slice(0, 90) + '...'
                                : post.headline}
                              </Link>
                            </h4>
                          </div>
                          <div>
                            <p>
                              {post.excerpt && post.excerpt.length > 200
                                ? post.excerpt.slice(0, 200) + '...'
                                : post.excerpt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Loading more text when paginating */}
                  {loading && posts.length > 0 && page > 1 && (
                    <p className="text-center">আরও পোস্ট লোড হচ্ছে...</p>
                  )}

                  {/* No more posts */}
                  {!hasMore && <p className="text-center">আর কোন পোস্ট নেই।</p>}
              </div>
            </div>
          </div>
        </div>
      </>
    )}

    </div>
  );
};
export default SubCategoryPost;
