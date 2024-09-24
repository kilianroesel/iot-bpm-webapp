import { useState } from "react";
import { IconAddButton } from "../../../../components/links/IconButtons";
import { GetPopulatedEquipmentModel } from "../../../../modelApi/equipmentModelApi";
export function ObjectModels({  }: { equipmentModel: GetPopulatedEquipmentModel }) {
  const [isCreatingOpen, setIsCreatingOpen] = useState(false);

  console.log(isCreatingOpen);

  return (
    <div className="space-y-4 rounded-md bg-slate-900 p-4">
      <div className="flex">
        <h3 className="flex-grow font-medium">Object Models</h3>
        <div>
          <IconAddButton onClick={() => setIsCreatingOpen(true)} />
        </div>
      </div>
      <div>
        {/* <ul>
          {equipmentModel.lifecycleModels.map((eventModel) => (
            <li key={eventModel._id}>
              <ObjectModel objectModelId={equipmentModel._id} objectModel={eventModel} />
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

// function ObjectModel({
//   objectModel,
//   objectModelId,
// }: {
//   objectModel: GetRangeTriggerEventModel | GetScalarTriggerEventModel;
//   objectModelId: string;
// }) {
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);

//   const startEdit = () => {
//     setIsEditOpen(true);
//   };

//   const startDelete = () => {
//     setIsDeleteOpen(true);
//   };

//   console.log(isEditOpen + "" + isDeleteOpen + objectModelId);

//   return (
//     <>
//       <div className="grid grid-cols-11">
//         <div className="col-span-4 flex items-center space-x-2">
//           {objectModel.ruleStatus == "NOT_RELEASED" && (
//             <span>
//               <HiDocumentPlus className="text-blue-500" size="22" />
//             </span>
//           )}
//           {objectModel.ruleStatus == "ACTIVE" && (
//             <span>
//               <HiDocumentCheck className="text-green-500" size="22" />
//             </span>
//           )}
//           {objectModel.ruleStatus == "UPDATED" && (
//             <span>
//               <HiDocumentMinus className="text-orange-500" size="22" />
//             </span>
//           )}
//           <span>{objectModel.eventName}</span>
//         </div>
//         <div className="col-span-4 truncate">{objectModel.field}</div>
//         <div className="col-span-1 truncate">{objectModel.triggerCategory}</div>
//         <div className="col-span-1 truncate">{objectModel.triggerType}</div>
//         <div className="col-span-1 flex items-center justify-end space-x-4">
//           {(objectModel.ruleStatus == "NOT_RELEASED" || objectModel.ruleStatus == "UPDATED") && (
//             <IconButton
//               onClick={() => console.log("click")}
//               className="inline-block h-full text-fuchsia-600 hover:text-fuchsia-500"
//             >
//               <HiRocketLaunch size="22" />
//             </IconButton>
//           )}
//           <IconEditButton onClick={startEdit} />
//           <IconDeleteButton onClick={startDelete} />
//         </div>
//       </div>
//     </>
//   );
// }
