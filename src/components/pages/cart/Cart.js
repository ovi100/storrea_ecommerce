import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menubar from '../../header/Menubar';
import OrderItems from './OrderItems';

const Cart = () => {

  const getCart = async () => {
    const url = 'https://ovi.storrea.com/cart.json';
    const response = await fetch(url);
    const data = await response.json();
    return data.cart;
  }

  const [cart, setCart] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    getCart().then((data) => {
      setCart(data);
      setOrderItems(data.order_items);
    })
  }, [])

  console.log(cart);
  console.log(orderItems);

  return (
    <>
      <Menubar />
      <div className="container mx-auto py-5">
        <div className="cart-page">
          <h2 className="capitalize text-4xl font-extrabold tracking-tight text-gray-900">
            shopping cart
          </h2>
          {orderItems.length ?
            <div className="cart-items grid grid-cols-12 mt-8">
              <div className="col-span-7">
                <div className="flow-root">
                  <ul htmlrole="list" className="-my-6 divide-y divide-gray-200">
                    {
                      orderItems.map((orderItem, index) => (
                        <OrderItems
                          key={index}
                          orderItem={orderItem}
                        />
                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className="col-span-5">
                <div className="flow-root rounded-md bg-gray-100 p-6 ml-10">
                  <h2 className="text-lg font-bold mb-5">Order summery</h2>
                  <ul htmlrole="list" className="-my-6 divide-y divide-gray-200">
                    <li className="flex items-center justify-between py-4">
                      <span className="capitalize text-gray-500">subtotal</span>
                      <span className="capitalize">$55</span>
                    </li>
                    <li className="flex items-center justify-between py-4">
                      <span className="capitalize text-gray-500">shipping cost</span>
                      <span className="capitalize">$5</span>
                    </li>
                    <li className="flex items-center justify-between py-4">
                      <span className="capitalize text-gray-500">vat rate</span>
                      <span className="capitalize">$1</span>
                    </li>
                    <li className="flex items-center justify-between py-4">
                      <span className="capitalize font-medium">order total</span>
                      <span className="capitalize font-medium">$61</span>
                    </li>
                  </ul>
                  <div class="mt-6">
                    <Link
                      to="/store/orders/checkout_new"
                      class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 
                      px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                      Checkout
                    </Link>
                  </div>
                  <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or <a href="/" class="font-medium text-indigo-600 hover:text-indigo-500">Continue Shopping</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            :
            <p className="p-8 text-center text-5xl text-gray-500">Your cart is empty!</p>
          }
        </div>
      </div>
    </>

  )
}

export default Cart