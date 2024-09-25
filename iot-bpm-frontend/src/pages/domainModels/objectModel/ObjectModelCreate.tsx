import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { CreateObjectModel, useCreateObjectModel } from "../../../modelApi/objectModelApi";

export default function ObjectModelCreate({
  setIsOpen,
  machineModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  machineModelId: string;
}) {
  const [newObjectModel, setNewObjectModel] = useState<CreateObjectModel>({
    objectModelName: ""
  });
  const mutate = useCreateObjectModel(machineModelId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewObjectModel({
      ...newObjectModel,
      [name]: value,
    });
  };

  const stopCreating = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newObjectModel, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader>Add Object Model</FormHeader>
        <FormLabel>
          <span>Object Model Name</span>
          <Input type="text" name="objectModelName" onChange={handleChange} value={newObjectModel.objectModelName} />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}
