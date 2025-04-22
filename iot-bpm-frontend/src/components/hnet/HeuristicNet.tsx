import { Panel, ReactFlow, useReactFlow } from "@xyflow/react";
import { useContext } from "react";
import { HeuristicNetContext } from "./HeuristicNetContext";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

import "@xyflow/react/dist/style.css";

export default function HeuristicNet() {
  const { nodes, edges, nodeTypes, edgeTypes } = useContext(HeuristicNetContext);
  const { fitView } = useReactFlow();

  const downloadPDF = () => {
    // Ensure full graph is in view
    fitView();
    console.log("Downloading")

    const graphElement = document.querySelector(".react-flow") as any;
    const savePdfButton = document.querySelector("#save-to-pdf-button") as HTMLElement;

    if (savePdfButton) {
      var originalDisplay = savePdfButton.style.display;
      savePdfButton.style.display = "none";
  }

    // Set a high scale for better resolution (e.g., 3x for 300% resolution)
    const scaleFactor = 5;

    domtoimage
      .toPng(graphElement, {
        width: graphElement.scrollWidth * scaleFactor,
        height: graphElement.scrollHeight * scaleFactor,
        style: {
          transform: `scale(${scaleFactor})`,
          transformOrigin: "top left",
          backgroundColor: "#ffffff",
        },
      })
      .then((dataUrl) => {
        const pdf = new jsPDF({
          orientation: graphElement.scrollWidth > graphElement.scrollHeight ? "l" : "p",
          unit: "px",
          format: [graphElement.scrollWidth, graphElement.scrollHeight],
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, graphElement.scrollWidth, graphElement.scrollHeight);
        pdf.save("graph.pdf");
      })
      .finally(() => {
        if (savePdfButton) {
          savePdfButton.style.display = originalDisplay;
        }
      });;
  };

  return (
    <ReactFlow minZoom={0.2} nodes={nodes} edges={edges} fitView nodeTypes={nodeTypes} edgeTypes={edgeTypes} proOptions={{hideAttribution: true}}>
      <Panel id="save-to-pdf-button" position="top-right" onClick={downloadPDF}><div className=".element-to-hide rounded-md p-2 border border-black">Export to PDF</div></Panel >
    </ReactFlow>
  );
}
