import React from "react";
import {
  Box,
  Switch,
  FormControlLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#977CC9",
    },
  },
});

const BoxOption = ({ name, label, infoChoice, handleToggle }) => {
  return (
    <Box
      onClick={handleToggle(name)}
      sx={{
        width: "90%",
        height: "100%",
        borderRadius: "50px",
        backgroundColor: "rgba(151, 151, 151, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span style={{ marginLeft: 40 }}>{label}</span>
      <ThemeProvider theme={theme}>
        <FormControlLabel
          control={
            <Switch
              checked={infoChoice[name]}
              onClick={(event) => event.stopPropagation()}
              onChange={handleToggle(name)}
              name={name}
              color="primary"
            />
          }
          label=""
        />
      </ThemeProvider>
    </Box>
  );
};

export default BoxOption;
