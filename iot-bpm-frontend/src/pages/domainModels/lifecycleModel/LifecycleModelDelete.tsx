import { FormEvent, SetStateAction, Dispatch, useEffect, useRef } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Form, FormHeader } from "../../../components/forms/Form";
import { GetLifecycleModel, useDeleteLifecycleModel } from "../../../modelApi/lifecycleModelApi";

export default function LifecycleModelDelete({
  setIsOpen,
  lifecycleModel,
  equipmentModelId
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  lifecycleModel: GetLifecycleModel;
  equipmentModelId: string;
}) {
  const mutate = useDeleteLifecycleModel(equipmentModelId, lifecycleModel._id);
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
        <FormHeader>Delete Lifecycle Model</FormHeader>
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
