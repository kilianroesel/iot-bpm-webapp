import { RefObject, FormEvent } from "react";
import { CancelButton, DeleteButton, SubmitButton } from "../../../components/forms/Buttons";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { BaseGetEventDescription, useDeleteEventDescription } from "../../../modelApi/eventModelApi";

export default function EventDelete({
  dialogRef,
  eventDescription,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  eventDescription: BaseGetEventDescription;
}) {
  const mutate = useDeleteEventDescription(eventDescription.id);

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
          <div>{eventDescription.name}</div>
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
