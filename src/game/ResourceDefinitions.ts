import { ResourceDefinition, get } from "./Resources";

const ResourceDefinitions = new Map<string, ResourceDefinition>([
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
  [
    "gold",
    {
      name: "gold",
      displayName: "Gold",
      maximum: 400,
    },
  ],
]);

export default ResourceDefinitions;
