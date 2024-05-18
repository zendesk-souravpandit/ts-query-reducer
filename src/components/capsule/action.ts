import { CapsuleState } from "./CapsuleList";
// Define an enum for your action types
export enum CapsuleActionType {
  CAPSULE_TOGGLE = "CAPSULE_TOGGLE",
  OTHER_ACTION = "OTHER_ACTION",
}

export const capsuleListReducer = (
  state: CapsuleState,
  action: CapsuleActionAction
): CapsuleState => {
  // ... reducer logic
  console.log({ "$$$ : ": action });
  switch (action.type) {
    case CapsuleActionType.CAPSULE_TOGGLE:
      return {
        ...state,
        expandedCapsule:
          state.expandedCapsule === action.payload.capsuleId
            ? undefined
            : action.payload.capsuleId,
      };
    case CapsuleActionType.OTHER_ACTION:
      return {
        ...state,
        capsuleTitle: state.capsuleTitle + "HHH",
      };
    // Handle other actions...

    default:
      return state;
  }
};

// Define the shape of your payload for each action
type CapsuleTogglePayload = {
  capsuleId: string;
};

type OtherActionPayload = {
  id: string;
};

// Define action interfaces using the enum and payload types
interface CapsuleToggleAction {
  type: CapsuleActionType.CAPSULE_TOGGLE;
  payload: CapsuleTogglePayload;
}

interface OtherAction {
  type: CapsuleActionType.OTHER_ACTION;
  payload: OtherActionPayload;
}

// Combine action interfaces into a union type for the reducer
export type CapsuleActionAction = CapsuleToggleAction | OtherAction;

// Utility function to determine if a capsule is expanded
export const isCapsuleExpanded = (state: CapsuleState, capsuleId: string) =>
  state.expandedCapsule === capsuleId;

// Action to toggle the expanded state of a capsule
export const toggleCapsule = (capsuleId: string): CapsuleActionAction => ({
  type: CapsuleActionType.CAPSULE_TOGGLE,
  payload: { capsuleId: capsuleId },
});

// Action to toggle the expanded state of a capsule
export const otherAction = (capsuleId: string): OtherAction => ({
  type: CapsuleActionType.OTHER_ACTION,
  payload: { id: capsuleId },
});
