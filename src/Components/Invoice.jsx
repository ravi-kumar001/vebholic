import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import InvoiceDailog from "./InvoiceDailog";
import CustomTable from "./CustomTable";

function Invoice(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState({
    open: false,
    data: null,
  });

  const handleSave = (row) => {
    if (row?._id) {
      const newData = [...data]?.map((d) => {
        if (d?._id === row?._id) {
          return row;
        }
        return d;
      });
      setData(newData);
    } else {
      setData([...data, { ...row, _id: Date.now() }]);
    }
  };

  return (
    <Box>
      <Box>
        <div className="header">
          <h3>Invoice</h3>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setOpen({ open: true, data: null });
            }}
          >
            Add Invoice
          </Button>
        </div>
      </Box>
      <Box>
        <CustomTable data={data} handleSave={handleSave} />
      </Box>
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
    </Box>
  );
}

export default Invoice;
