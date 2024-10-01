import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { GetResourceModel, UpdateResourceModel, useDeleteResourceModel } from "../../../modelApi/resourceModelApi";

export default function ResourceModelEdit({
  setIsOpen,
  resourceModel,
  machineModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  resourceModel: GetResourceModel;
  machineModelId: string;
}) {
  const [newResourceModel, setNewResourceModel] = useState<UpdateResourceModel>({
    resourceModelName: resourceModel.resourceModelName
  });
  const mutate = useDeleteResourceModel(machineModelId, resourceModel._id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewResourceModel({
      ...newResourceModel,
      [name]: value,
    });
  };

  const stopDeleting = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(undefined, {
      onSuccess: stopDeleting,
    });
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader>Delete Resource Model</FormHeader>
        <FormLabel>
          <span>Resource Model Name</span>
          <Input type="text" name="resourceModelName" onChange={handleChange} value={newResourceModel.resourceModelName} />
        </FormLabel>
        <div className="space-x-4">
          <DeleteButton type="submit">Delete</DeleteButton>
          <CancelButton type="button" onClick={stopDeleting} />
        </div>
      </Form>
    </Dialog>
  );
}
