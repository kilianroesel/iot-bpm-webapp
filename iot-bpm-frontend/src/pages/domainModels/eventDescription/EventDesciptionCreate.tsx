import { RefObject, useState, FormEvent, Dispatch, SetStateAction } from "react";
import {
  CreateRangeTriggerEventDescription,
  CreateScalarTriggerEventDescription,
} from "../../../iotBpmBackend/interfaces";
import { useCreateEventDescription } from "../../../iotBpmBackend/api";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Input, Select } from "../../../components/links/Input";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";

interface EventDescriptionBase {
  field: string;
  name: string;
  triggerCategory: "RANGE_TRIGGER" | "SCALAR_TRIGGER";
}

interface ScalarTriggerDescription {
  triggerCategory: "SCALAR_TRIGGER";
  triggerType:
    | "CHANGES_TO"
    | "CHANGES_FROM"
    | "INCREASES_BY"
    | "DECREASES_BY"
    | "ABSOLUTE_CHANGE_IS_EQUAL"
    | "ABSOLUTE_CHANGE_IS_GREATER_EQUAL"
    | "CHANGE_IS_GREATER_EQUAL";
  value: string;
}

interface RangeTriggerDescription {
  triggerCategory: "RANGE_TRIGGER";
  triggerType: "ENTERS_RANGE_FROM_TO" | "LEAVES_RANGE_FROM_TO";
  from: string;
  to: string;
}

export default function EventDescriptionCreate({
  dialogRef,
  equipmentId,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  equipmentId: string;
}) {
  const [newEventDescription, setNewEventDescription] = useState<EventDescriptionBase>({
    name: "",
    field: "",
    triggerCategory: "SCALAR_TRIGGER",
  });
  const [scalarTrigger, setScalarTrigger] = useState<ScalarTriggerDescription>({
    triggerCategory: "SCALAR_TRIGGER",
    triggerType: "CHANGES_TO",
    value: "",
  });
  const [rangeTrigger, setRangeTrigger] = useState<RangeTriggerDescription>({
    triggerCategory: "RANGE_TRIGGER",
    triggerType: "ENTERS_RANGE_FROM_TO",
    from: "",
    to: "",
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
      dialogRef.current.close();
      setNewEventDescription({
        name: "",
        field: "",
        triggerCategory: "RANGE_TRIGGER",
      });
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
    <Dialog ref={dialogRef} className="w-full max-w-3xl rounded-md p-4">
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
  scalarTrigger: ScalarTriggerDescription;
  setScalarTrigger: Dispatch<SetStateAction<ScalarTriggerDescription>>;
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
          className="w-full rounded-md"
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
  rangeTrigger: RangeTriggerDescription;
  setRangeTrigger: Dispatch<SetStateAction<RangeTriggerDescription>>;
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
