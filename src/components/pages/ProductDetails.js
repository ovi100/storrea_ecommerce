import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menubar from '../header/Menubar';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../Loader';

const ProductDetails = () => {
  const { productName } = useParams();
  const base_url = 'https://ovi.storrea.com/product/';
  const product_url = base_url + productName + '.json'

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

  return (
    <div>
      <Menubar />
      <Container fluid="lg">
        {
          loading ?
            <Loader />
            :
            <Row className="mt-3 mb-3">
              <Col md={5} sm={6} xs={12}>
                <div className="product-image px-3">
                  {
                    product.featured_image_urls ?
                      <img className="img-fluid" src={product.featured_image_urls.original} alt={product.name} />
                      :
                      <img className="img-fluid" src="https://placehold.jp/1000x1000.jpg" alt={product.name} />
                  }
                </div>
              </Col>
              <Col md={7} sm={6} xs={12}>
                <div className="product-details px-3">
                  <h3>{product.name}</h3>
                </div>
              </Col>
            </Row>
        }
      </Container>
    </div>
  )
}

export default ProductDetails