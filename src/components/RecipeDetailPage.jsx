import { useNavigate } from "react-router-dom";
import {
  Typography,
  Chip,
  Stack,
  List,
  ListItem,
  Card,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetailPage() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "9c405b3775bb4571be48de8bcb51dfde ",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setRecipe(data);
      } catch (error) {
        console.error("Error fetching the recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Button
        onClick={() => {
          navigate("/");
        }}
        sx={{ marginLeft: "1rem" }}
      >
        Back to home page
      </Button>
      <Card
        sx={{
          width: {
            xs: "90%",
            md: "60%",
            xl: "40%",
          },
          margin: "1rem auto",
          padding: "1rem",
        }}
      >
        <Stack
          sx={{
            margin: "1rem auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <img src={recipe.image} alt={recipe.title} />
          </div>
          <Typography
            variant="h4"
            component="h1"
            style={{ marginBottom: "1rem", textAlign: "center" }}
          >
            {recipe.title}
          </Typography>
          <Stack direction="row" spacing={1} style={{ marginBottom: "1rem" }}>
            {recipe.diets.map((diet, index) => (
              <Chip color="success" key={index} label={diet} />
            ))}
          </Stack>
          {recipe.extendedIngredients.length > 0 && (
            <>
              <Typography variant="h6" component="h3">
                Ingredients
              </Typography>
              <List sx={{ width: "100%" }}>
                {recipe.extendedIngredients.map((ingredient) => (
                  <Stack
                    direction="row"
                    component={ListItem}
                    spacing={2}
                    key={ingredient.id}
                    sx={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ flexBasis: "50%", textAlign: "right" }}
                    >
                      {ingredient.amount} {ingredient.unit}
                    </Typography>
                    <Typography variant="body1" sx={{ flexBasis: "50%" }}>
                      {ingredient.name}
                    </Typography>
                  </Stack>
                ))}
              </List>
            </>
          )}

          {recipe.analyzedInstructions[0]?.steps.length > 0 && (
            <>
              <Typography
                variant="h6"
                component="h3"
                sx={{ textAlign: "center" }}
              >
                Instructions
              </Typography>
              <ol>
                {recipe.analyzedInstructions[0]?.steps.map((step) => (
                  <Typography key={step.number} variant="body1" component="li">
                    {step.step}
                  </Typography>
                ))}
              </ol>
            </>
          )}
        </Stack>
      </Card>
    </>
  );
}

export default RecipeDetailPage;
