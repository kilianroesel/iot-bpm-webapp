import { RefObject, useState, FormEvent, Dispatch, SetStateAction } from "react";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Input, Select } from "../../../components/forms/Input";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import { CreateRangeTriggerEventDescription, CreateScalarTriggerEventDescription, RangeTriggerEventExtension, ScalarTriggerEventExtension, useCreateEventDescription } from "../../../modelApi/eventModelApi";

export default function EventDescriptionCreate({
  dialogRef,
  equipmentId,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  equipmentId: string;
}) {
  const [newEventDescription, setNewEventDescription] = useState<CreateScalarTriggerEventDescription | CreateRangeTriggerEventDescription>({
    name: "",
    field: "",
    triggerCategory: "SCALAR_TRIGGER",
    triggerType: "ABSOLUTE_CHANGE_IS_GREATER_EQUAL",
    value: 0
  });
  const [scalarTrigger, setScalarTrigger] = useState<ScalarTriggerEventExtension>({
    triggerCategory: "SCALAR_TRIGGER",
    triggerType: "CHANGES_TO",
    value: 0,
  });
  const [rangeTrigger, setRangeTrigger] = useState<RangeTriggerEventExtension>({
    triggerCategory: "RANGE_TRIGGER",
    triggerType: "ENTERS_RANGE_FROM_TO",
    from: 0,
    to: 0,
  });
  const mutate = useCreateEventDescription(equipmentId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewEventDescription({
      ...newEventDescription,
      [name]: value,
    });
  };

  const stopCreating = () => {
    if (dialogRef.current) {
      setNewEventDescription({
        name: "",
        field: "",
        triggerCategory: "SCALAR_TRIGGER",
        triggerType: "ABSOLUTE_CHANGE_IS_GREATER_EQUAL",
        value: 0
      });
      dialogRef.current.close();
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var payload: CreateScalarTriggerEventDescription | CreateRangeTriggerEventDescription;
    switch (newEventDescription.triggerCategory) {
      case "SCALAR_TRIGGER":
        payload = {
          ...newEventDescription,
          ...scalarTrigger,
          value: Number(scalarTrigger.value),
        };
        break;
      case "RANGE_TRIGGER":
        payload = {
          ...newEventDescription,
          ...rangeTrigger,
          from: Number(rangeTrigger.from),
          to: Number(rangeTrigger.to),
        };
        break;
    }
    mutate.mutate(payload, {
      onSuccess: stopCreating,
    });
  };

  return (
    <Dialog ref={dialogRef}>
      <Form onSubmit={submit}>
        <FormHeader>Add Event Description</FormHeader>
        <FormLabel>
          <span>Event Name</span>
          <Input type="text" name="name" onChange={handleChange} value={newEventDescription.name} />
        </FormLabel>
        <FormLabel>
          <span>Field</span>
          <Input type="text" name="field" onChange={handleChange} value={newEventDescription.field} />
        </FormLabel>
        <FormLabel>
          <span>Trigger Category</span>
          <Select name="triggerCategory" value={newEventDescription.triggerCategory} onChange={handleChange}>
            <option value="SCALAR_TRIGGER">Scalar Trigger</option>
            <option value="RANGE_TRIGGER">Range Trigger</option>
          </Select>
        </FormLabel>
        {newEventDescription.triggerCategory == "SCALAR_TRIGGER" && (
          <ScalarTriggerCreate scalarTrigger={scalarTrigger} setScalarTrigger={setScalarTrigger} />
        )}
        {newEventDescription.triggerCategory == "RANGE_TRIGGER" && (
          <RangeTriggerCreate rangeTrigger={rangeTrigger} setRangeTrigger={setRangeTrigger} />
        )}
        <div className="space-x-4">
          <SubmitButton type="submit">Save</SubmitButton>
          <CancelButton type="button" onClick={stopCreating}>
            Cancel
          </CancelButton>
        </div>
      </Form>
    </Dialog>
  );
}

function ScalarTriggerCreate({
  scalarTrigger,
  setScalarTrigger,
}: {
  scalarTrigger: ScalarTriggerEventExtension;
  setScalarTrigger: Dispatch<SetStateAction<ScalarTriggerEventExtension>>;
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
        <Select
          name="triggerType"
          value={scalarTrigger.triggerType}
          onChange={handleChange}
        >
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

function RangeTriggerCreate({
  rangeTrigger,
  setRangeTrigger,
}: {
  rangeTrigger: RangeTriggerEventExtension;
  setRangeTrigger: Dispatch<SetStateAction<RangeTriggerEventExtension>>;
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
