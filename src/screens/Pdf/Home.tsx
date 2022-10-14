import React, { useEffect, useState } from "react";
import { ReactStateDeclaration } from "@uirouter/react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { BookOpen, ArrowRight, Airplay } from "react-feather";
import { AppointmentType } from "../../types";
import { $crud } from "../../factories/CrudFactory";
import classNames from "classnames";
import { $state } from "../../router";
import { useCurrentUser } from "../../factories/UserFactory";
import { UISref } from "@uirouter/react";
import PdfViewer from "../../Components/PDF_Viewer/PdfViewer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 5,
    },
    paper: {
      padding: theme.spacing(2),
      background: "F1EEE9",
      color: theme.palette.text.secondary,
    },
  })
);

export function Home() {
  const user = useCurrentUser();
  const [loading, setLoading] = useState<Boolean>(false);
  const [limit] = useState(1);

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState<Boolean>(false);
  const [isSelected, setIsSelected] = useState<Boolean>(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    console.log("selectedFile", selectedFile);
    console.log("formData", formData);

    // fetch("https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("Success:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <Grid className="p-3" container direction="column" wrap="nowrap">
      <Grid container spacing={2}>
        <Grid item xs={12} className="ml-2">
          <Grid xs={12} container spacing={2} className="py-3">
            <Grid
              component={Paper}
              item
              xs={12}
              md={8}
              sm={12}
              className={classNames("p-2-all p-2 border")}
            >
              <TextField
                margin="normal"
                required
                label="Select Your File"
                InputLabelProps={{ shrink: true }}
                autoFocus
                type="file"
                name="pdf_file"
                onChange={changeHandler}
              />
              {isSelected === true ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{" "}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p>Select a file to show details</p>
              )}
              <PdfViewer />

              <div>
                <button onClick={handleSubmission}>Submit</button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export const states: ReactStateDeclaration[] = [
  {
    url: "/home",
    name: "home",
    data: {
      title: "Home",
      loggedIn: true,
    },
    component: Home,
  },
];
