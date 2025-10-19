import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPostOld = () => {

    const { categorySlug } = useParams();
    
    const take = 30;
    const skip = 0;
    const [posts, setPosts] = useState([]);
    const [categoryName, setCategoryName] = useState("");


    useEffect(() => {
        axios.get("https://newsflash71.com/api/category-post/"+categorySlug+"/"+take+"/"+skip)
            .then(response => {
                console.log('API response:', response.data);
                setCategoryName(response.data.categoryName || categorySlug);
                const postList = Array.isArray(response.data.data) ? response.data.data : [];
                setPosts(postList);
            })
            .catch(error => {
                console.error('Error fetching category post:', error);
            });
    }, [categorySlug]);

    return (
        <div className='row'>
            <h2>Category: {categoryName}</h2>
            {posts.length === 0 ? (
                <p>No Post available.</p>
            ) : (
                posts.map((post, index) => (
                    <div key={post.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <Link to={`/${categorySlug}/article/${post.id}`}>
                                <LazyLoadImage
                                    className="card-img-top"
                                    src={post.featured_image}
                                    alt={post.headline}
                                    effect="blur"
                                    placeholderSrc="/placeholder.jpg"
                                />
                            </Link>
                            <div className="card-body">
                                <Link to={`/${categorySlug}/article/${post.id}`}>
                                    <h4 className="card-title">{index + 1}. {post.headline}</h4>
                                </Link>
                                <p className="card-text">
                                    {post.excerpt && post.excerpt.length > 100
                                        ? post.excerpt.slice(0, 100) + '...'
                                        : post.excerpt}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CategoryPostOld;