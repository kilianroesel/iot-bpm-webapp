import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { Input } from "../../../components/forms/Input";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { CreateEquipmentModel, GetEquipmentModel, useCreateEquipment } from "../../../modelApi/equipmentModelApi";

export default function EquipmentModelCreate({
  setIsOpen,
  equipmentModel,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  equipmentModel: GetEquipmentModel;
}) {
  const [newEquipmentModel, setNewEquipmentModel] = useState<CreateEquipmentModel>({
    equipmentName: "",
  });
  const mutate = useCreateEquipment(equipmentModel._id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEquipmentModel({
      ...newEquipmentModel,
      [name]: value,
    });
  };

  const stopCreating = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate.mutate(newEquipmentModel, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog>
      <Form onSubmit={submit}>
        <FormHeader>Create Child Equipment for {equipmentModel.equipmentName}</FormHeader>
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
