import { FormEvent, SetStateAction, Dispatch } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Form, FormHeader } from "../../../components/forms/Form";
import { GetViewModel, useDeleteViewModel } from "../../../modelApi/viewModelApi";

export default function ViewModelDelete({
  setIsOpen,
  viewModel,
  equipmentModelId
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  viewModel: GetViewModel;
  equipmentModelId: string;
}) {
  const mutate = useDeleteViewModel(equipmentModelId, viewModel._id);

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
        <FormHeader>Delete View Model</FormHeader>
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
