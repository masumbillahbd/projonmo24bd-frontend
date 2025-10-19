import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.css'; // Import custom responsive styles

function CategorySkeleton() {
  return (

    <div className="news-card card mb-3 border-0  overflow-hidden">
        <div className="row g-0 align-items-center">
            {/* Left image section */}
            <div className="col-12 col-md-4">
                <div className="overflow-hidden rounded">
                    <Skeleton className="img w-100" />
                </div>
            </div>
            {/* Right content section */}
            <div className="col-12 col-md-8 p-md-1 p-lg-2 pt-2 d-flex flex-column justify-content-center">
                <div className="mb-0">
                    <Skeleton width={100} height={13} /> {/* time */}
                </div>
                <div className="mb-1">
                    <Skeleton width="95%" height={20} /> {/* title */}
                </div>
                <div>
                    <Skeleton count={3} height={15} width="100%" /> {/* content lines */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategorySkeleton