import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { Input } from "../../../components/forms/Input";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { CreateMachineModel, useCreateMachineModel } from "../../../modelApi/machineModel";

export default function MachineModelCreate({
  setIsOpen
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [newMachineDescription, setNewMachineDescription] = useState<CreateMachineModel>({
    machineName: "",
    versionCsiStd: "",
    versionCsiSpecific: "",
    machineSoftwareVersion: "",
    machineMasterSoftwareVersion: "",
  });
  const mutate = useCreateMachineModel();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
    return () => {
      ref.current?.close();
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewMachineDescription({
      ...newMachineDescription,
      [name]: value,
    });
  };

  const stopCreating = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newMachineDescription, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog ref={ref}>
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
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}
