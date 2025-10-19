import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { getBanglaAgoTime } from '../utils/bnTime';
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import { truncateWords } from '../utils/truncateWords';
import { Tab, Nav } from 'react-bootstrap';
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const HomePageFourthSection = () => {
    const [entertainment, setEntertainment] = useState(null);
    const [it, setIt] = useState(null);
    const [entertainmentOne, setEntertainmentOne] = useState(null);
    const [entertainmentThree, setEntertainmentThree] = useState([]);
    const [itFive, setItFive] = useState([]);
    const [itBottomAd, setItBottomAd] = useState(null);
    const [sports, setSports] = useState(null);
    const [sportsOne, setSportsOne] = useState(null);
    const [sportsTwo, setSportsTwo] = useState([]);
    const [sportsThree, setSportsThree] = useState([]);
    const [sportsThreeSecond, setSportsThreeSecond] = useState([]);
    const [sportsTopLeftAd, setSportsTopLeftAd] = useState(null);
    const [sportsTopRightAd, setSportsTopRightAd] = useState(null);

    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [loadingDivisions, setLoadingDivisions] = useState(true);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingUpazilas, setLoadingUpazilas] = useState(false);

    const [country, setCountry] = useState(null);
    const [countryOne, setCountryOne] = useState(null);
    const [countryFour, setCountryFour] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [latestPopularTopAd, setLatestPopularTopAd] = useState(null); //position 9

    const [tours, setTours] = useState(null);
    const [toursFour, setToursFour] = useState([]);

    const [subEditorial, setSubEditorial] = useState(null);
    const [subEditorialSix, setSubEditorialSix] = useState([]);

    const [videoOne, setVideoOne] = useState(null);
    const [videoFive, setVideoFive] = useState([]);

    const [videoBottomAd, setVideoBottomAd] = useState(null); //position 10

    const [bichitro, setBichitro] = useState(null);
    const [bichitroOne, setBichitroOne] = useState(null);
    const [bichitroFour, setBichitroFour] = useState([]);

    const [women, setWomen] = useState(null);
    const [womenOne, setWomenOne] = useState(null);
    const [womenFour, setWomenFour] = useState([]);

    const [lifestyle, setLifestyle] = useState(null);
    const [lifestyleOne, setLifestyleOne] = useState(null);
    const [lifestyleThree, setLifestyleThree] = useState([]);

    const [health, setHealth] = useState(null);
    const [healthFour, setHealthFour] = useState([]);

    const [lawAndRights, setLawAndRights] = useState(null);
    const [lawAndRightsOne, setLawAndRightsOne] = useState(null);
    const [lawAndRightsThree, setLawAndRightsThree] = useState([]);

    const [education, setEducation] = useState(null);
    const [educationOne, setEducationOne] = useState(null);
    const [educationThree, setEducationThree] = useState([]);

    const [jobs, setJobs] = useState(null);
    const [jobsOne, setJobsOne] = useState(null);
    const [jobsThree, setJobsThree] = useState([]);

    const [probas, setProbas] = useState(null);
    const [probasOne, setProbasOne] = useState(null);
    const [probasThree, setProbasThree] = useState([])

    const [bankStockmarket, setBankStockmarket] = useState(null);
    const [bankStockmarketOne, setBankStockmarketOne] = useState(null);
    const [bankStockmarketThree, setBankStockmarketThree] = useState([]);

    const [softStory, setSoftStory] = useState(null);
    const [softStoryOne, setSoftStoryOne] = useState(null);
    const [softStoryThree, setSoftStoryThree] = useState([]);

    const [literature, setLiterature] = useState(null);
    const [literatureOne, setLiteratureOne] = useState(null);
    const [literatureThree, setLiteratureThree] = useState([]);

    const [agriculture, setAgriculture] = useState(null);
    const [agricultureOne, setAgricultureOne] = useState(null);
    const [agricultureThree, setAgricultureThree] = useState([]);

    const [photoOne, setPhotoOne] = useState(null);
    const [photoFour, setPhotoFour] = useState([]);
    


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchPosts = async () => {
            try {
                setLoading(true);
                setLoadingDivisions(true);
                const response = await axios.get(`/home-fourth-section`);
                if (isMounted) {
                    setItBottomAd(response.data.itBottomAd || null);
                    setEntertainment(response.data.entertainment || null);
                    setEntertainmentOne(response.data.entertainmentOne || null);
                    setEntertainmentThree(response.data.entertainmentThree || []);
                    setIt(response.data.it || null);
                    setItFive(response.data.itFive || []);
                    setSports(response.data.sports || null);
                    setSportsOne(response.data.sportsOne || null);
                    setSportsTwo(response.data.sportsTwo || []);
                    setSportsThree(response.data.sportsThree || []);
                    setSportsThreeSecond(response.data.sportsThreeSecond || []);
                    setSportsTopLeftAd(response.data.sportsTopLeftAd || null);
                    setSportsTopRightAd(response.data.sportsTopRightAd || null);

                    setDivisions(response.data.divisions || []);

                    setCountry(response.data.country || null);
                    setCountryOne(response.data.countryOne || null);
                    setCountryFour(response.data.countryFour || []);
                    setLatestPosts(response.data.latestPosts || []);
                    setPopularPosts(response.data.popularPosts || []);
                    setLatestPopularTopAd(response.data.latestPopularTopAd || null);

                    setTours(response.data.tours || null);
                    setToursFour(response.data.toursFour || []);

                    setSubEditorial(response.data.subEditorial || null);
                    setSubEditorialSix(response.data.subEditorialSix || []);

                    setVideoOne(response.data.videoOne || null);
                    setVideoFive(response.data.videoFive || []);

                    setVideoBottomAd(response.data.videoBottomAd || null);

                    setBichitro(response.data.bichitro || null);
                    setBichitroOne(response.data.bichitroOne || null);
                    setBichitroFour(response.data.bichitroFour || []);

                    setWomen(response.data.women || null);
                    setWomenOne(response.data.womenOne || null);
                    setWomenFour(response.data.womenFour || []);

                    setLifestyle(response.data.lifestyle || null);
                    setLifestyleOne(response.data.lifestyleOne || null);
                    setLifestyleThree(response.data.lifestyleThree || []);

                    setHealth(response.data.health || null);
                    setHealthFour(response.data.healthFour || []);

                    setLawAndRights(response.data.lawAndRights || null);
                    setLawAndRightsOne(response.data.lawAndRightsOne || null);
                    setLawAndRightsThree(response.data.lawAndRightsThree || []);

                    setEducation(response.data.education || null);
                    setEducationOne(response.data.educationOne || null);
                    setEducationThree(response.data.educationThree || []);

                    setJobs(response.data.jobs || null);
                    setJobsOne(response.data.jobsOne || null);
                    setJobsThree(response.data.jobsThree || []);

                    setProbas(response.data.probas || null);
                    setProbasOne(response.data.probasOne || null);
                    setProbasThree(response.data.probasThree || []);

                    setBankStockmarket(response.data.bankStockmarket || null);
                    setBankStockmarketOne(response.data.bankStockmarketOne || null);
                    setBankStockmarketThree(response.data.bankStockmarketThree || []);

                    setSoftStory(response.data.softStory || null);
                    setSoftStoryOne(response.data.softStoryOne || null);
                    setSoftStoryThree(response.data.softStoryThree || []);

                    setLiterature(response.data.literature || null);
                    setLiteratureOne(response.data.literatureOne || null);
                    setLiteratureThree(response.data.literatureThree || []);

                    setAgriculture(response.data.agriculture || null);
                    setAgricultureOne(response.data.agricultureOne || null);
                    setAgricultureThree(response.data.agricultureThree || []);

                    setPhotoOne(response.data.photoOne || null);
                    setPhotoFour(response.data.photoFour || []);
                    
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Error fetching posts:", err);
                    setError("Could not load posts. Please try again later.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchPosts();
        return () => { isMounted = false; };
    }, []);


    // ✅ Fetch districts when division changes
    useEffect(() => {
    if (selectedDivision) {
        axios
        .get(`/locations?division_id=${selectedDivision}`)
        .then((res) => {
            setDistricts(res.data);
            setUpazilas([]); // reset upazilas
            setSelectedDistrict("");
            setSelectedUpazila("");
        });
    }
    }, [selectedDivision]);

    // glightbox photoOne
    useEffect(() => {
    if (!loading && photoOne.length > 0) {
      const lightbox = GLightbox({
        selector: '.portfolio-lightbox',
        loop: true
      });

      // Clean up to prevent multiple instances
      return () => lightbox.destroy();
    }
  }, [loading, photoOne]);
  // glightbox photoFour
  useEffect(() => {
    if (!loading && photoFour.length > 0) {
      const lightbox = GLightbox({
        selector: ".portfolio-lightbox",
        loop: true,
      });

      // Cleanup to avoid duplicate instances
      return () => lightbox.destroy();
    }
  }, [loading, photoFour]);

    // ✅ Fetch upazilas when district changes
    useEffect(() => {
    if (selectedDistrict) {
        axios
        .get(`/locations?district_id=${selectedDistrict}`)
        .then((res) => {
            setUpazilas(res.data);
            setSelectedUpazila("");
        });
    }
    }, [selectedDistrict]);


    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .get("/api/location-news", {
            params: {
            division_id: selectedDivision,
            district_id: selectedDistrict,
            upazila_id: selectedUpazila,
            },
        })
        .then((res) => {
            console.log("News:", res.data);
            console.log("Related Districts:", res.data.related_district);
            console.log("Related Upazilas:", res.data.related_upazila);

            // store in state if needed
            // setNews(res.data.news);
            // setDistricts(res.data.related_district || []);
            // setUpazilas(res.data.related_upazila || []);
        })
        .catch((err) => console.error(err));

    };

    const renderSkeletonMain = () => (
        <div className="cat-lead-single">
            <Skeleton height={200} />
            <Skeleton count={2} style={{ marginTop: "10px" }} />
        </div>
    );

    const renderSkeletonList = () => (
        Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="link-hover-homepage mb-3 border__btm d-flex justify-content-between">
                <div className="media-body pe-2">
                    <Skeleton height={20} width={`70%`} />
                </div>
                <div style={{ width: "40%" }}>
                    <Skeleton height={50} width={`100%`} />
                </div>
            </div>
        ))
    );




    const renderCategoryBlock = (category, mainPost, posts) => (
        <div className="col-md-3 mb-4">
            <div className="category-bg-2 mb__block">
                <div className="border__cat__top mb-2"></div>
                <div className="category-heading">
                    {loading ? <Skeleton width={100} /> :
                        category ? <Link to={`/${category.slug}`}>{category.name}</Link> : null
                    }
                </div>
                <div className="item__lead">
                    {loading ? (
                        <div className="position-relative mb-4">
                            <Skeleton height={150} />
                            <Skeleton height={20} style={{ marginTop: "10px" }} />
                        </div>
                    ) : mainPost && (
                        <div className="link-hover-homepage position-relative mb-4">
                            <Link to={`/${category.slug}/article/${mainPost.uniqid}`}>
                                <div className="media">
                                    <LazyLoadImage
                                        className="img-fluid"
                                        src={mainPost.featured_image}
                                        alt={mainPost.headline}
                                        effect="blur"
                                        placeholderSrc="/placeholder.jpg"
                                    />
                                </div>
                                <div className="caption">
                                    <h4 className="mb-0 p-2">{mainPost.headline}</h4>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="block__child">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="link-hover-homepage mb-3 d-flex">
                                <div className="media-left pe-2" style={{ width: "40%" }}>
                                    <Skeleton height={80} width={`100%`} />
                                </div>
                                <div className="media-body">
                                    <Skeleton height={20} width={`70%`} />
                                    <Skeleton height={20} width={`50%`} style={{ marginTop: "5px" }} />
                                </div>
                            </div>
                        ))
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="link-hover-homepage mb-3">
                                <Link to={`/${category.slug}/article/${post.uniqid}`}>
                                    <div className="media-left pe-2">
                                        <div className="media">
                                            <LazyLoadImage
                                                className="img-fluid w-100"
                                                src={post.featured_image}
                                                alt={post.headline}
                                                effect="blur"
                                                placeholderSrc="/placeholder.jpg"
                                            />
                                        </div>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="mb-0">
                                            {post.headline.length > 45
                                                ? post.headline.substring(0, 45) + "..."
                                                : post.headline}
                                        </h4>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : <p>No posts available.</p>}
                    <div className="more__btn text-center">
                        {loading ? <Skeleton width={60} /> :
                            category ? <Link to={`/${category.slug}`}>আরও</Link> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );



    return (
        <>
        <section className="full__row__9">
            <div className="container">
                <div className="row">

                    {/* Entertainment Section */}
                    <div className="col-md-8 col-lg-8">
                        <div className="panel-small-block-2">
                            <div className="border__cat__top mb-2"></div>
                            <div className="category-heading">
                                {loading ? <Skeleton width={120} /> :
                                 entertainment ? (
                                    <Link to={`/${entertainment.slug}`}>{entertainment.name}</Link>
                                 ) : <span>Loading...</span>}
                            </div>

                            <div className="block__main">
                                <div className="row">
                                    <div className="col-md-12 border__right">
                                        {loading ? (
                                            <Skeleton height={300} />
                                        ) : entertainmentOne && (
                                            <div key={entertainmentOne.id} className="link-hover-homepage mb-3 d-grid">
                                                <Link to={`/${entertainment.slug}/article/${entertainmentOne.uniqid}`}>
                                                    <div className="media">
                                                        <LazyLoadImage
                                                            className="img-fluid w-100"
                                                            src={entertainmentOne.featured_image}
                                                            alt={entertainmentOne.headline}
                                                            effect={null}
                                                            placeholderSrc=""
                                                        />
                                                        <div className="media-title">
                                                            <h3>{ entertainmentOne.headline }</h3>
                                                            <p className="d-none d-md-block d-lg-block" style={{ width: '90%', color: '#fff' }}>
                                                                { entertainmentOne.excerpt.length > 150
                                                                    ? entertainmentOne.excerpt.substring(0, 150) + "..."
                                                                    : entertainmentOne.excerpt }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="block__child mb__mbl">
                                {loading ? (
                                    <div className="row d-flex justify-content-center">
                                        {[1,2,3].map((i) => (
                                            <div key={i} className="col-md-4 col-12 mb-3">
                                                <Skeleton height={200} />
                                                <Skeleton count={2} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="row d-flex justify-content-center">
                                        {entertainmentThree.length > 0 ? (
                                            entertainmentThree.map((post) => (
                                                <div key={post.id} className="col-md-4 col-12">
                                                    <div className="link-hover-homepage mb-3">
                                                        <Link to={`/${entertainment.slug}/article/${post.uniqid}`}>
                                                            <div className="box__shadow">
                                                                <LazyLoadImage
                                                                    className="img-fluid w-100"
                                                                    src={post.featured_image}
                                                                    alt={post.headline}
                                                                    effect="blur"
                                                                    placeholderSrc="/placeholder.jpg"
                                                                />
                                                                <div className="title__box p-2 p-lg-4">
                                                                    <h4>{post.headline.length > 45 ? post.headline.substring(0,45)+"..." : post.headline}</h4>
                                                                    <p className="d-none d-md-block d-lg-block d-xl-block d-xxl-block">
                                                                        {post.excerpt.length > 70 ? post.excerpt.substring(0,70)+"..." : post.excerpt}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : <p>No posts available.</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* IT Section */}
                    <div className="col-md-4 mb__mbl">
                        <div className="panel-small-block-2">
                            <div className="border__cat__top mb-2"></div>
                            <div className="category-heading">
                                {loading ? <Skeleton width={80} /> :
                                 it ? <Link to={`/${it.slug}`}>{it.name}</Link> : <span>Loading...</span>}
                            </div>

                            <div className="cat__block__main">
                                {loading ? (
                                    <>
                                        {[1,2,3,4].map((i) => (
                                            <div key={i} className="mb-3 d-flex">
                                                <Skeleton width={60} height={60} style={{ marginRight: '10px' }} />
                                                <Skeleton count={2} width={200} />
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    itFive.length > 0 ? itFive.map(post => (
                                        <div key={post.id} className="link-hover-homepage mb-3">
                                            <Link to={`/${it.slug}/article/${post.uniqid}`}>
                                                <div className="media-body pe-1">
                                                    <h4 className="lead__title">{post.headline}</h4>
                                                    <time className="py-1">{getBanglaAgoTime(post.created_at)}</time>
                                                </div>
                                                <div className="media-left float-right" style={{ width: '40%' }}>
                                                    <LazyLoadImage
                                                        className="media-object"
                                                        src={post.featured_image}
                                                        alt={post.headline}
                                                        effect="blur"
                                                        placeholderSrc="/placeholder.jpg"
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    )) : <p>No posts available.</p>
                                )}
                            </div>

                        </div>

                        <div className="ads__section">
                            {loading ? <Skeleton height={150} /> :
                                itBottomAd && (
                                    <div key={itBottomAd.id} className="matter__square text-center">
                                        {itBottomAd.url ? (
                                            <a href={itBottomAd.url} target="_blank" rel="noopener noreferrer">
                                                <LazyLoadImage
                                                    className="img-fluid"
                                                    src={itBottomAd.photo}
                                                    alt={itBottomAd.name || "Advertisement"}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                />
                                            </a>
                                        ) : (
                                            <LazyLoadImage
                                                className="img-fluid"
                                                src={itBottomAd.photo}
                                                alt={itBottomAd.name || "Advertisement"}
                                                effect="blur"
                                                placeholderSrc="/placeholder.jpg"
                                            />
                                        )}
                                    </div>
                                )}
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section className="full__row__9 sec__6">
            <div className="container">
                <div className="border__cat__top mb-2"></div>
                <div className="category-heading">
                    {loading ? <Skeleton width={120} /> : (
                        sports ? <Link to={`/${sports.slug}`}>{sports.name}</Link> : <span>No Category</span>
                    )}
                </div>

                <div className="block__main">
                    <div className="row">

                        {/* Left Sidebar */}
                        <div className="col-lg-3 order-2 order-lg-1 border__right__2">
                            <div className="ads__section mb-3">
                                {loading ? <Skeleton height={150} /> : (
                                    sportsTopLeftAd && (
                                        <div key={sportsTopLeftAd.id} className="matter__square text-center">
                                            {sportsTopLeftAd.url ? (
                                                <a href={sportsTopLeftAd.url} target="_blank" rel="noopener noreferrer">
                                                    <LazyLoadImage
                                                        className="img-fluid"
                                                        src={sportsTopLeftAd.photo}
                                                        alt={sportsTopLeftAd.name || "Ad"}
                                                        effect="blur"
                                                        placeholderSrc="/placeholder.jpg"
                                                    />
                                                </a>
                                            ) : (
                                                <LazyLoadImage
                                                    className="img-fluid"
                                                    src={sportsTopLeftAd.photo}
                                                    alt={sportsTopLeftAd.name || "Ad"}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                />
                                            )}
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="cat__block__main">
                                {loading ? (
                                    [1,2,3].map(i => (
                                        <div key={i} className="mb-3 d-flex align-items-center">
                                            <Skeleton width={60} height={60} style={{ marginRight: 10 }} />
                                            <Skeleton width={100} />
                                        </div>
                                    ))
                                ) : (
                                    sportsThreeSecond.length > 0 ? sportsThreeSecond.map(post => (
                                        <div key={post.id} className="link-hover-homepage mb-3 border__btm">
                                            <Link to={`/${sports.slug}/article/${post.uniqid}`}>
                                                <div className="media-left" style={{ width: '40%' }}>
                                                    <LazyLoadImage
                                                        className="media-object"
                                                        src={post.featured_image}
                                                        alt={post.headline}
                                                        effect="blur"
                                                        placeholderSrc="/placeholder.jpg"
                                                    />
                                                </div>
                                                <div className="media-body ps-1">
                                                    <h4 className="lead__title">{post.headline}</h4>
                                                </div>
                                            </Link>
                                        </div>
                                    )) : <p>No posts available.</p>
                                )}
                            </div>
                        </div>

                        {/* Center Section */}
                        <div className="border__right__2 col-lg-6 order-1 order-lg-2">
                            <div className="panel-small-block-2">
                                <div className="block__main">
                                    <div className="row">
                                        <div className="col-md-12 border__right">
                                            {loading ? <Skeleton height={300} /> : (
                                                sportsOne && (
                                                    <div className="link-hover-homepage mb-3 d-grid">
                                                        <Link to={`/${sports.slug}/article/${sportsOne.uniqid}`}>
                                                            <LazyLoadImage
                                                                className="img-fluid w-100"
                                                                src={sportsOne.featured_image}
                                                                alt={sportsOne.headline}
                                                                effect="blur"
                                                                placeholderSrc="/placeholder.jpg"
                                                            />
                                                            <div className="media-title">
                                                                <h3>{sportsOne.headline.length > 70 ? sportsOne.headline.substring(0,70)+"..." : sportsOne.headline}</h3>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ backgroundColor: '#05483482', opacity: 1 }} />

                                <div className="block__child mb__mbl">
                                    <div className="row">
                                        {loading ? (
                                            [1,2,3,4].map(i => (
                                                <div key={i} className="col-md-6 col-6 border__right mb-3">
                                                    <Skeleton height={150} />
                                                    <Skeleton width={100} />
                                                </div>
                                            ))
                                        ) : (
                                            sportsTwo.length > 0 ? sportsTwo.map(post => (
                                                <div key={post.id} className="col-md-6 col-6 border__right">
                                                    <div className="link-hover-homepage mb-3">
                                                        <Link to={`/${sports.slug}/article/${post.uniqid}`}>
                                                            <LazyLoadImage
                                                                className="img-fluid w-100"
                                                                src={post.featured_image}
                                                                alt={post.headline}
                                                                effect="blur"
                                                                placeholderSrc="/placeholder.jpg"
                                                            />
                                                            <div className="title__box py-2">
                                                                <h4>{post.headline}</h4>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )) : <p>No posts available.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-lg-3 order-3 order-lg-3">
                            <div className="ads__section mb-3">
                                {loading ? <Skeleton height={150} /> : (
                                    sportsTopRightAd && (
                                        <div key={sportsTopRightAd.id} className="matter__square text-center">
                                            {sportsTopRightAd.url ? (
                                                <a href={sportsTopRightAd.url} target="_blank" rel="noopener noreferrer">
                                                    <LazyLoadImage
                                                        className="img-fluid"
                                                        src={sportsTopRightAd.photo}
                                                        alt={sportsTopRightAd.name || "Ad"}
                                                        effect="blur"
                                                        placeholderSrc="/placeholder.jpg"
                                                    />
                                                </a>
                                            ) : (
                                                <LazyLoadImage
                                                    className="img-fluid"
                                                    src={sportsTopRightAd.photo}
                                                    alt={sportsTopRightAd.name || "Ad"}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                />
                                            )}
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="cat__block__main">
                                {loading ? (
                                    [1,2,3,4].map(i => (
                                        <div key={i} className="mb-3 d-flex align-items-center">
                                            <Skeleton width={60} height={60} style={{ marginRight: 10 }} />
                                            <Skeleton width={100} />
                                        </div>
                                    ))
                                ) : (
                                    sportsThree.length > 0 ? sportsThree.map(post => (
                                        <div key={post.id} className="link-hover-homepage mb-3 border__btm">
                                            <Link to={`/${sports.slug}/article/${post.uniqid}`}>
                                                <div className="media-body pe-1">
                                                    <h4 className="lead__title">{post.headline}</h4>
                                                </div>
                                                <div className="media-left float-right" style={{ width: '40%' }}>
                                                    <LazyLoadImage
                                                        className="media-object"
                                                        src={post.featured_image}
                                                        alt={post.headline}
                                                        effect="blur"
                                                        placeholderSrc="/placeholder.jpg"
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    )) : <p>No posts available.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        {/* <section className="district__block container">
            <div className="container1">
                <div className="category-heading">
                    <a style={{ fontSize: "23px", paddingRight: "10px" }}>আমার এলাকার খবর</a>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        
                        <div className="col-md-3">
                            <div className="form-group my-2">
                                {loadingDivisions ? (
                                    <Skeleton height={40} />
                                ) : (
                                    <select
                                        className="form-control form-select"
                                        value={selectedDivision}
                                        onChange={(e) => setSelectedDivision(e.target.value)}
                                        required
                                    >
                                        <option value="">বিভাগ</option>
                                        {divisions.map((d) => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group my-2">
                                {loadingDistricts ? (
                                    <Skeleton height={40} />
                                ) : (
                                    <select
                                        className="form-control form-select"
                                        value={selectedDistrict}
                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                        disabled={!districts.length}
                                    >
                                        <option value="">জেলা</option>
                                        {districts.map(d => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group my-2">
                                {loadingUpazilas ? (
                                    <Skeleton height={40} />
                                ) : (
                                    <select
                                        className="form-control form-select"
                                        value={selectedUpazila}
                                        onChange={(e) => setSelectedUpazila(e.target.value)}
                                        disabled={!upazilas.length}
                                    >
                                        <option value="">উপজেলা</option>
                                        {upazilas.map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="d-grid gap-2 btn__n__search my-2">
                                <button className="btn btn-primary" type="submit">
                                    <i className="bi bi-search"></i> খুঁজুন
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section> */}

        <section className="block__row__4">
            <div className="container">
                <div className="css__boder__bottom">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="panel-small-block-2">
                                <div className="border__cat__top mb-2"></div>
                                <div className="category-heading">
                                    {loading ? (
                                        <Skeleton width={200} height={25} />
                                    ) : country ? (
                                        <Link to={`/${country.slug}`}>
                                            {country.name}
                                        </Link>
                                    ) : (
                                        <span>Loading...</span>
                                    )}
                                </div>
                                <div className="css_bar"></div>

                                <div className="block__lead">
                                    {loading ? (
                                        <div className="row">
                                            <div className="col-md-8">
                                                <Skeleton height={250} />
                                            </div>
                                            <div className="col-md-4">
                                                <Skeleton count={5} />
                                            </div>
                                        </div>
                                    ) : countryOne ? (
                                        <div key={countryOne.id} className="row">
                                            <div className="col-md-8">
                                                <div className="cat-lead-single block_comn_content">
                                                    <div className="link-hover-homepage">
                                                        <div className="media1">
                                                            <Link to={`/${country.slug}/article/${countryOne.uniqid}`}>
                                                                <LazyLoadImage
                                                                    className="img-fluid w-100"
                                                                    src={countryOne.featured_image}
                                                                    alt={countryOne.headline}
                                                                    effect="blur"
                                                                    placeholderSrc="/placeholder.jpg"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="business__block__content">
                                                    <Link to={`/${country.slug}/article/${countryOne.uniqid}`}>
                                                        <h3>
                                                            <b>{countryOne.headline}</b>
                                                        </h3>
                                                    </Link>
                                                    <p>{countryOne.excerpt}</p>
                                                </div>
                                            </div>  
                                        </div>
                                    ) : null}
                                </div>

                                <hr style={{ marginTop: '14px', marginBottom: '14px', backgroundColor: '#05483482', opacity: 1 }} />

                                <div className="overlay_block_2 d-flex mb__mbl">
                                    <div className="row">
                                        {loading ? (
                                            Array(4).fill(0).map((_, idx) => (
                                                <div key={idx} className="col-md-3 col-6 col-sm-6 mb-3">
                                                    <Skeleton height={200} />
                                                    <Skeleton width={`80%`} />
                                                </div>
                                            ))
                                        ) : countryFour.length > 0 ? (
                                            countryFour.map((post) => (
                                                <div key={post.id} className="border__right col-md-3 col-6 col-sm-6">
                                                    <div className="link-hover-homepage">
                                                        <Link to={`/${country.slug}/article/${post.uniqid}`}>
                                                            <div className="media">
                                                                <LazyLoadImage
                                                                    className="media-object"
                                                                    src={post.featured_image}
                                                                    alt={post.headline}
                                                                    effect="blur"
                                                                    placeholderSrc="/placeholder.jpg"
                                                                />
                                                            </div>
                                                            <h4 className="py-2">{post.headline}</h4>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No posts available.</p>
                                        )}
                                    </div>
                                </div>
                            </div>   
                            <div className="ads__section mb-2 mt-2">
                                {loading ? (
                                    <Skeleton height={200} />
                                ) : latestPopularTopAd && (
                                    <div key={latestPopularTopAd.id} className="matter__square">
                                        {latestPopularTopAd.url ? (
                                            <a href={latestPopularTopAd.url} target="_blank" rel="noopener noreferrer" >
                                                <LazyLoadImage
                                                    className="img-fluid"
                                                    src={latestPopularTopAd.photo}
                                                    alt={latestPopularTopAd.name || "Advertisement"}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                />
                                            </a>
                                        ) : (
                                            <LazyLoadImage
                                                className="img-fluid"
                                                src={latestPopularTopAd.photo}
                                                alt={latestPopularTopAd.name || "Advertisement"}
                                                effect="blur"
                                                placeholderSrc="/placeholder.jpg"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-md-3 mb__mbl">
                            <div className="latest">
                                <div className="latest-popular">
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
                                                                    {post.headline.slice(0, 50)}
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
                                                                    {post.headline.slice(0, 50)}
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
                </div>
            </div>
        </section>   


        <section className="full__row__3">
            <div className="container">
                <div className="border__cat__top mb-2"></div>
                <div className="category-heading">
                    {loading ? (
                        <Skeleton width={200} height={25} />
                    ) : tours ? (
                        <Link to={`/${tours.slug}`}>{tours.name}</Link>
                    ) : (
                        <span>Loading...</span>
                    )}
                </div>

                <div className="overlay_block_6">
                    <div className="row">
                        {loading ? (
                            // Skeleton grid placeholders
                            Array(4).fill(0).map((_, idx) => (
                                <div key={idx} className="border__right col-md-3 col-6 col-sm-12 mb-3">
                                    <Skeleton height={180} />
                                    <Skeleton count={2} style={{ marginTop: 8 }} />
                                </div>
                            ))
                        ) : error ? (
                            <p style={{ color: "red" }}>{error}</p>
                        ) : toursFour.length > 0 ? (
                            toursFour.map((post) => (
                                <div key={post.id} className="border__right col-md-3 col-6 col-sm-12">
                                    <div className="link-hover-homepage mb-2 mb-md-0 mb-lg-0">
                                        <Link to={`/${tours.slug}/article/${post.uniqid}`}>
                                            <div className="media">
                                                <LazyLoadImage
                                                    className="media-object"
                                                    src={post.featured_image}
                                                    alt={post.headline}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                />
                                            </div>
                                            <div className="body__content__child py-3">
                                                <h5>
                                                    {post?.sub_headline && (
                                                        <>
                                                            <span className="sub__heading" dangerouslySetInnerHTML={{ __html: post.sub_headline }} />
                                                            {' / '}
                                                        </>
                                                    )}
                                                    <span dangerouslySetInnerHTML={{ __html: truncateWords(post?.headline, 10) }} />
                                                </h5>
                                            </div>
                                        </Link>
                                        <p className="d-none d-md-block d-lg-block">
                                            {post.excerpt.length > 110
                                                ? post.excerpt.substring(0, 110) + "..."
                                                : post.excerpt
                                            }
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No posts available.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>


        <section className="full__row__11">
            <div className="container">
                <div className="panel-small-block-2">
                    <div className="border__cat__top mb-2"></div>
                    <div className="category-heading">
                        {loading ? (
                            <Skeleton width={150} height={25} />
                        ) : subEditorial ? (
                            <Link to={`/${subEditorial.slug}`}>{subEditorial.name}</Link>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </div>
                    <div className="block__main text-center">
                        <div className="row">
                            {loading ? (
                                // Skeleton placeholders for 6 posts
                                Array(6).fill(0).map((_, idx) => (
                                    <div key={idx} className="col-md-2 col-lg-2 col-6 col-sm-6 mb-3">
                                        <Skeleton height={120} />
                                        <Skeleton width={`80%`} height={20} style={{ marginTop: 6 }} />
                                        <Skeleton width={`90%`} height={20} style={{ marginTop: 6 }} />
                                    </div>
                                ))
                            ) : error ? (
                                <p style={{ color: "red" }}>{error}</p>
                            ) : subEditorialSix.length > 0 ? (
                                subEditorialSix.map((post) => (
                                    <div key={post.id} className="col-md-2 col-lg-2 col-6 col-sm-6">
                                        <div className="link-hover-homepage">
                                            <Link to={`/${subEditorial.slug}/article/${post.uniqid}`}>
                                                <div className="media">
                                                    <LazyLoadImage
                                                        className="media-object"
                                                        src={post.featured_image}
                                                        alt={post.headline}
                                                        effect="blur"
                                                        placeholderSrc="/placeholder.jpg"
                                                    />
                                                </div>
                                                <span className="sub__heading">{ post.sub_headline }</span>
                                                <h4 className="py-2">
                                                    { post.headline.length > 45
                                                        ? post.headline.substring(0, 45) + "..."
                                                        : post.headline }
                                                </h4>
                                            </Link>
                                            <p className="d-none d-md-block d-lg-block d-sm-none">
                                                { post.excerpt.length > 70
                                                    ? post.excerpt.substring(0, 70) + "..."
                                                    : post.excerpt }
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No posts available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section> 


        <section className="block-special home__video bg-dark position-relative">
            <div className="container">
                <div className="border__cat__top mb-2"></div>
                <div className="video-block-main position-relative">
                    <div className="category-heading">
                        <Link to="/videos" className="text-white">
                            ভিডিও
                        </Link>
                    </div>

                    <div className="block-top-2 video__content pb-5 position-relative" style={{ zIndex: 2 }}>
                        <div className="row">
                            <div className="col-md-8">
                                {loading ? (
                                    <Skeleton width={850} height={450}  />
                                ) : error ? (
                                    <p style={{ color: "red" }}>{error}</p>
                                ) : videoOne ? (
                                    <div key={videoOne.id} className="video-top-content pb-3">
                                        <Link to={`/video/${videoOne.uniqid}`}>
                                            <div className="media position-relative">
                                                <i className="bi bi-play-fill"></i>
                                                <LazyLoadImage
                                                    className="img-fluid"
                                                    src={videoOne.thumbnail}
                                                    alt={videoOne.title || "Video"}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                />
                                            </div>
                                            <div className="video__cap">
                                                <h2 className="text-bold-500 py-3 mb-4">{videoOne.title}</h2>
                                            </div>
                                        </Link>
                                    </div>
                                ) : (
                                    <p>No video available.</p>
                                )}
                            </div>

                            <div className="col-md-4">
                                <div className="video-list-2">
                                    {loading ? (
                                        Array(5).fill(0).map((_, idx) => (
                                            <div key={idx} className="item mb-3">
                                                <div className="row">
                                                    <div className="col-lg-5 col-4">
                                                        <Skeleton width={160} height={60} />
                                                    </div>
                                                    <div className="col-lg-7 col-8">
                                                        <Skeleton width={250} height={60} count={2} />
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>
                                        ))
                                    ) : error ? (
                                        <p style={{ color: "red" }}>{error}</p>
                                    ) : videoFive.length > 0 ? (
                                        videoFive.map((video) => (
                                            <div key={video.id} className="item mb-3">
                                                <Link to={`/video/${video.uniqid}`}>
                                                    <div className="row">
                                                        <div className="col-lg-5 col-4">
                                                            <div className="video__thumb position-relative">
                                                                <i className="bi bi-play-fill"></i>
                                                                <LazyLoadImage
                                                                    className="img-fluid"
                                                                    src={video.thumbnail}
                                                                    alt={video.title || "Video"}
                                                                    effect="blur"
                                                                    placeholderSrc="/placeholder.jpg"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-7 col-8">
                                                            <div className="video__caption">
                                                                <h4>
                                                                    {video.title.length > 50
                                                                        ? video.title.substring(0, 50) + "..."
                                                                        : video.title}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No videos available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="ads__section py-5">
            <div className="container text-center">

                {loading ? (
                    <Skeleton height={150} width={`100%`} /> // placeholder skeleton
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : videoBottomAd ? (
                    <div key={videoBottomAd.id} className="matter__square">
                        {videoBottomAd.url ? (
                            <a href={videoBottomAd.url} target="_blank" rel="noopener noreferrer">
                                <LazyLoadImage
                                    className="img-fluid"
                                    src={videoBottomAd.photo}
                                    alt={videoBottomAd.name || "Advertisement"}
                                    effect="blur"
                                    placeholderSrc="/placeholder.jpg"
                                />
                            </a>
                        ) : (
                            <LazyLoadImage
                                className="img-fluid"
                                src={videoBottomAd.photo}
                                alt={videoBottomAd.name || "Advertisement"}
                                effect="blur"
                                placeholderSrc="/placeholder.jpg"
                            />
                        )}
                    </div>
                ) : (
                    <p></p>
                )}

            </div>
        </div>

        <section className="block__row__4 sec__5">
            <div className="container">
                <div className="row">

                    {/* Bichitro Section */}
                    <div className="col-lg-6">
                        <div className="category-heading text-center mt-2">
                            {bichitro ? (
                                <Link to={`/${bichitro.slug}`}>{bichitro.name}</Link>
                            ) : <Skeleton width={150} />}
                        </div>
                        <div className="block__lead">
                            <div className="row">
                                <div className="col-md-6 border__right__2">
                                    {loading ? renderSkeletonMain() :
                                        bichitroOne ? (
                                            <div key={bichitroOne.id} className="cat-lead-single">
                                                <div className="link-hover-homepage">
                                                    <div className="media">
                                                        <Link to={`/${bichitro.slug}/article/${bichitroOne.uniqid}`}>
                                                            <LazyLoadImage
                                                                className="img-fluid w-100"
                                                                src={bichitroOne.featured_image}
                                                                alt={bichitroOne.headline}
                                                                effect="blur"
                                                                placeholderSrc="/placeholder.jpg"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="business__block__content">
                                                        <Link to={`/${bichitro.slug}/article/${bichitroOne.uniqid}`}>
                                                            <h4>
                                                                <b>
                                                                    {bichitroOne?.sub_headline && (
                                                                        <>
                                                                            <span className="sub__heading" dangerouslySetInnerHTML={{ __html: bichitroOne.sub_headline }} />{' / '}
                                                                        </>
                                                                    )}
                                                                    <span dangerouslySetInnerHTML={{ __html: truncateWords(bichitroOne?.headline, 10) }} />
                                                                </b>
                                                            </h4>
                                                        </Link>
                                                        <p dangerouslySetInnerHTML={{ __html: truncateWords(bichitroOne?.excerpt, 35) }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : <p>No post available.</p>
                                    }
                                </div>
                                <div className="col-md-6">
                                    <div className="cat__block__main">
                                        {loading ? renderSkeletonList() :
                                            bichitroFour.length > 0 ? (
                                                bichitroFour.map((post) => (
                                                        
                                                    <div key={post.id} className="link-hover-homepage mb-3 border__btm d-flex justify-content-between">
                                                        <div className="media-body pe-2">
                                                           <Link to={`/${bichitro.slug}/article/${post.uniqid}`}>
                                                           <h4 className="lead__title">{post.headline}</h4></Link> 
                                                        </div>
                                                        <div style={{ width: "40%" }}>
                                                            <Link to={`/${bichitro.slug}/article/${post.uniqid}`}>
                                                            <LazyLoadImage
                                                                className="img-fluid w-100"
                                                                src={post.featured_image}
                                                                alt={post.headline}
                                                                effect="blur"
                                                                placeholderSrc="/placeholder.jpg"
                                                            /></Link> 
                                                        </div>
                                                    </div>
                                                ))
                                            ) : <p>No posts available.</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Women Section */}
                    <div className="col-lg-6 block__2">
                        <div className="category-heading text-center mt-2">
                            {women ? (
                                <Link to={`/${women.slug}`}>{women.name}</Link>
                            ) : <Skeleton width={150} />}
                        </div>
                        <div className="block__lead">
                            <div className="row">
                                <div className="col-md-6 border__right__2">
                                    {loading ? renderSkeletonMain() :
                                        womenOne ? (
                                            <div key={womenOne.id} className="cat-lead-single">
                                                <div className="link-hover-homepage">
                                                    <div className="media">
                                                        <Link to={`/${women.slug}/article/${womenOne.uniqid}`}>
                                                            <LazyLoadImage
                                                                className="img-fluid w-100"
                                                                src={womenOne.featured_image}
                                                                alt={womenOne.headline}
                                                                effect="blur"
                                                                placeholderSrc="/placeholder.jpg"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="business__block__content">
                                                        <Link to={`/${women.slug}/article/${womenOne.uniqid}`}>
                                                            <h4>
                                                                <b>
                                                                    {womenOne?.sub_headline && (
                                                                        <>
                                                                            <span className="sub__heading" dangerouslySetInnerHTML={{ __html: womenOne.sub_headline }} />{' / '}
                                                                        </>
                                                                    )}
                                                                    <span dangerouslySetInnerHTML={{ __html: truncateWords(womenOne?.headline, 10) }} />
                                                                </b>
                                                            </h4>
                                                        </Link>
                                                        <p dangerouslySetInnerHTML={{ __html: truncateWords(womenOne?.excerpt, 35) }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : <p>No post available.</p>
                                    }
                                </div>
                                <div className="col-md-6">
                                    <div className="cat__block__main">
                                        {loading ? renderSkeletonList() :
                                            womenFour.length > 0 ? (
                                                womenFour.map((post) => (
                                                    <div key={post.id} className="link-hover-homepage mb-3 border__btm d-flex justify-content-between">
                                                        <div className="media-body pe-2">
                                                            <Link to={`/${women.slug}/article/${post.uniqid}`}>
                                                                <h4 className="lead__title">{post.headline}</h4>
                                                            </Link>
                                                        </div>
                                                        <div style={{ width: "40%" }}>
                                                            <Link to={`/${women.slug}/article/${post.uniqid}`}>
                                                                <LazyLoadImage
                                                                    className="img-fluid w-100"
                                                                    src={post.featured_image}
                                                                    alt={post.headline}
                                                                    effect="blur"
                                                                    placeholderSrc="/placeholder.jpg"
                                                                />
                                                            </Link>
                                                            
                                                        </div>
                                                    </div>
                                                ))
                                            ) : <p>No posts available.</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section className="block__row__4">
            <div className="container">
                <div className="css__boder__bottom">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="panel-small-block-2">
                                <div className="border__cat__top mb-2"></div>
                                <div className="category-heading">
                                    {loading ? <Skeleton width={150} /> :
                                        lifestyle ? <Link to={`/${lifestyle.slug}`}>{lifestyle.name}</Link> : null
                                    }
                                </div>
                                <div className="css_bar"></div>
                                <div className="block__lead">
                                    {loading ? (
                                        <div className="row">
                                            <div className="col-md-7">
                                                <Skeleton height={200} />
                                            </div>
                                            <div className="col-md-5">
                                                <Skeleton count={3} />
                                            </div>
                                        </div>
                                    ) : lifestyleOne ? ( 
                                        <div key={lifestyleOne.id} className="row">
                                            <div className="col-md-7">
                                                <div className="cat-lead-single block_comn_content">
                                                    <div className="link-hover-homepage">
                                                        <div className="media1">
                                                            <Link to={`/${lifestyle.slug}/article/${lifestyleOne.uniqid}`}>
                                                                <LazyLoadImage
                                                                    className="img-fluid w-100"
                                                                    src={lifestyleOne.featured_image}
                                                                    alt={lifestyleOne.headline}
                                                                    effect="blur"
                                                                    placeholderSrc="/placeholder.jpg"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="business__block__content">
                                                    <Link to={`/${lifestyle.slug}/article/${lifestyleOne.uniqid}`}>
                                                        <h3>
                                                            <b>
                                                                {lifestyleOne?.sub_headline && (
                                                                <>
                                                                    <span className="sub__heading" dangerouslySetInnerHTML={{ __html: lifestyleOne.sub_headline }} />
                                                                    {' / '}
                                                                </>
                                                                )}
                                                                <span dangerouslySetInnerHTML={{ __html: truncateWords(lifestyleOne?.headline, 10) }} />
                                                            </b>
                                                        </h3>
                                                    </Link>
                                                    <p dangerouslySetInnerHTML={{ __html: truncateWords(lifestyleOne?.excerpt, 35) }} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : <p>No post available.</p>}
                                </div>

                                <hr style={{ marginTop: '14px', marginBottom: '14px', backgroundColor: '#05483482', opacity: 1 }} />

                                <div className="overlay_block_2 d-flex mb__mbl">
                                    <div className="row">
                                        {loading ? (
                                            Array.from({ length: 3 }).map((_, idx) => (
                                                <div key={idx} className="border__right col-md-4 col-6 col-sm-6">
                                                    <Skeleton height={150} />
                                                    <Skeleton count={2} style={{ marginTop: "10px" }} />
                                                </div>
                                            ))
                                        ) : lifestyleThree.length > 0 ? (
                                            lifestyleThree.map((post) => (
                                                <div key={post.id} className="border__right col-md-4 col-6 col-sm-6">
                                                    <div className="link-hover-homepage">
                                                        <Link to={`/${lifestyle.slug}/article/${post.uniqid}`}>
                                                            <div className="media">
                                                                <LazyLoadImage
                                                                    className="img-fluid w-100"
                                                                    src={post.featured_image}
                                                                    alt={post.headline}
                                                                    effect="blur"
                                                                    placeholderSrc="/placeholder.jpg"
                                                                />
                                                            </div>
                                                            <h4 className="py-2">
                                                                {post?.sub_headline && (
                                                                <>
                                                                    <span className="sub__heading" dangerouslySetInnerHTML={{ __html: post.sub_headline }} />
                                                                    {' / '}
                                                                </>
                                                                )}
                                                                {post?.headline}
                                                            </h4>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No posts available.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb__mbl">
                            <div className="panel-small-block-2">
                                <div className="border__cat__top mb-2"></div>
                                <div className="category-heading">
                                    {loading ? <Skeleton width={120} /> :
                                        health ? <Link to={`/${health.slug}`}>{health.name}</Link> : null
                                    }
                                </div>
                                <div className="cat__block__main">
                                    {loading ? (
                                        Array.from({ length: 4 }).map((_, idx) => (
                                            <div key={idx} className="link-hover-homepage mb-3 border__btm d-flex justify-content-between">
                                                <div className="media-body pe-2">
                                                    <Skeleton height={20} width={`70%`} />
                                                </div>
                                                <div style={{ width: "40%" }}>
                                                    <Skeleton height={50} width={`100%`} />
                                                </div>
                                            </div>
                                        ))
                                    ) : healthFour.length > 0 ? (
                                        healthFour.map((post) => (
                                            <div key={post.id} className="link-hover-homepage mb-3 border__btm">
                                                <Link to={`/${health.slug}/article/${post.uniqid}`}>
                                                    <div className="media-body pe-2">
                                                        <h4 className="lead__title">{post.headline}</h4>
                                                        <time className="py-1">{getBanglaAgoTime(post.created_at)}</time>
                                                    </div>
                                                    <div className="media-left float-right" style={{ width: "40%" }} >
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
                                        ))
                                    ) : <p>No posts available.</p>}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <section className="last__row__2">
            <div className="container">
                <div className="row">
                    {renderCategoryBlock(lawAndRights, lawAndRightsOne, lawAndRightsThree)}
                    {renderCategoryBlock(education, educationOne, educationThree)}
                    {renderCategoryBlock(jobs, jobsOne, jobsThree)}
                    {renderCategoryBlock(probas, probasOne, probasThree)}
                </div>
            </div>
        </section>

        <section className="last__row__2">
            <div className="container">
                <div className="row">
                    {renderCategoryBlock(bankStockmarket, bankStockmarketOne, bankStockmarketThree)}
                    {renderCategoryBlock(softStory, softStoryOne, softStoryThree)}
                    {renderCategoryBlock(literature, literatureOne, literatureThree)}
                    {renderCategoryBlock(agriculture, agricultureOne, agricultureThree)}
                </div>
            </div>
        </section>

        <section className="block-special home__photo">
            <div className="container">
                <div className="category-heading">
                    <Link to="/photo-gallery">ছবি</Link>
                </div>
                <div id="photo" className="photo__gallery__section">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="main__photo">
                                <div className="img__lead position-relative single__img">
                                {loading ? (
                                    <>
                                    <Skeleton height={300} />
                                    <Skeleton height={20} style={{ marginTop: "10px" }} />
                                    </>
                                ) : photoOne.length > 0 && photoOne[0].photo ? (
                                    <>
                                    <i className="bi bi-images position-absolute"></i>
                                    <a
                                        href={photoOne[0].photo.featured_image}
                                        data-gallery="photoGallery1"
                                        className="portfolio-lightbox preview-link"
                                        title={photoOne[0].photo.title}
                                    >
                                        <div className="media">
                                        <LazyLoadImage
                                            src={photoOne[0].photo.featured_image}
                                            className="img-fluid"
                                            alt={photoOne[0].photo.title}
                                            effect="blur"
                                            placeholderSrc="/placeholder.jpg"
                                        />
                                        </div>
                                    </a>
                                    <div className="portfolio-info">
                                        <div className="photo__title2">
                                        <span>{photoOne[0].photo.title}</span>
                                        </div>
                                        {photoOne[0].photobodies?.map((item, index) =>
                                        item.thumbnail ? (
                                            <a
                                            key={index}
                                            href={item.thumbnail}
                                            data-gallery="photoGallery1"
                                            className="portfolio-lightbox preview-link d-none"
                                            title={item.caption || ""}
                                            />
                                        ) : null
                                        )}
                                    </div>
                                    </>
                                ) : (
                                    <p>No photo available.</p>
                                )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="photo__item__4">
                                <div className="row">
                                {loading
                                    ? Array.from({ length: 4 }).map((_, idx) => (
                                        <div key={idx} className="col-md-6 col-6 mb-3">
                                        <Skeleton height={150} />
                                        <Skeleton height={20} style={{ marginTop: "5px" }} />
                                        </div>
                                    ))
                                    : error ? (
                                        <p style={{ color: "red" }}>{error}</p>
                                    ) : photoFour.length > 0 ? (
                                        photoFour.map((item) => {
                                        const { photo, photobodies } = item;
                                        const galleryId = `photoGallery-${photo.id}`;

                                        return (
                                            <div key={photo.id} className="col-md-6 col-6 mb-3">
                                            <div className="photo__3rd1 item position-relative">
                                                <i className="bi bi-images position-absolute"></i>

                                                <a
                                                href={photo.featured_image}
                                                data-gallery={galleryId}
                                                className="portfolio-lightbox preview-link"
                                                title={photo.title}
                                                >
                                                <div className="media">
                                                    <LazyLoadImage
                                                    className="img-fluid"
                                                    src={photo.featured_image}
                                                    alt={photo.title}
                                                    effect="blur"
                                                    placeholderSrc="/placeholder.jpg"
                                                    />
                                                </div>
                                                </a>

                                                <div className="portfolio-info">
                                                <div className="photo__title2">
                                                    <a
                                                    href={photo.featured_image}
                                                    data-gallery={galleryId}
                                                    className="portfolio-lightbox preview-link"
                                                    title={photo.title}
                                                    >
                                                    <p className="m-0">{photo.title}</p>
                                                    </a>
                                                </div>

                                                {photobodies?.map((body, idx) => (
                                                    <a
                                                    key={idx}
                                                    href={body.thumbnail}
                                                    data-gallery={galleryId}
                                                    className="portfolio-lightbox preview-link d-none"
                                                    title={body.caption || ""}
                                                    />
                                                ))}
                                                </div>
                                            </div>
                                            </div>
                                        );
                                        })
                                    ) : (
                                        <p>No photo available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        </>
    );
};

export default HomePageFourthSection;
