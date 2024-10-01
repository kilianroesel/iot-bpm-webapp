import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { CreateResourceModel, useCreateResourceModel } from "../../../modelApi/resourceModelApi";

export default function ResourceModelCreate({
  setIsOpen,
  machineModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  machineModelId: string;
}) {
  const [newResourceModel, setNewResourceModel] = useState<CreateResourceModel>({
    resourceModelName: ""
  });
  const mutate = useCreateResourceModel(machineModelId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewResourceModel({
      ...newResourceModel,
      [name]: value,
    });
  };

  const stopCreating = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newResourceModel, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader>Add Resource Model</FormHeader>
        <FormLabel>
          <span>Resource Model Name</span>
          <Input type="text" name="resourceModelName" onChange={handleChange} value={newResourceModel.resourceModelName} />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}
