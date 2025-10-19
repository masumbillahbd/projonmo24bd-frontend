import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { getBanglaAgoTime, formatBanglaDateTime } from "../utils/bnTime";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import SocialMediaShare from "./SocialMediaShare";
import { Helmet } from "react-helmet-async";
import parse from "html-react-parser";
import Preloader from "./Preloader";
import axios from "axios";
import ImageTimeTextHorizontalSkeleton from "./skeleton/ImageTimeTextHorizontalSkeleton";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostSingle = () => {
  const contentRef = useRef();
  const currentBase = window.location.origin;
  const { categorySlug, uniqid } = useParams(); // Get the post uniqid from the URL
  const [setting, setSetting] = useState(null);
  const [singlePost, setSinglePost] = useState(null);
  const [firstAd, setFirstAd] = useState(null);
  const [secondAd, setSecondAd] = useState(null);
  const [thirdAd, setThirdAd] = useState(null);
  const [fourthAd, setFourthAd] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoryRelatedPosts, setCategoryRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
  setPageLoading(true); // show full-page loader when fetching
  axios
    .get(`/${categorySlug}/${uniqid}`)
    .then((response) => {
      setSetting(response.data.setting);
      setFirstAd(response.data.firstAd);
      setSecondAd(response.data.secondAd);
      setThirdAd(response.data.thirdAd);
      setFourthAd(response.data.fourthAd);
      setCategoryRelatedPosts(response.data.categoryRelatedPosts);
      setSinglePost(response.data.singlePost);
      setPopularPosts(response.data.popularPosts);
      setLatestPosts(response.data.latestPosts);
      setCategory(response.data.category);
    })
    .catch((error) => {
      console.error("Error fetching single post:", error);
    })
    .finally(() => {
      setPageLoading(false); // hide loader when done
      setLoading(false);
    });
}, [categorySlug, uniqid]);

    
 if (pageLoading) return <Preloader />; // show full-page loader first

