import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { Input } from "../../../components/forms/Input";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { GetMachineModel, UpdateMachineModel, useUpdateMachineModel } from "../../../modelApi/machineModel";

export default function MachineModelEdit({
  setIsOpen,
  machineModel,
}: {
  machineModel: GetMachineModel,
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [newMachineDescription, setNewMachineDescription] = useState<UpdateMachineModel>({
    machineName: machineModel.machineName,
    versionCsiStd: machineModel.versionCsiStd,
    versionCsiSpecific: machineModel.versionCsiSpecific,
    machineSoftwareVersion: machineModel.machineSoftwareVersion,
    machineMasterSoftwareVersion: machineModel.machineMasterSoftwareVersion,
  });
  const mutate = useUpdateMachineModel(machineModel._id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewMachineDescription({
      ...newMachineDescription,
      [name]: value,
    });
  };

  const stopEditing = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newMachineDescription, {
      onSuccess: stopEditing,
    });
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader>Create Machine Description</FormHeader>
        <FormLabel>
          <span>Machine Name</span>
          <Input type="text" name="machineName" onChange={handleChange} value={newMachineDescription.machineName} />
        </FormLabel>
        <FormLabel>
          <span>Version CSI Standard</span>
          <Input type="text" name="versionCsiStd" onChange={handleChange} value={newMachineDescription.versionCsiStd} />
        </FormLabel>
        <FormLabel>
          <span>Version CSI Specific</span>
          <Input type="text" name="versionCsiSpecific" onChange={handleChange} value={newMachineDescription.versionCsiSpecific} />
        </FormLabel>
        <FormLabel>
          <span>Machine Software Version</span>
          <Input type="text" name="machineSoftwareVersion" onChange={handleChange} value={newMachineDescription.machineSoftwareVersion} />
        </FormLabel>
        <FormLabel>
          <span>Machine Master Software Version</span>
          <Input type="text" name="machineMasterSoftwareVersion" onChange={handleChange} value={newMachineDescription.machineMasterSoftwareVersion} />
        </FormLabel>
        <div className="space-x-2">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopEditing} />
        </div>
      </Form>
    </Dialog>
  );
}
