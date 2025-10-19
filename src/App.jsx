import { Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage";
import PostSinglePage from './pages/PostSinglePage';
import VideoPage from './pages/VideoPage';
import VideosPage from './pages/VideosPage';
import ReporterPage from './pages/ReporterPage';
import CategoryPage from './pages/CategoryPage';
import SubCategoryPage from './pages/SubCategoryPage';
import PrivacyGuidelinePage from "./pages/PrivacyGuidelinePage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import PostSearchPage from "./pages/PostSearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import Preloader from './component/Preloader';
import { HelmetProvider } from "react-helmet-async";
import TagPostPage from "./pages/TagPostPage";
import { Navbar } from "react-bootstrap";
import Layout from "./component/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Route>
    </Routes>
  );
};

export default App;