import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, STATUSES } from "../../store/productSlice";
import ProductCard from "./ProductCard";
import { Grid, Typography } from "@mui/material";
import Filter from "./Filter";
import TablePagination from '@mui/material/TablePagination';


function Product() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <TablePagination
      component="div"
      count={products?.products?.length || 0}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
      </Grid>
    </div>
  );
}

export default Product;
