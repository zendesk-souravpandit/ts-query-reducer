import { CapsuleList, CapsuleState } from "../components/capsule/CapsuleList";

export default function CapsuleListDemoPage() {
  const initialState = {
    capsuleTitle: "Salesforce Tile",
    capsuleTitleTags: "Related object",
    capsules: [
      {
        id: "1",
        content: (state: CapsuleState) => (
          <div className="h-[300px] bg-green-100 text-center">
            Contacts {state.capsuleTitle}
          </div>
        ),
        title: "Contacts",
        tags: ["new", "implementation"],
      },
      {
        id: "2",
        content: (state: CapsuleState) => (
          <div className="h-[800px] bg-red-100 text-center">
            Lead {state.capsuleTitle}
          </div>
        ),
        title: "Lead",
        tags: ["only"],
      },
      {
        id: "3",
        content: (state: CapsuleState) => (
          <div className="h-[400px] bg-blue-100 text-center">
            Accounts {state.capsuleTitle}
          </div>
        ),
        title: "Accounts",
        tags: ["relation", "filter", "new"],
      },
      {
        id: "4",
        content: (state: CapsuleState) => (
          <div className="h-[100px] bg-blue-100 text-center">
            Opportunities {state.capsuleTitle}
          </div>
        ),
        title: "Opportunities",
        tags: [],
      },
    ],
  };
  // This state would be managed by the parent component, potentially using useState or useReducer

  // Pass the capsuleState and a function to update it to the CapsuleList component
  return <CapsuleList capsuleState={initialState} />;
}
