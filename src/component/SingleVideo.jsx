import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmbedVideo from "./EmbedVideo";
import { formatBanglaDateTime } from "../utils/bnTime";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
// optionally use a video player library
import ReactPlayer from "react-player"; // or another if you prefer

const SingleVideo = () => {
  const { uniqid } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [adOne, setAdOne] = useState(null);
  const [adTwo, setAdTwo] = useState(null);
  const [anotherVideos, setAnotherVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    axios
      .get(`/single-video/${uniqid}`)
      .then((res) => {
        setAdOne(res.data.adOne || null);
        setAdTwo(res.data.adTwo || null);
        setVideoData(res.data.singleVideo || null);
        setAnotherVideos(res.data.anotherVideos || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not fetch video");
        setLoading(false);
      });
  }, [uniqid]);

  if (loading) return <p>Loading video...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!videoData) return <p>No video found.</p>;

  // videoData might look like: { uniqid: "...", video_url: "...", title: "...", description: "..." }

  return (
    <>
      <section className="single__video__page">
        <div className="single_page ads ads__top__banner mb-4">
          <div className="container">
            <div className="ads__1 text-center py-3 d-block d-md-none d-lg-none">
                {adOne && (
                    <div key={adOne.id} className="matter__square text-center">
                    {adOne.url ? (
                        <a href={adOne.url} target="_blank" rel="noopener noreferrer" >
                        <LazyLoadImage
                            className="img-fluid"
                            src={adOne.photo}
                            alt={adOne.name || "Advertisement"}
                            effect="blur"
                            placeholderSrc="/placeholder.jpg"
                        />
                        </a>
                    ) : (
                        <LazyLoadImage
                        className="img-fluid"
                        src={adOne.photo}
                        alt={adOne.name || "Advertisement"}
                        effect="blur"
                        placeholderSrc="/placeholder.jpg"
                        />
                    )}
                    </div>
                )}
            </div>
            <div className="ads__1 py-3 d-none d-md-block d-lg-block text-center">
                {adOne && (
                    <div key={adOne.id} className="matter__square text-center">
                    {adOne.url ? (
                        <a href={adOne.url} target="_blank" rel="noopener noreferrer" >
                        <LazyLoadImage
                            className="img-fluid"
                            src={adOne.photo}
                            alt={adOne.name || "Advertisement"}
                            effect="blur"
                            placeholderSrc="/placeholder.jpg"
                        />
                        </a>
                    ) : (
                        <LazyLoadImage
                        className="img-fluid"
                        src={adOne.photo}
                        alt={adOne.name || "Advertisement"}
                        effect="blur"
                        placeholderSrc="/placeholder.jpg"
                        />
                    )}
                    </div>
                )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="vdopgsingle mt-3">
                <div className="panel-body">
                  <EmbedVideo
                    streamingSite={videoData.streaming_site}
                    videoId={videoData.video_id}
                    // width and height optional; default is responsive 16:9
                  />
                </div>
                <hr />
                <span className="info__txt">এখন চলছে</span>
                <div className="vedio__title mb-3">
                  <h2>{videoData.title}</h2>
                </div>
                <p>প্রকাশিত: {formatBanglaDateTime(videoData.created_at)}</p>
              </div>
              <div className="share-btn w-100 pt-4 my-5 d-flex">
                <div>
                  <span className="shr__txt">শেয়ার করুন</span>
                </div>
                <div
                  className="sharethis-inline-share-buttons"
                  style={{ width: "90%", float: "left" }}
                ></div>
              </div>
              <div className="comment">
                <p className="mb-0 ps-2">
                  <b>মন্তব্য করুন:</b>
                </p>
                <div className="cmnt__bar"></div>
                <div id="fb-root"></div>
              </div>
            </div>

            <div className="col-md-3">

                <div className="block__ads sqr text-center ads__mbl mb-3">
                    <div className="title">
                        <span>বিজ্ঞাপন</span>
                    </div>
                    {adTwo && (
                        <div key={adTwo.id} className="matter__square text-center">
                        {adTwo.url ? (
                            <a href={adTwo.url} target="_blank" rel="noopener noreferrer" >
                            <LazyLoadImage
                                className="img-fluid"
                                src={adTwo.photo}
                                alt={adTwo.name || "Advertisement"}
                                effect="blur"
                                placeholderSrc="/placeholder.jpg"
                            />
                            </a>
                        ) : (
                            <LazyLoadImage
                            className="img-fluid"
                            src={adTwo.photo}
                            alt={adTwo.name || "Advertisement"}
                            effect="blur"
                            placeholderSrc="/placeholder.jpg"
                            />
                        )}
                        </div>
                    )}
                </div>


                <div className="more__video mt-৪">
                    <div className="heading mb-3">
                    <h4 className="mb-0">আরও দেখুন</h4>
                    <span className="video__bar"></span>
                    </div>
                    {loading && <p>Loading posts...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {!loading && !error && (
                    anotherVideos.length > 0 ? (
                        anotherVideos.map((video) => (
                        <div className="thumbnail mb-3" key={video.uniqid}>
                            <Link to={`/video/${video.uniqid}`} style={{ display: 'flex' }}>
                            <div className="caption py-0" style={{ width: '65%', float: 'left' }}>
                                <h4>
                                {video.title.length > 50
                                    ? video.title.substring(0, 50) + "..."
                                    : video.title}
                                </h4>
                            </div>
                            <div className="video__img position-relative" style={{ width: '35%', float: 'right' }}>
                                <i className="bi bi-play-fill position-absolute"></i>
                                <LazyLoadImage
                                className="img-fluid"
                                src={video.thumbnail}
                                alt={video.title || "Advertisement"}
                                effect="blur"
                                placeholderSrc="/placeholder.jpg"
                                />
                            </div>
                            </Link>
                        </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )
                    )}
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleVideo;
