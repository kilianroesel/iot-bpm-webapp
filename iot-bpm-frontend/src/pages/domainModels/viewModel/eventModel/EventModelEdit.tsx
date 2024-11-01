import { useState, FormEvent, Dispatch, SetStateAction, useEffect } from "react";
import { Input, Select } from "../../../../components/forms/Input";
import { CancelButton, SubmitButton } from "../../../../components/forms/Buttons";
import { Dialog } from "../../../../components/forms/Dialog";
import { Form, FormHeader, FormLabel } from "../../../../components/forms/Form";
import {
  BaseUpdateEventModel,
  GetRangeTriggerEventModel,
  GetScalarTriggerEventModel,
  RangeTriggerEventExtensionForm,
  ScalarTriggerEventExtensionForm,
  UpdateRangeTriggerEventModel,
  UpdateScalarTriggerEventModel,
  useUpdateEventModel,
} from "../../../../modelApi/eventModelApi";
import { IconAddButton, IconDeleteButton } from "../../../../components/links/IconButtons";
import { useQuery } from "@tanstack/react-query";
import { resourceModelsQuery } from "../../../../modelApi/resourceModelApi";

export default function EventModelEdit({
  setIsOpen,
  eventModel,
  equipmentModelId,
  viewModelId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  eventModel: GetScalarTriggerEventModel | GetRangeTriggerEventModel;
  equipmentModelId: string;
  viewModelId: string;
}) {
  const mutate = useUpdateEventModel(equipmentModelId, viewModelId, eventModel._id);
  const queryResourceModels = useQuery(resourceModelsQuery());

  const [updatedEventModel, setUpdatedEventModel] = useState<BaseUpdateEventModel>({
    _id: eventModel._id,
    __t: eventModel.__t,
    eventName: eventModel.eventName,
    field: eventModel.field,
    triggerCategory: eventModel.triggerCategory,
    relations: eventModel.relations,
  });
  const [scalarTrigger, setScalarTrigger] = useState<ScalarTriggerEventExtensionForm>({
    triggerCategory: "SCALAR_TRIGGER",
    triggerType: eventModel.triggerCategory == "SCALAR_TRIGGER" ? eventModel.triggerType : "CHANGES_TO",
    value: eventModel.triggerCategory == "SCALAR_TRIGGER" ? eventModel.value.toString() : "",
  });
  const [rangeTrigger, setRangeTrigger] = useState<RangeTriggerEventExtensionForm>({
    triggerCategory: "RANGE_TRIGGER",
    triggerType: eventModel.triggerCategory == "RANGE_TRIGGER" ? eventModel.triggerType : "ENTERS_RANGE_FROM_TO",
    from: eventModel.triggerCategory == "RANGE_TRIGGER" ? eventModel.from.toString() : "",
    to: eventModel.triggerCategory == "RANGE_TRIGGER" ? eventModel.to.toString() : "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUpdatedEventModel({
      ...updatedEventModel,
      [name]: value,
    });
  };

  const handleRelationsChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const index = Number(event.target.getAttribute("data-index")) || 0;
    const newEventResourceModelRelations = [...updatedEventModel.relations];
    const newEventModelRelation = {
      ...updatedEventModel.relations[index],
      [name]: value,
    };
    newEventResourceModelRelations[index] = newEventModelRelation;
    setUpdatedEventModel({
      ...updatedEventModel,
      relations: newEventResourceModelRelations,
    });
  };

  const stopEdit = () => {
    setIsOpen(false);
  };

  const addEventResourceRelation = () => {
    const newEventResourceRelation = {
      resourceModel: "",
      interactionType: "CREATE",
      qualifier: "",
    };
    setUpdatedEventModel({
      ...updatedEventModel,
      relations: [...updatedEventModel.relations, newEventResourceRelation],
    });
  };

  const removeEventResourceRelation = (index: number) => {
    const newEventResourceRelation = updatedEventModel.relations.filter((_, i) => i !== index);
    setUpdatedEventModel({
      ...updatedEventModel,
      relations: newEventResourceRelation,
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let payload: UpdateScalarTriggerEventModel | UpdateRangeTriggerEventModel;
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
    <Dialog>
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
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span>Resource relations</span>
            <IconAddButton onClick={addEventResourceRelation} />
          </div>
          {updatedEventModel.relations.map((relation, index) => (
            <FormLabel className="flex items-center space-x-2" key={index}>
              <Select name="resourceModel" value={relation.resourceModel} data-index={index} onChange={handleRelationsChange}>
                {queryResourceModels.data?.map((resourceModel) => (
                  <option key={resourceModel._id} value={resourceModel._id}>
                    {resourceModel.resourceModelName} - {resourceModel.machineModel?.machineName}
                  </option>
                ))}
              </Select>
              <Select
                name="interactionType"
                value={relation.interactionType}
                data-index={index}
                onChange={handleRelationsChange}
              >
                <option value="CREATE">CREATE</option>
                <option value="CONSUME">CONSUME</option>
              </Select>
              <Input type="text" name="qualifier" value={relation.qualifier} data-index={index} onChange={handleRelationsChange} />
              <IconDeleteButton onClick={() => removeEventResourceRelation(index)} />
            </FormLabel>
          ))}
        </div>
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
  setScalarTrigger: Dispatch<SetStateAction<ScalarTriggerEventExtensionForm>>;
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
          <option value="CHANGE_IS_GREATER_EQUAL">Change is Greater Eqaul</option>
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
  setRangeTrigger: Dispatch<SetStateAction<RangeTriggerEventExtensionForm>>;
}) {
  useEffect(() => {
    setRangeTrigger({
      ...rangeTrigger,
      triggerType: "ENTERS_RANGE_FROM_TO",
    });
  }, [setRangeTrigger, rangeTrigger]);

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