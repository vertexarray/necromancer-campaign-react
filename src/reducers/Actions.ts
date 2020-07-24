import { Moment } from "moment";

export const NOOP = "NOOP";
export const SET_RESOURCE = "SET_RESOURCE";
export const SET_MULTIPLE_RESOURCES = "SET_MULTIPLE_RESOURCES";
export const ACCUMULATE = "ACCUMULATE";
export const PUT_LOG = "PUT_LOG";
export const UNLOCK = "UNLOCK";

export type Noop = {
  type: typeof NOOP;
};

export type SetResource = {
  type: typeof SET_RESOURCE;
  name: string;
  num: number;
};

export type SetMultipleResources = {
  type: typeof SET_MULTIPLE_RESOURCES;
  adds: [[string, number]];
};

export type Accumulate = {
  type: typeof ACCUMULATE;
  adds: [[string, number]];
  lastAccumulate: Moment;
};

export type PutLog = {
  type: typeof PUT_LOG;
  text: string;
};

export type Unlock = {
  type: typeof UNLOCK;
  unlock: string;
  status?: "unlock" | "lock";
};

export type Action =
  | Noop
  | SetResource
  | SetMultipleResources
  | Accumulate
  | PutLog
  | Unlock;
