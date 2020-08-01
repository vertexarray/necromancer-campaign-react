import React from "react";
import { ResourceDefinition, ResourceData } from "../../../game/Resources";
import { ResourceContainer, FullResourceContainer } from "./styled";

type ResourceProps = {
  definition: ResourceDefinition;
  amount: number;
  resourceData: ResourceData;
};

const Resource = ({ definition, amount, resourceData }: ResourceProps) => {
  const maximum =
    typeof definition.maximum == "function"
      ? definition.maximum(resourceData)
      : definition.maximum;
  let text =
    maximum < 0 ? (
      <>
        {definition.displayName}: {amount}
      </>
    ) : (
      <>
        {definition.displayName}: {amount}/{Math.round(maximum * 100) / 100}
      </>
    );

  if (amount >= maximum) {
    return <FullResourceContainer>{text}</FullResourceContainer>;
  } else {
    return <ResourceContainer>{text}</ResourceContainer>;
  }
};

export default Resource;
