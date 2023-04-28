import React from "react";
import {
  Autocomplete as MuiAutocomplete,
  CircularProgress,
} from "@mui/material";
import Controls from "./Controls";
import { Box } from "@mui/system";
const AutoComplete = ({ values, options, setChange, label, error }) => {
  console.log(options)
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;
  return (
    <MuiAutocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      autoHighlight
      value={values.label}
      onChange={(event, newValue) => {
        setChange({ ...values, label: newValue });
      }}
      getOptionLabel={(option) => option.price}
      options={options}
      sx={{ width: "100%" }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.id}
        >
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <Controls.Input
          {...params}
          variant="outlined"
          label={label}
          type="text"
          {...(error && {
            error: true,
            helperText: error,
          })}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AutoComplete;
