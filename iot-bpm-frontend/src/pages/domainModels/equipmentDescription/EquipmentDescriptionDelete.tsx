import { RefObject, FormEvent } from "react";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { useNavigate } from "react-router-dom";
import { GetEquipmentDescription, useDeleteEquipment } from "../../../modelApi/equipmentModelApi";

export default function EquipmentDescriptionDelete({
  dialogRef,
  equipmentDescription,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  equipmentDescription: GetEquipmentDescription;
}) {
  const mutate = useDeleteEquipment(equipmentDescription.id);
  const navigate = useNavigate();

  const stopDeleting = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(undefined, {
      onSuccess: () => {
        stopDeleting();
        navigate(-1);
      },
    });
  };

  return (
    <Dialog ref={dialogRef}>
      <Form onSubmit={submit}>
        <FormHeader className="font-medium">Delete Equipment Description</FormHeader>
        <FormLabel>{equipmentDescription.name}</FormLabel>
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
