import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import TextCategoryImageHorizontalSkeleton from "../component/skeleton/TextCategoryImageHorizontalSkeleton";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getBanglaAgoTime } from '../utils/bnTime';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import axios from 'axios';

const HomePageFirstSection = () => {
    const [setting, setSetting] = useState(null);
    const [popularTags, setPopularTags] = useState([]);
    const [leadFirstPost, setLeadFirstPost] = useState(null);
    const [leadSecondPost, setLeadSecondPost] = useState([]);
    const [leadThirdPosts, setLeadThirdPosts] = useState([]);
    // ads
    const [leadRightAd, setLeadRightAd] = useState(null);
    const [specialPosts, setSpecialPosts] = useState([]);

    const [national, setNational] = useState(null);
    const [nationalOne, setNationalOne] = useState(null);
    const [nationalTwo, setNationalTwo] = useState([]);
    const [nationalFive, setNationalFive] = useState([]);

    const [latestPosts, setLatestPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    const [international, setInternational] = useState(null);
    const [internationalFour, setInternationalFour] = useState([]);

    const [sports, setSports] = useState(null);
    const [sportsLeftTwo, setSportsLeftTwo] = useState([]);
    const [sportsRightTwo, setSportsRightTwo] = useState([]);
    const [sportsRightAd, setSportsRightAd] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
            setLoading(true);
            const response = await axios.get(`/home-first-section`);
            if (isMounted) {
                console.log("✅ API Response:", response.data);
                setSetting(response.data.setting || null);
                setPopularTags(response.data.popularTags || []);
                setLeadFirstPost(response.data.leadFirstPost || null);
                setLeadSecondPost(response.data.leadSecondPost || []);
                setLeadThirdPosts(response.data.leadThirdPosts || []);
                setSpecialPosts(response.data.specialPosts || []);
                setLeadRightAd(response.data.leadRightAd || null);
                setNational(response.data.national || null);
                setNationalOne(response.data.nationalOne || null);
                setNationalTwo(response.data.nationalTwo || []);
                setNationalFive(response.data.nationalFive || []);
                setLatestPosts(response.data.latestPosts || []);
                setPopularPosts(response.data.popularPosts || []);
                setInternational(response.data.international || []);
                setInternationalFour(response.data.internationalFour || []);

                setSports(response.data.sports || null);
                setSportsLeftTwo(response.data.sportsLeftTwo || []);
                setSportsRightTwo(response.data.sportsRightTwo || []);
                setSportsRightAd(response.data.sportsRightAd || null);

                setError(null);
            }
            } catch (err) {
            if (isMounted) {
                console.error("Error fetching data:", err);
                setError("Could not load data. Please try again later.");
            }
            } finally {
            if (isMounted) setLoading(false);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, []);


  return (
    <>
        {setting && (
            <Helmet>
                <title>{setting.site_title}</title>
                <meta name="keywords" content={setting.meta_keywords} />
                <meta name="description" content={setting.meta_description} />
                <meta name="classification" content="Magazine, Newspaper, Article" />
                <meta name="author" content={setting.site} />
                {/* Open Graph */}
                <meta property="og:title" content={setting.meta_title} />
                <meta property="og:description" content={setting.meta_description} />
                <meta property="og:image" content={setting.meta_image} />
                <meta property="og:url" content={setting.site_url} />
                <meta property="og:site_name" content={setting.site} />
                {/* Twitter */}
                <meta name="twitter:url" content={setting.site_url} />
                <meta name="twitter:title" content={setting.site_title} />
                <meta name="twitter:description" content={setting.meta_description} />
                <meta name="twitter:image" content={setting.meta_image} />
            </Helmet>
        )}
        

        {/* popular tag */}
        {/* {setting?.popular_tag === 1 && (
        <div className="popular-topic mt-2">
            <div className="container">
            <div className="topic__item">
                <div className="body">
                {loading ? (
                    // Skeletons
                    <div className="d-flex flex-wrap">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton
                        key={i}
                        width={80}
                        height={24}
                        className="me-2 mb-2"
                        />
                    ))}
                    </div>
                ) : (
                    // Real tags
                    Array.isArray(popularTags) &&
                    popularTags.length > 0 &&
                    popularTags.map((tag) => (
                    <Link key={tag.id} to={`/topic/${tag.slug}`} className="me-2 mb-2">
                        {tag.name} <i className="bi bi-chevron-right"></i>
                    </Link>
                    ))
                )}
                </div>
            </div>
            </div>
        </div>
        )} */}



        {/* leadPost */}
        <section className="home__top sec__lead pt-0">
            <div className="middle__block">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="middle__block__top mb-3">
                            {loading ? (
                                <div className="link-hover-homepage border__btm__2 mb-3 p-2">
                                    <Skeleton  height={340} width="100%" />
                                    <Skeleton width={'80px'} height={10} style={{ marginTop: '15px' }} />
                                    <Skeleton count={2} height={17} style={{ marginTop: '10px' }} />
                                    <div className='mt-3'>
                                        <Skeleton count={3} height={11} />
                                    </div>
                                </div>
                            ) : leadFirstPost && (
                                <div key={leadFirstPost.id} className="link-hover-homepage border__btm__2 mb-3 p-2">
                                    <div className="media">
                                        <Link to={`${leadFirstPost.category_slug}/article/${leadFirstPost.uniqid}`}>
                                            <LazyLoadImage
                                                src={leadFirstPost.featured_image}
                                                alt={leadFirstPost.headline}
                                                effect="blur"
                                                placeholderSrc="/placeholder.jpg"
                                            />
                                        </Link>
                                        <small>
                                            {leadFirstPost?.featured_image_caption
                                            ? leadFirstPost.featured_image_caption.length > 40
                                            ? leadFirstPost.featured_image_caption.slice(0, 40) + "..."
                                            : leadFirstPost.featured_image_caption
                                            : ""}
                                        </small>
                                    </div>
                                    <div className="media-body pe-2">
                                        <span className="mt-3 d-block">{getBanglaAgoTime(leadFirstPost.created_at)}</span>
                                        <Link to={`${leadFirstPost.category_slug}/article/${leadFirstPost.uniqid}`}>
                                            <h3>{leadFirstPost.headline}</h3>
                                        </Link>
                                        <div className="intro">
                                            <p className="d-none d-md-block d-lg-block mb-0 mt-3 pb-3">
                                                {leadFirstPost.excerpt ? (leadFirstPost.excerpt.length > 250 ? leadFirstPost.excerpt.slice(0, 250) + "..." : leadFirstPost.excerpt) : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>  {/*// col-lg-6 */}
                    <div className="col-lg-3">
                        <div className="middle__block3 d-none d-md-block">
                            {loading ? (
                                    [1,2].map((i) => (
                                        <div key={i} className="pb-3">
                                            <div className="link-hover-homepage p-2">
                                                <Skeleton  height={165} width="100%" />
                                                <div className='mt-1'>
                                                    <Skeleton count={1} height={12} />
                                                </div>
                                                <div className='mt-1'>
                                                    <Skeleton count={2} height={10} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                leadSecondPost.map((post, index) => (
                                    <div key={post.id} className="pb-3">
                                        <div className="link-hover-homepage p-2">
                                            <div className="media">
                                                <Link to={`${post.category_slug}/article/${post.uniqid}`}>
                                                    <LazyLoadImage
                                                        className="img-fluid"
                                                        src={post.featured_image}
                                                        alt={post.headline}
                                                        effect="blur"
                                                        placeholderSrc="/placeholder.jpg"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="media-body" style={{ height: "57px" }}>
                                                <Link to={`${post.category_slug}/article/${post.uniqid}`}>
                                                    <h4>{post.headline ? (post.headline.length > 45 ? post.headline.slice(0, 45) + "..." : post.headline) : ""}</h4>
                                                </Link>
                                            </div>
                                            <div className="intro">
                                                <p className="d-none d-md-block d-lg-block mb-0 mt-0" style={{ display: "inline-block" }}>
                                                    {post.excerpt ? (post.excerpt.length > 70 ? post.excerpt.slice(0, 70) + "..." : post.excerpt) : ""}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    {/* // col-lg-3 */}
                    <div className="col-lg-3">
                        <div className="right__block">
                            <div className="link-hover-homepage mb-3 p-2">
                                {loading ? (
                                    <Skeleton height={230} width="100%" />
                                ) : leadRightAd && (
                                    <>
                                        {leadRightAd.url ? (
                                        <a
                                            href={leadRightAd.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <LazyLoadImage
                                            className="img-fluid"
                                            src={leadRightAd.photo}
                                            alt={leadRightAd.name || "Advertisement"}
                                            effect="blur"
                                            placeholderSrc="/placeholder.jpg"
                                            />
                                        </a>
                                        ) : (
                                        <LazyLoadImage
                                            className="img-fluid"
                                            src={leadRightAd.photo}
                                            alt={leadRightAd.name || "Advertisement"}
                                            effect="blur"
                                            placeholderSrc="/placeholder.jpg"
                                        />
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="special__headline">
                                <div className="category__main mb-3">
                                    <div className="category-heading border__btm__2">
                                        {loading ? (
                                            <Skeleton height={30} width="130px" />
                                        ) : (
                                            <a href="">বিশেষ শিরোনাম</a>
                                        )}
                                    </div>
                                    <div className="headline__list pb-1">
                                        {loading ? (
                                                [1,2,3,4].map((i, index) => (
                                                    <div key={i} className='py-0'>
                                                        <div className="px-2">
                                                            <Skeleton count={2} height={12} width="100%" />
                                                        </div>
                                                        {index !== 3 && <hr className="my-1" />}
                                                    </div>
                                                ))
                                        ) : (
                                            specialPosts.map((post, index) => (
                                                <Link key={post.id} className="border__btm__2" to={`${post.categories?.slug}/article/${post.uniqid}`}>
                                                    <b>{post.headline ? (post.headline.length > 50 ? post.headline.slice(0, 50) + "..." : post.headline) : ""}</b>
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* // col-lg-3 */}
                </div>
                {/* // row */}
                {/* //third lead block */}
                <div className="middle__block2 block__lead__mbl">
                    <div className="row">
                        {loading ? (
                            [1,2,3,4,5,6,7,8,9].map((i) => (
                                <div key={i} className="col-lg-4">
                                    <TextCategoryImageHorizontalSkeleton/>
                                </div>
                            ))
                        ) : (
                            leadThirdPosts.map((post, index) => (
                                <div key={post.id} className="col-lg-4">
                                    <div className="link-hover-homepage mb-3 p-2">
                                        <div className="row">
                                            <div className="col-lg-7 col-7">
                                                <div className="media-body pe-2">
                                                    <div className="lead__cat__name d-flex align-items-center">
                                                        <i className="bi bi-circle-fill me-1"></i>
                                                        <h6 className="mb-0 pt-0">{post?.category_name}</h6>
                                                    </div>
                                                    <Link to={`${post?.category_slug}/article/${post.uniqid}`}>
                                                        <h4>{post?.headline}</h4>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 col-5">
                                                <div className="media">
                                                    <Link to={`${post?.category_slug}/article/${post.uniqid}`}>
                                                        <LazyLoadImage
                                                            className="img-fluid"
                                                            src={post.featured_image}
                                                            alt={post.headline}
                                                            effect="blur"
                                                            placeholderSrc="/placeholder.jpg"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>

        <section className="row__4 ">
            <div className="row">
                <div className="col-lg-9">
                    <div className="full__row__9 sec__6 mb-5 mb-lg-0 mb-xl-0">
                        <div className="category__main">
                            <div className="category-heading d-flex justify-content-between align-item-center border__btm__2">
                                {loading ? (
                                    <Skeleton  height={24} width="120px" />
                                    ) : (
                                    <Link to={`/${national.slug}`}>{national.name}</Link>
                                    )
                                }
                            </div>
                            <div className="block__main">
                                <div className="row g-0">
                                    <div className="border__right__2 col-lg-7">
                                        <div className="panel-small-block-2">
                                            <div className="block__main">
                                                <div className="row">
                                                    <div className="col-md-12 border__right">
                                                        {loading ? (
                                                            <div className="link-hover-homepage d-grid pb-3">
                                                                <Skeleton  height={340} width="100%" />
                                                                <Skeleton width={'80px'} height={10} style={{ marginTop: '15px' }} />
                                                                <Skeleton count={2} height={17} style={{ marginTop: '10px' }} />
                                                                <div className='mt-3'>
                                                                    <Skeleton count={3} height={11} />
                                                                </div>
                                                            </div>
                                                        ) : nationalOne && (
                                                            <div key={nationalOne.id} className="link-hover-homepage d-grid pb-3">
                                                                <Link to={`${national.slug}/article/${nationalOne.uniqid}`}>
                                                                    <div className="media">
                                                                        <div className="media">
                                                                            <LazyLoadImage
                                                                                src={nationalOne.featured_image}
                                                                                alt={nationalOne.headline}
                                                                                effect="blur"
                                                                                placeholderSrc="/placeholder.jpg"
                                                                            />
                                                                        </div>
                                                                        <div className="media-title">
                                                                            <h3>
                                                                                {nationalOne.headline ? (nationalOne.headline.length > 70 ? nationalOne.headline.slice(0, 70) + "..." : nationalOne.headline) : ""}
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="block__child mb__mbl">
                                                <div className="row">
                                                    {loading ? (
                                                        [1,2].map((i) => (
                                                            <div key={i} className="col-md-6 col-6">
                                                                <Skeleton  height={130} width="100%" />
                                                                <div className='mt-1'>
                                                                    <Skeleton count={2} height={12} />
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        nationalTwo.map((post, index) => (
                                                            <div key={post.id} className="col-md-6 col-6">
                                                                <div className="link-hover-homepage">
                                                                    <Link to={`${national?.slug}/article/${post.uniqid}`}>
                                                                        <div className="media">
                                                                            <LazyLoadImage
                                                                                className="img-fluid"
                                                                                src={post.featured_image}
                                                                                alt={post.headline}
                                                                                effect="blur"
                                                                                placeholderSrc="/placeholder.jpg"
                                                                            />
                                                                        </div>
                                                                        <div className="title__box py-2">
                                                                            <h4>{post?.headline}</h4>
                                                                            <p className="d-none mb-0 mt-2">
                                                                                {post.excerpt ? (post.excerpt.length > 70 ? post.excerpt.slice(0, 70) + "..." : post.excerpt) : ""}
                                                                            </p>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="cat__block__main">
                                            {loading ? (
                                                [1,2,3,4,5].map((i) => (
                                                    <div key={i} className="link-hover-homepage">
                                                        <div className="media-body pe-1">
                                                            <Skeleton count={2} height={12} />
                                                        </div>
                                                        <div className="media-left float-right" style={{width: "40%"}}>
                                                            <Skeleton  height={85} width="100%" />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                nationalFive.map((post, index) => (
                                                    <div key={post.id} className="link-hover-homepage">
                                                        <Link to={`${national?.slug}/article/${post.uniqid}`}>
                                                            <div className="media-body pe-1">
                                                                <h4 className="lead__title">{post?.headline}</h4>
                                                            </div>
                                                            <div className="media-left float-right" style={{width: "40%"}}>
                                                                <LazyLoadImage
                                                                    className="img-fluid"
                                                                    src={post?.featured_image}
                                                                    alt={post?.headline}
                                                                    effect="blur"
                                                                    placeholderSrc="/placeholder.jpg"
                                                                />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="latest category__main mb-3">
                        <div className="latest-popular pb-3">
                            <Tab.Container defaultActiveKey="latest">
                                <Nav variant="pills" role="tablist">
                                    <Nav.Item>
                                        <Nav.Link eventKey="latest" role="tab">
                                            সর্বশেষ
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="popular" role="tab">
                                            জনপ্রিয়
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content>
                                    <Tab.Pane eventKey="latest" className="news latestNews">
                                        {loading ? (
                                            Array(7).fill(0).map((_, idx) => <Skeleton key={idx} height={30} caption count={2} />)
                                        ) : latestPosts.length > 0 ? (
                                            latestPosts.map((post, index) => {
                                                const formattedIndex = new Intl.NumberFormat("bn-BD").format(
                                                    index + 1
                                                );
                                                return (
                                                    <div key={post.id} className="item ps-2">
                                                    <div className="row">
                                                        <div className="col-2 text-end">
                                                        <span className="sn">{formattedIndex}</span>
                                                        </div>
                                                        <div className="col-10 align-self-center">
                                                        <Link to={`/${post.category?.[0]?.slug || "uncategorized"}/article/${post.uniqid}`}>
                                                            <h4 className="mb-0 pt-1">
                                                            {post.headline ? (post.headline.length > 50 ? post.headline.slice(0, 50) + "..." : post.headline) : ""}
                                                            </h4>
                                                        </Link>
                                                        </div>
                                                    </div>
                                                    </div>
                                                );
                                            })
                                        ) : <p>No latest posts available.</p>}
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="popular" className="news popularNews">
                                        {loading ? (
                                            Array(7).fill(0).map((_, idx) => <Skeleton key={idx} height={30} count={2} />)
                                        ) : popularPosts.length > 0 ? (
                                            popularPosts.map((post, index) => {
                                                const formattedIndex = new Intl.NumberFormat("bn-BD").format(
                                                    index + 1
                                                );
                                                return (
                                                    <div key={post.id} className="item ps-2">
                                                    <div className="row">
                                                        <div className="col-2 text-end">
                                                        <span className="sn">{formattedIndex}</span>
                                                        </div>
                                                        <div className="col-10 align-self-center">
                                                        <Link to={`/${post.category?.[0]?.slug || "uncategorized"}/article/${post.uniqid}`}>
                                                            <h4 className="mb-0 pt-1">
                                                                {post.headline ? (post.headline.length > 50 ? post.headline.slice(0, 50) + "..." : post.headline) : ""}
                                                            </h4>
                                                        </Link>
                                                        </div>
                                                    </div>
                                                    </div>
                                                );
                                            })
                                        ) : <p>No popular posts available.</p>}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* international news */}
        <section className="full__row row__3">
            <div className="category__main mb__block">
                <div className="category-heading d-flex justify-content-between align-item-center border__btm__2">
                    {loading ? (
                        <Skeleton  height={24} width="120px" />
                        ) : (
                        <Link to={`/${international.slug}`}>{international.name}</Link>
                        )
                    }
                </div>
                <div className="block__child mb__mbl">
                    <div className="row">
                        {loading ? (
                            [1,2,3,4].map((i) => (
                                <div key={i} className="col-lg-3 col-6 border__right">
                                    <div className="link-hover-homepage">
                                        <div className="media">
                                            <Skeleton height={150} />
                                        </div>
                                        <div className="title__box py-2">
                                            <Skeleton count={2} height={15} width="100%" />
                                        </div>
                                    </div>
                                </div>
                            ))
                            ) : (
                            internationalFour.map((post, index) => (
                                <div key={post.id} className="col-lg-3 col-6 border__right">
                                    <div className="link-hover-homepage">
                                        <Link to={`${international?.slug}/article/${post.uniqid}`}>
                                            <div className="media">
                                                <LazyLoadImage
                                                    className="img-fluid"
                                                    src={post?.featured_image}
                                                    alt={post?.headline}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                />
                                            </div>
                                            <div className="title__box py-2">
                                                <h4>{post.headline ? (post.headline.length > 50 ? post.headline.slice(0, 50) + "..." : post.headline) : ""}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>


        <section className="full__row row__3">
            <div className="row">
                <div className="col-md-9">
                    <div className="category__main mb__block mb-3">
                        <div className="category-heading d-flex justify-content-between align-item-center border__btm__2">
                            {loading ? (
                                <Skeleton  height={24} width="120px" />
                                ) : (
                                <Link to={`/${sports.slug}`}>{sports.name}</Link>
                                )
                            }
                        </div>
                        <div className="block__child mb__mbl">
                            <div className="row g-0">
                                <div className="col-lg-6 border__right__2">
                                    <div className="col_4_left_img_block">
                                        {loading ? (
                                            [1,2].map((i) => (
                                                <div key={i} className="link-hover-homepage d-flex align-items-start gap-3 py-2 border-bottom" >
                                                    <div style={{ flex: "0 0 42%", maxWidth: "42%" }}>
                                                        <Skeleton height={105} width="100%" borderRadius={8} />
                                                    </div>
                                                    <div style={{ flex: "1" }}>
                                                        <Skeleton height={16} width="100%" style={{ marginBottom: 8 }} />
                                                        <Skeleton height={16} width="95%" style={{ marginBottom: 6 }} />
                                                        <Skeleton height={16} width="60%" />
                                                    </div>
                                                </div>
                                            ))
                                            ) : (
                                            sportsLeftTwo.map((post, index) => (
                                                <div key={post.id} className="link-hover-homepage">
                                                    <Link to={`${sports?.slug}/article/${post.uniqid}`}>
                                                        <div className="media-left media mt-1" style={{width: "42%"}}>
                                                            <LazyLoadImage
                                                                className="img-fluid"
                                                                src={post?.featured_image}
                                                                alt={post?.headline}
                                                                effect="blur"
                                                                placeholderSrc="/placeholder.jpg"
                                                            />
                                                        </div>
                                                        <div className="media-body ps-2">
                                                            <h4 className="child__title">{post.headline ? (post.headline.length > 80 ? post.headline.slice(0, 80) + "..." : post.headline) : ""}</h4>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>   
                                <div className="col-lg-6">
                                    <div className="col_4_left_img_block">
                                        {loading ? (
                                            [1,2].map((i) => (
                                                <div key={i} className="link-hover-homepage d-flex align-items-start gap-3 py-2 border-bottom" >
                                                    <div style={{ flex: "0 0 42%", maxWidth: "42%" }}>
                                                        <Skeleton height={105} width="100%" borderRadius={8} />
                                                    </div>
                                                    <div style={{ flex: "1" }}>
                                                        <Skeleton height={16} width="100%" style={{ marginBottom: 8 }} />
                                                        <Skeleton height={16} width="95%" style={{ marginBottom: 6 }} />
                                                        <Skeleton height={16} width="60%" />
                                                    </div>
                                                </div>
                                            ))
                                            ) : (
                                            sportsRightTwo.map((post, index) => (
                                                <div key={post.id} className="link-hover-homepage">
                                                    <Link to={`${sports?.slug}/article/${post.uniqid}`}>
                                                        <div className="media-left media mt-1" style={{width: "42%"}}>
                                                            <LazyLoadImage
                                                                className="img-fluid"
                                                                src={post?.featured_image}
                                                                alt={post?.headline}
                                                                effect="blur"
                                                                placeholderSrc="/placeholder.jpg"
                                                            />
                                                        </div>
                                                        <div className="media-body ps-2">
                                                            <h4 className="child__title">{post.headline ? (post.headline.length > 80 ? post.headline.slice(0, 80) + "..." : post.headline) : ""}</h4>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                        )}
                                    </div> 
                                </div>
                            </div>
                        </div>    
                    </div>    
                </div>
                <div className="col-md-3">
                    <div className="ads__section">
                        <div className="link-hover-homepage p-2">
                            <div className="matter__square">
                                {loading ? (
                                    <Skeleton height={230} width="100%" />
                                ) : sportsRightAd && (
                                    <>
                                        {sportsRightAd.url ? (
                                        <a
                                            href={sportsRightAd.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <LazyLoadImage
                                            className="img-fluid"
                                            src={sportsRightAd.photo}
                                            alt={sportsRightAd.name || "Advertisement"}
                                            effect="blur"
                                            placeholderSrc="/placeholder.jpg"
                                            />
                                        </a>
                                        ) : (
                                        <LazyLoadImage
                                            className="img-fluid"
                                            src={sportsRightAd.photo}
                                            alt={sportsRightAd.name || "Advertisement"}
                                            effect="blur"
                                            placeholderSrc="/placeholder.jpg"
                                        />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>    

    </>
  );
};
export default HomePageFirstSection;