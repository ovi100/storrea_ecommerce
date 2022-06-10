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
      //console.log(data);
      setCategories(data);
    })
  }, [])

  const [showMobileNav, setShowMobileNav] = useState(false);

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
      {/* <nav className={scroll ? "bg-gray-800 fixed top-0 left-0 right-0 z-50 transition-all" : "bg-gray-800 transition-all"}> */}
      <nav className={`bg-gray-800 z-30 ease-in-out duration-300 ${scroll ? "fixed top-0 left-0 right-0" : ""}`}>
        <div className="container mx-auto sm:px-4">
          <div className="relative flex items-center justify-between h-16 px-3 lg:px-0">
            <div className="toggle-button items-center block lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 
                hover:text-white hover:bg-gray-700 focus:outline-none"
                aria-controls="mobile-menu" aria-expanded="false"
                onClick={() => setShowMobileNav(!showMobileNav)}
              >
                <span className="sr-only">Open menu</span>

                {showMobileNav ?
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  :
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                }
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
            <div className="icons ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a href="/sign_in" className="text-sm font-medium text-gray-300 hover:text-white">Sign in</a>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                <a href="/sign_up" className="text-sm font-medium text-gray-300 hover:text-white">Sign up</a>
              </div>

              {/* Search */}
              {/* <div class="flex lg:ml-6">
                <a href="/search" class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </a>
              </div> */}

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <a href="/cart" className="group -m-2 p-2 flex items-center">
                  <svg className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-300 group-hover:text-gray-600">0</span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => setShowMobileNav(!showMobileNav)} className={`fixed inset-0 top-16 bg-black bg-opacity-25 z-20 ease-in-out duration-300 ${showMobileNav ? "" : "hidden"}`}></div>
        <div className={`bg-white fixed h-full w-80 z-30 ease-in-out duration-300 ${showMobileNav ? "translate-x-0 " : "-translate-x-full"}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {
              categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/collection/${category.name.split(' ').join('-').toLowerCase()}`}
                  state={{ id: category.id }}
                  className="block text-black-400 hover:text-gray-300 text-lg font-medium">{category.name}</Link>
              ))
            }
          </div>
        </div>
      </nav>

    </>
  )
}

export default Menubar