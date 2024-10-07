export type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// Пример MyPick
interface Dog {
    name: string;
    color: string;
}

//Берем только имя
type MyDog = MyPick<Dog, 'name'>;

// Можем добавить только имя
const myDog: MyDog = {
    name: 'Bonya',
};
console.log(myDog)



export type NOfArray<ArrayObj extends any[], N extends number> =
    N extends keyof ArrayObj ? ArrayObj[N] : never;

// Пример NOfArray
type MyArray = [string, boolean, number];

// Определим тип второго элемента
type secondElemType = NOfArray<MyArray, 2>;

const secondElem: secondElemType = 42;
console.log(secondElem)



export type Unshift<ArrayType extends any[], Elem> = [Elem, ...ArrayType];

// Пример Unshift
type array = [number, string];

// Добавим элемент типа string в начало
type NewArray = Unshift<array, string>;

const newArray: NewArray = ["Wow", 20, "Hello World"];
console.log(newArray)



export type MyExclude<T, U> = T extends U ? never : T;

// Пример MyExclude
type Start = 1 | 2 | 3 | 4 | 5;

// Исключаем 1 и 3
type Exclude = MyExclude<Start, 1 | 3>;

const test: Exclude = 2; // не может быть 1 и 3
console.log(test)