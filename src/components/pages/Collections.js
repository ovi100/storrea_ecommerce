import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import Menubar from '../header/Menubar';
import ProductBox from './ProductBox';
import Loader from '../Loader';

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const isWishListPage = false;
  const { collectionName } = useParams();
  const location = useLocation();
  const { id } = location.state;
  const base_url = `https://ovi.storrea.com/store/apps/product_filter_app/filters/${id}/`;
  const filter_url = base_url + 'collection_filters?format=json';

  const [products, setProducts] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("product_collections.position ASC");
  const [filters, setFilters] = useState([]);
  let products_url = '';
  const selectedOption = (event) => {
    setSelectedSortOption(event.target.value);
  }

  console.log(typeof selectedSortOption, selectedSortOption);

  if (selectedSortOption) {
    products_url = base_url + `collection_results?&page=1&per_page=50&sort_by=${selectedSortOption}&format=json`;
  }


  const getCollectionData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getCollectionData(filter_url).then((data) => {
      setSortOptions(data.meta.sort_options);
      setFilters(data.product_filter_options);
    })
  }, [filter_url])

  useEffect(() => {
    getCollectionData(products_url).then((data) => {
      setProducts(data.products);
      setLoading(false);
    })
  }, [products_url])

  //console.log(location, id, products_url);
  console.log(sortOptions, filters);
  console.log(products);
  console.log(loading);

  return (
    <div>
      <Menubar />
      <div className="container mx-auto">
        <div className="sort-option">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-10 mt-3 mb-3">
            <select
              value={selectedSortOption}
              onChange={selectedOption}
              class="mt-1 py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm">
              {
                sortOptions.map((option) => (
                  <option value={option.value} key={option.text}>{option.text}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="collection">
          <div className="collection-header text-center py-4">
            <h4 className="capitalize text-xl font-bold antialiased">{collectionName.split('-').join(' ')}</h4>
          </div>
          {/* <div className="collection-content"></div> */}
          <div className="collection-content my-3">
            {
              loading ?
                <Loader />
                :
                <div className="grid grid-cols-1 gap-y-10 gap-x-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {
                    products.map((product, index) => (
                      <div className="group relative mb-3" key={index}>
                        <ProductBox key={index} product={product} isWishListPage={isWishListPage} />
                      </div>
                    ))
                  }
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collections