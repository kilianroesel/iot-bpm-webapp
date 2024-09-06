import { RefObject, useState, FormEvent, Dispatch, SetStateAction } from "react";
import { CancelButton, SubmitButton } from "../../../components/forms/Buttons";
import { Input, Select } from "../../../components/forms/Input";
import { Dialog } from "../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../components/forms/Form";
import {
  UpdateRangeTriggerEventModel,
  CreateScalarTriggerEventModel,
  RangeTriggerEventExtension,
  ScalarTriggerEventExtension,
  useCreateEventModel,
} from "../../../modelApi/eventModelApi";

export default function EventModelCreate({
  dialogRef,
  equipmentId,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
  equipmentId: string;
}) {
  const [newEventModel, setNewEventModel] = useState<
    CreateScalarTriggerEventModel | UpdateRangeTriggerEventModel
  >({
    eventName: "",
    field: "",
    triggerCategory: "SCALAR_TRIGGER",
    triggerType: "ABSOLUTE_CHANGE_IS_GREATER_EQUAL",
    value: 0,
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
  const mutate = useCreateEventModel(equipmentId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewEventModel({
      ...newEventModel,
      [name]: value,
    });
  };

  const stopCreating = () => {
    setNewEventModel({
      eventName: "",
      field: "",
      triggerCategory: "SCALAR_TRIGGER",
      triggerType: "ABSOLUTE_CHANGE_IS_GREATER_EQUAL",
      value: 0,
    });
    setScalarTrigger({
      triggerCategory: "SCALAR_TRIGGER",
      triggerType: "CHANGES_TO",
      value: 0,
    });
    setRangeTrigger({
      triggerCategory: "RANGE_TRIGGER",
      triggerType: "ENTERS_RANGE_FROM_TO",
      from: 0,
      to: 0,
    });
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var payload: CreateScalarTriggerEventModel | UpdateRangeTriggerEventModel;
    switch (newEventModel.triggerCategory) {
      case "SCALAR_TRIGGER":
        payload = {
          ...newEventModel,
          ...scalarTrigger,
          value: Number(scalarTrigger.value),
        };
        break;
      case "RANGE_TRIGGER":
        payload = {
          ...newEventModel,
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
        <FormHeader>Add Event Model</FormHeader>
        <FormLabel>
          <span>Event Name</span>
          <Input type="text" name="eventName" onChange={handleChange} value={newEventModel.eventName} />
        </FormLabel>
        <FormLabel>
          <span>Field</span>
          <Input type="text" name="field" onChange={handleChange} value={newEventModel.field} />
        </FormLabel>
        <FormLabel>
          <span>Trigger Category</span>
          <Select name="triggerCategory" value={newEventModel.triggerCategory} onChange={handleChange}>
            <option value="SCALAR_TRIGGER">Scalar Trigger</option>
            <option value="RANGE_TRIGGER">Range Trigger</option>
          </Select>
        </FormLabel>
        {newEventModel.triggerCategory == "SCALAR_TRIGGER" && (
          <ScalarTriggerCreate scalarTrigger={scalarTrigger} setScalarTrigger={setScalarTrigger} />
        )}
        {newEventModel.triggerCategory == "RANGE_TRIGGER" && (
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
