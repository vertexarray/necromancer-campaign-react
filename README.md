# NECROCRACY

A browser-based incremental game about conquering all of reality using skeletons.

## Available commands

`npm run`

`npm build`

## Structure

### Dependencies

Game interface and state management is done through `react + redux`.

### Abstractions

`Time.ts`: handles functions that recur per arbitrary ticks, such as resource accumulators and checking event conditions.

`Events.ts`: events are arbitrary (redux) actions or sets of actions that are triggered based on arbitrary criteria, for instance unlocking a new order or resource once a certain resource threshold has been reached.

`Resources.ts`: functions for getting, modifying, rendering, and accumulating ingame resources, such as mana, talismans, and skeletons. Resources can be anything with a quantity.

`ResourceDefinitions.ts`: Resource definitions change as the game progresses, and are therefore expressed as functions of the gamestate.

`Recipes.ts & recipes.json`: recipes are an abstraction for deterministically converting one resource into another. In future, I may place recipe definitions in Recipes.ts and give them the power to require and produce nondeterministic and scaled resources, not unlike `ResourceDefinitions.ts`

###