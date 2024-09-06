import { RefObject, useState, FormEvent } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { CreateStatusModel, useCreateStatusModel } from "../../../modelApi/statusModelApi";

export default function StatusModelCreate({
  dialogRef,
  equipmentId,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  equipmentId: string;
}) {
  const [newStatusModel, setNewStatusModel] = useState<CreateStatusModel>({
    statusName: "",
    field: "",
  });
  const mutate = useCreateStatusModel(equipmentId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewStatusModel({
      ...newStatusModel,
      [name]: value,
    });
  };

  const stopCreating = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setNewStatusModel({
        statusName: "",
        field: "",
      });
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newStatusModel, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog ref={dialogRef}>
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
