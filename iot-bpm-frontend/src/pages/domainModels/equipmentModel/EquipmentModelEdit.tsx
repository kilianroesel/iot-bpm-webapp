import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Dialog } from "../../../components/forms/Dialog";
import { Input } from "../../../components/forms/Input";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { GetEquipmentModel, UpdateEquipmentModel, useUpdateEquipment } from "../../../modelApi/equipmentModelApi";

export default function EquipmentModelEdit({
  setIsOpen,
  equipmentModel,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  equipmentModel: GetEquipmentModel;
}) {
  const [newEquipmentModel, setNewEquipmentModel] = useState<UpdateEquipmentModel>({
    _id: equipmentModel._id, 
    equipmentName: equipmentModel.equipmentName,
  });
  const mutate = useUpdateEquipment(equipmentModel._id);

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
        <FormHeader>Edit Equipment Model: {equipmentModel.equipmentName}</FormHeader>
        <FormLabel>
          <span>Name</span>
          <Input
            type="text"
            name="equipmentName"
            onChange={handleChange}
            value={newEquipmentModel.equipmentName}
          />
        </FormLabel>
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating} />
        </div>
      </Form>
    </Dialog>
  );
}
