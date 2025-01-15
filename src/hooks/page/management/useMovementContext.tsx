import { MovementContext } from "@contexts/page/management/movement/MovementContext";
import { useContext } from "react";

export const useMovementContext = () => useContext(MovementContext)
