import { useState, FormEvent, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Input, Select } from "../../../../components/forms/Input";
import { CancelButton, SubmitButton } from "../../../../components/forms/Buttons";
import { Dialog } from "../../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../../components/forms/Form";
import {
  BaseUpdateEventModel,
  RangeTriggerEventExtensionForm,
  ScalarTriggerEventExtensionForm,
  UpdateRangeTriggerEventModel,
  UpdateScalarTriggerEventModel,
  useUpdateEventModel,
} from "../../../../modelApi/eventModelApi";

export default function EventModelEdit({
  setIsOpen,
  eventModel,
  equipmentModelId,
  lifecycleModelId
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  eventModel: UpdateScalarTriggerEventModel | UpdateRangeTriggerEventModel;
  equipmentModelId: string;
  lifecycleModelId: string;
}) {
  const mutate = useUpdateEventModel(equipmentModelId, lifecycleModelId, eventModel._id);
  const [updatedEventModel, setUpdatedEventModel] = useState<BaseUpdateEventModel>({
    _id: eventModel._id,
    __t: eventModel.__t,
    eventName: eventModel.eventName,
    field: eventModel.field,
    triggerCategory: eventModel.triggerCategory
  });
  const [scalarTrigger, setScalarTrigger] = useState<ScalarTriggerEventExtensionForm>({
    triggerCategory: "SCALAR_TRIGGER",
    triggerType: eventModel.triggerCategory == "SCALAR_TRIGGER" ?  eventModel.triggerType : "CHANGES_TO",
    value: eventModel.triggerCategory == "SCALAR_TRIGGER" ?  eventModel.value.toString() : ""
  });
  const [rangeTrigger, setRangeTrigger] = useState<RangeTriggerEventExtensionForm>({
    triggerCategory: "RANGE_TRIGGER",
    triggerType: eventModel.triggerCategory == "RANGE_TRIGGER" ?  eventModel.triggerType : "ENTERS_RANGE_FROM_TO",
    from: eventModel.triggerCategory == "RANGE_TRIGGER" ?  eventModel.from.toString() : "",
    to: eventModel.triggerCategory == "RANGE_TRIGGER" ?  eventModel.to.toString() : "",
  });

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
    return () => {
      ref.current?.close();
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUpdatedEventModel({
      ...updatedEventModel,
      [name]: value,
    });
  };

  const stopEdit = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var payload: UpdateScalarTriggerEventModel | UpdateRangeTriggerEventModel;
    switch (updatedEventModel.triggerCategory) {
      case "SCALAR_TRIGGER":
        payload = {
          ...updatedEventModel,
          ...scalarTrigger,
          value: Number(scalarTrigger.value),
        };
        break;
      case "RANGE_TRIGGER":
        payload = {
          ...updatedEventModel,
          ...rangeTrigger,
          from: Number(rangeTrigger.from),
          to: Number(rangeTrigger.to),
        };
        break;
    }
    mutate.mutate(payload, {
      onSuccess: stopEdit,
    });
  };

  return (
    <Dialog ref={ref}>
      <Form onSubmit={submit}>
        <FormHeader>Edit Event Description</FormHeader>
        <FormLabel>
          <span>Event Name</span>
          <Input type="text" name="eventName" onChange={handleChange} value={updatedEventModel.eventName} />
        </FormLabel>
        <FormLabel>
          <span>Field</span>
          <Input type="text" name="field" onChange={handleChange} value={updatedEventModel.field} />
        </FormLabel>
        <FormLabel>
          <span>Trigger Category</span>
          <Select name="triggerCategory" value={updatedEventModel.triggerCategory} onChange={handleChange}>
            <option value="SCALAR_TRIGGER">Scalar Trigger</option>
            <option value="RANGE_TRIGGER">Range Trigger</option>
          </Select>
        </FormLabel>
        {updatedEventModel.triggerCategory == "SCALAR_TRIGGER" && (
          <ScalarTriggerEdit scalarTrigger={scalarTrigger} setScalarTrigger={setScalarTrigger} />
        )}
        {updatedEventModel.triggerCategory == "RANGE_TRIGGER" && (
          <RangeTriggerEdit rangeTrigger={rangeTrigger} setRangeTrigger={setRangeTrigger} />
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
  scalarTrigger: ScalarTriggerEventExtensionForm;
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
  rangeTrigger: RangeTriggerEventExtensionForm;
  setRangeTrigger: Dispatch<SetStateAction<any>>;
}) {
  useEffect(() => {
    setRangeTrigger({
      ...rangeTrigger,
      triggerType: "ENTERS_RANGE_FROM_TO",
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    if (type == "number") {
      setRangeTrigger({
        ...rangeTrigger,
        [name]: value,
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
