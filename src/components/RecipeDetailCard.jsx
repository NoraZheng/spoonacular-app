import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

const RecipeDetailCard = ({ recipe }) => {
  return (
    <Link
      key={recipe.id}
      to={`/recipe-detail/${recipe.id}`}
      state={recipe}
      style={{ textDecoration: "none" }}
    >
      <Card sx={{ width: "320px", height: "320px", margin: "1rem" }}>
        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.title}
          sx={{ width: "100%", height: "200px" }}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="h3"
            sx={{ color: "text.secondary" }}
          >
            {recipe.title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

RecipeDetailCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetailCard;
