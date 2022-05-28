import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import Menubar from '../header/Menubar';
import ProductBox from './ProductBox';
import Loader from '../Loader';
import { getCategories } from '../header/GetCategories';
import { Link } from "react-router-dom";

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const isWishListPage = false;
  const { collectionName } = useParams();
  const location = useLocation();
  const { id } = location.state;
  const base_url = `https://ovi.storrea.com/store/apps/product_filter_app/filters/${id}/`;
  const filter_url = base_url + 'collection_filters?format=json';

  const [isOpen, setIsOpen] = useState(false);

  // const toggleOption = (e) => {
  //   setIsOpen(!isOpen);
  // }
  const store_name = 'https://ovi.storrea.com/';
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(store_name).then((data) => {
      setCategories(data);
    })
  }, [])

  const [products, setProducts] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("product_collections.position ASC");
  const [filters, setFilters] = useState([]);
  let products_url = '';

  const selectedOption = (value) => {

    setSelectedSortOption(value);
  }

  console.log('Sort Option:', selectedSortOption);

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
        <div className="bg-white">
          <div>
            {/*Off-canvas filters for mobile*/}
            <div className="relative z-40 lg:hidden">
              <div className="fixed inset-0 bg-black bg-opacity-25"></div>

              <div className="fixed inset-0 flex z-40">
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button type="button" className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400">
                      <span className="sr-only">Close menu</span>

                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Filters*/}
                  <form className="mt-4 border-gray-200">
                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        {/* Expand/collapse section button */}
                        <button type="button" className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                          <span className="font-medium text-gray-900"> Color </span>
                          <span className="ml-6 flex items-center">
                            {/*solid/plus-sm*/}
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            {/*solid/minus-sm*/}
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      {/* Filter section*/}
                      <div className="pt-6" id="filter-section-mobile-0">
                        <div className="space-y-6">
                          <div className="flex items-center">
                            <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-gray-500"> White </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-color-1" name="color[]" value="beige" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-color-1" className="ml-3 min-w-0 flex-1 text-gray-500"> Beige </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-color-2" name="color[]" value="blue" type="checkbox" checked className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-color-2" className="ml-3 min-w-0 flex-1 text-gray-500"> Blue </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-color-3" name="color[]" value="brown" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-color-3" className="ml-3 min-w-0 flex-1 text-gray-500"> Brown </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-color-4" name="color[]" value="green" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-color-4" className="ml-3 min-w-0 flex-1 text-gray-500"> Green </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-color-5" name="color[]" value="purple" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-color-5" className="ml-3 min-w-0 flex-1 text-gray-500"> Purple </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">

                        <button type="button" className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
                          <span className="font-medium text-gray-900"> Category </span>
                          <span className="ml-6 flex items-center">

                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>

                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      {/* Filter section*/}
                      <div className="pt-6" id="filter-section-mobile-1">
                        <div className="space-y-6">
                          <div className="flex items-center">
                            <input id="filter-mobile-category-0" name="category[]" value="new-arrivals" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-category-0" className="ml-3 min-w-0 flex-1 text-gray-500"> New Arrivals </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-category-1" name="category[]" value="sale" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-category-1" className="ml-3 min-w-0 flex-1 text-gray-500"> Sale </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-category-2" name="category[]" value="travel" type="checkbox" checked className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-category-2" className="ml-3 min-w-0 flex-1 text-gray-500"> Travel </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-category-3" name="category[]" value="organization" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-category-3" className="ml-3 min-w-0 flex-1 text-gray-500"> Organization </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-category-4" name="category[]" value="accessories" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-category-4" className="ml-3 min-w-0 flex-1 text-gray-500"> Accessories </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">

                        <button type="button" className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-2" aria-expanded="false">
                          <span className="font-medium text-gray-900"> Size </span>
                          <span className="ml-6 flex items-center">

                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>

                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      {/* Filter section*/}
                      <div className="pt-6" id="filter-section-mobile-2">
                        <div className="space-y-6">
                          <div className="flex items-center">
                            <input id="filter-mobile-size-0" name="size[]" value="2l" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-size-0" className="ml-3 min-w-0 flex-1 text-gray-500"> 2L </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-size-1" name="size[]" value="6l" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-size-1" className="ml-3 min-w-0 flex-1 text-gray-500"> 6L </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-size-2" name="size[]" value="12l" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-size-2" className="ml-3 min-w-0 flex-1 text-gray-500"> 12L </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-size-3" name="size[]" value="18l" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-size-3" className="ml-3 min-w-0 flex-1 text-gray-500"> 18L </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-size-4" name="size[]" value="20l" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-size-4" className="ml-3 min-w-0 flex-1 text-gray-500"> 20L </label>
                          </div>

                          <div className="flex items-center">
                            <input id="filter-mobile-size-5" name="size[]" value="40l" type="checkbox" checked className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-mobile-size-5" className="ml-3 min-w-0 flex-1 text-gray-500"> 40L </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <main>
              <div className="relative z-10 flex items-baseline justify-between pt-10 pb-6 border-b border-gray-200">
                <h1 className="capitalize text-4xl font-extrabold tracking-tight text-gray-900">{collectionName.split('-').join(' ')}</h1>

                <div className="flex items-center">
                  <div className="relative inline-block text-left">
                    <div>
                      <button type="button" onClick={() => setIsOpen(!isOpen)} className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button">
                        Sort
                        {/* solid/chevron-down */}
                        <svg className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <div className={isOpen ? "origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
                      <div className="py-1">
                        {
                          sortOptions.map((option, index) => (
                            <p onClick={() => selectedOption(option.value)} className="cursor-pointer text-gray-500 block px-4 py-2 text-sm" id={`sort-option-` + index}>{option.text}</p>
                          ))
                        }
                      </div>
                    </div>
                  </div>

                  <button type="button" className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden">
                    <span className="sr-only">Filters</span>

                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <section className="pt-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <div className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root" id="category" onClick={() => setIsOpen(!isOpen)}>
                        <button type="button" className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                          <span className="font-medium text-gray-900"> Category </span>
                          <span className="ml-6 flex items-center">
                            {isOpen ?
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                              :
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                            }
                          </span>
                        </button>
                      </h3>
                      <div className={isOpen ? "pt-6" : "hidden"} id="filter-section-0">
                        <div className="space-y-4">
                          {
                            categories.map((category, index) => (
                              <div className="items-center">
                                <Link
                                  key={index}
                                  to={`/collection/${category.name.split(' ').join('-').toLowerCase()}`}
                                  state={{ id: category.id }}
                                  className="capitalize ml-3 text-sm text-gray-600">{category.name}</Link>
                              </div>
                            ))
                          }


                        </div>
                      </div>
                    </div>
                    {filters ?
                      filters.map((filter, index) => (
                        <div className="border-b border-gray-200 py-6" key={index}>
                          <h3 className="-my-3 flow-root" onClick={() => setIsOpen(!isOpen)}>
                            <button type="button" className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                              <span className="font-medium text-gray-900">{filter.label}</span>
                              <span className="ml-6 flex items-center">
                                {isOpen ?
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                  </svg>
                                  :
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                  </svg>
                                }
                              </span>
                            </button>
                          </h3>
                          <div className={isOpen ? "pt-6" : "hidden"} id={`filter-` + index}>
                            <div className="space-y-4">
                              {
                                filter.values.map((value, index) => (
                                  <div className="flex items-center">
                                    <input id="filter-color-0" name={value.label} value="white" type="checkbox"
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="filter-color-0" className="ml-3 text-sm text-gray-600">{value.label}</label>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      ))
                      :
                      null
                    }
                  </form>

                  {/* Product grid */}
                  <div className="collection-content lg:col-span-4 my-3">
                    {loading ?
                      <Loader />
                      :
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collections