import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import InvoiceDailog from "./InvoiceDailog";
import DoneIcon from "@mui/icons-material/Done";

function CustomTable({ data, handleSave }) {
  const [open, setOpen] = useState({ open: false, data: null });
  const [inlineEdit, setInlineEdit] = useState({
    open: false,
    name: "",
    data: null,
  });

  const handleChange = (e) => {
    const { name, value } = e?.target;
    const updatedForm = { ...inlineEdit?.data, [name]: Number(value) };

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
      setInlineEdit({
        ...inlineEdit,
        data: { ...updatedForm, discount, tax, totalPrice },
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
      setInlineEdit({
        ...inlineEdit,
        data: { ...updatedForm, discountPercentage, tax, totalPrice },
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
      setInlineEdit({
        ...inlineEdit,
        data: { ...updatedForm, taxPercentage, totalPrice },
      });
    } else if (name === "totalPrice") {
      const discount =
        (updatedForm.price * updatedForm.qty * updatedForm.discountPercentage) /
        100;
      const tax =
        updatedForm.totalPrice - updatedForm.price * updatedForm.qty + discount;
      const taxPercentage =
        (tax / (updatedForm.price * updatedForm.qty - discount)) * 100;
      setInlineEdit({
        ...inlineEdit,
        data: { ...updatedForm, tax, taxPercentage },
      });
    } else {
      setInlineEdit({
        ...inlineEdit,
        data: { ...updatedForm },
      });
    }
  };

  const EditBox = ({ name, data }) => {
    return (
      <>
        <input
          type="number"
          name={name}
          value={data[name]}
          onChange={handleChange}
        />
      </>
    );
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Qty</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Discount</th>
            <th>Tax %</th>
            <th>Tax</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((invoice, index) => (
            <tr key={index}>
              <td key={index}>
                {inlineEdit.open &&
                inlineEdit.name === "qty" &&
                inlineEdit?.data?._id === invoice?._id ? (
                  <EditBox name={inlineEdit.name} data={inlineEdit.data} />
                ) : (
                  <div className="grid">
                    <span>{invoice?.qty}</span>
                    <EditIcon
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setInlineEdit({
                          open: true,
                          name: "qty",
                          data: invoice,
                        });
                      }}
                    />
                  </div>
                )}
              </td>
              <td key={index}>
                {inlineEdit.open &&
                inlineEdit.name === "price" &&
                inlineEdit?.data?._id === invoice?._id ? (
                  <EditBox name={inlineEdit.name} data={inlineEdit.data} />
                ) : (
                  <div className="grid">
                    <span>{invoice?.price}</span>
                    <EditIcon
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setInlineEdit({
                          open: true,
                          name: "price",
                          data: invoice,
                        });
                      }}
                    />
                  </div>
                )}
              </td>
              <td key={index}>
                {inlineEdit.open &&
                inlineEdit.name === "discountPercentage" &&
                inlineEdit?.data?._id === invoice?._id ? (
                  <EditBox name={inlineEdit.name} data={inlineEdit.data} />
                ) : (
                  <div className="grid">
                    <span>{invoice?.discountPercentage}</span>
                    <EditIcon
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setInlineEdit({
                          open: true,
                          name: "discountPercentage",
                          data: invoice,
                        });
                      }}
                    />
                  </div>
                )}
              </td>
              <td key={index}>
                {inlineEdit.open &&
                inlineEdit.name === "discount" &&
                inlineEdit?.data?._id === invoice?._id ? (
                  <EditBox name={inlineEdit.name} data={inlineEdit.data} />
                ) : (
                  <div className="grid">
                    <span>{invoice?.discount}</span>
                    <EditIcon
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setInlineEdit({
                          open: true,
                          name: "discount",
                          data: invoice,
                        });
                      }}
                    />
                  </div>
                )}
              </td>
              <td key={index}>
                {inlineEdit.open &&
                inlineEdit.name === "taxPercentage" &&
                inlineEdit?.data?._id === invoice?._id ? (
                  <EditBox name={inlineEdit.name} data={inlineEdit.data} />
                ) : (
                  <div className="grid">
                    <span>{invoice?.taxPercentage}</span>
                    <EditIcon
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setInlineEdit({
                          open: true,
                          name: "taxPercentage",
                          data: invoice,
                        });
                      }}
                    />
                  </div>
                )}
              </td>
              <td key={index}>
                {inlineEdit.open &&
                inlineEdit.name === "tax" &&
                inlineEdit?.data?._id === invoice?._id ? (
                  <EditBox name={inlineEdit.name} data={inlineEdit.data} />
                ) : (
                  <div className="grid">
                    <span>{invoice?.tax}</span>
                    <EditIcon
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setInlineEdit({
                          open: true,
                          name: "tax",
                          data: invoice,
                        });
                      }}
                    />
                  </div>
                )}
              </td>
              <td key={index}>{invoice?.totalPrice}</td>
              <td key={index}>
                {inlineEdit.open && inlineEdit?.data?._id === invoice?._id ? (
                  <DoneIcon
                    fontSize="small"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleSave(inlineEdit?.data);
                      setInlineEdit({ open: false, name: "", data: null });
                    }}
                  />
                ) : (
                  <EditIcon
                    fontSize="small"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpen({ open: true, data: invoice });
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open.open && (
        <InvoiceDailog
          data={open.data}
          onClose={() => {
            setOpen({ open: false, data: null });
          }}
          handleSave={(row) => {
            handleSave(row);
            setOpen({ open: false, data: null });
          }}
        />
      )}
    </>
  );
}

export default CustomTable;
