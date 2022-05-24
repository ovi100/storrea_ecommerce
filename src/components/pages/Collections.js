import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import Menubar from '../header/Menubar';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ProductBox from './ProductBox';
import Loader from '../Loader';

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const { collectionName } = useParams();
  const location = useLocation();
  const { id } = location.state;
  const base_url = 'https://ovi.storrea.com/store/';
  const filter_url = base_url + `/apps/product_filter_app/filters/${id}/collection_filters?format=json`;
  const products_url = base_url + `apps/product_filter_app/filters/${id}/collection_results?&page=1&per_page=50&sort_by=product_collections.position%20ASC&format=json`;

  const [products, setProducts] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  const [filters, setFilters] = useState([]);

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
      <Container fluid="lg">
        <div className="sort-option">
          <Row className="mt-3 mb-3">
            <Col sm={2}>
              <form>
                <Form.Select>
                  {
                    sortOptions.map((option) => (
                      <option value={option.value} key={option.text}>{option.text}</option>
                    ))
                  }
                </Form.Select>
              </form>
            </Col>
          </Row>
        </div>
        <div className="collection">
          <div className="collection-header text-center py-4">
            <h4 className="text-capitalize">{collectionName}</h4>
          </div>
          {/* <div className="collection-content"></div> */}
          <div className="collection-content my-3">
            {
              loading ?
                <Loader />
                :
                <Row>
                  {
                    products.map((product, i) => (
                      <Col className="mb-3" xs={6} md={3} key={i}>
                        <ProductBox key={i} product={product} />
                      </Col>
                    ))
                  }
                </Row>
            }
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Collections