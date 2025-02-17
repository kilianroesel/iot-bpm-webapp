export interface HeuristicNet {
  processedEvents: number;
  objectView: string;
  nodes: HeuristicNetNode[];
  edges: HeuristicNetEdge[];
  sourceNodes: string[];
  sinkNodes: string[];
}

interface HeuristicNetNode {
  activity: string;
  occurences: number;
  inputBindings: string[];
  outputBindings: string[];
}

interface HeuristicNetEdge {
  sourceNode: string;
  targetNode: string;
  duration: number;
  dfgValue: number;
  dependencyValue: number;
}

export const heuristicNet: HeuristicNet = {
  processedEvents: 71300,
  objectView: "66eaf794107015112cbeee44Production",
  nodes: [
    {
      activity: "Cut Portion",
      occurences: 33927,
      inputBindings: ["Cut Portion", "OptiSlicer made idle Cut", "Scanned Product"],
      outputBindings: ["Cut Portion", "OptiSlicer cut portion"],
    },
    {
      activity: "Scanned Product",
      occurences: 1401,
      inputBindings: ["OptiSlicer made idle Cut", "Scanned Product", "OptiSlicer cut portion"],
      outputBindings: ["Scanned Product", "Cut Portion"],
    },
    {
      activity: "OptiSlicer cut portion",
      occurences: 35963,
      inputBindings: ["Cut Portion", "OptiSlicer cut portion"],
      outputBindings: ["Scanned Product", "OptiSlicer made idle Cut", "OptiSlicer cut portion"],
    },
    {
      activity: "OptiSlicer made idle Cut",
      occurences: 9,
      inputBindings: ["OptiSlicer made idle Cut", "OptiSlicer cut portion"],
      outputBindings: ["Cut Portion", "Scanned Product", "OptiSlicer made idle Cut"],
    },
  ],
  edges: [
    { sourceNode: "OptiSlicer made idle Cut", targetNode: "Scanned Product", duration: 6.7355, dfgValue: 2, dependencyValue: 0.25 },
    {
      sourceNode: "Scanned Product",
      targetNode: "Cut Portion",
      duration: 4.428695791,
      dfgValue: 694,
      dependencyValue: 0.01239067055393586,
    },
    { sourceNode: "Cut Portion", targetNode: "Cut Portion", duration: 2.272289693, dfgValue: 6935, dependencyValue: 0.9998558246828143 },
    {
      sourceNode: "Scanned Product",
      targetNode: "Scanned Product",
      duration: 39.414535708,
      dfgValue: 28,
      dependencyValue: 0.9655172413793104,
    },
    {
      sourceNode: "OptiSlicer cut portion",
      targetNode: "OptiSlicer made idle Cut",
      duration: 16.7164,
      dfgValue: 5,
      dependencyValue: 0.375,
    },
    {
      sourceNode: "OptiSlicer cut portion",
      targetNode: "OptiSlicer cut portion",
      duration: 3.052861999,
      dfgValue: 8970,
      dependencyValue: 0.9998885297068332,
    },
    { sourceNode: "OptiSlicer made idle Cut", targetNode: "OptiSlicer made idle Cut", duration: 0.201, dfgValue: 1, dependencyValue: 0.5 },
    {
      sourceNode: "Cut Portion",
      targetNode: "OptiSlicer cut portion",
      duration: 0.692387602,
      dfgValue: 26306,
      dependencyValue: 2.2813254500865003e-4,
    },
    {
      sourceNode: "OptiSlicer cut portion",
      targetNode: "Scanned Product",
      duration: 7.92214226,
      dfgValue: 681,
      dependencyValue: 0.0022058823529411764,
    },
    {
      sourceNode: "OptiSlicer made idle Cut",
      targetNode: "Cut Portion",
      duration: 33.500749999,
      dfgValue: 4,
      dependencyValue: 0.2857142857142857,
    },
  ],
  sourceNodes: ["Scanned Product", "OptiSlicer cut portion"],
  sinkNodes: ["Cut Portion", "OptiSlicer cut portion"],
};

