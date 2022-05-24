import React, { useEffect, useState } from 'react';
import { getCategories } from './GetCategories';
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Menubar = () => {
  const store_name = 'https://ovi.storrea.com/';
  const [categories, setCategories] = useState([]);

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
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="text-capitalize navbar-brand">wood mart</Link>
          <Nav className="me-auto">
            <li>
              <Link to="/" className="nav-link text-capitalize">home</Link>
            </li>
            {
              categories.map((category, index) => (
                <li key={category.id}>
                  <Link to={`/collection/${category.name.split(' ').join('-').toLowerCase()}`} state={{ id: category.id }} className="nav-link">{category.name}</Link>
                </li>
                //  {category.map((second_child, index) => (
                //   <ul>
                //     <li key={index}>
                //       <Link to={`/collection/${second_child.name.split(' ').join('-').toLowerCase()}`}>{second_child.name}</Link>
                //     </li>
                //   </ul>
                // ))}}
              ))
            }
            <NavDropdown title="Dropdown Link" id="nav-dropdown">
              <Link to="/" className="dropdown-item">link 1</Link>
              <Link to="/" className="dropdown-item">link 2</Link>
              <Link to="/" className="dropdown-item">link 3</Link>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Menubar