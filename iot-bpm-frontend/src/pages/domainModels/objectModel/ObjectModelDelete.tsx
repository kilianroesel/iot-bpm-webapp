import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { GetObjectModel, UpdateObjectModel, useDeleteObjectModel } from "../../../modelApi/objectModelApi";

export default function ObjectModelEdit({
  setIsOpen,
  objectModel,
  machineModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  objectModel: GetObjectModel;
  machineModelId: string;
}) {
  const [newObjectModel, setNewObjectModel] = useState<UpdateObjectModel>({
    objectModelName: objectModel.objectModelName
  });
  const mutate = useDeleteObjectModel(machineModelId, objectModel._id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewObjectModel({
      ...newObjectModel,
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
        <FormHeader>Delete Object Model</FormHeader>
        <FormLabel>
          <span>Object Model Name</span>
          <Input type="text" name="objectModelName" onChange={handleChange} value={newObjectModel.objectModelName} />
        </FormLabel>
        <div className="space-x-4">
          <DeleteButton type="submit">Delete</DeleteButton>
          <CancelButton type="button" onClick={stopDeleting} />
        </div>
      </Form>
    </Dialog>
  );
}
