// src/features/psychologists/mockPsychologists.js

// НИКАКИХ import тут не нужно, чтобы не ловить ошибки с путями к картинкам

const psychologistsMock = [
  {
    id: "1",
    name: "Баходир Нормонов",
    age: 29,
    experienceYears: 5,
    pricePerHour: 1240000,
    verified: true,
    therapyType: "Индивидуальная",
    approach: "Гештальт-терапия",
    tags: [
      "Гештальт",
      "Индивидуально",
      "Групповая",
      "Психодрама",
      "Когнитивно-поведенческая",
    ],
    time: "Днём",
    language: "Русский",
    views: 1200,
  },
  {
    id: "2",
    name: "Елена Морозова",
    age: 34,
    experienceYears: 7,
    pricePerHour: 1500000,
    verified: true,
    therapyType: "Индивидуальная",
    approach: "КПТ",
    tags: ["Тревога", "Выгорание", "Отношения"],
    time: "Вечером",
    language: "Русский",
    views: 980,
  },
  {
    id: "3",
    name: "Сергей Иванов",
    age: 31,
    experienceYears: 3,
    pricePerHour: 1100000,
    verified: false,
    therapyType: "Групповая",
    approach: "Психодрама",
    tags: ["Самооценка", "Страхи"],
    time: "Любое",
    language: "Узбекский",
    views: 600,
  },
  {
    id: "4",
    name: "Анна Петрова",
    age: 27,
    experienceYears: 2,
    pricePerHour: null, // чтобы проверить "По запросу"
    verified: false,
    therapyType: "Индивидуальная",
    approach: "КПТ",
    tags: ["Панические атаки"],
    time: "Днём",
    language: "Английский",
    views: 450,
  },
];

export default psychologistsMock;
