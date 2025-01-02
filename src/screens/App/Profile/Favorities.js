import React from 'react';

import {useSelector} from 'react-redux';

import ProductList from '../../../components/Products';

const Favorities = () => {
  const favoriteList = useSelector(state => state.slice.favoriteList);

  return <ProductList userProducts={favoriteList} />;
};

export default Favorities;
