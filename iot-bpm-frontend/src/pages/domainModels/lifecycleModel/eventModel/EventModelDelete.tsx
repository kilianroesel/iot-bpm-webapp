import { FormEvent, Dispatch, SetStateAction } from "react";
import { CancelButton, DeleteButton } from "../../../../components/forms/Buttons";
import { Dialog } from "../../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../../components/forms/Form";
import { GetEventModelBase, useDeleteEventModel } from "../../../../modelApi/eventModelApi";

export default function EventModelDelete({
  setIsOpen,
  eventModel,
  equipmentModelId,
  lifecycleModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  eventModel: GetEventModelBase;
  equipmentModelId: string;
  lifecycleModelId: string;
}) {
  const mutate = useDeleteEventModel(equipmentModelId, lifecycleModelId, eventModel._id);

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
    <Dialog>
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
