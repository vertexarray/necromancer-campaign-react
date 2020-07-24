import moment from "moment";
import { Recipe } from "./Recipes";
import { store } from "../App";
import {
  NOOP,
  SET_RESOURCE,
  SET_MULTIPLE_RESOURCES,
  ACCUMULATE,
  SetMultipleResources,
  Noop,
  Accumulate,
} from "../reducers/Actions";
import { RootState } from "../reducers/Reducers";

export type ResourceDefinition = {
  name: string;
  displayName: string;
  accumulator?: Function;
  maximum: number;
};

export type ResourceData = Map<string, number>;

export function init() {
  return {
    resourceDefinitions: defineResources(),
    resourceData: new Map<string, number>(),
    lastAccumulate: moment.now(),
  };
}

export function set(name: string, num: number, unlock = true) {
  return { type: SET_RESOURCE, name, num };
}

export function add(name: string, num: number, unlock = true) {
  var definition = getDefinition(name)!;
  var currentAmount = get(name);

  return set(
    name,
    definition.maximum === 0
      ? currentAmount + num
      : Math.min(currentAmount + num, definition.maximum),
    unlock
  );
}

export function subtract(name: string, num: number) {
  return set(name, get(name) - num);
}

export function tryUse(name: string, num: number) {
  if (have(name, num)) {
    return subtract(name, num);
  }
}

export function get(name: string) {
  const state = store.getState();
  if (state.resourceData.has(name)) {
    return state.resourceData.get(name)!;
  }
  return 0;
}

export function getDefinition(name: string) {
  return store.getState().resourceDefinitions.get(name);
}

export function have(name: string, num: number) {
  return get(name) >= num;
}

/**
 * Accumulate resources proportional to time passed since last accumulate
 */
export function accumulate(): Accumulate {
  const { resourceDefinitions, lastAccumulate } = store.getState() as RootState;
  const currentTime = moment();
  const delta = currentTime.diff(lastAccumulate, "second", true);

  const addsAndNulls = Array.from(resourceDefinitions.values()).map(
    (rd: ResourceDefinition): [string, number] | null => {
      if (rd.accumulator) {
        return [rd.name, rd.accumulator(delta)];
      } else {
        return null;
      }
    }
  );

  const adds = addsAndNulls.filter((add: any) => {
    return !!add;
  }) as [[string, number]];

  return { type: ACCUMULATE, adds, lastAccumulate: currentTime };
}

export function tryRecipe(recipe: Recipe): SetMultipleResources | Noop {
  if (checkRecipeRequirements(recipe)) {
    return {
      type: SET_MULTIPLE_RESOURCES,
      adds: [
        ...(recipe.cost
          ? recipe.cost.map(([resource, value]) => {
              return [resource, -value];
            })
          : []),
        ...(recipe.result
          ? recipe.result.map(([resource, value]) => {
              return [resource, value];
            })
          : []),
      ] as [[string, number]],
    };
  } else {
    return { type: NOOP };
  }
}

export function checkRecipeRequirements(recipe: Recipe): boolean {
  return (
    !recipe.cost ||
    recipe.cost.every(([ingredient, cost]) => have(ingredient, cost))
  );
}

function defineResources() {
  return new Map<string, ResourceDefinition>([
    [
      "body parts",
      {
        name: "body parts",
        displayName: "Body parts",
        maximum: 7,
      },
    ],
    [
      "mana",
      {
        name: "mana",
        displayName: "Mana",
        accumulator: (time: number) => {
          return (time * get("talismans")) / 15;
        },
        maximum: 10,
      },
    ],
    [
      "talismans",
      {
        name: "talismans",
        displayName: "Talismans",
        maximum: 20,
      },
    ],
    [
      "corpses",
      {
        name: "corpses",
        displayName: "Corpses",
        maximum: 50,
      },
    ],
    [
      "skeletons",
      {
        name: "skeletons",
        displayName: "Skeletons",
        maximum: 5,
      },
    ],
    [
      "unwilling sacrifices",
      {
        name: "unwilling sacrifices",
        displayName: "Unwilling sacrifices",
        maximum: -1,
      },
    ],
  ]);
}
