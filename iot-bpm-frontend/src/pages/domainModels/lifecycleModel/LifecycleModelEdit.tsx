import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Input } from "../../../components/forms/Input";
import { GetLifecycleModel, UpdateLifecycleModel, useUpdateLifecycleModel } from "../../../modelApi/lifecycleModelApi";

export default function LifecycleModelEdit({
  setIsOpen,
  lifecycleModel,
  equipmentModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  lifecycleModel: GetLifecycleModel;
  equipmentModelId: string;
}) {
  const [updatedLifecycleModel, setUpdatedLifecycleModel] = useState<UpdateLifecycleModel>({
    _id: lifecycleModel._id,
    __t: lifecycleModel.__t,
    lifecycleName: lifecycleModel.lifecycleName,
  });
  const mutate = useUpdateLifecycleModel(equipmentModelId, lifecycleModel._id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedLifecycleModel({
      ...updatedLifecycleModel,
      [name]: value,
    });
  };
  const stopEditing = () => {
    setIsOpen(false)
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(updatedLifecycleModel, {
      onSuccess: stopEditing,
    });
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader className="font-medium">Edit Lifecycle Model</FormHeader>
        <FormLabel>
          <span>Name</span>
          <Input
            type="text"
            name="lifecycleName"
            onChange={handleChange}
            value={updatedLifecycleModel.lifecycleName}
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
