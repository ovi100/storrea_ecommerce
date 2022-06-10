import React, { useState, useEffect } from 'react';
import FeaturedCollection from './FeaturedCollection';
import HomeSlider from './HomeSlider';
//import ProductBox from '../../common/ProductBox';

/*const FeaturedCollection = ({ products }) => {
  const isWishListPage = false;
  return (
    <>
      <div className="featured-collection mt-5">
        <h2 className="capitalize text-2xl font-extrabold tracking-tight text-gray-900">Collection name</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
            products.slice(0,4).map((product, index) => (
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
}*/

const Home = () => {
  const base_url = 'https://ovi.storrea.com/';
  //const featuredCollections = [29287, 29296];

  //console.log(featuredCollections);

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

  const [feature_products_1, setFeature_products_1] = useState([]);
  const [feature_collection_1, setFeature_collection_1] = useState([]);
  const [feature_products_2, setFeature_products_2] = useState([]);
  const [feature_collection_2, setFeature_collection_2] = useState([]);

  useEffect(() => {
    collectionDetails(29287).then((data) => {
      setFeature_collection_1(data);
    })
    getProducts(29287).then((data) => {
      setFeature_products_2(data);
    })
    collectionDetails(29296).then((data) => {
      setFeature_collection_2(data);
    })
    getProducts(29296).then((data) => {
      setFeature_products_1(data);
    })
  }, [])

  //console.log(feature_products_1, feature_products_2);

  return (
    <>
      <div className="container mx-auto p-5">
        <HomeSlider />
        <FeaturedCollection
          products={feature_products_1}
          name={feature_collection_1.name}
          slug={feature_collection_1.slug}
          id={feature_collection_1.id}
        />
        <FeaturedCollection
          products={feature_products_2}
          name={feature_collection_2.name}
          slug={feature_collection_2.slug}
          id={feature_collection_2.id}
        />
      </div>
    </>
  )
}

export default Home