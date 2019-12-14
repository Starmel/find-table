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

const exampleVariables = {
  inputs: [
    {
      name: "Высота",
      example: 50,
      fuzzyAreas: [
        {
          name: "Столешница очень низко",
          type: {
            name: "Triangle",
            ranges: [-1, 7, 15],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Ниже стула",
          type: {
            name: "Triangle",
            ranges: [12, 20, 35],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Как стул",
          type: {
            name: "Trapezoid",
            ranges: [20, 30, 50, 80],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Как стол",
          type: {
            name: "Trapezoid",
            ranges: [70, 80, 90, 130],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "С рост человека и выше",
          type: {
            name: "Triangle",
            ranges: [120, 160, 201],
            value: fuzzyAreas.types.triangle.value
          }
        }
      ]
    },
    {
      name: "Ширина",
      example: 50,
      fuzzyAreas: [
        {
          name: "Поместится телефон боком",
          type: {
            name: "Triangle",
            ranges: [-1, 8, 28],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Поместится раскрытая тетрадь",
          type: {
            name: "Triangle",
            ranges: [25, 38, 55],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Поместится 2 раскрытые тетради",
          type: {
            name: "Trapezoid",
            ranges: [40, 60, 75, 120],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Можно растянуть руки в разные стороны",
          type: {
            name: "Trapezoid",
            ranges: [100, 130, 160, 201],
            value: fuzzyAreas.types.trapezoid.value
          }
        }
      ]
    },
    {
      name: "Материал",
      example: 50,
      fuzzyAreas: [
        {
          name: "Палки и листья",
          type: {
            name: "Triangle",
            ranges: [-1, 3, 8],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Картон",
          type: {
            name: "Triangle",
            ranges: [5, 10, 25],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Фанера",
          type: {
            name: "Triangle",
            ranges: [18, 45, 60],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Дерево/дсп",
          type: {
            name: "Trapezoid",
            ranges: [50, 55, 75, 85],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Камень",
          type: {
            name: "Triangle",
            ranges: [80, 95, 101],
            value: fuzzyAreas.types.triangle.value
          }
        }
      ]
    },
    {
      name: "Место для протягивания ног",
      example: 50,
      fuzzyAreas: [
        {
          name: "Для детской ступни",
          type: {
            name: "Trapezoid",
            ranges: [-1, 12, 15, 23],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Для большой ступни",
          type: {
            name: "Triangle",
            ranges: [20, 28, 35],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Норм, если согнуть ноги в коленях",
          type: {
            name: "Trapezoid",
            ranges: [30, 40, 50, 65],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Можно расправить ноги среднего роста человеку",
          type: {
            name: "Triangle",
            ranges: [60, 85, 100],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Можно расправить ноги высокого роста человеку",
          type: {
            name: "Triangle",
            ranges: [90, 110, 151],
            value: fuzzyAreas.types.triangle.value
          }
        }
      ]
    }
  ],
  outputs: [
    {
      name: "Стоит ли сидеть за столом",
      fuzzyAreas: [
        {
          name: "Это не похоже на стол",
          type: {
            name: "Triangle",
            ranges: [-1, 5, 10],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Лучше не садиться, но если очень хочется...",
          type: {
            name: "Triangle",
            ranges: [7, 14, 23],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Для аккуратного ребенка",
          type: {
            name: "Triangle",
            ranges: [18, 28, 35],
            value: fuzzyAreas.types.triangle.value
          }
        },
        {
          name: "Для подростка",
          type: {
            name: "Trapezoid",
            ranges: [30, 40, 50, 60],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Для взрослого",
          type: {
            name: "Trapezoid",
            ranges: [53, 65, 80, 85],
            value: fuzzyAreas.types.trapezoid.value
          }
        },
        {
          name: "Для компании друзей",
          type: {
            name: "Triangle",
            ranges: [78, 92, 101],
            value: fuzzyAreas.types.triangle.value
          }
        }
      ]
    }
  ]
};

const rules0 = [];

/**
 * Мне не хотелось задавать все эти правила вручную, но
 * оно выглядит очень даже реалистично!
 */
for (let i0 = 0; i0 < 5; i0++) {
  for (let i1 = 0; i1 < 4; i1++) {
    for (let i2 = 0; i2 < 5; i2++) {
      for (let i3 = 0; i3 < 5; i3++) {
        const mas = [i0, i1, i2, i3];
        // среднее арифметическое
        let result = mas.reduce((a, b) => a + b) / mas.length;
        // округлить значение
        result = Math.round(result);
        rules0.push([i0, i1, i2, i3, result]);
      }
    }
  }
}

console.log("Правила в виде массива", rules0);

/**
 * Добавляем правила в массив правил, по пути высчитывания
 * степень принадлежности (не знаю, как точно называется)
 */

const rules = {
  data: []
};

for (let i = 0; i < rules0.length; i++) {
  const rule = {
    name: i,
    type: "AND",
    fuzzyAreas: {
      inputs: [
        exampleVariables.inputs[0].fuzzyAreas[rules0[i][0]],
        exampleVariables.inputs[1].fuzzyAreas[rules0[i][1]],
        exampleVariables.inputs[2].fuzzyAreas[rules0[i][2]],
        exampleVariables.inputs[3].fuzzyAreas[rules0[i][3]]
      ],
      output: exampleVariables.outputs[0].fuzzyAreas[rules0[i][4]]
    }
  };
  rules.data.push(rule);
}

console.log("Правила в нормальном виде", rules);

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
