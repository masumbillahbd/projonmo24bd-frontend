import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePageThirdSection = () => {

  const [politicsCategory, setPoliticsCategory] = useState(null);
  const [politicsPosts, setPoliticsPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const [error, setError] = useState(null); // ✅ error state  posts-by-category/2/6

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/home-third-section`);
        if (isMounted) {
          setPoliticsPosts(response.data.politicsSix || []);
          setPoliticsCategory(response.data.politics || null);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching politics posts:", err);
          setError("Could not load posts. Please try again later.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="mb-4">
      <div className="skeleton" style={{ width: "100%", height: "180px", marginBottom: "10px" }}></div>
      <div className="skeleton" style={{ width: "90%", height: "18px", marginBottom: "6px" }}></div>
      <div className="skeleton" style={{ width: "70%", height: "16px" }}></div>
    </div>
  );

  return (
    <>
      <section className="container full__row__excludive mb__mbl">
        <div className="ssss">
          <div className="border__cat__top mb-2"></div>
          <div className="panel-small-block-2">
            <div className="row">
              <div className="col-md-9">
                <div className="category-heading">
                  {loading ? (
                    <div className="skeleton" style={{ width: "140px", height: "24px" }}></div>
                  ) : politicsCategory ? (
                    <Link to={`/${politicsCategory.slug}`}>
                      {politicsCategory.name}
                    </Link>
                  ) : (
                    <span>No category</span>
                  )}
                </div>

                <div className="block__body">
                  {error && <p style={{ color: "red" }}>{error}</p>}

                  {loading ? (
                    <div className="homePageExclusive">
                      <div className="row">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="col-md-4 col-lg-4 col-6">
                            <SkeletonCard />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="homePageExclusive">
                      <div className="row">
                        {politicsPosts.length > 0 ? (
                          politicsPosts.map((post) => (
                            <div
                              key={post.id}
                              className="col-md-4 col-lg-4 col-6"
                            >
                              <div className="link-hover-homepage mb-4 position-relative">
                                <Link
                                  to={`/${politicsCategory?.slug}/article/${post.uniqid}`}
                                >
                                  <div className="media media">
                                    <LazyLoadImage
                                      className="img-responsive lazy"
                                      src={post.featured_image}
                                      alt={post.headline}
                                      effect="blur"
                                      placeholderSrc="/placeholder.jpg"
                                    />
                                  </div>
                                  <div className="media-title d-inline-block">
                                    <h4 className="mb-0">{post.headline}</h4>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No posts available.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-md-3">
                <div className="namaj-time" style={{ marginTop: "3.8rem" }}>
                  <div className="category-heading">
                    <div
                      style={{
                        fontSize: "23px",
                        textAlign: "center",
                        paddingRight: "10px",
                        background: "#1b9c61",
                        color: "#fff",
                        padding: "1px 8px",
                      }}
                    >
                      নামাজের সূচী
                    </div>
                  </div>
                </div>
              </div>
              {/* End Sidebar */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePageThirdSection;
