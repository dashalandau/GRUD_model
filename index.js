class DB {
  constructor() {
    this.db = new Map();
  }

  create(user) {
    const id = generateRandomNumber();

    if (
      typeof user.name === "string" &&
      typeof user.age === "number" &&
      typeof user.city === "string" &&
      typeof user.salary === "number"
    ) {
      this.db.set(id, { ...user, id: id });
    } else {
      throw new Error("Ключ обьекта не соответствует типу");
    }

    return id;
  }

  read(id) {
    if (typeof id !== "string" || arguments.length === 0) {
      throw new Error("Нет аргумента или аргумент не является строкой");
    }

    return this.db.has(id) ? this.db.get(id) : null;
  }

  readAll() {
    console.log(Array.from(this.db.values()));
  }

  update(id, data) {
    if (typeof id !== "string" || !this.db.has(id)) {
      throw new Error(`Invalid param: ${id}`);
    }

    data = Object.assign(this.db.get(id), data);
  }

  delete(id) {
    console.log(this.db.delete(id));
  }
}

function generateRandomNumber() {
  return Math.random().toString(36).substr(2, 5);
}

const person = {
  name: "Avrora", // обязательное поле с типом string
  age: 21, // обязательное поле с типом number
  city: "Kyiv", // обязательное поле с типом string
  salary: 500, // обязательное поле с типом number
};

const db = new DB();

const id = db.create(person);
const client = db.read(id);

db.update(id, { age: 22 }); // id
db.readAll(); // массив пользователей
db.delete(id); // true
