import React, { useEffect, useState } from 'react';
import { getCategories } from './GetCategories';
import { Link } from "react-router-dom";

const Menubar = () => {
  const store_name = 'https://ovi.storrea.com/';
  const [categories, setCategories] = useState([]);

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });
  }, []);

  useEffect(() => {
    getCategories(store_name).then((data) => {
      setCategories(data);
    })
  }, [])

  //console.log(categories);


  // categories.forEach((item, index) => {
  //   //console.log(item);
  //   let first_child = item.childrens;
  //   console.log(item.name + ' first child is ', first_child);
  //   first_child.forEach((value, index) => {
  //     let third_child = value.childrens;
  //     console.log(value.name + ' second child is ', third_child);
  //   })
  // });

  return (
    <>
      <nav className={scroll ? "bg-gray-800 fixed top-0 left-0 right-0 z-50 transition-all" : "bg-gray-800 transition-all"}>
        <div className="container mx-auto sm:px-4">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>

                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="capitalize text-gray-300 hover:text-white rounded-md text-xl font-medium">wood mart</Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {
                    categories.map((category, index) => (
                      <Link
                        key={index}
                        to={`/collection/${category.name.split(' ').join('-').toLowerCase()}`}
                        state={{ id: category.id }}
                        className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">{category.name}</Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white fixed h-full w-80 hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {
              categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/collection/${category.name.split(' ').join('-').toLowerCase()}`}
                  state={{ id: category.id }}
                  className="block text-black-500 hover:text-white text-lg font-medium">{category.name}</Link>
              ))
            }
          </div>
        </div>
      </nav>

    </>
  )
}

export default Menubar