import { RefObject, useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Input, Select } from "../../../components/forms/Input";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { RangeTriggerEventExtension, ScalarTriggerEventExtension, UpdateRangeTriggerEventDescription, UpdateScalarTriggerEventDescription, useUpdateEventDescription } from "../../../modelApi/eventModelApi";

export default function EventDescriptionEdit({
  dialogRef,
  eventDescription,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  eventDescription: UpdateScalarTriggerEventDescription | UpdateRangeTriggerEventDescription;
}) {
  const [updatedEventDescription, setUpdatedEventDescription] = useState<
    UpdateScalarTriggerEventDescription | UpdateRangeTriggerEventDescription
  >(eventDescription);
  const mutate = useUpdateEventDescription(eventDescription.id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUpdatedEventDescription({
      ...updatedEventDescription,
      [name]: value,
    });
  };

  const stopEdit = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var payload: UpdateScalarTriggerEventDescription | UpdateRangeTriggerEventDescription;
    switch (updatedEventDescription.triggerCategory) {
      case "SCALAR_TRIGGER":
        payload = {
          id: updatedEventDescription.id,
          name: updatedEventDescription.name,
          field: updatedEventDescription.field,
          triggerCategory: "SCALAR_TRIGGER",
          triggerType: updatedEventDescription.triggerType,
          value: Number(updatedEventDescription.value),
        };
        break;
      case "RANGE_TRIGGER":
        payload = {
          id: updatedEventDescription.id,
          name: updatedEventDescription.name,
          field: updatedEventDescription.field,
          triggerCategory: "RANGE_TRIGGER",
          triggerType: updatedEventDescription.triggerType,
          from: Number(updatedEventDescription.from),
          to: Number(updatedEventDescription.to),
        };
        break;
    }
    mutate.mutate(payload, {
      onSuccess: stopEdit,
    });
  };

  return (
    <Dialog ref={dialogRef}>
      <Form onSubmit={submit}>
        <FormHeader>Edit Event Description</FormHeader>
        <FormLabel>
          <span>Event Name</span>
          <Input type="text" name="name" onChange={handleChange} value={updatedEventDescription.name} />
        </FormLabel>
        <FormLabel>
          <span>Field</span>
          <Input type="text" name="field" onChange={handleChange} value={updatedEventDescription.field} />
        </FormLabel>
        <FormLabel>
          <span>Trigger Category</span>
          <Select name="triggerCategory" value={updatedEventDescription.triggerCategory} onChange={handleChange}>
            <option value="SCALAR_TRIGGER">Scalar Trigger</option>
            <option value="RANGE_TRIGGER">Range Trigger</option>
          </Select>
        </FormLabel>
        {updatedEventDescription.triggerCategory == "SCALAR_TRIGGER" && (
          <ScalarTriggerEdit scalarTrigger={updatedEventDescription} setScalarTrigger={setUpdatedEventDescription} />
        )}
        {updatedEventDescription.triggerCategory == "RANGE_TRIGGER" && (
          <RangeTriggerEdit rangeTrigger={updatedEventDescription} setRangeTrigger={setUpdatedEventDescription} />
        )}
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopEdit}>
            Cancel
          </CancelButton>
        </div>
      </Form>
    </Dialog>
  );
}

function ScalarTriggerEdit({
  scalarTrigger,
  setScalarTrigger,
}: {
  scalarTrigger: ScalarTriggerEventExtension;
  setScalarTrigger: Dispatch<SetStateAction<any>>;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setScalarTrigger({
      ...scalarTrigger,
      [name]: value,
    });
  };

  return (
    <>
      <FormLabel>
        <span>Trigger Type</span>
        <Select name="triggerType" value={scalarTrigger.triggerType} onChange={handleChange}>
          <option value="CHANGES_TO">Changes To</option>
          <option value="CHANGES_FROM">Changes From</option>
          <option value="INCREASES_BY">Increases By</option>
          <option value="DECREASES_BY">Decreases By</option>
          <option value="ABSOLUTE_CHANGE_IS_EQUAL">Absolute Change is Equal</option>
          <option value="ABSOLUTE_CHANGE_IS_GREATER_EQUAL">Absolute Change is Greater Equal</option>
          <option value="CHANGE_IS_GREATER_EQUAL">Changes is Greater Eqaul</option>
        </Select>
      </FormLabel>
      <FormLabel>
        <span>Value</span>
        <Input type="number" name="value" onChange={handleChange} value={scalarTrigger.value} />
      </FormLabel>
    </>
  );
}

function RangeTriggerEdit({
  rangeTrigger,
  setRangeTrigger,
}: {
  rangeTrigger: RangeTriggerEventExtension;
  setRangeTrigger: Dispatch<SetStateAction<any>>;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    if (type == "number") {
      setRangeTrigger({
        ...rangeTrigger,
        [name]: Number(value),
      });
    } else {
      setRangeTrigger({
        ...rangeTrigger,
        [name]: value,
      });
    }
  };

  return (
    <>
      <FormLabel>
        <span>Trigger Type</span>
        <Select name="triggerType" value={rangeTrigger.triggerType} onChange={handleChange}>
          <option value="ENTERS_RANGE_FROM_TO">Enters Range From To</option>
          <option value="LEAVES_RANGE_FROM_TO">Leaves Range From To</option>
        </Select>
      </FormLabel>
      <FormLabel>
        <span>From</span>
        <Input type="number" name="from" onChange={handleChange} value={rangeTrigger.from} />
      </FormLabel>
      <FormLabel>
        <span>To</span>
        <Input type="number" name="to" onChange={handleChange} value={rangeTrigger.to} />
      </FormLabel>
    </>
  );
}
