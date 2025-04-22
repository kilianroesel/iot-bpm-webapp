import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { lineOcelEventQuery, lineOcelEventSubscription } from "../../../bpmApi/lineApi";

export default function LineEvents() {
  const params = useParams();
  if (!params.lineId) throw new Error("No Line ID provided");
  const { data: events } = useSuspenseQuery(lineOcelEventQuery(params.lineId));
  lineOcelEventSubscription(params.lineId);

  return (
    <div className="col-span-2 rounded-md border border-black p-4">
      <h3 className="text-3xl font-medium">Live Events</h3>
      <div className="grid grid-cols-4">
        <div className="font-semibold">Event Type</div>
        <div className="font-semibold">Event Time</div>
        <div className="font-semibold">Event Attributes</div>
        <div className="font-semibold">Event Relationships</div>
      </div>
      {events.map((event) => (
        <div className="grid grid-cols-4" key={event.id}>
          <div>{event.type}</div>
          <div>{new Date(event.time).toLocaleString()}</div>
          <div>{event.attributes.length}</div>
          <div>{event.relationships.length}</div>
        </div>
      ))}
    </div>
  );
}
