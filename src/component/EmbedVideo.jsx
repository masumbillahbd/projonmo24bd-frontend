import React from "react";

const EmbedVideo = ({ streamingSite, videoId, width = "100%", height = "auto" }) => {
  if (!streamingSite || !videoId) {
    return <div>Sorry, something is wrong. Please play another video.</div>;
  }

  let src;
  let allow = "encrypted-media; autoplay; picture-in-picture";

  if (streamingSite === "youtube") {
    src = `https://www.youtube.com/embed/${videoId}`;
  } else if (streamingSite === "facebook") {
    // Facebook embed via fb-video plugin
    src = `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FPlayStation%2Fvideos%2F${videoId}%2F&show_text=0&width=560`;
  } else {
    return <div>Sorry, Something is Wrong. Please play another video.</div>;
  }

  return (
    <div className="video-responsive" style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
      <iframe
        src={src}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        frameBorder="0"
        allow={allow}
        allowFullScreen
        title={`${streamingSite} video player`}
      ></iframe>
    </div>
  );
};

export default EmbedVideo;