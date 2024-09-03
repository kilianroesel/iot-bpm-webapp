import { RefObject, FormEvent } from "react";
import { useDeleteEventDescription } from "../../../iotBpmBackend/api";
import { BaseGetEventDescription } from "../../../iotBpmBackend/interfaces";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";

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
          <SubmitButton type="submit">Delete</SubmitButton>
          <CancelButton type="button" onClick={stopDeleting}>
            Cancel
          </CancelButton>
        </div>
      </Form>
    </Dialog>
  );
}
