import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, STATUSES } from "../../store/productSlice";
import ProductCard from "./ProductCard";
import { Grid, Typography } from "@mui/material";

function Product() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </div>
  );
}

export default Product;

//     <div className="productsWrapper">
//     {products.map((product) => (
//         <div className="card" key={product.id}>
//             <img src={product.image} alt="" />
//             <h4>{product.title}</h4>
//             <h5>{product.price}</h5>
//             <button className="btn">
//                 Add to cart
//             </button>
//         </div>
//     ))}
// </div>
