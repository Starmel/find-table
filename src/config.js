const fuzzyAreas = {
  types: {
    triangle: {
      name: "Triangle",
      ranges: [0, 0, 0],
      value: (rangesParam, valueParam) => {
        const ranges = rangesParam.map(range => parseInt(range, 10));
        const value = parseInt(valueParam, 10);
        if (value < ranges[0] || value > ranges[2]) return 0;
        if (value < ranges[1])
          return (value - ranges[0]) / (ranges[1] - ranges[0]);
        return (ranges[2] - value) / (ranges[2] - ranges[1]);
      }
    },
    trapezoid: {
      name: "Trapezoid",
      ranges: [0, 0, 0, 0],
      value: (rangesParam, valueParam) => {
        const ranges = rangesParam.map(range => parseInt(range, 10));
        const value = parseInt(valueParam, 10);
        if (value < ranges[0] || value > ranges[3]) return 0;
        if (value < ranges[1])
          return (value - ranges[0]) / (ranges[1] - ranges[0]);
        else if (value < ranges[2]) return 1;
        return (ranges[3] - value) / (ranges[3] - ranges[2]);
      }
    }
  }
};

// const rules = {
//   data: [],
//   newRule: {
//     name: "name",
//     type: "AND",
//     fuzzyAreas: {
//       inputs: [],
//       output: {
//         value: 0
//       }
//     }
//   }
// };

const exampleVariables = {
  inputs: [
    {
      name: "Temperature",
      start: -20,
      end: 40,
      fuzzyAreasCount: 4,
      example: 22,
      fuzzyAreas: [
        {
          name: "Freezing",
          type: {
            name: "Triangle",
            ranges: [-20, -10, 0],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Breeze",
          type: {
            name: "Triangle",
            ranges: [-5, 5, 23],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Warm",
          type: {
            name: "Trapezoid",
            ranges: [10, 15, 20, 25],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Hot",
          type: {
            name: "Triangle",
            ranges: [20, 30, 40],
            value: fuzzyAreas.types.triangle.value
          }
        }
      ]
    },
    {
      name: "Humidity",
      start: 0,
      end: 100,
      fuzzyAreasCount: 4,
      example: 45,
      fuzzyAreas: [
        {
          name: "Only air",
          type: {
            name: "Triangle",
            ranges: [0, 25, 35],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Airy",
          type: {
            name: "Triangle",
            ranges: [20, 35, 55],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Comfort",
          type: {
            name: "Trapezoid",
            ranges: [20, 60, 70, 75],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Humid",
          type: {
            name: "Triangle",
            ranges: [40, 90, 100],
            value: fuzzyAreas.types.triangle.value
          }
        }
      ]
    }
  ],
  outputs: [
    {
      name: "Watering",
      start: 0,
      end: 100,
      fuzzyAreasCount: 4,
      fuzzyAreas: [
        {
          name: "No watering",
          type: {
            name: "Triangle",
            ranges: [0, 50, 60],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Sprinkle",
          type: {
            name: "Triangle",
            ranges: [30, 70, 80],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Tiny watering",
          type: {
            name: "Trapezoid",
            ranges: [30, 40, 70, 80],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Huge watering",
          type: {
            name: "Triangle",
            ranges: [50, 90, 100],
            value: fuzzyAreas.types.triangle.value
          }
        }
      ]
    }
  ]
};

const rules0 = [
  [0, 1, 0, 0, 3],
  [1, 2, 0, 0, 0]
];

const rules = {
  data: []
};

function checkValue(rule) {
  const compareFunction = rule.type === "AND" ? Math.min : Math.max;
  const inputs = rule.fuzzyAreas.inputs;
  const data = [];
  inputs.forEach((element, index) => {
    const example = exampleVariables.inputs[index].example;
    data.push(element.type.value(element.type.ranges, example));
  });
  const result = data.reduce((next, prev) => compareFunction(next, prev));
  return result;
}

for (let i = 0; i < rules0.length; i++) {
  const rule = {
    name: i,
    type: "AND",
    fuzzyAreas: {
      inputs: [
        exampleVariables.inputs[0].fuzzyAreas[rules0[i][0]],
        exampleVariables.inputs[1].fuzzyAreas[rules0[i][1]]
        // exampleVariables.inputs[2].fuzzyAreas[rules0[i][2]],
        // exampleVariables.inputs[3].fuzzyAreas[rules0[i][3]]
      ],
      output: exampleVariables.outputs[0].fuzzyAreas[rules0[i][4]]
    }
    // result: checkValue(this.rules.newRule)
  };
  const result = checkValue(rule);
  rule.result = result;
  console.log("rule", rule);
  rules.data.push(rule);
}

console.log("rules", rules);

// const rules = {
//     data: [{
//         name: "0",
//         type: "AND",
//         fuzzyAreas: {
//             inputs: [
//                 { name: "Breeze", type: { name: "Triangle", ranges: [-5, 5, 23] } },
//                 { name: "Airy", type: { name: "Triangle", ranges: [20, 35, 55] } }
//             ],
//             output: {
//                 name: "Tiny watering",
//                 type: { name: "Trapezoid", ranges: [30, 40, 70, 80] }
//             }
//         },
//         result: 0.5
//     }]
// };

const config = {
  variables: exampleVariables,
  fuzzyAreas,
  rules,
  chartData: {
    labels: [0, 30, 50],
    datasets: [
      {
        label: "MF",
        backgroundColor: "#f87979",
        data: [1, 0.5, 0.2]
      }
    ]
  }
};

export default config;
