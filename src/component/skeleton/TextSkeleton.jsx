import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.css'; // Import custom responsive styles

function TextSkeleton() {
  return (
    <div className='text-skeleton mb-3'>
        <div className="mb-0">
            <Skeleton width={80} height={14} /> {/* time */}
        </div>
        <div className="mb-0">
            <Skeleton count={2} width="100%" height={18} /> {/* title */}
        </div>
    </div>
  )
}

export default TextSkeleton