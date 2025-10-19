import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Polls from './Polls';
import axios from 'axios';

const LeadPost = () => {
    const [setting, setSetting] = useState(null);
    const [firstPost, setFirstPost] = useState(null);
    const [secondPost, setSecondPost] = useState([]);
    const [thirdPosts, setThirdPosts] = useState([]);
    const [fourthPosts, setFourthPosts] = useState([]);
    const [fifthPosts, setFifthPosts] = useState([]);
    // ads
    const [fiveAd, setFiveAd] = useState(null);
    const [threeAd, setThreeAd] = useState(null);
    
    useEffect(() => {
        axios.get(`/ad/5`)
            .then(response => {
            setFiveAd(response.data.data);
            })
            .catch(error => {
            console.error('Ad fetch error:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/ad/3`)
            .then(response => {
            setThreeAd(response.data.data);
            })
            .catch(error => {
            console.error('Ad fetch error:', error);
            });
    }, []);
    


    useEffect(() => {
        axios.get(`/lead-post/1`)
            .then(response => {
            setSetting(response.data.setting || null);
            setFirstPost(response.data.data);
            })
            .catch(error => {
            console.error('Error fetching first lead post:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/lead-post/2/1`)
            .then(response => {
            setSecondPost(response.data.data);
            })
            .catch(error => {
            console.error('Error fetching second lead post:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/lead-post/3/3`)
            .then(response => {
            setThirdPosts(response.data.data);
            })
            .catch(error => {
            console.error('Error fetching third lead post:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/lead-post/6/6`)
            .then(response => {
            setFourthPosts(response.data.data);
            })
            .catch(error => {
            console.error('Error fetching fourth lead post:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/lead-post/6/1`)
            .then(response => {
            setFifthPosts(response.data.data);
            })
            .catch(error => {
            console.error('Error fetching fifth lead post:', error);
            });
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

            <section className="home__top sec__lead pt-4">
                {/* Lead Tag Section */}
                
                {/* Sticky Posts Sidebar */}
                <div className="container">
                    <div className="row">
                        {/* first slot */}
                        <div className="border__right col-lg-3 order-2 order-lg-1">
                            <div className="left__block d-none d-lg-block d-xl-block d-xxl-block">
                                { fourthPosts.map((post, index) => (
                                    <div key={post.id}  className="link-hover-homepage border__btm mb-3 pb-3">
                                        <div className="row">
                                            <div className="col-md-8 col-8">
                                                <div className="media-body">
                                                    <Link to={`${post.category_slug}/article/${post.uniqid}`}>
                                                    <h4>{ post.headline }</h4>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-4">
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
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* second slot */}
                        <div className='col-lg-6 order-1 order-lg-2'>
                            <div className='middle__block'>
                                <div className="link-hover-homepage border__btm mb-3 pb-3">
                                    {firstPost && ( 
                                        <div  key={firstPost.id} className="row">
                                            <div className="col-md-6">
                                                <div className="media">
                                                    <Link to={`${firstPost.category_slug}/article/${firstPost.uniqid}`}>
                                                        <LazyLoadImage
                                                            src={firstPost.featured_image}
                                                            alt={firstPost.headline}
                                                            effect="blur"
                                                            placeholderSrc="/placeholder.jpg"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="media-body pe-2">
                                                    <Link to={`${firstPost.category_slug}/article/${firstPost.uniqid}`}>
                                                        <h3>{firstPost.headline} hh</h3>
                                                    </Link>
                                                    <div className="intro">
                                                        <p className="d-none d-md-block d-lg-block mb-0 mt-3" style={{ display: "inline-block", important: "true" }} >{firstPost.excerpt ? (firstPost.excerpt.length > 110 ? firstPost.excerpt.slice(0, 110) + "..." : firstPost.excerpt) : ""}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="middle__block2 border__btm mb-3 pb-3 d-none d-md-block">
                                    <div className="row">
                                        { secondPost.map((post, index) => (
                                            <div key={post.id} className="col-md-6">
                                                <div className="link-hover-homepage">
                                                    <div className="row">
                                                        <div className="col-md-8 col-8 ">
                                                            <div className="media-body pe-2">
                                                                <Link to={`${post.category_slug}/article/${post.uniqid}`}>
                                                                    <h4>{ post.headline }</h4>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-4">
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
                                                        </div>
                                                    </div>
                                                    <div className="intro">
                                                        <p className="d-none d-md-block d-lg-block mb-0 mt-3" style={{ display: "inline-block", important: "true" }} >{post.excerpt ? (post.excerpt.length > 110 ? post.excerpt.slice(0, 110) + "..." : post.excerpt) : ""}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="middle__block2 block__lead__mbl mb-3 pb-3 d-block d-md-none">
                                    <div className="row">
                                        { fifthPosts.map((post, index) => (
                                            <div key={post.id} className="col-md-6">
                                                <div className="link-hover-homepage">
                                                    <div className="row">
                                                        <div className="col-md-8 col-7">
                                                            <div className="media-body pe-2">
                                                                <Link to={`${post.category_slug}/article/${post.uniqid}`}>
                                                                    <h4>{ post.headline }</h4>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-5">
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
                                                        </div>
                                                    </div>
                                                    <div className="intro">
                                                        <p className="d-none d-md-block d-lg-block mb-0 mt-3" style={{ display: "inline-block", important: "true" }} >{post.excerpt ? (post.excerpt.length > 110 ? post.excerpt.slice(0, 110) + "..." : post.excerpt) : ""}</p>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="middle__block3 pb-3 mb-3 d-none d-md-block">
                                    <div className="row">
                                        { thirdPosts.map((post, index) => (
                                            <div key={post.id} className="col-md-4 border__right__2 col-6">
                                                <div className="link-hover-homepage">
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
                                                    <div className="media-body">
                                                        <Link to={`${post.category_slug}/article/${post.uniqid}`}>
                                                            <h4>{ post.headline }</h4>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* third slot */}
                        <div className="col-lg-3 border__left order-3 order-lg-3">
                            <div className="right__block">
                                {fiveAd && (
                                <div className="ads ads_6 ads__mbl mb-3 text-center">
                                    {fiveAd.url ? (
                                        <a href={fiveAd.url} target="_blank" rel="noopener noreferrer">
                                            <LazyLoadImage
                                                className="img-fluid"
                                                src={fiveAd.photo}
                                                alt={fiveAd.name || "Advertisement"}
                                                effect="blur"
                                                placeholderSrc="/placeholder.jpg"
                                            />
                                        </a>
                                    ) : (
                                        <LazyLoadImage
                                                className="img-fluid"
                                                src={fiveAd.photo}
                                                alt={fiveAd.name || "Advertisement"}
                                                effect="blur"
                                                placeholderSrc="/placeholder.jpg"
                                            />  
                                    )}
                                </div>
                                )} 

                                {/* //poll */}
                                <Polls/>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        <div className="ads__section py-3">
            <div className="container">
                {threeAd && (
                <div className="matter__banner">
                    {threeAd.url ? (
                        <a href={threeAd.url} target="_blank" rel="noopener noreferrer">
                            <LazyLoadImage
                                className="img-fluid"
                                src={threeAd.photo}
                                alt={threeAd.name || "Advertisement"}
                                effect="blur"
                                placeholderSrc="/placeholder.jpg"
                            />
                        </a>
                    ) : (
                        <LazyLoadImage
                                className="img-fluid"
                                src={threeAd.photo}
                                alt={threeAd.name || "Advertisement"}
                                effect="blur"
                                placeholderSrc="/placeholder.jpg"
                            />  
                    )}
                </div>
                )} 
            </div>
        </div>
               
         
        </>
    );    
};

export default LeadPost;
