import React from 'react';
import { Link } from "react-router-dom";
import ProductBox from '../../common/ProductBox';

const FeaturedCollection = ({ products, name, slug, id }) => {
  console.log(name,slug,id);
  const isWishListPage = false;
  return (
    <>
      <div className="featured-collection mt-5">
        <h2 className="capitalize text-2xl font-extrabold tracking-tight text-gray-900">
          <Link to={`collection/${slug}`} state={{ id: id }}>{name}</Link>
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
            products.slice(0, 4).map((product, index) => (
              <div className="group relative mb-3" key={index}>
                <ProductBox
                  key={index}
                  product={product}
                  isWishListPage={isWishListPage}
                />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default FeaturedCollection;