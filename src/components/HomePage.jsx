import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Typography,
  Stack,
  FormControlLabel,
  Button,
  Box,
  IconButton,
  Checkbox,
  FormGroup,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RecipeDetailCard from "./RecipeDetailCard";
import cuisines from "../cuisines";

HomePage.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default function HomePage({ results, onSearch }) {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [chosenCuisines, setChosenCuisines] = useState([]);

  useEffect(() => {
    setFilteredResults(results ?? []);
  }, [results]);

  const resultsPerPage = 5;

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;

  const currentResults = filteredResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredResults.length / resultsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCuisineChange = (event) => {
    const { value, checked } = event.target;
    if (value === "") {
      setChosenCuisines([]);
      return;
    }
    if (checked) {
      setChosenCuisines([...chosenCuisines, value]);
    } else {
      setChosenCuisines(chosenCuisines.filter((cuisine) => cuisine !== value));
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    onSearch(event, searchTerm, chosenCuisines);
  };

  return (
    <Box
      sx={{
        width: {
          xs: "95%",
          md: "90%",
          xl: "80%",
        },
        margin: "0 auto",
      }}
    >
      <Stack
        gap={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center" }}
          component="form"
          onSubmit={handleSearch}
        >
          <TextField
            label="Search for a recipe"
            variant="outlined"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Typography variant="h6" component="h3">
            from these cuisines:
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={chosenCuisines.length === 0}
                  onChange={handleCuisineChange}
                  value=""
                />
              }
              label="All"
            />
            {cuisines.map((cuisine) => (
              <FormControlLabel
                key={cuisine}
                control={
                  <Checkbox
                    checked={chosenCuisines.includes(cuisine)}
                    onChange={handleCuisineChange}
                    value={cuisine}
                  />
                }
                label={cuisine}
              />
            ))}
          </FormGroup>
        </Stack>
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {currentResults.length > 0 ? (
          currentResults.map((recipe) => (
            <RecipeDetailCard recipe={recipe} key={recipe.id} />
          ))
        ) : (
          <Typography variant="h6" component="h3">
            No results, start a search from above
          </Typography>
        )}
      </Stack>
      {currentResults.length > 0 && (
        <Stack direction="row" sx={{ justifyContent: "center" }}>
          <Button
            color="primary"
            aria-label="previous page"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            color="primary"
            aria-label="next page"
            onClick={handleNextPage}
            disabled={
              currentPage ===
                Math.ceil(filteredResults.length / resultsPerPage) ||
              currentResults.length === 0
            }
          >
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
}
