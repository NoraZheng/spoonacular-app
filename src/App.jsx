import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetailPage from "./components/RecipeDetailPage";
import { Typography, AppBar, Box, Toolbar } from "@mui/material";
import { useState } from "react";

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = async (event, searchTerm, cuisines) => {
    event.preventDefault();

    const cuisinesParam =
      cuisines.length > 0 ? `&cuisine=${cuisines.join(",")}` : "";
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}${cuisinesParam}&number=20`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "9c405b3775bb4571be48de8bcb51dfde",
          },
        }
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "white" }}
            >
              Spoonacular
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <Routes>
          <Route
            path="/*"
            element={
              <HomePage results={results ?? []} onSearch={handleSearch} />
            }
          />
          <Route path="recipe-detail/:id" element={<RecipeDetailPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
