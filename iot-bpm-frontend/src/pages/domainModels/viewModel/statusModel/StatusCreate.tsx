import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Dialog } from "../../../../components/forms/Dialog";
import { CancelButton, SubmitButton } from "../../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../../components/forms/Form";
import { Input } from "../../../../components/forms/Input";
import { CreateStatusModel, useCreateStatusModel } from "../../../../modelApi/statusModelApi";

export default function StatusModelCreate({
  setIsOpen,
  equipmentModelId,
  viewModelId
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  equipmentModelId: string;
  viewModelId: string;
}) {
  const [newStatusModel, setNewStatusModel] = useState<CreateStatusModel>({
    statusName: "",
    field: "",
  });
  const mutate = useCreateStatusModel(equipmentModelId, viewModelId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewStatusModel({
      ...newStatusModel,
      [name]: value,
    });
  };

  const stopCreating = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newStatusModel, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader>Add Status</FormHeader>
        <FormLabel>
          <span>Name</span>
          <Input type="text" name="statusName" onChange={handleChange} value={newStatusModel.statusName} />
        </FormLabel>
        <FormLabel>
          <span>Field</span>
          <Input type="text" name="field" onChange={handleChange} value={newStatusModel.field} />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}
