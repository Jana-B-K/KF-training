import React from "react"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "all the main spices",
    "pasta",
    "ground beef",
    "tomato paste",
  ])

  const [recipeShown, setRecipeShown] = React.useState(false)

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")
    setIngredients(prev => [...prev, newIngredient])
  }

  const ingredientsListItems = ingredients.map(item => (
    <li key={item}>{item}</li>
  ))

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          name="ingredient"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientsListItems}
          </ul>

          {ingredients.length > 3 && !recipeShown && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button onClick={() => setRecipeShown(true)}>
                Get a recipe
              </button>
            </div>
          )}
        </section>
      )}

      {recipeShown && (
        <section className="recipe-section">
          <h2>Chef’s Recommendation</h2>
          <p>
            Based on the ingredients you have, here’s a simple and tasty recipe you can try.
          </p>
          <h3>Instructions</h3>
          <ol>
            <li>Heat a pan and add oil.</li>
            <li>Add the ground beef and cook until browned.</li>
            <li>Stir in tomato paste and spices.</li>
            <li>Add cooked pasta and mix well.</li>
            <li>Simmer for 5 minutes and serve hot.</li>
          </ol>
        </section>
      )}
    </main>
  )
}
