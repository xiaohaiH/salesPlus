import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import List from '../components/list';

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <List onDelete={handleDelete} products={products} />
      <li><Link to='/'>home</Link></li>
    </div>
  );
};

// export default Products;
export default connect(({ products }) => {
  return {
    products,
  }
})(Products);