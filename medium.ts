export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
};

// Пример DeepPartial
interface Dog {
    name: string;
    color: string;
    age: number;
    owner: {
        name: string;
        phone: string;
    };
}

const partialDog: DeepPartial<Dog> = {
    name: "Bonya",
    owner: {
        name: "Anzhelika"
    }
};



export type MyCapitalize<T extends string> = T extends `${infer F}${infer R}`
    ? `${Uppercase<F>}${R}` : T;

// Пример MyCapitalize
type CapitalizedWord = MyCapitalize<'world'>;

const world: CapitalizedWord = 'World'; // с маленькой буквы не получится
console.log(world)


export type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

// Пример DeepMutable
interface ReadonlyDog {
    readonly name: string;
    readonly color: string;
    readonly age: number;
    readonly owner: {
        readonly name: string;
        readonly phone: string;
    };
}

type MutableDog = DeepMutable<ReadonlyDog>;

const mutableDog: MutableDog = {
    name: "Bonya",
    color: "black",
    age: 5,
    owner: {
        name: "Anzhelika",
        phone: "0123456789",
    }
};

mutableDog.name = "Jack";
mutableDog.owner.phone = "456798765";



type ParseURLParams<StringElem extends string> =
    StringElem extends `${infer Prefix}/:${infer Param}/${infer RestWord}`
        ? Param | ParseURLParams<`/${RestWord}`>
        : (StringElem extends `${infer Prefix}/:${infer Param}`
            ? Param
            : never);

// Пример ParseURLParams
type URLParams = ParseURLParams<'posts/:id/:user'>;

const param1: URLParams = 'id';
const param2: URLParams = 'user';