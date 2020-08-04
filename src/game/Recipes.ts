import RecipeDefinitions from "./RecipeDefinitions";

export type Recipe = {
  cost?: Array<[string, number]> | (() => Array<[string, number]>);
  result?: Array<[string, number]> | (() => Array<[string, number]>);
};

export function getRecipe(name: string) {
  return RecipeDefinitions.get(name)!;
}
