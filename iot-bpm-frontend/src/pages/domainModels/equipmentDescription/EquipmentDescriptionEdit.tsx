import { FormEvent, RefObject, useState } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { Input } from "../../../components/forms/Input";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { CreateEquipmentDescription, GetPopulatedEquipmentDescription, useCreateEquipment } from "../../../modelApi/equipmentModelApi";

export default function EquipmentDescriptionCreate({
  dialogRef,
  equipment,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  equipment: GetPopulatedEquipmentDescription;
}) {
  const [newEquipment, setNewEquipment] = useState<CreateEquipmentDescription>({
    name: "",
  });
  const mutate = useCreateEquipment(equipment.id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEquipment({
      ...newEquipment,
      [name]: value,
    });
  };

  const stopCreating = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setNewEquipment({
        name: "",
      });
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newEquipment, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog ref={dialogRef}>
      <Form onSubmit={submit}>
        <FormHeader>Create Child Equipment for {equipment.name}</FormHeader>
        <FormLabel>
          <span>Name</span>
          <Input aria-label="Status Name" type="text" name="name" onChange={handleChange} value={newEquipment.name} />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}
