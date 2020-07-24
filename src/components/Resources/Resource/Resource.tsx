import React from "react";
import { ResourceDefinition } from "../../../game/Resources";
import { ResourceContainer, FullResourceContainer } from "./styled";

type ResourceProps = {
  definition: ResourceDefinition;
  amount: number;
};

const Resource = ({ definition, amount }: ResourceProps) => {
  let text =
    definition.maximum < 0 ? (
      <>
        {definition.displayName}: {amount}
      </>
    ) : (
      <>
        {definition.displayName}: {amount}/{definition.maximum}
      </>
    );

  if (amount >= definition.maximum) {
    return <FullResourceContainer>{text}</FullResourceContainer>;
  } else {
    return <ResourceContainer>{text}</ResourceContainer>;
  }
};

export default Resource;
