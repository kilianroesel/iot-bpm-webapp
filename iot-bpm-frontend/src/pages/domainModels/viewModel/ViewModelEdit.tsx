import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Input } from "../../../components/forms/Input";
import { GetViewModel, UpdateViewModel, useUpdateViewModel } from "../../../modelApi/viewModelApi";

export default function ViewModelEdit({
  setIsOpen,
  viewModel,
  equipmentModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  viewModel: GetViewModel;
  equipmentModelId: string;
}) {
  const [updatedViewModel, setUpdatedViewModel] = useState<UpdateViewModel>({
    _id: viewModel._id,
    __t: viewModel.__t,
    viewName: viewModel.viewName,
  });
  const mutate = useUpdateViewModel(equipmentModelId, viewModel._id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedViewModel({
      ...updatedViewModel,
      [name]: value,
    });
  };
  const stopEditing = () => {
    setIsOpen(false)
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(updatedViewModel, {
      onSuccess: stopEditing,
    });
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader className="font-medium">Edit View Model</FormHeader>
        <FormLabel>
          <span>Name</span>
          <Input
            type="text"
            name="viewName"
            onChange={handleChange}
            value={updatedViewModel.viewName}
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
