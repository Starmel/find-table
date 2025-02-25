/* eslint-disable prettier/prettier */

/**
 * Здесь описываются входные и выходные переменные
 * При заполнении формы в браузере в поля value
 * у входных переменных записываются значения из формы
 */
export default {
    // входные переменные
    inputs: [{
            name: "Высота",
            value: 50,
            fuzzyAreas: [{
                    name: "Столешница очень низко",
                    ranges: [0, 7, 15],
                },
                {
                    name: "Ниже стула",
                    ranges: [12, 20, 35],
                },
                {
                    name: "Как стул",
                    ranges: [20, 30, 50, 80],
                },
                {
                    name: "Как стол",
                    ranges: [70, 80, 90, 130],
                },
                {
                    name: "С рост человека и выше",
                    ranges: [120, 160, 200],
                }
            ]
        },
        {
            name: "Ширина",
            value: 50,
            fuzzyAreas: [{
                    name: "Поместится телефон боком",
                    ranges: [0, 8, 28],
                },
                {
                    name: "Поместится раскрытая тетрадь",
                    ranges: [25, 38, 55],
                },
                {
                    name: "Поместится 2 раскрытые тетради",
                    ranges: [40, 60, 75, 120],
                },
                {
                    name: "Можно растянуть руки в разные стороны",
                    ranges: [100, 130, 160, 200],
                }
            ]
        },
        {
            name: "Материал",
            value: 50,
            fuzzyAreas: [{
                    name: "Палки и листья",
                    ranges: [0, 3, 8],
                },
                {
                    name: "Картон",
                    ranges: [5, 10, 25],
                },
                {
                    name: "Фанера",
                    ranges: [18, 45, 60],
                },
                {
                    name: "Дерево/дсп",
                    ranges: [50, 55, 75, 85],
                },
                {
                    name: "Камень",
                    ranges: [80, 95, 100, 100],
                }
            ]
        },
        {
            name: "Место для протягивания ног",
            value: 50,
            fuzzyAreas: [{
                    name: "Для детской ступни",
                    ranges: [0, 12, 15, 23],
                },
                {
                    name: "Для большой ступни",
                    ranges: [20, 28, 35],
                },
                {
                    name: "Норм, если согнуть ноги в коленях",
                    ranges: [30, 40, 50, 65],
                },
                {
                    name: "Можно расправить ноги среднего роста человеку",
                    ranges: [60, 85, 100],
                },
                {
                    name: "Можно расправить ноги высокого роста человеку",
                    ranges: [90, 110, 150, 150],
                }
            ]
        }
    ],
    // выходная переменная
    outputs: [{
        name: "Стоит ли сидеть за столом",
        fuzzyAreas: [{
                name: "Это не похоже на стол",
                ranges: [0, 5, 10],
            },
            {
                name: "Лучше не садиться, но если очень хочется...",
                ranges: [7, 14, 23],
            },
            {
                name: "Для аккуратного ребенка",
                ranges: [18, 28, 35],
            },
            {
                name: "Для подростка",
                ranges: [30, 40, 50, 60],
            },
            {
                name: "Для взрослого",
                ranges: [53, 65, 80, 85],
            },
            {
                name: "Для компании друзей",
                ranges: [78, 92, 100, 100],
            }
        ]
    }]
};