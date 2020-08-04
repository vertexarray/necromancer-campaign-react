import { OrdersProps } from "../Orders";
import React from "react";
import RecipeButton from "../RecipeButton";

const Magic = ({ unlocks }: OrdersProps) => {
  return (
    <>
      {unlocks.get("corpses") && (
        <RecipeButton recipe="corpse">Unearth Corpse</RecipeButton>
      )}
      {unlocks.get("talismans") && (
        <RecipeButton recipe="talisman">Make Talisman</RecipeButton>
      )}
      {unlocks.get("skeletons") && (
        <RecipeButton recipe="skeletons">Animate Skeleton</RecipeButton>
      )}
      {unlocks.get("apprentices") && (
        <RecipeButton recipe="hire apprentice">Hire Apprentice</RecipeButton>
      )}
      {unlocks.get("deacons") && (
        <RecipeButton recipe="animate deacon">Animate Deacon</RecipeButton>
      )}
    </>
  );
};

export default Magic;
