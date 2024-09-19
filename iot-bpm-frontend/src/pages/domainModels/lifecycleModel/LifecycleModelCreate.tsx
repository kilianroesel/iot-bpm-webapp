import { useState, FormEvent, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { Input } from "../../../components/forms/Input";
import { CreateLifecycleModel, useCreateLifecycleModel } from "../../../modelApi/lifecycleModelApi";

export default function LifecycleModelCreate({
  setIsOpen,
  equipmentModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  equipmentModelId: string;
}) {
  const [newLifecycleModel, setNewLifecycleModel] = useState<CreateLifecycleModel>({
    lifecycleName: "",
  });
  const mutate = useCreateLifecycleModel(equipmentModelId);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
    return () => {
      ref.current?.close();
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewLifecycleModel({
      ...newLifecycleModel,
      [name]: value,
    });
  };

  const stopCreating = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newLifecycleModel, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog ref={ref}>
      <Form onSubmit={submit}>
        <FormHeader>Add Lifecycle</FormHeader>
        <FormLabel>
          <span>Lifecycle Name</span>
          <Input type="text" name="lifecycleName" onChange={handleChange} value={newLifecycleModel.lifecycleName} />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}