export const heuristicNet4: HeuristicNet = {
  processedEvents: 60935,
  objectView: "item",
  nodes: [
    {
      activity: "send package",
      occurences: 7659,
      inputBindings: ["pick item", "create package"],
      outputBindings: ["failed delivery", "package delivered"],
    },
    {
      activity: "package delivered",
      occurences: 7659,
      inputBindings: ["failed delivery", "send package"],
      outputBindings: ["payment reminder", "pay order"],
    },
    {
      activity: "payment reminder",
      occurences: 2214,
      inputBindings: ["package delivered", "payment reminder", "confirm order", "reorder item"],
      outputBindings: ["payment reminder", "pay order", "create package"],
    },
    {
      activity: "failed delivery",
      occurences: 2020,
      inputBindings: ["failed delivery", "confirm order", "send package"],
      outputBindings: ["failed delivery", "package delivered"],
    },
    { activity: "item out of stock", occurences: 1544, inputBindings: ["place order"], outputBindings: ["reorder item"] },
    {
      activity: "pay order",
      occurences: 7659,
      inputBindings: ["confirm order", "package delivered", "payment reminder"],
      outputBindings: ["create package"],
    },
    {
      activity: "reorder item",
      occurences: 1544,
      inputBindings: ["item out of stock"],
      outputBindings: ["create package", "pick item", "payment reminder"],
    },
    {
      activity: "place order",
      occurences: 7659,
      inputBindings: [],
      outputBindings: ["create package", "item out of stock", "pick item", "confirm order"],
    },
    {
      activity: "confirm order",
      occurences: 7659,
      inputBindings: ["place order"],
      outputBindings: ["pay order", "failed delivery", "payment reminder", "create package"],
    },
    {
      activity: "pick item",
      occurences: 7659,
      inputBindings: ["place order", "reorder item"],
      outputBindings: ["create package", "send package"],
    },
    {
      activity: "create package",
      occurences: 7659,
      inputBindings: ["pick item", "place order", "reorder item", "confirm order", "payment reminder", "pay order"],
      outputBindings: ["send package"],
    },
  ],
  edges: [
    {
      sourceNode: "confirm order",
      targetNode: "pay order",
      duration: 178087.786500025,
      dfgValue: 1363,
      dependencyValue: 0.999266862170088,
    },
    { sourceNode: "place order", targetNode: "pick item", duration: 74373.035508644, dfgValue: 1915, dependencyValue: 0.9994780793319415 },
    { sourceNode: "reorder item", targetNode: "pick item", duration: 564359.011507274, dfgValue: 869, dependencyValue: 0.9988505747126437 },
    { sourceNode: "pick item", targetNode: "send package", duration: 61484.438596476, dfgValue: 57, dependencyValue: 0.9827586206896551 },
    {
      sourceNode: "confirm order",
      targetNode: "failed delivery",
      duration: 48712.681818178,
      dfgValue: 22,
      dependencyValue: 0.6666666666666666,
    },
    {
      sourceNode: "send package",
      targetNode: "package delivered",
      duration: 66214.534559942,
      dfgValue: 5917,
      dependencyValue: 0.9998310239945928,
    },
    {
      sourceNode: "package delivered",
      targetNode: "pay order",
      duration: 443165.914909593,
      dfgValue: 2562,
      dependencyValue: 0.770293609671848,
    },
    {
      sourceNode: "payment reminder",
      targetNode: "pay order",
      duration: 491906.504493292,
      dfgValue: 1669,
      dependencyValue: 0.9994011976047904,
    },
    {
      sourceNode: "place order",
      targetNode: "confirm order",
      duration: 75186.259364111,
      dfgValue: 5232,
      dependencyValue: 0.9998089050257978,
    },
    { sourceNode: "confirm order", targetNode: "payment reminder", duration: 1728000.0, dfgValue: 30, dependencyValue: 0.967741935483871 },
    {
      sourceNode: "pay order",
      targetNode: "create package",
      duration: 175096.642856882,
      dfgValue: 1064,
      dependencyValue: 0.5923709798055348,
    },
    {
      sourceNode: "reorder item",
      targetNode: "payment reminder",
      duration: 1299189.524590152,
      dfgValue: 61,
      dependencyValue: 0.9838709677419355,
    },
    {
      sourceNode: "send package",
      targetNode: "failed delivery",
      duration: 56417.737794958,
      dfgValue: 1270,
      dependencyValue: 0.999213217938631,
    },
    {
      sourceNode: "confirm order",
      targetNode: "create package",
      duration: 153398.335725368,
      dfgValue: 1254,
      dependencyValue: 0.7068027210884353,
    },
    {
      sourceNode: "place order",
      targetNode: "create package",
      duration: 63561.235294113,
      dfgValue: 17,
      dependencyValue: 0.9444444444444444,
    },
    {
      sourceNode: "reorder item",
      targetNode: "create package",
      duration: 442783.999999999,
      dfgValue: 10,
      dependencyValue: 0.9090909090909091,
    },
    {
      sourceNode: "create package",
      targetNode: "send package",
      duration: 67513.97140668,
      dfgValue: 7100,
      dependencyValue: 0.9998591747641177,
    },
    {
      sourceNode: "payment reminder",
      targetNode: "create package",
      duration: 276860.041666661,
      dfgValue: 24,
      dependencyValue: 0.5806451612903226,
    },
    {
      sourceNode: "payment reminder",
      targetNode: "payment reminder",
      duration: 1728000.0,
      dfgValue: 468,
      dependencyValue: 0.997867803837953,
    },
    {
      sourceNode: "package delivered",
      targetNode: "payment reminder",
      duration: 1204993.00062225,
      dfgValue: 1606,
      dependencyValue: 0.9968924798011187,
    },
    {
      sourceNode: "item out of stock",
      targetNode: "reorder item",
      duration: 142587.794990445,
      dfgValue: 1078,
      dependencyValue: 0.9990732159406858,
    },
    {
      sourceNode: "failed delivery",
      targetNode: "package delivered",
      duration: 61091.951478062,
      dfgValue: 1319,
      dependencyValue: 0.9992424242424243,
    },
    {
      sourceNode: "pick item",
      targetNode: "create package",
      duration: 179085.129110217,
      dfgValue: 5290,
      dependencyValue: 0.9751726712712339,
    },
    {
      sourceNode: "failed delivery",
      targetNode: "failed delivery",
      duration: 67886.181523349,
      dfgValue: 617,
      dependencyValue: 0.9983818770226537,
    },
    {
      sourceNode: "place order",
      targetNode: "item out of stock",
      duration: 72008.88484836,
      dfgValue: 495,
      dependencyValue: 0.9979838709677419,
    },
  ],
  sourceNodes: ["place order"],
  sinkNodes: ["package delivered", "pay order"],
};

