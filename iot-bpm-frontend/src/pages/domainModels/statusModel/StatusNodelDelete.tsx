import { RefObject, FormEvent } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Form, FormHeader } from "../../../components/forms/Form";
import { GetStatusModel, useDeleteStatusModel } from "../../../modelApi/statusModelApi";

export default function StatusModelDelete({
  dialogRef,
  statusModel,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  statusModel: GetStatusModel;
}) {
  const mutate = useDeleteStatusModel(statusModel._id);

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
