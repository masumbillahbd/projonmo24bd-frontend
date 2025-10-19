import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

import { FaPrint, FaLink } from "react-icons/fa";


const SocialMediaShare = ({ title, url, printRef }) => {
  const [copied, setCopied] = useState(false);

  // Copy URL to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 sec
    });
  };

  // Print function
  const handlePrint = () => {
    const printContent = printRef.current;
    const WindowPrt = window.open("", "", "width=900,height=650");

    WindowPrt.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: 'Noto Sans Bengali', sans-serif; margin: 40px; line-height:1.6; }
            .single-page-headline h1{
              font-weight: 200;
              line-height: 1.2;
            }
            b{
              font-weight: 400;
            }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    WindowPrt.document.close();

    // Wait for all images to load
    const images = WindowPrt.document.images;
    let loaded = 0;
    const total = images.length;

    if (total === 0) {
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
      return;
    }

    for (let img of images) {
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === total) {
          WindowPrt.focus();
          WindowPrt.print();
          WindowPrt.close();
        }
      };
    }
  };


  return (
    <div className="d-flex gap-2 align-items-center">
  {/* Social Share Buttons */}
  <FacebookShareButton url={url} quote={title}>
    <FacebookIcon size={32} round />
  </FacebookShareButton>

  <TwitterShareButton url={url} title={title}>
    <TwitterIcon size={32} round />
  </TwitterShareButton>

  <WhatsappShareButton url={url} title={title} separator=":: ">
    <WhatsappIcon size={32} round />
  </WhatsappShareButton>

  <LinkedinShareButton url={url} title={title}>
    <LinkedinIcon size={32} round />
  </LinkedinShareButton>

  <TelegramShareButton url={url} title={title}>
    <TelegramIcon size={32} round />
  </TelegramShareButton>

  {/* Copy URL Button */}
      <button
        onClick={handleCopy}
        className="btn d-flex align-items-center justify-content-center"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          padding: 0,
          backgroundColor: "rgb(229 231 235 / 1)",
          border: "none",
        }}
        title="Copy To Clipboard"
      >
        <FaLink size={15} color={copied ? "green" : "#333"} />
      </button>

  {/* Print Button */}
  <button
    onClick={handlePrint}
    className="btn btn-light border d-flex align-items-center justify-content-center"
    style={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      backgroundColor: "rgb(229 231 235 / 1)", 
      padding: 0,
    }}
    title="Print This Article"
  >
    <FaPrint size={15} color="#65727aff" />
  </button>
</div>

  );
};

export default SocialMediaShare;
