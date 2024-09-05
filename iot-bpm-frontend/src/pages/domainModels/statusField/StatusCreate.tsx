import { RefObject, useState, FormEvent } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { CreateStatusField, useCreateStatusField } from "../../../modelApi/statusModelApi";

export default function StatusCreate({
  dialogRef,
  equipmentId,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  equipmentId: string;
}) {
  const [newStatusField, setNewStatusField] = useState<CreateStatusField>({
    name: "",
    field: "",
  });
  const mutate = useCreateStatusField(equipmentId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewStatusField({
      ...newStatusField,
      [name]: value,
    });
  };

  const stopCreating = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setNewStatusField({
        name: "",
        field: "",
      });
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newStatusField, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog ref={dialogRef}>
      <Form onSubmit={submit}>
        <FormHeader>Add Status</FormHeader>
        <FormLabel>
          <span>Name</span>
          <Input type="text" name="name" onChange={handleChange} value={newStatusField.name} />
        </FormLabel>
        <FormLabel>
          <span>Field</span>
          <Input type="text" name="field" onChange={handleChange} value={newStatusField.field} />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}
