import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function InvoiceDailog({ data, onClose, handleSave }) {
  const [formData, setFormData] = useState({
    qty: 1,
    price: 0,
    discountPercentage: 0,
    discount: 0,
    taxPercentage: 0,
    tax: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    if (data?._id) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    const updatedForm = { ...formData, [name]: Number(value) };

    if (
      name === "qty" ||
      name === "price" ||
      name === "discountPercentage" ||
      name === "taxPercentage"
    ) {
      const discount =
        (updatedForm.price * updatedForm.qty * updatedForm.discountPercentage) /
        100;
      const tax =
        ((updatedForm.price * updatedForm.qty - discount) *
          updatedForm.taxPercentage) /
        100;
      const totalPrice = updatedForm.price * updatedForm.qty - discount + tax;
      setFormData({
        ...updatedForm,
        discount,
        tax,
        totalPrice,
      });
    } else if (name === "discount") {
      const discountPercentage =
        (updatedForm.discount / (updatedForm.price * updatedForm.qty)) * 100;
      const tax =
        ((updatedForm.price * updatedForm.qty - updatedForm.discount) *
          updatedForm.taxPercentage) /
        100;
      const totalPrice =
        updatedForm.price * updatedForm.qty - updatedForm.discount + tax;
      setFormData({
        ...updatedForm,
        discountPercentage,
        tax,
        totalPrice,
      });
    } else if (name === "tax") {
      const taxPercentage =
        (updatedForm.tax /
          (updatedForm.price * updatedForm.qty - updatedForm.discount)) *
        100;
      const totalPrice =
        updatedForm.price * updatedForm.qty -
        updatedForm.discount +
        updatedForm.tax;
      setFormData({
        ...updatedForm,
        taxPercentage,
        totalPrice,
      });
    } else if (name === "totalPrice") {
      const discount =
        (updatedForm.price * updatedForm.qty * updatedForm.discountPercentage) /
        100;
      const tax =
        updatedForm.totalPrice - updatedForm.price * updatedForm.qty + discount;
      const taxPercentage =
        (tax / (updatedForm.price * updatedForm.qty - discount)) * 100;
      setFormData({
        ...updatedForm,
        tax,
        taxPercentage,
      });
    } else {
      setFormData(updatedForm);
    }
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle>Create Invoice</DialogTitle>
        <DialogContent>
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="number"
                  size="sm"
                  fullWidth
                  name="qty"
                  value={formData?.qty}
                  id="outlined-basic"
                  label="Qty"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="number"
                  fullWidth
                  size="sm"
                  id="outlined-basic"
                  label="Price"
                  name="price"
                  value={formData?.price}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="number"
                  size="sm"
                  id="outlined-basic"
                  label="Discount %"
                  value={formData?.discountPercentage}
                  variant="outlined"
                  fullWidth
                  name="discountPercentage"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="number"
                  size="sm"
                  name="discount"
                  id="outlined-basic"
                  fullWidth
                  label="Discount"
                  value={formData?.discount}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="number"
                  size="sm"
                  id="outlined-basic"
                  label="Tax %"
                  name="taxPercentage"
                  value={formData?.taxPercentage}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="number"
                  size="sm"
                  id="outlined-basic"
                  label="Tax"
                  name="tax"
                  fullWidth
                  value={formData?.tax}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  type="number"
                  size="sm"
                  id="outlined-basic"
                  label="Total Price"
                  fullWidth
                  disabled
                  name="totalPrice"
                  value={formData?.totalPrice}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="outlined" onClick={onClose}>
            cancel
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              handleSave(formData);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InvoiceDailog;
