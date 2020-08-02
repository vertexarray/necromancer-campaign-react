import { ResourceDefinition, get } from "./Resources";

const ResourceDefinitions: Map<string, ResourceDefinition> = new Map<
  string,
  ResourceDefinition
>([
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
      accumulator: (time) => {
        return (time * get("talismans")) / 15;
      },
      maximum: (rd) => {
        return 10 + Math.max(0, Math.sqrt(rd.get("unwilling sacrifices")!));
      },
    },
  ],
  [
    "talismans",
    {
      name: "talismans",
      displayName: "Talismans",
      maximum: (rd) => {
        if (rd.get("km2")) {
          return rd.get("km2")! * 20;
        } else {
          return 20;
        }
      },
    },
  ],
  [
    "corpses",
    {
      name: "corpses",
      displayName: "Corpses",
      maximum: 50,
      accumulator: (time) => {
        return Math.max(
          Math.sqrt(get("graverobbers")) * Math.random() * time,
          0
        );
      },
    },
  ],
  [
    "skeletons",
    {
      name: "skeletons",
      displayName: "Skeletons",
      maximum: (rd) => {
        return rd.get("km2")! * 5 + 5;
      },
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
  [
    "graverobbers",
    {
      name: "graverobbers",
      displayName: "Graverobbers",
      maximum: -1,
    },
  ],
  [
    "km2",
    {
      name: "km2",
      displayName: "Square Kilometers",
      maximum: -1,
    },
  ],
  [
    "apprentices",
    {
      name: "apprentices",
      displayName: "Apprentices",
      maximum: (rd) => {
        return 4;
      },
    },
  ],
]);

export default ResourceDefinitions;
