import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.css'; // Import custom responsive styles

function ImageTextHorizontalSkeleton() {
  return (
    <div className="ITH card mb-3 border-0 rounded-3 overflow-hidden">
      <div className="row g-0">
        {/* Left image section */}
        <div className="col-4 col-md-4">
          <Skeleton className="img w-100" />
        </div>

        {/* Right content section */}
        <div className="col-8 col-md-8 p-1 p-md-1 p-lg-2 pt-2">
          <div className="mb-1 d-flex align-items-center gap-1">
            <Skeleton width={80} height={12} /> {/* time */}
            <Skeleton variant="circular" width={8} height={8} style={{ marginBottom: "13px" }}/> {/* dot */}
            <Skeleton width={100} height={12} /> {/* category name */}
          </div>
          <div>
            <Skeleton count={3} height={17} width="100%" /> {/* headline */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageTextHorizontalSkeleton