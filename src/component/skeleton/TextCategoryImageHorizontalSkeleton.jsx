import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.css'; // Import custom responsive styles

function TextCategoryImageHorizontalSkeleton() {
  return (
    <div className="ITTH card mb-3 border-0 rounded-3 overflow-hidden">
        <div className="row g-0 align-items-center">
            {/* left content section */}
            <div className="col-lg-7 col-7 ps-1   d-flex flex-column justify-content-center">
                <div className="mb-0 d-flex align-items-center gap-1">
                    <Skeleton variant="circular" width={10} height={10} /> {/* dot */}
                    <Skeleton width={80} height={10} /> {/* time */}
                </div>
                <div className='mb-0'>
                <Skeleton count={3} height={15} width="100%" /> {/* headline */}
                </div>
            </div>
            {/* right image section */}
            <div className="col-lg-5 col-5">
                <div className='ms-1'>
                    <Skeleton className="img w-100" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TextCategoryImageHorizontalSkeleton