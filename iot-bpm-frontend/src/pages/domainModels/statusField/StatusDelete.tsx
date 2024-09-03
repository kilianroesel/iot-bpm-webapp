import { RefObject, FormEvent } from "react";
import { useDeleteStatusField } from "../../../iotBpmBackend/api";
import { GetStatusField } from "../../../iotBpmBackend/interfaces";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Form, FormHeader } from "../../../components/forms/Form";

export default function StatusDelete({
  dialogRef,
  statusField,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  statusField: GetStatusField;
}) {
  const mutate = useDeleteStatusField(statusField.id);

  const stopDeleting = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(undefined, {
      onSuccess: stopDeleting,
    });
  };

  return (
    <Dialog ref={dialogRef}>
      <Form onSubmit={submit}>
        <FormHeader>Delete StatusField</FormHeader>
        <div className="space-x-4">
          <DeleteButton type="submit" />
          <CancelButton type="button" onClick={stopDeleting}>
            Cancel
          </CancelButton>
        </div>
      </Form>
    </Dialog>
  );
}
