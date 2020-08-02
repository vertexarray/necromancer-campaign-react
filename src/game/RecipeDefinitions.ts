import { Recipe } from "./Recipes";

const RecipeDefinitions: Map<string, Recipe> = new Map<string, Recipe>([
  [
    "body part",
    {
      result: [["body parts", 1]],
    },
  ],
  [
    "corpse",
    {
      result: [["corpses", 1]],
    },
  ],
  [
    "talisman",
    {
      cost: [["corpses", 3]],
      result: [["talismans", 1]],
    },
  ],
  [
    "kill with magic",
    {
      cost: [["mana", 5]],
      result: [["corpses", 10]],
    },
  ],
  [
    "skeletons",
    {
      cost: [
        ["mana", 1],
        ["corpses", 1],
      ],
      result: [["skeletons", 1]],
    },
  ],
  [
    "hire graverobber",
    {
      cost: [["gold", 10]],
      result: [["graverobbers", 1]],
    },
  ],
  [
    "hire apprentice",
    {
      cost: [["gold", 250]],
      result: [["apprentices", 1]],
    },
  ],
]);

export default RecipeDefinitions;
