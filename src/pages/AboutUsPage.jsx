import AboutUs from "../component/AboutUs";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NewsCardSkeleton from "../component/skeleton/NewsCardSkeleton";
import ImageTextHorizontalSkeleton from "../component/skeleton/ImageTextHorizontalSkeleton";
import ImageTextVerticalSkeleton from "../component/skeleton/ImageTextVerticalSkeleton";
import TextCategoryImageHorizontalSkeleton from "../component/skeleton/TextCategoryImageHorizontalSkeleton";
import TextSkeleton from "../component/skeleton/TextSkeleton";
const AboutUsPage = () => {
  return (
    <div>
      {/* <AboutUs /> */}
      <div className="container my-5">
        <div className="row">
          
          <div className="col-md-12">
            <NewsCardSkeleton/>
            <div className="row">
              <div className="col-md-4"><ImageTextVerticalSkeleton/></div>
              <div className="col-md-4"><ImageTextVerticalSkeleton/></div>
              <div className="col-md-4"><ImageTextVerticalSkeleton/></div>
              <div className="col-md-4"><ImageTextVerticalSkeleton/></div>
              <div className="col-md-4"><ImageTextVerticalSkeleton/></div>
              <div className="col-md-4"><ImageTextVerticalSkeleton/></div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6"><ImageTextHorizontalSkeleton/></div>
              <div className="col-md-6"><ImageTextHorizontalSkeleton/></div>
              <div className="col-md-6"><ImageTextHorizontalSkeleton/></div>
              <div className="col-md-6"><ImageTextHorizontalSkeleton/></div>
              <div className="col-md-6"><ImageTextHorizontalSkeleton/></div>
              <div className="col-md-6"><ImageTextHorizontalSkeleton/></div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6"><TextSkeleton/></div>
              <div className="col-md-6"><TextSkeleton/></div>
              <div className="col-md-6"><TextSkeleton/></div>
              <div className="col-md-6"><TextSkeleton/></div>
              <div className="col-md-6"><TextSkeleton/></div>
              <div className="col-md-6"><TextSkeleton/></div>
              <div className="col-md-6"><TextSkeleton/></div>
              <div className="col-md-6"><TextSkeleton/></div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4 mb-3"><Skeleton count={2} height={16} width="100%" /></div>
              <div className="col-md-4 mb-3"><Skeleton count={2} height={16} width="100%" /></div>
              <div className="col-md-4 mb-3"><Skeleton count={2} height={16} width="100%" /></div>
              <div className="col-md-4 mb-3"><Skeleton count={2} height={16} width="100%" /></div>
              <div className="col-md-4 mb-3"><Skeleton count={2} height={16} width="100%" /></div>
              <div className="col-md-4 mb-3"><Skeleton count={2} height={16} width="100%" /></div>
              <div className="col-md-4 mb-3"><Skeleton count={2} height={16} width="100%" /></div>
              <div className="col-md-4 mb-3"><Skeleton count={2} height={16} width="100%" /></div>
              <div className="col-md-4 mb-3"><Skeleton count={2} height={16} width="100%" /></div>
<hr />

              <div className="col-md-4 mb-3"><TextCategoryImageHorizontalSkeleton/></div>
              <div className="col-md-4 mb-3"><TextCategoryImageHorizontalSkeleton/></div>
              <div className="col-md-4 mb-3"><TextCategoryImageHorizontalSkeleton/></div>
              <div className="col-md-4 mb-3"><TextCategoryImageHorizontalSkeleton/></div>
              <div className="col-md-4 mb-3"><TextCategoryImageHorizontalSkeleton/></div>
              <div className="col-md-4 mb-3"><TextCategoryImageHorizontalSkeleton/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
