import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";

const SearchInput = (props) => {
  return (
    <TextField
      {...props}
      sx={{ backgroundColor: "#e7ebf0", borderColor: "none", border: 0 }}
      placeholder="Search"
      InputProps={{
        endAdornment: <Search />
      }}
    />
  );
};

export default SearchInput;
