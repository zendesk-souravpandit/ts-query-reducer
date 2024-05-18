import React, { createContext, Dispatch, useContext, useReducer } from "react";
import {
  CapsuleActionAction,
  capsuleListReducer,
  isCapsuleExpanded,
  toggleCapsule,
  otherAction,
} from "./action";

// ----------------Types----------------
type CapsuleState = {
  capsuleTitle: string;
  capsuleTitleTags?: string;
  capsules?: CapsuleItem[];
  expandedCapsule?: string;
  onCapsuleToggle?: () => void;
  // onStateUpdate?: (state: CapsuleState) => void;
};

type CapsuleItem = {
  id: string;
  title: string;
  tags?: string[];
  content: (state: CapsuleState) => JSX.Element;
};
const initialState: CapsuleState = {
  capsuleTitle: "Initial Values",
  capsules: [], // Empty array for capsules
  expandedCapsule: undefined, // Explicitly undefined
  onCapsuleToggle: undefined, // Explicitly undefined
};

// ----------------props----------------

type CapsuleListProviderProps = {
  state: CapsuleState;
  children?: React.ReactNode;
};

// ----------------hooks value----------------
type CapsuleListValue = {
  state: CapsuleState;
  dispatch: Dispatch<CapsuleActionAction>;
};

const CapsuleListContext = createContext<CapsuleListValue | null>(null);

function CapsuleListProvider({ children, state }: CapsuleListProviderProps) {
  const [_state, capsuleListAction] = useReducer(capsuleListReducer, state);

  return (
    <CapsuleListContext.Provider
      value={{
        state: _state,
        dispatch: capsuleListAction,
      }}
    >
      {children}
    </CapsuleListContext.Provider>
  );
}

function useCapsuleList() {
  const ctx = useContext(CapsuleListContext);
  if (!ctx) {
    throw new Error("useCapsuleList must be used within a CapsuleListProvider");
  }
  return ctx;
}

function CapsuleList({ capsuleState }: { capsuleState?: CapsuleState }) {
  return (
    <div>
      <CapsuleListProvider state={capsuleState ?? initialState}>
        <CapsuleListContent />
      </CapsuleListProvider>
    </div>
  );
}

function CapsuleListContent() {
  const { state, dispatch } = useCapsuleList();

  // Handle the capsule toggle action
  const handleCapsuleToggle = (capsuleId: string) => {
    dispatch(toggleCapsule(capsuleId));
  };

  return (
    <div className="flex  flex-col gap-6">
      {state.capsules?.map((value: CapsuleItem) => {
        const expanded = isCapsuleExpanded(state, value.id);
        return (
          <div className=" flex flex-col  border-2  border-gray-200 rounded-xl divide-y-2 items-stretch ">
            <button
              onClick={() => {
                handleCapsuleToggle(value.id);
              }}
              className="px-8 py-6 justify-self-start"
            >
              <div className="flex  justify-between items-center ">
                <div className=" flex gap-4 flex-row justify-center items-center">
                  <div className="text-xl">{value.title}</div>
                  {value.tags?.map((tag) => {
                    return (
                      <div className=" px-2 py-1 bg-gray-200 rounded-sm">
                        {tag}
                      </div>
                    );
                  })}
                </div>

                <button
                  className=""
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(otherAction(state.capsuleTitle));
                  }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.3123 22.3904C15.0967 22.5629 14.7821 22.528 14.6095 22.3123C14.4562 22.1207 14.4668 21.8508 14.6225 21.672L14.6876 21.6095L19.6876 17.6095C19.8442 17.4843 20.0572 17.4664 20.2298 17.5559L20.3123 17.6095L25.3123 21.6095C25.528 21.7821 25.5629 22.0967 25.3904 22.3123C25.2371 22.504 24.9714 22.5529 24.7628 22.4403L24.6876 22.3904L20 18.641L15.3123 22.3904Z"
                      fill="#1F73B7"
                    />
                  </svg>
                </button>
              </div>
            </button>

            <div
              className={` px-8 bg-green-400  transition-height duration-700 ease-in-out  overflow-hidden ${
                expanded ? "max-h-[100vh]" : "max-h-0"
              }`}
            >
              <React.Fragment>
                {expanded && value.content(state)}
              </React.Fragment>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { CapsuleList, useCapsuleList, CapsuleListProvider, CapsuleListContext };
export type { CapsuleState, CapsuleItem };
