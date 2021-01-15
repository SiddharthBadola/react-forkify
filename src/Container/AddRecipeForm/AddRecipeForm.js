import React from "react";
import classes from "./AddRecipeForm.module.css";
import Input from "../../Components/Input/Input";

class AddRecipeForm extends React.Component {
  state = {
    recipeData: {
      title: {
        labelText: "Title",
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Title of your choosing",
        },
        validation: {
          required: true,
          length: true,
        },
        valid: false,
        touch: false,
        value: "",
      },
      url: {
        labelText: "URL",
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Format: https://example.com",
        },
        validation: {
          required: false,
          url: true,
        },
        valid: true,
        touch: false,
        value: "",
      },
      imageUrl: {
        labelText: "Image URL",
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Format: https://example.com",
        },
        validation: {
          required: false,
          url: true,
        },
        valid: true,
        touch: false,
        value: "",
      },
      publisher: {
        labelText: "Publisher",
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Author of the recipe",
        },
        validation: {
          required: true,
          length: true,
        },
        valid: false,
        touch: false,
        value: "",
      },
      prepTime: {
        labelText: "Prep Time",
        elementType: "number",
        elementConfig: {
          type: "number",
          placeholder: "In Minutes",
        },
        validation: {
          required: true,
          number: true,
        },
        valid: false,
        touch: false,
        value: "",
      },
      servings: {
        labelText: "Servings",
        elementType: "number",
        elementConfig: {
          type: "number",
          placeholder: "Per Person",
        },
        validation: {
          required: true,
          greaterThanOne: true,
        },
        valid: false,
        touch: false,
        value: "",
      },
    },
    ingredientData: {
      "ingredient 1": {
        id: 1,
        labelText: "Ingredient",
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: 'Format: "Quantity,Unit,Description"',
        },
        validation: {
          required: true,
          format: true,
        },
        valid: false,
        touch: false,
        value: "",
      },
    },
    formValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.url) {
      // eslint-disable-next-line
      const regex = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#]+\.?)+(\/[^\s]*)?$/i;
      isValid = regex.test(value) && isValid;
      if (value === "") isValid = true;
    }

    if (rules.greaterThanOne) {
      isValid = Number(value) >= 1 && isValid;
    }

    if (rules.length) {
      isValid = value.length >= 3 && isValid;
    }
    return isValid;
  }

  checkFormValidity(recipeData, ingredientData) {
    let isValid = true;
    for (let recipeDataElement in recipeData) {
      isValid = recipeData[recipeDataElement].valid && isValid;
    }
    for (let ingredientDataElement in ingredientData) {
      isValid = ingredientData[ingredientDataElement].valid && isValid;
    }
    return isValid;
  }

  onChangeHandler = (e, id) => {
    // First we check if the given input if rom the recipeData or ingredients
    if (this.state.recipeData[id]) {
      //We creade a new RecipeData object with the updated value of the current input(selected) using id which are the the key of our recipeData passed to us to identify the focused input
      const newRecipeData = {
        ...this.state.recipeData,
        [id]: {
          ...this.state.recipeData[id],
          value: e.target.value,
          valid: this.checkValidity(
            e.target.value,
            this.state.recipeData[id].validation
          ),
          touch: true,
        },
      };
      const formValidity = this.checkFormValidity(
        newRecipeData,
        this.state.ingredientData
      );
      // console.log(formValidity);
      this.setState({ recipeData: newRecipeData, formValid: formValidity });
    } else {
      //We creade a new ingredientData object with the updated value of the current input(selected) using id which are the the key of our ingredientData passed to us to identify the focused input
      const newIngredientData = {
        ...this.state.ingredientData,
        [id]: {
          ...this.state.ingredientData[id],
          value: e.target.value,
          valid: this.checkValidity(
            e.target.value,
            this.state.ingredientData[id].validation
          ),
          touch: true,
        },
      };
      const formValidity = this.checkFormValidity(
        this.state.recipeData,
        newIngredientData
      );
      // console.log(formValidity);
      this.setState({
        ingredientData: newIngredientData,
        formValid: formValidity,
      });
    }

    // let formValidity = true;
  };

  resetFormValues() {
    const resetRecipeData = {};
    for (let element in this.state.recipeData) {
      resetRecipeData[element] = {
        ...this.state.recipeData[element],
        value: "",
        valid: false,
        touch: false,
      };
    }
    const resetIngredientData = {
      "ingredient 1": {
        ...this.state.ingredientData["ingredient 1"],
        valid: false,
        touch: false,
        value: "",
      },
    };
    this.setState({
      recipeData: resetRecipeData,
      ingredientData: resetIngredientData,
      formValid: false,
    });
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const ingredients = [];
    for (let ingredient in this.state.ingredientData) {
      ingredients.push(this.state.ingredientData[ingredient].value);
    }

    const data = {
      title: this.state.recipeData.title.value,
      publisher: this.state.recipeData.publisher.value,
      source_url: this.state.recipeData.url.value,
      image_url: this.state.recipeData.imageUrl.value,
      ingredients: ingredients,
      id:
        "userRecipe " +
        this.state.recipeData.title.value +
        this.state.recipeData.publisher.value +
        ingredients[0],
      userRecipe: true,
    };

    this.props.onSubmitAddRecipe(data, this.props.token, this.props.userId);
    console.log(data);
    // this.props.onSubmitCloseModal();
    this.resetFormValues();
  };

  addIngredient = () => {
    const lastIngredientInIngredientData = Object.keys(
      this.state.ingredientData
    )[Object.keys(this.state.ingredientData).length - 1];
    const newIngredientData = {
      ...this.state.ingredientData,
      [`ingredient ${
        this.state.ingredientData[lastIngredientInIngredientData].id + 1
      }`]: {
        id: this.state.ingredientData[lastIngredientInIngredientData].id + 1,
        labelText: "Ingredient",
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: 'Format: "Quantity,Unit,Description"',
        },
        validation: {
          required: true,
        },
        valid: false,
        touch: false,
        value: "",
      },
    };
    this.setState({ ingredientData: newIngredientData, formValid: false });
  };

  deleteIngredient = (id) => {
    const ingredientDataKeys = Object.keys(this.state.ingredientData);
    if (ingredientDataKeys.length <= 1) return;
    const newIngredientData = {};
    ingredientDataKeys.forEach((key) => {
      if (this.state.ingredientData[key].id !== id) {
        newIngredientData[key] = {
          ...this.state.ingredientData[key],
        };
      }
    });
    this.setState({ ingredientData: newIngredientData });
  };

  render() {
    const recipeDataElementArray = [];
    for (let element in this.state.recipeData) {
      recipeDataElementArray.push({
        id: element,
        inputConfig: this.state.recipeData[element],
      });
    }

    const ingredientDataArray = [];
    for (let element in this.state.ingredientData) {
      ingredientDataArray.push({
        id: element,
        inputConfig: this.state.ingredientData[element],
      });
    }
    const recipeData = (
      <div className={classes.RecipeData}>
        <h2>Recipe Data</h2>
        {recipeDataElementArray.map((element, i) => {
          return (
            <React.Fragment key={element.inputConfig.labelText}>
              <span>{element.inputConfig.labelText}</span>
              <Input
                value={element.inputConfig.value}
                elementType={element.inputConfig.elemenType}
                config={element.inputConfig.elementConfig}
                onChange={(e) => this.onChangeHandler(e, element.id)}
                valid={element.inputConfig.valid}
                touch={element.inputConfig.touch}
              />
            </React.Fragment>
          );
        })}
      </div>
    );

    const ingredients = (
      <div className={classes.Ingredients}>
        <h2>Ingredients</h2>
        <div className={classes.Scroll}>
          <div className={classes.OuterGrid}>
            <div className={classes.InnerGrid}>
              {ingredientDataArray.map((element, i) => {
                return (
                  <React.Fragment key={element.inputConfig.id}>
                    <span>{element.inputConfig.labelText + " " + (i + 1)}</span>
                    <div className={classes.InputForFocus}>
                      <Input
                        elementType={element.inputConfig.elemenType}
                        config={element.inputConfig.elementConfig}
                        onChange={(e) => this.onChangeHandler(e, element.id)}
                        value={element.inputConfig.value}
                        valid={element.inputConfig.valid}
                        touch={element.inputConfig.touch}
                      />
                    </div>
                    <div
                      className={classes.BtnDelete}
                      onClick={() =>
                        this.deleteIngredient(element.inputConfig.id)
                      }
                    >
                      <span>X</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <div className={classes.BtnAdd} onClick={this.addIngredient}>
              <span>+</span>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <form className={classes.AddRecipeForm} onSubmit={this.onSubmitHandler}>
        <div className={classes.Grid}>
          {recipeData}
          {ingredients}
          <button
            className={classes.BtnSubmit}
            disabled={!this.state.formValid}
          >
            Submit
          </button>
          <div className={classes.Filler}></div>
        </div>
      </form>
    );
  }
}
export default AddRecipeForm;
