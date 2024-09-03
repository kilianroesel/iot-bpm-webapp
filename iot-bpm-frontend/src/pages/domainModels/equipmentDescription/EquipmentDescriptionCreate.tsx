import { FormEvent, RefObject, useState } from "react";
import { CreateEquipmentDescription, PopulatedGetEquipmentDescription } from "../../../iotBpmBackend/interfaces";
import { useCreateEquipment } from "../../../iotBpmBackend/api";
import { Dialog } from "../../../components/forms/Dialog";
import { Input } from "../../../components/links/Input";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";

export default function EquipmentDescriptionCreate({
  dialogRef,
  equipment,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  equipment: PopulatedGetEquipmentDescription;
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
        <FormHeader>Create Child Euqipment for {equipment.name}</FormHeader>
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
