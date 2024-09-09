import { FormEvent, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { GetEventModelBase, useDeleteEventModel } from "../../../modelApi/eventModelApi";

export default function EventModelDelete({
  setIsOpen,
  eventModel,
  equipmentModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  eventModel: GetEventModelBase;
  equipmentModelId: string
}) {
  const mutate = useDeleteEventModel(equipmentModelId, eventModel._id);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
    return () => {
      ref.current?.close();
    };
  }, []);

  const stopDeleting = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(undefined, {
      onSuccess: stopDeleting,
    });
  };

  return (
    <Dialog ref={ref}>
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
