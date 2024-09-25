import { FormEvent, SetStateAction, Dispatch } from "react";
import { Dialog } from "../../../../components/forms/Dialog";
import { CancelButton, DeleteButton } from "../../../../components/forms/Buttons";
import { Form, FormHeader } from "../../../../components/forms/Form";
import { GetStatusModel, useDeleteStatusModel } from "../../../../modelApi/statusModelApi";

export default function StatusModelDelete({
  setIsOpen,
  statusModel,
  equipmentModelId,
  lifecycleModelId
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  statusModel: GetStatusModel;
  equipmentModelId: string;
  lifecycleModelId: string;
}) {
  const mutate = useDeleteStatusModel(equipmentModelId, lifecycleModelId, statusModel._id);

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
