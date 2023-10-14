import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, STATUSES } from "../../store/productSlice";
import ProductCard from "./ProductCard";
import { Grid, Typography } from "@mui/material";
import Filter from "./Filter";

function Product() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

  // const defaultProps = [
  //   'name',
  //   'price',
  // ]

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>
      <Filter/>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products?.products?.length > 0 &&
          products?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Grid>
    </div>
  );
}

export default Product;
