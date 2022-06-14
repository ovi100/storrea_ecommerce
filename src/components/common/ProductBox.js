import React from 'react';
import { Link } from "react-router-dom";
import './ProductBox.css';

const ProductBox = ({ product, isWishListPage, state }) => {
  const currency = '৳ ';
  const base_url = 'https://ovi.storrea.com';
  const {
    id, name, slug, is_new, add_to_cart_url, url,
    has_variants, featured_image_urls, call_for_price, price,
    compare_at_price, stock_control, stock, variant_options
  } = product;
  
  const addToCart = (product_id) => {
    alert(product_id);
    let url = base_url + add_to_cart_url;
    const data = {
      id: product_id
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  }

  return (
    <>
      <div className="product-box" id={id}>
        <div className="photo">
          <Link to={`/product/${slug}`} state={state}>
            {
              featured_image_urls ?
                <img className="w-full h-full object-center object-cover" src={product.featured_image_urls.original} alt={name} />
                :
                <img className="w-full h-full object-center object-cover" src="https://placehold.jp/1000x1000.jpg" alt={name} />
            }
          </Link>
          {
            is_new ?
              <div className="tag">
                <span className="tag-new">new</span>
              </div>
              :
              null
          }
        </div>
        <div className="content">
          <div className="name-wishIcon">
            <Link to={`/product/${slug}`} className="truncate" state={state}>{name}</Link>
            {
              isWishListPage ?
                <svg viewBox="0 0 32 32" fill="#808080" width="15px" height="17px">
                  <title>Remove</title>
                  <g>
                    <path d="M24,31H8a3,3,0,0,1-3-3V9A1,1,0,0,1,7,9V28a1,1,0,0,0,1,1H24a1,1,0,0,0,1-1V9a1,1,0,0,1,2,0V28A3,3,0,0,1,24,31Z" />
                    <path d="M28,7H4A1,1,0,0,1,4,5H28a1,1,0,0,1,0,2Z" />
                    <path d="M20,7a1,1,0,0,1-1-1V3H13V6a1,1,0,0,1-2,0V2a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1V6A1,1,0,0,1,20,7Z" />
                    <path d="M16,26a1,1,0,0,1-1-1V11a1,1,0,0,1,2,0V25A1,1,0,0,1,16,26Z" />
                    <path d="M21,24a1,1,0,0,1-1-1V13a1,1,0,0,1,2,0V23A1,1,0,0,1,21,24Z" />
                    <path d="M11,24a1,1,0,0,1-1-1V13a1,1,0,0,1,2,0V23A1,1,0,0,1,11,24Z" />
                  </g>
                </svg>
                :
                <svg width="20px" height="20px" viewBox="0 0 32 32">
                  <title>Add to wishlist</title>
                  <path
                    d="M21.886 5.115c3.521 0 6.376 2.855 6.376 6.376 0 1.809-0.754 3.439-1.964 4.6l-10.297 10.349-10.484-10.536c-1.1-1.146-1.778-2.699-1.778-4.413 0-3.522 2.855-6.376 6.376-6.376 2.652 0 4.925 1.62 5.886 3.924 0.961-2.304 3.234-3.924 5.886-3.924zM21.886 4.049c-2.345 0-4.499 1.089-5.886 2.884-1.386-1.795-3.54-2.884-5.886-2.884-4.104 0-7.442 3.339-7.442 7.442 0 1.928 0.737 3.758 2.075 5.152l11.253 11.309 11.053-11.108c1.46-1.402 2.275-3.308 2.275-5.352 0-4.104-3.339-7.442-7.442-7.442v0z"
                    fill="#000000"></path>
                </svg>
            }
          </div>
          <div className="price">
            {
              call_for_price ?
                <>
                  <Link to="/contact_us" className="xs:hidden">Call for Price</Link>
                  <Link to="tel:{{store.phone}}" className="lg:hidden">Call for Price</Link>
                </>
                :
                <>
                  <span className="regular-price">{currency + price}</span>
                  {
                    compare_at_price ?
                      <s className="old-price">{currency + compare_at_price}</s>
                      :
                      null
                  }
                </>
            }
          </div>
          <div className="add-to-cart">
            {
              has_variants ?
                <Link to={url} title="View Details">
                  <svg viewBox="0 0 96 96" height="20px" width="20px">
                    <path d="M12,52h62.344L52.888,73.456c-1.562,1.562-1.562,4.095-0.001,5.656c1.562,1.562,4.096,1.562,5.658,0l28.283-28.284l0,0  c0.186-0.186,0.352-0.391,0.498-0.609c0.067-0.101,0.114-0.21,0.172-0.315c0.066-0.124,0.142-0.242,0.195-0.373  c0.057-0.135,0.089-0.275,0.129-0.415c0.033-0.111,0.076-0.217,0.099-0.331C87.973,48.525,88,48.263,88,48l0,0  c0-0.003-0.001-0.006-0.001-0.009c-0.001-0.259-0.027-0.519-0.078-0.774c-0.024-0.12-0.069-0.231-0.104-0.349  c-0.039-0.133-0.069-0.268-0.123-0.397c-0.058-0.139-0.136-0.265-0.208-0.396c-0.054-0.098-0.097-0.198-0.159-0.292  c-0.146-0.221-0.314-0.427-0.501-0.614L58.544,16.888c-1.562-1.562-4.095-1.562-5.657-0.001c-1.562,1.562-1.562,4.095,0,5.658  L74.343,44L12,44c-2.209,0-4,1.791-4,4C8,50.209,9.791,52,12,52z" />
                  </svg>
                </Link>
                :
                null
            }
            {
              has_variants === false && (stock_control === true && stock > 0) ?
                <svg onClick={() => addToCart(id)} width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <title>Add to Cart</title>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                :
                null
            }
            {
              has_variants === false && (stock_control === true && stock < 1) ?
                <svg viewBox="0 0 96 96" height="20px" width="20px" strokeWidth="2">
                  <title>Out of Stock</title>
                  <path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,12a35.71,35.71,0,0,1,20.7993,6.7214L18.717,68.7935A35.8886,35.8886,0,0,1,48,12Zm0,72a35.71,35.71,0,0,1-20.7993-6.7214L77.283,27.2065A35.8886,35.8886,0,0,1,48,84Z" />
                </svg>
                :
                null
            }
          </div>
          {
            variant_options ?
              <p>{variant_options}</p>
              :
              null
          }
        </div>
      </div>
    </>
  )
}

export default ProductBox