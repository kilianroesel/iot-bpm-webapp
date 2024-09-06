import { FormEvent, RefObject, useState } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { Input } from "../../../components/forms/Input";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { CreateEquipmentModel, GetPopulatedEquipmentModel, useCreateEquipment } from "../../../modelApi/equipmentModelApi";

export default function EquipmentModelCreate({
  dialogRef,
  equipment,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  equipment: GetPopulatedEquipmentModel;
}) {
  const [newEquipmentModel, setNewEquipmentModel] = useState<CreateEquipmentModel>({
    equipmentName: "",
  });
  const mutate = useCreateEquipment(equipment._id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEquipmentModel({
      ...newEquipmentModel,
      [name]: value,
    });
  };

  const stopCreating = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setNewEquipmentModel({
        equipmentName: "",
      });
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newEquipmentModel, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog ref={dialogRef}>
      <Form onSubmit={submit}>
        <FormHeader>Create Child Equipment for {equipment.equipmentName}</FormHeader>
        <FormLabel>
          <span>Name</span>
          <Input aria-label="Status Name" type="text" name="equipmentName" onChange={handleChange} value={newEquipmentModel.equipmentName} />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}
