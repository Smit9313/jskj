import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, STATUSES } from "../../store/productSlice";
import ProductCard from "./ProductCard";
import { Grid, Typography, TextField } from "@mui/material";
import Filter from "./Filter";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate, useSearchParams } from "react-router-dom";

function Product() {
  const dispatch = useDispatch();
  const { data: products, status,totalProducts } = useSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const queryString = {
    page,
    rowsPerPage,
    search,
  };

  useEffect(() => {
    //checking params
    for (const [key, value] of Object.entries(queryString)) {
      if (!searchParams.has(key)) {
        searchParams.set(key, value);
      }
    }
    //if not setting params
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    let page = +searchParams.get("page");
    let rowsPerPage = +searchParams.get("rowsPerPage");
    let search = searchParams.get("search") || "";

    setPage(+page);
    setRowsPerPage(+rowsPerPage);
    setSearch(search);

    dispatch(fetchProducts(page, rowsPerPage, search));
  }, [searchParams]);

  const handleChangePage = (event, newPage) => {
    // setPage(newPage);
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0)
    searchParams.set("page", 0);
    searchParams.set("rowsPerPage", event.target.value);
    setSearchParams(searchParams);
  };

  // if (status === STATUSES.LOADING) {
  //   return <h2>Loading....</h2>;
  // }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>

      <TextField
        id="standard-basic"
        label="Search Products"
        variant="standard"
        margin="normal"
        value={search}
        onChange={(e) => {
          searchParams.set("search", e.target.value);
          searchParams.set("page", 0);
          setSearchParams(searchParams);
        }}
      />
      {/* <Filter/> */}
      { status===STATUSES.IDLE &&
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products?.products?.length > 0 &&
          products?.products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        <TablePagination
          component="div"
          count={totalProducts || 100}
          page={page || 0}
          onPageChange={handleChangePage}
          rowsPerPage={+rowsPerPage || 10}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
      }
      {status === STATUSES.LOADING && <h2>Loading....</h2>}
    </div>
  );
}

export default Product;
