import React, { useEffect, useState } from 'react';
import { useSettings } from "../context/SettingsContext";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';

const Footer = () => {

  const { settings, marqueePosts } = useSettings();
  const currentYear = new Date().getFullYear();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example for converting English numbers to Bengali if needed
  const eToBReplace = (num) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (d) => bengaliDigits[d]);
  };

  return (
    <>
      <footer className="text-inverse pt-5 pb-3" style={{ background: '#f5f5f5', boxShadow: '0px -4px 11px #e3e3e3',}}>
        <div className="container">
          <div className="footer__top text-center">
            <div className="row">
              {/* Address Section */}
              <div className="col-lg-4 border__right__2 border__left__2">
                <div className="body py-3 d-none d-md-block d-lg-block">
                  <div className="title">
                    <p>ঠিকানা</p>
                  </div>
                  <div className="info">
                    <p className="mb-0" style={{ lineHeight: 1.3 }}>
                      {settings?.address}
                    </p>
                    <p className="mt-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-mail-opened"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ff2825"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
                        <path d="M21 9v10a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2V9" />
                        <path d="M3 19l6 -6" />
                        <path d="M15 13l6 6" />
                      </svg>{' '}
                      {settings?.site_email}
                    </p>
                    <p className="mt-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-phone"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ff2825"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                      </svg>{' '}
                      {settings?.site_mobile}
                    </p>
                  </div>
                </div>
              </div>

              {/* Editor Section */}
              <div className="col-lg-4 border__right__2">
                <div className="title">
                  <h4 className="text-600 mb-3">ভারপ্রাপ্ত সম্পাদক<br/>{settings?.editor}</h4>
                  <h4 className="text-600">প্রকাশক<br/>ডা. উম্মে হাবিবা শারমিন</h4>
                </div>
              </div>

              {/* Social Section */}
              <div
                className="col-lg-4 border__right__2"
                style={{ borderRight: '1px solid #05483482' }}
              >
                <div className="body py-3 d-none d-md-block d-lg-block">
                  <div className="title">
                    <p>ফলো করুন</p>
                  </div>
                  <div className="info">
                    <nav className="nav social social-white text-center justify-content-center">
                      <a href={settings?.facebook} className="facebook me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#1877f2' }}>
                        <i className="bx bxl-facebook" />
                      </a>
                      <a href={settings?.twitter} className="twitter me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#1d9bf0' }}>
                        <i className="bx bxl-twitter" />
                      </a>
                      <a href={settings?.youtube} className="youtube me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#ff0000' }}>
                        <i className="bx bxl-youtube" />
                      </a>
                      <a href={settings?.instagram} className="instagram me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#c038be' }}>
                        <i className="bx bxl-instagram" />
                      </a>
                      <a href={settings?.linkedin} className="linkedin me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#0077b5' }}>
                        <i className="bx bxl-linkedin" />
                      </a>
                    </nav>
                  </div>
                  <div className="widget footer__url mt-3 position-relative text-center">
                    <a href="/privacy-policy" className="text-600">গোপনীয়তা নীতি</a>
                    <a href="/about-us" className="text-600">আমাদের সম্পর্কে</a>
                    <a href="/contact-us" className="text-600">যোগাযোগ</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile view */}
            <div className="row">
              <div className="col-lg-8 col-12 m-auto">
                <div className="py-3 d-block d-md-none d-lg-none">
                  <div className="title">
                    <p><b>ঠিকানা</b></p>
                  </div>
                  <div className="info">
                    <p className="mb-0" style={{ lineHeight: 1.3 }}>{settings?.address}</p>
                  </div>
                </div>
                <div className="py-3 d-block d-md-none d-lg-none">
                  <div className="title">
                    <p>ফলো করুন</p>
                  </div>
                  <div className="info">
                    <nav className="nav social social-white text-center justify-content-center">
                      <a href={settings?.facebook} className="facebook me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#1877f2' }}>
                        <i className="bx bxl-facebook" />
                      </a>
                      <a href={settings?.twitter} className="twitter me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#1d9bf0' }}>
                        <i className="bx bxl-twitter" />
                      </a>
                      <a href={settings?.youtube} className="youtube me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#ff0000' }}>
                        <i className="bx bxl-youtube" />
                      </a>
                      <a href={settings?.instagram} className="instagram me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#c038be' }}>
                        <i className="bx bxl-instagram" />
                      </a>
                      <a href={settings?.linkedin} className="linkedin me-1 px-1" target="_blank" rel="noreferrer" style={{ background: '#0077b5' }}>
                        <i className="bx bxl-linkedin" />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <hr className="my-3"/>
          <div className="d-md-flex align-items-center justify-content-center copyright">
              <p className="mb-2 mb-lg-0 text-center">© {eToBReplace(currentYear)}
                  <strong><span> <a href="/" className="text-600">{settings?.site}</a></span></strong> কর্তৃক সর্বস্বত্ব
                  স্বত্বাধিকার সংরক্ষিত
              </p>
          </div>
          <div className="credits text-center mt-1">
              কারিগরি সহায়তায় {' '}
              <a href="https://www.dataenvelope.com/" style={{ color: '#ffa500' }} target="_blank" rel="noreferrer">
              <img
                src="https://www.dataenvelope.com/settings/1730355836_logo.png"
                className="img-fluid"
                style={{ height: 40, width: 'auto' }}
                alt="Data Envelope"
              />
            </a>
          </div>
        </div>
      </footer>

      {settings?.scroll_bar === 1 &&
      Array.isArray(marqueePosts) &&
      marqueePosts.length > 0 && (
        <div className="newsticker pt-2">
          <div className="scroll-news">
            {/* // Show real marquee only when data is loaded */}
              <Marquee pauseOnHover={true} gradient={false} speed={80}>
                <ul className="list-inline m-0 d-flex">
                  {marqueePosts.map((post) => (
                    <li key={post.id} className="me-4">
                      <Link
                        to={`/${post.category_slug}/article/${post.uniqid}`}
                      >
                        {post.headline}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Marquee>
          </div>
        </div>
      )}


    </>  
  );
};

export default Footer;
