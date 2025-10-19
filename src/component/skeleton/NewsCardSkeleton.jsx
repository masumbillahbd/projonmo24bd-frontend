import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.css'; // Import custom responsive styles

const NewsCardSkeleton = () => {
  return (
    <div className="news-card card mb-3 border-0 rounded-3 overflow-hidden">
      <div className="row g-0">
        {/* Left image section */}
        <div className="col-md-4">
          <Skeleton className="img w-100" />
        </div>

        {/* Right content section */}
        <div className="col-md-8 p-md-1 p-lg-2 pt-2">
          <div className="mb-1">
            <Skeleton width={100} height={14} /> {/* time */}
          </div>
          <div className="mb-2">
            <Skeleton width="90%" height={28} /> {/* title */}
          </div>
          <div>
            <Skeleton count={4} height={14} width="100%" /> {/* content lines */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;