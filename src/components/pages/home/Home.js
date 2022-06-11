import React from 'react';
import Collection from './Collection';
import HomeSlider from './HomeSlider';

const Home = () => {
  const collectionsId = [29287, 29296];

  return (
    <>
      <div className="container mx-auto p-5">
        <HomeSlider />
        <div className="home-collections">
          {
            collectionsId.map((item, index) => <Collection key={index} id={item} />)
          }
        </div>
      </div>
    </>
  )
}

export default Home