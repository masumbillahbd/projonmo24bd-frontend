import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.css'; // Import custom responsive styles

function ImageTextVerticalSkeleton() {
  return (
    <div className="ITV card mb-3 border-0 rounded-3 overflow-hidden">
      <div className='image'>
        <Skeleton className="img w-100" />
      </div>
      <div className='text pt-2'>
        <div className="mb-1">
          <Skeleton width={70} height={14} /> {/* time */}
        </div>
        <div className="mb-2">
          <Skeleton count={2} width="100%" height={22} /> {/* title */}
        </div>
      </div>
    </div>
  )
}

export default ImageTextVerticalSkeleton