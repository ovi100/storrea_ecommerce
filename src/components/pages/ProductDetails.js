import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Menubar from '../header/Menubar';
import Loader from '../Loader';
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { productName } = useParams();
  const base_url = 'https://ovi.storrea.com/product/';
  const product_url = base_url + productName + '.json';

  const location = useLocation();
  console.log(location);
  const { collectionName } = location.state;
  console.log(collectionName);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const getProductData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getProductData(product_url).then((data) => {
      console.log(data.product);
      setProduct(data.product);
      setLoading(false);
    })
  }, [product_url])

  //const { name, featured_image_urls } = product;

  console.log(product_url);
  console.log(product);
  console.log(product.options);
  const options = product.options.map((item) => (Object.values(item)));
  console.log(options);

  return (
    <div>
      <Menubar />
      <div className="container mx-auto">
        {
          loading ?
            <Loader />
            :
            <div className="bg-white">
              <div className="pt-6">
                <nav aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                      <div className="flex items-center">
                        <Link
                          to="/"
                          className="mr-2 text-sm font-medium text-gray-900"
                        >
                          Home
                        </Link>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>

                    {/* <li>
                      <div className="flex items-center">
                        <Link
                          to={`/collection/${collectionName.name.split(' ').join('-').toLowerCase()}`}
                          className="capitalize ml-3 text-sm text-gray-600"
                        >
                          {collectionName.split('-').join(' ')}
                        </Link>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li> */}

                    <li className="text-sm">
                      <span className="font-medium text-gray-500 hover:text-gray-600"> {product.name} </span>
                    </li>
                  </ol>
                </nav>

                {/* Image gallery */}
                <div className="mt-6 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-8">
                  <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                    {
                      product.featured_image_urls ?
                        <img className="w-full h-full object-center object-cover" src={product.images_urls[0].original} alt={product.name} />
                        :
                        <img className="w-full h-full object-center object-cover" src="https://placehold.jp/1000x1000.jpg" alt={product.name} />
                    }
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                      {
                        product.featured_image_urls ?
                          <img className="w-full h-full object-center object-cover" src={product.images_urls[1].original} alt={product.name} />
                          :
                          <img className="w-full h-full object-center object-cover" src="https://placehold.jp/1000x1000.jpg" alt={product.name} />
                      }
                    </div>
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                      {
                        product.featured_image_urls ?
                          <img className="w-full h-full object-center object-cover" src={product.images_urls[2].original} alt={product.name} />
                          :
                          <img className="w-full h-full object-center object-cover" src="https://placehold.jp/1000x1000.jpg" alt={product.name} />
                      }
                    </div>
                  </div>
                </div>

                {/* Product info */}
                <div className="pt-10 pb-16 sm:px-6 lg:pt-16 lg:pb-24 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                  </div>

                  {/* Options */}
                  <div className="mt-4 lg:mt-0 lg:row-span-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl text-gray-900">{product.price}</p>

                    {/* Reviews */}
                    <div className="mt-6">
                      <h3 className="sr-only">Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex items-center">

                          <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>


                          <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>


                          <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>


                          <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>


                          <svg className="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <p className="sr-only">4 out of 5 stars</p>
                        <a href="/" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
                      </div>
                    </div>

                    <form className="mt-10">
                      {/* Colors */}
                      <div>
                        <h3 className="text-sm text-gray-900 font-medium">Color</h3>

                        <fieldset className="mt-4">
                          <legend className="sr-only">Choose a color</legend>
                          <div className="flex items-center space-x-3">

                            <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                              <input type="radio" name="color-choice" value="White" className="sr-only" aria-labelledby="color-choice-0-label" />
                              <span id="color-choice-0-label" className="sr-only"> White </span>
                              <span aria-hidden="true" className="h-8 w-8 bg-white border border-black border-opacity-10 rounded-full"></span>
                            </label>


                            <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                              <input type="radio" name="color-choice" value="Gray" className="sr-only" aria-labelledby="color-choice-1-label" />
                              <span id="color-choice-1-label" className="sr-only"> Gray </span>
                              <span aria-hidden="true" className="h-8 w-8 bg-gray-200 border border-black border-opacity-10 rounded-full"></span>
                            </label>


                            <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-900">
                              <input type="radio" name="color-choice" value="Black" className="sr-only" aria-labelledby="color-choice-2-label" />
                              <span id="color-choice-2-label" className="sr-only"> Black </span>
                              <span aria-hidden="true" className="h-8 w-8 bg-gray-900 border border-black border-opacity-10 rounded-full"></span>
                            </label>
                          </div>
                        </fieldset>
                      </div>

                      {/* Sizes */}
                      <a href="/modal" className="block mt-10 text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                      {product.options.length && (
                        product.options.map((item, index) => (
                          item[index].map((value, i) => (

                            <div className="mt-10" key={index}>
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm text-gray-900 font-medium">{value.option}</h3>
                              </div>
                              <fieldset className="mt-4">
                                <legend className="sr-only">Choose a size</legend>
                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                  <label className="group relative border rounded-md py-3 px-4 flex items-center 
                                  justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none 
                                  sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer">
                                    <input type="radio" name="size-choice" value="XS" className="sr-only" />
                                    <span id="size-choice-1-label"> XS </span>

                                    <span className="absolute -inset-px rounded-md pointer-events-none" aria-hidden="true"></span>
                                  </label>
                                </div>
                              </fieldset>
                            </div>
                          ))
                        ))
                      )
                      }

                      <button type="submit" className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add to bag</button>
                    </form>
                  </div>

                  <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <div>
                      <h3 className="sr-only">Description</h3>
                      <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.short_description}</p>
                      </div>
                    </div>

                    <div className="mt-10">
                      <div dangerouslySetInnerHTML={{ __html: product.product_shipping_info }} />
                    </div>

                    <div className="mt-10">
                      <h2 className="text-sm font-medium text-gray-900">Details</h2>

                      <div className="mt-4 space-y-6">
                        <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default ProductDetails