import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './header.css';
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

function Sidebar() {
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
    
        
        
          useEffect(() => {
            let isMounted = true;
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`/header-content`);
                    if (isMounted) {
                    console.log(response.data)
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

  return (
    <>
        <div className="menu__bar__left p-3 bg-white shadow-sm">
            <a href="/live-stream" className="btn btn-danger w-100 mb-3">🔴 সরাসরি দেখুন</a>
            <div className="text-center mb-3">
                <span className="d-flex align-items-center date__time">{dates.eng_date} <br /> {dates.ban_date}</span>
            </div>
            <nav className="desktop-menu-new" id="desktop-menu-new">
                <ul className="main-menu">
                    {menus.map((menu) => {
                    const isOpen = openMenuId === menu.id;
                    return (
                        <li key={menu.id} className={`menu-item ${isOpen ? "open" : ""}`}>
                        <Link to={menu.url_path}>{menu.url_text}</Link>
                        {menu.sub_menu && menu.sub_menu.length > 0 && (
                            <>
                                {menu.sub_menu && menu.sub_menu.length > 0 && (
                                    <i
                                    className={`bi bi-chevron-right MDDMOI icon`}
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
            </nav>
        </div>
    </>
  )
}

export default Sidebar