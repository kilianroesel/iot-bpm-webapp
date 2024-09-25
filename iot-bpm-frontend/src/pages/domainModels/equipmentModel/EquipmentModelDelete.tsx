import { FormEvent, Dispatch, SetStateAction } from "react";
import { CancelButton, DeleteButton } from "../../../components/forms/Buttons";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { useNavigate } from "react-router-dom";
import { GetEquipmentModel, useDeleteEquipment } from "../../../modelApi/equipmentModelApi";

export default function EquipmentModelDelete({
  setIsOpen,
  equipmentModel,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  equipmentModel: GetEquipmentModel;
}) {
  const mutate = useDeleteEquipment(equipmentModel._id);
  const navigate = useNavigate();

  const stopDeleting = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(-1);
    stopDeleting();
    mutate.mutate();
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader className="font-medium">Delete Equipment Description</FormHeader>
        <FormLabel>{equipmentModel.equipmentName}</FormLabel>
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