if (loading) return <p>Loading post...</p>;
if (!singlePost) return <p>Post not found.</p>;
 
  return (
    <>

        {singlePost && setting && (
            <Helmet>
            <title>{`${singlePost.headline} | ${setting.site_title}`}</title>

            <meta name="keywords" content={setting.meta_keywords} />
            <meta name="description" content={setting.meta_description} />
            <meta name="classification" content="Magazine, Newspaper, Article" />
            <meta name="author" content={setting.site} />
            {/* Open Graph */}
            <meta  property="og:title"  content={`${singlePost.headline} | ${setting.meta_title}`} />
            <meta property="og:description" content={setting.meta_description} />
            <meta property="og:image" content={setting.meta_image} />
            <meta property="og:url" content={setting.site_url} />
            <meta property="og:site_name" content={setting.site} />
            {/* Twitter */}
            <meta name="twitter:url" content={setting.site_url} />
            <meta name="twitter:title" content={`${singlePost.headline} | ${setting.site_title}`} />
            <meta name="twitter:description"  content={setting.meta_description} />
            <meta name="twitter:image" content={setting.meta_image} />
            </Helmet>
        )}
        <div id="single-post-container">
            

            <section className="single_page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-lg-1"></div>
                        <div className="col-md-9 col-lg-11">
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="single-post-content card mb-3 border-0 p-3 overflow-hidden" style={{backgroundColor: 'rgb(255 255 255 / 1)'}}>
                                        <h2><b>{singlePost?.headline}</b></h2>
                                        <div className="publisher__name d-block position-relative">
                                            <b>{singlePost?.publisher_name}</b>
                                        </div>
                                        <div className="publish-time"> প্রকাশিত: {formatBanglaDateTime(singlePost.created_at)}
                                            <br/>
                                            {singlePost.last_update_by && (
                                                <>আপডেট: {formatBanglaDateTime(singlePost.last_update_at)}</>
                                            )}
                                        </div>
                                        <div className="image-wrapper my-1">
                                            <div className="image">
                                                {/* Video or Featured Image */}
                                                {(!singlePost.video_url || singlePost.video_url.trim() === "") ? (
                                                    <LazyLoadImage
                                                    src={singlePost.featured_image}
                                                    alt={singlePost.featured_image_caption || singlePost.headline}
                                                    className="img-fluid w-100 rounded"
                                                    effect={null}
                                                    placeholderSrc=""
                                                    />
                                                ) : (
                                                    <div className="video">
                                                    <div className="panel-body">
                                                        {/* Replace this with your actual video embed logic */}
                                                        {postVideoStream(singlePost.video_from, singlePost.video_id)}
                                                    </div>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="img-caption" style={{top: '1161.95px', left: '0px'}}>{singlePost?.featured_image_caption ?? singlePost?.headline}</p>
                                        </div>
                                        <div className="social-media-share my-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                            {category && (
                                                <>
                                                    <Link className="category-name" to={`/${category.slug}`}>{category.name}</Link> |{" "}
                                                </>
                                            )}
                                            <SocialMediaShare 
                                                title={singlePost?.headline} 
                                                url={`${currentBase}/${categorySlug}/article/${singlePost?.uniqid}`} 
                                                printRef={contentRef} 
                                            />
                                        </div>
                                        <div className="post-content-wrapper mt-3">
                                            <div className="post-intro mb-3">
                                                <p><b>{singlePost?.excerpt}</b></p>
                                            </div>
                                            <div className="post-content my-1 ">
                                                {parse(singlePost.post_content)}
                                            </div>
                                        </div>
                                        <div className="post-reporter by-1">
                                            <p>
                                                {singlePost.user_id && singlePost.user && (
                                                    <b>{singlePost.user.short_name}</b>
                                                )}
                                            </p>
                                        </div>
                                        <div className="post-topic my-1">
                                            <p>
                                                {singlePost.tags && singlePost.tags.length > 0 && (
                                                    singlePost.tags.map((tag) => (
                                                        <Link key={tag.id} to={`/topic/${tag.slug || tag.name}`}>{tag.name}</Link>
                                                    ))
                                                )}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-3 ">
                                    <div className="sidebar">
                                        <div className="ads-space" style={{ width: '300px', height: '250px', marginBottom: '15px' }}>

                                        </div>
                                        <div className="related-posts card mb-3 border-0 p-1 overflow-hidden" style={{backgroundColor: 'rgb(255 255 255 / 1)'}}>
                                            <div className="mb-5">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <div className="d-flex align-items-center">
                                                    <div className="me-2" style={{width: '4px', height: '20px', backgroundColor: '#FFA500'}}></div>
                                                    <div>
                                                        <div className=" ps-1  fw-bold text-truncate" style={{marginBottom: '-4px'}}>
                                                        এই সম্পর্কিত অন্যান্য খবর
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* related posts */}
                                            {/* Show 5 skeletons only when loading and no posts yet */}
                                            {loading && categoryRelatedPosts.length === 0 && (
                                                <>
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <ImageTimeTextHorizontalSkeleton key={index} />
                                                ))}
                                                </>
                                            )}

                                            {/* Show actual posts once loaded */}
                                            {categoryRelatedPosts.map((post) => (
                                            <div key={post.id} className="card mb-3 border-0 rounded-3 overflow-hidden">
                                                <Link to={`/${categorySlug}/article/${post.uniqid}`} className="text-decoration-none text-dark">
                                                    <div className="row g-0 align-items-center">
                                                    {/* Left image section */}
                                                    <div className="col-4 col-md-4">
                                                        <LazyLoadImage
                                                        className="img-fluid"
                                                        src={post.featured_image}
                                                        alt={post.headline}
                                                        effect="blur"
                                                        placeholderSrc="/placeholder.jpg"
                                                        />
                                                    </div>

                                                    {/* Right content section */}
                                                    <div className="col-8 col-md-8 ps-2 d-flex flex-column justify-content-center">
                                                        <div className="mb-1 d-flex align-items-center gap-1">
                                                            {getBanglaAgoTime(post.created_at)} {/* time */}
                                                        </div>
                                                        <div>
                                                        <h5 className="mb-0">
                                                            {post.headline
                                                            ? post.headline.length > 60
                                                                ? post.headline.slice(0, 60) + "..."
                                                                : post.headline
                                                            : ""}
                                                        </h5>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>Old Content</div>
                    <div className="row d-flex align-items-center">
                        <div className="col-md-9 mb-3">
                            <div className="single__page__heading">
                                {category ? (
                                <Link to={`/${category.slug}`}>{category.name}</Link>
                                ) : (
                                <span>লোড হচ্ছে...</span>
                                )}
                            </div>
                        </div>
                        <div className="col-md-3">
                            {/* social media share start */}
                            <div className="follow__btn d-flex d-block d-sm-block d-md-block d-lg-block">
                                <h6>Share this news:</h6>
                                <SocialMediaShare title={singlePost?.headline} url={`${currentBase}/${categorySlug}/article/${singlePost?.uniqid}`} printRef={contentRef} />
                            </div>
                            {/* social media share end */}
                        </div>
                    </div>
                    <hr/>
     
                    <div className="main__content">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="content" ref={contentRef}>
                                    <div className="heading__top mb-4">
                                        <div className="sub-headline PSubTitle pb-1">
                                            <h5>{singlePost?.sub_headline}</h5>
                                        </div>
                                        <div className="single-page-headline PTitle pb-4">
                                            <h1><b>{singlePost?.headline}</b></h1>
                                        </div>
                                        <div className="reporter__block mb-0">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="publisher__info PPublisTime">
                                                        <div className="publisher__name PrintPublisTime d-block position-relative">
                                                            <b>{singlePost?.publisher_name}</b>
                                                        </div>
                                                        <div> প্রকাশিত: {formatBanglaDateTime(singlePost.created_at)}
                                                            <br/>
                                                            {singlePost.last_update_by && (
                                                                <>আপডেট: {formatBanglaDateTime(singlePost.last_update_at)}</>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 text-end float-right">
                                                    <div className="share-btn mt-4">
                                                        {/* ShareThis BEGIN */}
                                                        {/* <div className="sharethis-inline-share-buttons" data-title={singlePost.headline} data-url={singlePost.id}></div> */}
                                                        {/* ShareThis END  */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>

                                    <div className="content_body">
                                        {/* Video or Featured Image */}
                                        {(!singlePost.video_url || singlePost.video_url.trim() === "") ? (
                                            <LazyLoadImage
                                            src={singlePost.featured_image}
                                            alt={singlePost.featured_image_caption || singlePost.headline}
                                            className="img-fluid w-100 PImg"
                                            effect={null}
                                            placeholderSrc=""
                                            />
                                        ) : (
                                            <div className="video">
                                            <div className="panel-body">
                                                {/* Replace this with your actual video embed logic */}
                                                {postVideoStream(singlePost.video_from, singlePost.video_id)}
                                            </div>
                                            </div>
                                        )}

                                        {/* Podcast */}
                                        {singlePost.podcast && singlePost.podcast.trim() !== "" && (
                                            <div className="podcast mt-3">
                                            <span>পডকাস্ট:</span>
                                            <audio controls autoPlay>
                                                {/* Fallback for audio */}
                                                <source src={`/podcast/${singlePost.podcast}`} type="audio/mpeg" />
                                                <source src={`/podcast/${singlePost.podcast.replace(".mp3", ".ogg")}`} type="audio/ogg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                            </div>
                                        )}
                                    </div>

                                    <div className="content_text mt-3">
                                        <div id="postContent" className="PContent singleContent360">
                                            <p><b>{singlePost?.excerpt}</b></p>
                                            {parse(singlePost.post_content)}
                                        </div>
                                        <div className="tag mb-4">
                                            <p>
                                                {singlePost.user_id && singlePost.user && (
                                                    <b>{singlePost.user.short_name}</b>
                                                )}
                                            </p>
                                        </div>
                                        <div className="tag mb-4">
                                            <p>
                                                {singlePost.tags && singlePost.tags.length > 0 && (
                                                    singlePost.tags.map((tag) => (
                                                        <Link key={tag.id} to={`/topic/${tag.slug || tag.name}`}>{tag.name}</Link>
                                                    ))
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="comment mt-5">
                                    <p className="mb-0"><b>আপনার মূল্যবান মতামত দিন:</b></p>
                                    <div className="cmnt__bar d-none"></div>
                                    {/* <div id="fb-root"></div>
                                    <script async defer crossorigin="anonymous"
                                            src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v8.0&appId=348966578805818&autoLogAppEvents=1"></script>
                                    <div className="fb-comments" data-href="{{ url()->current() }}"
                                        data-numposts="10"
                                        data-width=""></div> */}
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="sidebar">
                                    <div className="fb__page d-block d-md-none d-lg-none text-center mb-3">
                                        <div className="fb-page" data-href={setting?.facebook} data-tabs=""
                                            data-width="" data-height="" data-small-header="false"
                                            data-adapt-container-width="true"
                                            data-hide-cover="false" data-show-facepile="true"></div>
                                    </div>
                                    <div className="block__ads sqr text-center ads__mbl mb-3">
                                        <div className="title">
                                            <span>বিজ্ঞাপন</span>
                                        </div>
                                        {thirdAd && (
                                            <div key={thirdAd.id} className="matter__square">
                                                {thirdAd.url ? (
                                                <a
                                                    href={thirdAd.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <LazyLoadImage
                                                    className="img-fluid"
                                                    src={thirdAd.photo}
                                                    alt={thirdAd.name || "Advertisement"}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                    />
                                                </a>
                                                ) : (
                                                <LazyLoadImage
                                                    className="img-fluid"
                                                    src={thirdAd.photo}
                                                    alt={thirdAd.name || "Advertisement"}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="popular__home mb-3">
                                        <div className="popularNews__hm">
                                            <div className="heading w-100">
                                                <h4 className="mb-0">জনপ্রিয়</h4>
                                            </div>
                                            <div className="list-content">
                                                <div className="popular-post">
                                                    {loading
                                                        ? Array.from({ length: 7 }).map((_, index) => (
                                                            <div key={index} className="item mb-2">
                                                            <div className="row align-items-center">
                                                                <div className="col-2 text-end">
                                                                <Skeleton height={20} width={20} />
                                                                </div>
                                                                <div className="col-10">
                                                                <Skeleton height={20} width="90%" />
                                                                </div>
                                                            </div>
                                                            </div>
                                                        ))
                                                        : popularPosts.map((post, index) => {
                                                            const formattedIndex = new Intl.NumberFormat("bn-BD").format(
                                                            index + 1
                                                            );
                                                            const categorySlug =
                                                            post.categories && post.categories.length > 0
                                                                ? post.categories[0].slug
                                                                : "undefine";

                                                            return (
                                                            <div key={post.id} className="item mb-2">
                                                                <div className="row align-items-center">
                                                                <div className="col-2 text-end">
                                                                    <span className="sn">{formattedIndex}</span>
                                                                </div>
                                                                <div className="col-10">
                                                                    <Link to={`/${categorySlug}/article/${post.uniqid}`}>
                                                                    <h4 className="mb-0 pt-1">{post.headline}</h4>
                                                                    </Link>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="block__ads sqr text-center ads__mbl mb-3">
                                        <div className="title">
                                            <span>বিজ্ঞাপন</span>
                                        </div>
                                        {fourthAd && (
                                            <div key={fourthAd.id} className="matter__square">
                                                {fourthAd.url ? (
                                                <a
                                                    href={fourthAd.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <LazyLoadImage
                                                    className="img-fluid"
                                                    src={fourthAd.photo}
                                                    alt={fourthAd.name || "Advertisement"}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                    />
                                                </a>
                                                ) : (
                                                <LazyLoadImage
                                                    className="img-fluid"
                                                    src={fourthAd.photo}
                                                    alt={fourthAd.name || "Advertisement"}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                />
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="popular__home mb-3">
                                        <div className="popularNews__hm">
                                            <div className="heading w-100">
                                                <h4 className="mb-0">সর্বশেষ</h4>
                                            </div>
                                            <div className="list-content">
                                                <div className="latestNews">
                                                    {latestPosts.map((post, index) => {
                                                        const formattedIndex = new Intl.NumberFormat("bn-BD").format(
                                                            index + 1
                                                        );
                                                        const categorySlug = post.categories && post.categories.length > 0 
                                                            ? post.categories[0].slug 
                                                            : "undefine"; // fallback if no category

                                                        return (
                                                            <div key={post.id} className="item ps-2">
                                                                <div className="row">
                                                                    <div className="col-2 text-end">
                                                                        <span className="sn">{formattedIndex}</span>
                                                                    </div>
                                                                    <div className="col-10 align-self-center">
                                                                        <Link to={`/${categorySlug}/article/${post.uniqid}`} >
                                                                            <h4 className="mb-0 pt-1">{post.headline}</h4>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="follow__btn__mbl d-block d-md-none d-lg-none text-center my-4">
                                        <span className="d-block mb-3">- আমাদের ফলো করুন -</span>

                                        <a
                                            href={setting.facebook}
                                            className="facebook"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ background: "#226ed3", color:"White", padding:"10px", marginRight:"5px", fontSize:"18px" }}
                                        >
                                            <FaFacebookF />
                                        </a>

                                        <a
                                            href={setting.twitter}
                                            className="twitter"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ background: "#1d9bf0", color:"White", padding:"10px", marginRight:"5px", fontSize:"18px" }}
                                        >
                                            <FaTwitter />
                                        </a>

                                        <a
                                            href={setting.youtube}
                                            className="youtube"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ background: "#ff0000", color:"White", padding:"10px", marginRight:"5px", fontSize:"18px" }}
                                        >
                                            <FaYoutube />
                                        </a>

                                        <a
                                            href={setting.instagram || "#"}
                                            className="instagram social__icon"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ background: "#c038be", color:"White", padding:"10px", marginRight:"5px", fontSize:"18px" }}
                                        >
                                            <FaInstagram />
                                        </a>

                                        <a
                                            href={setting.linkedin || "#"}
                                            className="linkedin social__icon d-none"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ background: "#0077b5", color:"White", padding:"10px", fontSize:"18px" }}
                                        >
                                            <FaLinkedin />
                                        </a>
                                        </div>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 m-auto">
                        <div className="single_page more_news pt-5 pb-1">
                            <h4 className="heading"><b>সম্পর্কিত খবর</b></h4>
                            <div className="cmnt__bar"></div>

                            <div className="row d-flex flex-wrap align-items-stretch">
                            {loading
                                ? Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="col-md-3 col-sm-6 col-6 d-flex">
                                    <div className="single-page-block mb-3 w-100">
                                        <div className="link-hover-homepage mb-4 d-flex flex-column">
                                        <Skeleton
                                            height={180} // approximate image height
                                            width="100%"
                                            className="mb-2"
                                        />
                                        <Skeleton height={20} width="90%" className="mb-1" />
                                        <Skeleton height={20} width="70%" />
                                        </div>
                                    </div>
                                    </div>
                                ))
                                : categoryRelatedPosts.map((post) => {
                                    const categorySlug =
                                    post.categories && post.categories.length > 0
                                        ? post.categories[0].slug
                                        : "undefine";

                                    return (
                                    <div key={post.id} className="col-md-3 col-sm-6 col-6 d-flex">
                                        <div className="single-page-block mb-3 w-100">
                                        <div className="link-hover-homepage mb-4 d-flex flex-column">
                                            <Link
                                            to={`/${categorySlug}/article/${post.uniqid}`}
                                            className="d-flex flex-column"
                                            >
                                            <div className="thumbnail position-relative">
                                                <LazyLoadImage
                                                className="img-fluid"
                                                src={post.featured_image}
                                                alt={post.headline}
                                                effect="blur"
                                                placeholderSrc="/placeholder.jpg"
                                                />
                                            </div>
                                            <div className="rltd__content__title p-3 mt-auto">
                                                <h5 className="mb-0">
                                                {post.headline
                                                    ? post.headline.length > 60
                                                    ? post.headline.slice(0, 60) + "..."
                                                    : post.headline
                                                    : ""}
                                                </h5>
                                            </div>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                
            </section>    
        </div>
    </>
  );
};
export default PostSingle;
