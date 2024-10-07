type ConvertPart<S extends string> = S extends `${infer Begin}_${infer End}`
    ? `${Begin}${Capitalize<ConvertPart<End>>}`
    : S;

export type Camelize<T> = T extends object
    ? {
        [K in keyof T as ConvertPart<K & string>]: Camelize<T[K]>
    }
    : T;

// Примеры Camelize
interface SnakeCaseModel {
    test_name_1: string;
    test_name_2: {
        test_name_3: string;
    };
}

type CamelCaseModel = Camelize<SnakeCaseModel>;

const test: CamelCaseModel = {
    testName1: "fruit",
    testName2: {
        testName3: "someth",
    }
};



type DeepPick<T, Paths extends string> = Paths extends `${infer Begin}.${infer Rest}`
    ? Begin extends keyof T
        ? { [K in Begin]: DeepPick<T[Begin], Rest> }
        : never
    : Paths extends keyof T
        ? { [K in Paths]: T[K] }
        : never;

// Примеры DeepPick
interface Test {
    test: {
        test_1: string;
        test_2: {
            test_3: string;
        };
    };
}

const my_test: DeepPick<Test, 'test.test_2.test_3'> = {
    test: {
        test_2: {
            test_3: "test",
        }
    }
};