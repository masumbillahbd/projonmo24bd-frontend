import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './header.css';
import { BiSearch, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import useMenuScript from "./useMenuScript";


const Header = () => {
  useMenuScript();

    const [breakingnews, setBreakingnews] = useState([]);
    const [setting, setSetting] = useState(null);
    const [dates, setDates] = useState({ eng_date: null, ban_date: null });
    const [query, setQuery] = useState("");
    const [menus, setMenus] = useState([]);
    const [desktopMenus, setDesktopmenus] = useState([]);
    const [navbarMobile, setNavbarMobile] = useState(false); // NEW
    const [closing, setClosing] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        // Redirect to search page with query
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };
    // Navigate immediately when input is focused
    const handleFocus = () => {
      navigate("/search"); // optional: can include query if needed
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false); // tracks if desktop menu is open
    const [openSubMenuIds, setOpenSubMenuIds] = useState([]); // tracks which submenus are open
    const [openMenuId, setOpenMenuId] = useState(null);
    // Function to open the menu
    const onOpen = () => setIsMenuOpen(true);

    // Function to close the menu
    const onClose = () => {
        setIsMenuOpen(false);
        setOpenSubMenuIds([]); // close all submenus
    };

    // Toggle a desktop submenu open/close
    const toggleSubMenu = (menuId) => {
        if (openSubMenuIds.includes(menuId)) {
        // close submenu
        setOpenSubMenuIds(openSubMenuIds.filter((id) => id !== menuId));
        } else {
        // open submenu
        setOpenSubMenuIds([...openSubMenuIds, menuId]);
        }
    };

    // Toggle a mobile submenu open/close
     const mobileSubMenuToggle = (menuId) => {
      setOpenMenuId(openMenuId === menuId ? null : menuId);
    };

    const [visibleMSearch, setVisibleMSearch] = useState(false);

    const toggleMSearchBar = () => {
      setVisibleMSearch((prev) => !prev);
    };
    
    
      useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/header-content`);
                if (isMounted) {
                console.log(response.data)
                setBreakingnews(response.data.breakingnews ?? [])
                setDates(response.data); 
                setSetting(response.data.setting);
                setMenus(response.data.menus);
                setDesktopmenus(response.data.desktopMenus);
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

    const handleCloseNavbar = () => {
      if (navbarMobile) {
        setClosing(true); // trigger CSS animation
        setTimeout(() => {
          setNavbarMobile(false); // fully hide after animation
          setClosing(false);
        }, 300); // must match CSS transition duration
      }
    };

    // sticky nav
    useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50); // add sticky if scrolled 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    // Fallback when image loads
    const handleImageLoad = () => {
      setLoading(false);
    };

  return (
    <>
    
    
<header>
    <div className="top-head bg-white">
        <div className="top__head__desktop">
            <div className="row">
                {/* Left Content (fixed) */}
                <div className="col-auto top__head__left d-flex align-items-center">
                    <nav className=" h-full flex items-center">

                      <Link to="/" className="pt-0">
                        {loading && (
                          <Skeleton circle={false} height={50} width={180} />
                        )}
                        <LazyLoadImage
                            className="logo"
                            src={`${import.meta.env.VITE_DOMAIN_URL}/${setting?.logo}`}
                            alt={setting?.site_title}
                            effect="blur"
                            placeholderSrc="/placeholder.jpg"
                        />
                      </Link>
                      
                      <div className="d-none d-sm-none d-md-none d-lg-flex align-items-center">

                        {loading && (
                            [1, 2, 3].map((item, index) => (
                            <div key={index} className={`ms-${index === 0 ? 0 : 5} d-flex align-items-center`}>
                              {/* Skeleton circle for icon */}
                              <div className="skeleton me-2" style={{ width: "1em", height: "1em" }}></div>
                              {/* Skeleton bar for text */}
                              <div className="skeleton ms-1" style={{ width: "60px", height: "1em", borderRadius: "4px" }}></div>
                            </div>
                          ))
                        )}


                        <Link to="/" className="d-flex align-items-center text-decoration-none">
                          <svg
                            stroke="#2c7d3d"
                            fill="none"
                            strokeWidth="1.7"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-ekhon-orange-100"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          <span className="ms-1">মূল পাতা</span>
                        </Link>

                        <Link to="/latest" className="ms-5 d-flex align-items-center text-decoration-none">
                          <svg
                            stroke="#2c7d3d"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="ms-1">সাম্প্রতিক</span>
                        </Link>

                        <Link to="/video" className="ms-5 d-flex align-items-center text-decoration-none">
                          <svg
                            stroke="#2c7d3d"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polygon points="23 7 16 12 23 17 23 7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                          </svg>
                          <span className="ms-1">ভিডিও</span>
                        </Link>
                      </div>
                    </nav>
                </div>

                {/* Center Blank (auto expands) */}
                <div className="col"></div>

                {/* <!-- Right Content (fixed) --> */}
                <div className="col-auto p-3 py-2">
                    <div className="d-none d-sm-none d-md-none d-lg-block">
                        <div className="search-bar" id="mainSrcBox" style={{ display:'inline-block'}}>
                            <form method="get" action="/search">
                              <input type="text" className="search-input" required name="x" placeholder="অনুসন্ধান..."/>
                              <button className="searchCloseBtn d-none" id="searchCloseBtn" type="button" name="button">
                                <i className="bi bi-x" aria-hidden="true"></i>
                              </button>
                            </form>
                        </div>
                    </div>
                    <div className="d-flex d-lg-none align-items-center">
                      {/* Video Button */}
                      <Link to="/video" className="btn__video d-flex align-items-center text-decoration-none">
                        <svg
                          style={{ position: "relative", top: "-2px" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#006a4e"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                          <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                        </svg>
                        <span className="ms-1">ভিডিও</span>
                      </Link>

                      {/* Search Icon */}
                      <span className="mobile-search-bar-icon  cursor-pointer ps-3"  onClick={toggleMSearchBar}  id="m-search-bar-open-btn"  >
                        <i className="bi bi-search"></i>
                      </span>

                      {/* Menu Icon */}
                      <span className="mobile-menu-bar-icon  cursor-pointer ps-2 pe-1" id="mobile-menu-open">
                        <i className="bi bi-list"></i>
                      </span>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- mobile search bar start--> */}
        <div className={`m-search-bar `}  id="m-search-bar" style={{ display: visibleMSearch ? "block" : "none" }}>
            <form action="" method="get">
                <input name="ffsearch" className="search-field" placeholder="যা খুঁজতে চান.." type="text"/>
                <span className="m-search-bar-close-btn" onClick={toggleMSearchBar} ><i className="bi bi-x"></i></span>
            </form>
        </div>
        {/* <!-- mobile search bar end--> */}
    </div>
    {/* mobile menu bar start */}
    <nav id="mobile-menu" className="mobile-menu">
        <div id="mobile-menu-close">
            <span className="icon-x"><i className="bi bi-x"></i></span>
        </div>
        <ul className="main-menu">
          {menus.map((menu) => {
            const isOpen = openMenuId === menu.id;
            return (
              <li key={menu.id} className={`mobile-menu-item ${isOpen ? "open" : ""}`}>
                <Link to={menu.url_path}>{menu.url_text}</Link>
                {menu.sub_menu && menu.sub_menu.length > 0 && (
                  <>
                    {menu.sub_menu && menu.sub_menu.length > 0 && (
                      <i
                        className={`bi bi-chevron-right MDDMOI m-icon`}
                        onClick={() => mobileSubMenuToggle(menu.id)}
                      ></i>
                    )}
                    
                      <ul className="sub-menu MDDM" >
                        {menu.sub_menu.map((sub_menu) => (
                            <li key={sub_menu.id} className="sub-item">
                            <Link to={sub_menu.url_path}>{sub_menu.url_text}</Link>
                            </li>
                        ))}
                      </ul>
                  </>
                )}
              </li>
            )
          })}
        </ul>
        <div className="info mt-2">
          <h4>ফলো করুন</h4>
          <nav className="nav social social-white text-center justify-content-center">
            <a href={setting?.facebook} className="facebook me-1 px-1" target="_blank" rel="noreferrer" style={{ background: "#1877f2" }}>
              <i className="bx bxl-facebook"></i>
            </a>
            <a href={setting?.twitter} className="twitter me-1 px-1" target="_blank" rel="noreferrer" style={{ background: "#1d9bf0" }}>
              <i className="bx bxl-twitter"></i>
            </a>
            <a href={setting?.youtube} className="youtube me-1 px-1" target="_blank" rel="noreferrer" style={{ background: "#ff0000" }} >
              <i className="bx bxl-youtube"></i>
            </a>
            <a href={setting?.instagram} className="instagram me-1 px-1" target="_blank" rel="noreferrer" style={{ background: "#c038be" }}>
              <i className="bx bxl-instagram"></i>
            </a>
            <a href={setting?.linkedin} className="linkedin me-1 px-1" target="_blank" rel="noreferrer" style={{ background: "#0077b5" }}>
              <i className="bx bxl-linkedin"></i>
            </a>
          </nav>
        </div>
    </nav>
    {/*  mobile menu bar end */}
</header>

    </>
  );
        
};


export default Header;

