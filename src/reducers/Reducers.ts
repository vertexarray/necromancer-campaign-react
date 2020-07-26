import { init as initResources, ResourceData } from "../game/Resources";
import { init as initRecipes } from "../game/Recipes";
import { init as initEvents } from "../game/Events";
import * as Actions from "./Actions";
import ResourceDefinitions from "../game/ResourceDefinitions";

export function initialState() {
  return {
    ...initResources(),
    ...initRecipes(),
    ...initEvents(),
    unlocks: new Map<string, boolean>([["body parts", true]]),
  };
}

function commitAdds(resourceData: ResourceData, adds: [[string, number]]) {
  const newResourceData = new Map<string, number>(resourceData);
  adds.forEach(([name, value]: [string, number]) => {
    let set;
    if (newResourceData.has(name)) {
      set = newResourceData.get(name)! + value;
    } else {
      set = value;
    }

    const definition = ResourceDefinitions.get(name)!;
    if (definition.maximum < 0) {
      newResourceData.set(name, set);
    } else {
      newResourceData.set(name, Math.min(set, definition.maximum));
    }
  });
  return newResourceData;
}

export function reducers(state = initialState(), action: Actions.Action) {
  switch (action.type) {
    case Actions.SET_RESOURCE:
      return {
        ...state,
        resourceData: new Map(state.resourceData.set(action.name, action.num)),
      };
    case Actions.SET_MULTIPLE_RESOURCES:
      return {
        ...state,
        resourceData: commitAdds(state.resourceData, action.adds),
      };
    case Actions.ACCUMULATE:
      return {
        ...state,
        resourceData: commitAdds(state.resourceData, action.adds),
        lastAccumulate: action.lastAccumulate,
      };
    case Actions.PUT_LOG:
      const log = [...state.log, action.text];
      return {
        ...state,
        log: log,
      };
    case Actions.UNLOCK:
      return {
        ...state,
        unlocks: state.unlocks.set(
          action.unlock,
          action.status ? action.status === "unlock" : true
        ),
      };
  }
  return state;
}

export type RootState = ReturnType<typeof reducers>;
