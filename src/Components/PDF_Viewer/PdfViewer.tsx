import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
let sample = require("../../images/sample.pdf");

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offSet) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  };

  const changePageBack = () => {
    changePage(-1);
  };

  const changePageNext = () => {
    changePage(+1);
  };

  return (
    <>
      <Grid container>
        {/* <Document
          file="../../images/sample.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page height="600" pageNumber={pageNumber} />
        </Document>
        <Typography variant="h6">
          Page {pageNumber} of {numPages}
        </Typography>
        {pageNumber > 1 && (
          <Button onClick={changePageBack}>Previous Page</Button>
        )}
        {pageNumber < numPages && (
          <Button onClick={changePageNext}>Next Page</Button>
        )} */}
        {/* <center>
          <div>
            <Document
              file="https://drive.google.com/file/d/105ff0izvjYNnDZh08HNsLAQ85_HO_PMi/view"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </center> */}
      </Grid>
    </>
  );
};

export default PdfViewer;
