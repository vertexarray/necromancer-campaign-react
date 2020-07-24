import recipes from "../resources/recipes.json";

export type Recipe = {
  cost?: [[string, number]];
  result?: [[string, number]];
};

var recipeDefinitions: Map<string, Recipe>;

export function init() {
  return {
    recipeDefinitions: new Map<string, Recipe>(
      recipes as Iterable<readonly [string, Recipe]>
    ),
  };
}

export function get(name: string) {
  return recipeDefinitions.get(name)!;
}
