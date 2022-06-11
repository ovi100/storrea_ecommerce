import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ProductBox from '../../common/ProductBox';

const Collection = ({ id }) => {

  const isWishListPage = false;
  const base_url = 'https://ovi.storrea.com/';

  const collectionDetails = async (id) => {
    const url = base_url + `collection/${id}.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.collection;
  }

  const getProducts = async (id) => {
    const url = base_url + `store/products?collection_id=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.products;
  }

  const [collection, setCollection] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    collectionDetails(id).then((data) => {
      setCollection(data);
    })
    getProducts(id).then((data) => {
      setProducts(data);
    })
  }, [id])

  const { name, slug } = collection;

  //console.log(collection);
  //console.log(products);
  //console.log(name,slug);

  return (
    <>
      <div className="featured-collection mt-5">
        <h2 className="capitalize text-2xl font-extrabold tracking-tight text-gray-900">
          <Link to={`collection/${slug}`} state={{ id: id }}>{name}</Link>
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
            products.slice(0, 8).map((product, index) => (
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

export default Collection;