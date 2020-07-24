import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { ResourceDefinition } from "../../game/Resources";
import Resource from "./Resource/Resource";
import { ResourcesContainer } from "./styled";
import { RootState } from "../../reducers/Reducers";

const ResourcesList = ({
  resourceDefinitions,
  resourceData,
  unlocks,
}: ResourcesListProps) => {
  return (
    <ResourcesContainer>
      {Array.from<ResourceDefinition>(resourceDefinitions.values()).map(
        (value: ResourceDefinition) => {
          if (!unlocks.get(value.name)) {
            return <></>;
          }
          const count = resourceData.get(value.name);
          return (
            <Resource
              definition={value}
              amount={count ? Math.round(count * 100) / 100 : 0}
              key={value.name}
            />
          );
        }
      )}
    </ResourcesContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    resourceDefinitions: state.resourceDefinitions,
    resourceData: state.resourceData,
    unlocks: state.unlocks,
  };
};

const connector = connect(mapStateToProps);

type ResourcesListProps = ConnectedProps<typeof connector>;

export default connector(ResourcesList);
