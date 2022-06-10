import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import Menubar from '../header/Menubar';
import ProductBox from '../common/ProductBox';
import Loader from '../common/Loader';
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

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Toggle function for accordion button
  const toggleOption = (index) => {
    //console.log(typeof index, index);
    if (activeAccordion === index) {
      return setActiveAccordion(null);
    }
    setActiveAccordion(index);
  }
  const store_name = 'https://ovi.storrea.com/';
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(store_name).then((data) => {
      setCategories(data);
    })
  }, [])

  let [products, setProducts] = useState([]);
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

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [checkbox, setCheckbox] = useState(null);
  const [checked, setChecked] = useState(false);

  const filterCheckboxChange = (e) => {
    const target = e.target;
    const checked = target.type === 'checkbox' ? target.checked : null;
    //const name = e.target.name;
    const value = target.value;
    setChecked(checked)
    setCheckbox(value);
  }

  console.log('checkbox:', checked, checkbox);

  if (checked && checkbox) {
    products = products.filter(product => parseInt(product.price.replace(/[^\d.]/g, "")) < parseInt(checkbox));
    //setProducts([products, ...products]);
    console.log('Filter Products:', products);
  }

  return (
    <div>
      <Menubar />
      <div className="container mx-auto px-3 lg:px-0">
        <div className="bg-white">
          <div>
            {/*Off-canvas filters for mobile*/}
            <div className="relative z-30 lg:hidden">
              <div onClick={() => setShowMobileFilter(!showMobileFilter)}
                className={`fixed inset-0 bg-black bg-opacity-25 z-40 ease-in-out duration-300 ${showMobileFilter ? "" : "hidden"}`}></div>
              <div className={`fixed inset-0 flex z-40 ease-in-out duration-300 ${showMobileFilter ? "translate-x-0 " : "translate-x-full"}`}>
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button type="button" onClick={() => setShowMobileFilter(!showMobileFilter)}
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400">
                      <span className="sr-only">Close menu</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Filters*/}
                  <form className="mt-4 border-gray-200">
                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root" id="mobile-category" onClick={() => toggleOption(0)}>
                        <button type="button" className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                          <span className="font-medium text-gray-900 capitalize"> Category </span>
                          <span className="ml-6 flex items-center">
                            {activeAccordion === 0 ?
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
                      <div className={activeAccordion === 0 ? "pt-6" : "hidden"} id="filter-mobile-0">
                        <div className="space-y-4">
                          {
                            categories.map((category, index) => (
                              <div className="items-center" key={index}>
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
                        <div className="border-t border-gray-200 px-4 py-6" key={index + 1}>
                          <h3 className="-mx-2 -my-3 flow-root" onClick={() => toggleOption(index + 1)}>
                            <button type="button" className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                              <span className="font-medium text-gray-900 capitalize">{filter.label}</span>
                              <span className="ml-6 flex items-center">
                                {activeAccordion === index + 1 ?
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
                          <div className={`pt-6 ${activeAccordion === index + 1 ? "" : "hidden"}`} id={`filter-mobile` + index + 1}>
                            <div className="space-y-4">
                              {
                                filter.values.map((value, index) => (
                                  <div className="flex items-center" key={index}>
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
                </div>
              </div>
            </div>

            <main>
              <div className="relative flex items-baseline justify-between pt-10 pb-6 border-b border-gray-200">
                <h1 className="capitalize text-4xl font-extrabold tracking-tight text-gray-900">{collectionName.split('-').join(' ')}</h1>
                <div className="flex items-center">
                  <div className="relative inline-block text-left">
                    <div>
                      <button type="button" onClick={() => setSortDropdownOpen(!sortDropdownOpen)} className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button">
                        Sort
                        <svg className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <div className={sortDropdownOpen ? "origin-top-right absolute right-0 mt-2 w-40 z-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
                      <div className="py-1">
                        {
                          sortOptions.map((option, index) => (
                            <p
                              onClick={() => selectedOption(option.value)}
                              className="cursor-pointer text-gray-500 block px-4 py-2 text-sm"
                              id={`sort-option-` + index}
                              key={index}
                            >
                              {option.text}
                            </p>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  {/* Mobile filter open button */}
                  <button type="button" onClick={() => setShowMobileFilter(!showMobileFilter)}
                    className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden">
                    <span className="sr-only">Filters</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <section className="collection-grid">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <div className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root" id="category" onClick={() => toggleOption(0)}>
                        <button type="button" className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                          <span className="font-medium text-gray-900 capitalize"> Category </span>
                          <span className="ml-6 flex items-center">
                            {activeAccordion === 0 ?
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
                      <div className={activeAccordion === 0 ? "pt-6" : "hidden"} id="filter-section-0">
                        <div className="space-y-4">
                          {
                            categories.map((category, index) => (
                              <div className="items-center" key={index}>
                                <Link
                                  key={index}
                                  to={`/collection/${category.name.split(' ').join('-').toLowerCase()}`}
                                  state={{ id: category.id }}
                                  className="capitalize ml-3 text-sm text-gray-600"
                                >
                                  {category.name}
                                </Link>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                    {filters ?
                      filters.map((filter, index) => (
                        <div className="border-b border-gray-200 py-6" key={index + 1}>
                          <h3 className="-my-3 flow-root" onClick={() => toggleOption(index + 1)}>
                            <button type="button" className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                              <span className="font-medium text-gray-900 capitalize">{filter.label}</span>
                              <span className="ml-6 flex items-center">
                                {activeAccordion === index + 1 ?
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
                          <div className={activeAccordion === index + 1 ? "pt-6" : "hidden"} id={`filter-` + index + 1}>
                            <div className="space-y-4">
                              {
                                filter.values.map((value, index) => (
                                  <div className="flex items-center" key={index}>
                                    <input
                                      id={`checkbox-` + index}
                                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      name={value.label}
                                      value={value.max_value}
                                      type="checkbox"
                                      onChange={filterCheckboxChange}
                                    />
                                    <label htmlFor={`checkbox-` + index} className="ml-3 text-sm text-gray-600">{value.label}</label>
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
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {
                          products.map((product, index) => (
                            <div className="group relative mb-3" key={index}>
                              <ProductBox
                                key={index}
                                product={product}
                                isWishListPage={isWishListPage}
                                state={{ name: collectionName }} />
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