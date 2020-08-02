import RecipeDefinitions from "./RecipeDefinitions";

export type Recipe = {
  cost?: Array<[string, number]> | (() => Array<[string, number]>);
  result?: Array<[string, number]> | (() => Array<[string, number]>);
};

var recipeDefinitions: Map<string, Recipe>;

export function init() {
  return {
    recipeDefinitions: new Map<string, Recipe>(
      RecipeDefinitions as Iterable<readonly [string, Recipe]>
    ),
  };
}

export function get(name: string) {
  return recipeDefinitions.get(name)!;
}
