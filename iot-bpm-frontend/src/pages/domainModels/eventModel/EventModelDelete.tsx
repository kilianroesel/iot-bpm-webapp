import { RefObject, FormEvent } from "react";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { GetEventModelBase, useDeleteEventModel } from "../../../modelApi/eventModelApi";

export default function EventModelDelete({
  dialogRef,
  eventModel,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  eventModel: GetEventModelBase;
}) {
  const mutate = useDeleteEventModel(eventModel._id);

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
        <FormHeader>Delete Event</FormHeader>
        <FormLabel>
          <span>Event Name</span>
          <div>{eventModel.eventName}</div>
        </FormLabel>
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
