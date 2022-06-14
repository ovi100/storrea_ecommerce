import React from 'react'

const OrderItems = ({ OrderItem }) => {
  return (
    <>
      <li className="flex py-6">
        <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon" className="h-full w-full object-cover object-center" />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href="/"> Throwback Hip Bag </a>
              </h3>
              <div className="quantity-box flex w-40 rounded-md shadow-sm">
                <span className="inline-flex items-center cursor-pointer px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  className="focus:ring-0 focus:border-gray-300 flex-1 text-center block w-full rounded-none sm:text-sm border-gray-300"
                  value="1"
                />
                <span className="inline-flex items-center cursor-pointer px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
              <div className="remove-icon text-gray-500 cursor-pointer">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500">Salmon</p>
            <p className="price mt-2">$90.00</p>
          </div>
          <div className="quantity-label text-sm">
            <p className="text-gray-500 mt-2">Qty 1</p>
          </div>
        </div>
      </li>
    </>
  )
}

export default OrderItems