export const heuristicNet1: HeuristicNet = {
  processedEvents: 60935,
  objectView: "item",
  nodes: [
    {
      activity: "send package",
      occurences: 7659,
      inputBindings: ["pick item", "create package"],
      outputBindings: ["failed delivery", "package delivered"],
    },
    {
      activity: "package delivered",
      occurences: 7659,
      inputBindings: ["failed delivery", "send package"],
      outputBindings: ["payment reminder", "pay order"],
    },
    {
      activity: "payment reminder",
      occurences: 2214,
      inputBindings: ["package delivered", "payment reminder", "confirm order", "reorder item"],
      outputBindings: ["payment reminder", "pay order", "create package"],
    },
    {
      activity: "failed delivery",
      occurences: 2020,
      inputBindings: ["failed delivery", "confirm order", "send package"],
      outputBindings: ["failed delivery", "package delivered"],
    },
    {
      activity: "item out of stock",
      occurences: 1544,
      inputBindings: ["place order"],
      outputBindings: ["reorder item"],
    },
    {
      activity: "pay order",
      occurences: 7659,
      inputBindings: ["confirm order", "package delivered", "payment reminder"],
      outputBindings: ["create package"],
    },
    {
      activity: "reorder item",
      occurences: 1544,
      inputBindings: ["item out of stock"],
      outputBindings: ["create package", "pick item", "payment reminder"],
    },
    {
      activity: "place order",
      occurences: 7659,
      inputBindings: [],
      outputBindings: ["create package", "item out of stock", "pick item", "confirm order"],
    },
    {
      activity: "confirm order",
      occurences: 7659,
      inputBindings: ["place order"],
      outputBindings: ["pay order", "failed delivery", "payment reminder", "create package"],
    },
    {
      activity: "pick item",
      occurences: 7659,
      inputBindings: ["place order", "reorder item"],
      outputBindings: ["create package", "send package"],
    },
    {
      activity: "create package",
      occurences: 7659,
      inputBindings: ["pick item", "place order", "reorder item", "confirm order", "payment reminder", "pay order"],
      outputBindings: ["send package"],
    },
  ],
  edges: [
    {
      sourceNode: "confirm order",
      targetNode: "pay order",
      duration: 178087.786500025,
      dfgValue: 1363,
      dependencyValue: 0.999266862170088,
    },
    {
      sourceNode: "place order",
      targetNode: "pick item",
      duration: 74373.035508644,
      dfgValue: 1915,
      dependencyValue: 0.9994780793319415,
    },
    {
      sourceNode: "reorder item",
      targetNode: "pick item",
      duration: 564359.011507274,
      dfgValue: 869,
      dependencyValue: 0.9988505747126437,
    },
    {
      sourceNode: "pick item",
      targetNode: "send package",
      duration: 61484.438596476,
      dfgValue: 57,
      dependencyValue: 0.9827586206896551,
    },
    {
      sourceNode: "confirm order",
      targetNode: "failed delivery",
      duration: 48712.681818178,
      dfgValue: 22,
      dependencyValue: 0.6666666666666666,
    },
    {
      sourceNode: "send package",
      targetNode: "package delivered",
      duration: 66214.534559942,
      dfgValue: 5917,
      dependencyValue: 0.9998310239945928,
    },
    {
      sourceNode: "package delivered",
      targetNode: "pay order",
      duration: 443165.914909593,
      dfgValue: 2562,
      dependencyValue: 0.770293609671848,
    },
    {
      sourceNode: "payment reminder",
      targetNode: "pay order",
      duration: 491906.504493292,
      dfgValue: 1669,
      dependencyValue: 0.9994011976047904,
    },
    {
      sourceNode: "place order",
      targetNode: "confirm order",
      duration: 75186.259364111,
      dfgValue: 5232,
      dependencyValue: 0.9998089050257978,
    },
    {
      sourceNode: "confirm order",
      targetNode: "payment reminder",
      duration: 1728000.0,
      dfgValue: 30,
      dependencyValue: 0.967741935483871,
    },
    {
      sourceNode: "pay order",
      targetNode: "create package",
      duration: 175096.642856882,
      dfgValue: 1064,
      dependencyValue: 0.5923709798055348,
    },
    {
      sourceNode: "reorder item",
      targetNode: "payment reminder",
      duration: 1299189.524590152,
      dfgValue: 61,
      dependencyValue: 0.9838709677419355,
    },
    {
      sourceNode: "send package",
      targetNode: "failed delivery",
      duration: 56417.737794958,
      dfgValue: 1270,
      dependencyValue: 0.999213217938631,
    },
    {
      sourceNode: "confirm order",
      targetNode: "create package",
      duration: 153398.335725368,
      dfgValue: 1254,
      dependencyValue: 0.7068027210884353,
    },
    {
      sourceNode: "place order",
      targetNode: "create package",
      duration: 63561.235294113,
      dfgValue: 17,
      dependencyValue: 0.9444444444444444,
    },
    {
      sourceNode: "reorder item",
      targetNode: "create package",
      duration: 442783.999999999,
      dfgValue: 10,
      dependencyValue: 0.9090909090909091,
    },
    {
      sourceNode: "create package",
      targetNode: "send package",
      duration: 67513.97140668,
      dfgValue: 7100,
      dependencyValue: 0.9998591747641177,
    },
    {
      sourceNode: "payment reminder",
      targetNode: "create package",
      duration: 276860.041666661,
      dfgValue: 24,
      dependencyValue: 0.5806451612903226,
    },
    {
      sourceNode: "payment reminder",
      targetNode: "payment reminder",
      duration: 1728000.0,
      dfgValue: 468,
      dependencyValue: 0.997867803837953,
    },
    {
      sourceNode: "package delivered",
      targetNode: "payment reminder",
      duration: 1204993.00062225,
      dfgValue: 1606,
      dependencyValue: 0.9968924798011187,
    },
    {
      sourceNode: "item out of stock",
      targetNode: "reorder item",
      duration: 142587.794990445,
      dfgValue: 1078,
      dependencyValue: 0.9990732159406858,
    },
    {
      sourceNode: "failed delivery",
      targetNode: "package delivered",
      duration: 61091.951478062,
      dfgValue: 1319,
      dependencyValue: 0.9992424242424243,
    },
    {
      sourceNode: "pick item",
      targetNode: "create package",
      duration: 179085.129110217,
      dfgValue: 5290,
      dependencyValue: 0.9751726712712339,
    },
    {
      sourceNode: "failed delivery",
      targetNode: "failed delivery",
      duration: 67886.181523349,
      dfgValue: 617,
      dependencyValue: 0.9983818770226537,
    },
    {
      sourceNode: "place order",
      targetNode: "item out of stock",
      duration: 72008.88484836,
      dfgValue: 495,
      dependencyValue: 0.9979838709677419,
    },
  ],
  sourceNodes: ["place order"],
  sinkNodes: ["package delivered", "pay order"],
};

export const heuristicNet2: HeuristicNet = {
  processedEvents: 60935,
  objectView: "item",
  nodes: [
    {
      activity: "send package",
      occurences: 7659,
      inputBindings: [],
      outputBindings: ["hello"],
    },
  ],
  edges: [],
  sourceNodes: ["place order"],
  sinkNodes: ["package delivered", "pay order"],
};
