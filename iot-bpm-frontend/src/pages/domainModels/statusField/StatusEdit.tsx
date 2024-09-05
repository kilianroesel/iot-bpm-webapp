import { RefObject, useState, FormEvent } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Input } from "../../../components/forms/Input";
import { GetStatusField, UpdateStatusField, useUpdateStatusField } from "../../../modelApi/statusModelApi";

export default function StatusEdit({
  dialogRef,
  statusField,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  statusField: GetStatusField;
}) {
  const [updatedStatusField, setUpdatedStatusField] = useState<UpdateStatusField>({
    name: statusField.name,
    id: statusField.id,
    equipmentId: statusField.equipmentId,
    field: statusField.field
  });
  const mutate = useUpdateStatusField(statusField.id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedStatusField({
      ...updatedStatusField,
      [name]: value,
    });
  };
  const stopEditing = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(updatedStatusField, {
      onSuccess: stopEditing,
    });
  };

  return (
    <Dialog ref={dialogRef}>
      <Form onSubmit={submit}>
        <FormHeader className="font-medium">Edit StatusField</FormHeader>
        <FormLabel>
          <span>Name</span>
          <Input
            aria-label="Status Name"
            type="text"
            name="name"
            onChange={handleChange}
            value={updatedStatusField.name}
          />
        </FormLabel>
        <FormLabel>
          <span>Field</span>
          <Input
            aria-label="Status Field"
            type="text"
            name="field"
            onChange={handleChange}
            value={updatedStatusField.field}
          />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopEditing}>
            Cancel
          </CancelButton>
        </div>
      </Form>
    </Dialog>
  );
}
