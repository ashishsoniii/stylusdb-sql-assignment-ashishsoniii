const readCSV = require("../../src/csvReader");
const {parseQuery} = require("../../src/queryParser");

test("Read CSV File", async () => {
  const data = await readCSV("./student.csv");
  expect(data.length).toBeGreaterThan(0);
  expect(data.length).toBe(4);
  expect(data[0].name).toBe("John");
  expect(data[0].age).toBe("30"); //ignore the string type here, we will fix this later
});

test("Parse SQL Query", () => {
  const query = "SELECT id, name FROM student";
  const parsed = parseQuery(query);
  expect(parsed).toEqual({
    fields: ["id", "name"],
    table: "student",
    whereClauses: [],
    "joinCondition": null,
    joinTable: null,
    joinType:null

  });
});

test('Parse SQL Query with WHERE clause', () => {
    const query = 'SELECT id, name FROM student WHERE age = 30';
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'student',
        joinCondition: null,
        joinTable: null,
        joinType: null,
        whereClauses: [{"field" : "age"
        ,"operator" : "="
        ,"value" : "30"}]
    });
});

test('Parse Invalid SQL Query -No FROM - Throw Error', () => {
    const invalidQuery = 'SELECT id name student';
    expect(() => parseQuery(invalidQuery)).toThrow('Invalid SELECT format');
});

test('Parse Invalid SQL Query  - Throw Error', () => {
    const invalidQuery = 'id name FROM student';
    expect(() => parseQuery(invalidQuery)).toThrow('Invalid SELECT format');
});
