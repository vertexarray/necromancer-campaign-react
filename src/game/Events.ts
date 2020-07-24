import { have } from "./Resources";
import { store } from "../App";
import { PUT_LOG, Action, UNLOCK } from "../reducers/Actions";

var events: Event[];
export function init() {
  events = defineEvents().map((event) => {
    return [...event, false];
  }) as Event[];
  return {
    log: new Array<String>(),
  };
}

export type Event =
  | [string, Function, Function]
  | [string, Function, Function, boolean];

export function checkEvents() {
  let results = new Array<Action>();
  events = events.map(([name, trigger, result, triggered]) => {
    if (!triggered && trigger() === true) {
      const actions = result();
      if (Array.isArray(actions)) {
        results.push(...actions);
      } else {
        results.push(actions);
      }
      return [name, trigger, result, true];
    }
    return [name, trigger, result, triggered];
  }) as Event[];
  results.forEach((result) => {
    store.dispatch(result);
  });
}

function defineEvents(): Event[] {
  return [
    [
      "1BodyPart",
      () => have("body parts", 1),
      () => {
        return {
          type: PUT_LOG,
          text: "A head, missing only an ear...",
        };
      },
    ],
    [
      "2BodyParts",
      () => have("body parts", 2),
      () => {
        return {
          type: PUT_LOG,
          text: "An upper torso...",
        };
      },
    ],
    [
      "3BodyParts",
      () => have("body parts", 3),
      () => {
        return {
          type: PUT_LOG,
          text: "A lower torso, an arrow protruding from the side...",
        };
      },
    ],
    [
      "4BodyParts",
      () => have("body parts", 4),
      () => {
        return {
          type: PUT_LOG,
          text: "A leg...",
        };
      },
    ],
    [
      "7BodyParts",
      () => have("body parts", 7),
      () => {
        return {
          type: PUT_LOG,
          text: "And three more limbs.",
        };
      },
    ],
    [
      "3Corpses",
      () => have("corpses", 3),
      () => {
        return [
          {
            type: UNLOCK,
            unlock: "talismans",
          },
          {
            type: PUT_LOG,
            text: "Three corpses for a talisman.",
          },
        ];
      },
    ],
    [
      "1Talisman",
      () => have("talismans", 1),
      () => {
        return [
          {
            type: UNLOCK,
            unlock: "mana",
          },
          {
            type: PUT_LOG,
            text: "Geometry that beckons to secret power.",
          },
        ];
      },
    ],
    [
      "5Mana",
      () => have("mana", 5),
      () => {
        return [
          {
            type: UNLOCK,
            unlock: "kill with magic",
          },
        ];
      },
    ],
    [
      "10Mana",
      () => have("mana", 10),
      () => {
        return [
          {
            type: UNLOCK,
            unlock: "skeletons",
          },
          {
            type: PUT_LOG,
            text: "Grim marionettes.",
          },
        ];
      },
    ],
  ];
}
