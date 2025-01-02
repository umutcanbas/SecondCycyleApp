import React from 'react';

import {useDispatch, useSelector} from 'react-redux';

import ProductList from '../../../components/Products';
import Button from '../../../components/Button';

import {clearFavorites} from '../../../redux/slice';

const Favorities = () => {
  const favoriteList = useSelector(state => state.slice.favoriteList);
  const dispatch = useDispatch();

  const clearFavorities = () => {
    dispatch(clearFavorites());
  };

  return (
    <ProductList userProducts={favoriteList}>
      <Button
        title="Clear Favorities"
        onPress={clearFavorities}
        containerStyles={{backgroundColor: 'red'}}
        titleStyles={{color: 'black'}}
      />
    </ProductList>
  );
};

export default Favorities;
