import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { CreateViewModel, useCreateViewModel } from "../../../modelApi/viewModelApi";

export default function ViewModelCreate({
  setIsOpen,
  equipmentModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  equipmentModelId: string;
}) {
  const [newViewModel, setNewViewModel] = useState<CreateViewModel>({
    viewName: "",
  });
  const mutate = useCreateViewModel(equipmentModelId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewViewModel({
      ...newViewModel,
      [name]: value,
    });
  };

  const stopCreating = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newViewModel, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader>Add View</FormHeader>
        <FormLabel>
          <span>View Name</span>
          <Input type="text" name="viewName" onChange={handleChange} value={newViewModel.viewName} />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}