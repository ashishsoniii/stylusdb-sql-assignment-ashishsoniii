const readCSV = require("../../src/csvReader");
const parseQuery = require("../../src/queryParser");

test("Read CSV File", async () => {
  const data = await readCSV("./sample.csv");
  expect(data.length).toBeGreaterThan(0);
  expect(data.length).toBe(3);
  expect(data[0].name).toBe("John");
  expect(data[0].age).toBe("30"); //ignore the string type here, we will fix this later
});

test("Parse SQL Query", () => {
  const query = "SELECT id, name FROM sample";
  const parsed = parseQuery(query);
  expect(parsed).toEqual({
    fields: ["id", "name"],
    table: "sample",
    whereClauses: [],
  });
});

test('Parse SQL Query with WHERE clause', () => {
    const query = 'SELECT id, name FROM sample WHERE age = 30';
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'sample',
        whereClauses: [{"field" : "age"
        ,"operator" : "="
        ,"value" : "30"}]
    });
});

test('Parse Invalid SQL Query -No FROM - Throw Error', () => {
    const invalidQuery = 'SELECT id name sample';
    expect(() => parseQuery(invalidQuery)).toThrow('Invalid query format');
});

test('Parse Invalid SQL Query  - Throw Error', () => {
    const invalidQuery = 'id name FROM sample';
    expect(() => parseQuery(invalidQuery)).toThrow('Invalid query format');
});
