export type EventParamType = 'string' | 'number' | 'boolean';

type StringEventParamDefinition = {
  readonly type: 'string';
  readonly required: boolean;
  readonly enum?: readonly string[];
};

type NumberEventParamDefinition = {
  readonly type: 'number';
  readonly required: boolean;
  readonly enum?: readonly number[];
};

type BooleanEventParamDefinition = {
  readonly type: 'boolean';
  readonly required: boolean;
  readonly enum?: readonly boolean[];
};

type EventParamDefinition =
  | StringEventParamDefinition
  | NumberEventParamDefinition
  | BooleanEventParamDefinition;

type EventParamDefinitions = Readonly<Record<string, EventParamDefinition>>;

export type EventDefinitions = readonly {
  readonly name: string;
  readonly params: EventParamDefinitions;
}[];

type EventParamValue<TParam extends EventParamDefinition> = TParam extends {
  readonly enum: readonly (infer Value)[];
}
  ? Value
  : TParam['type'] extends 'string'
    ? string
    : TParam['type'] extends 'number'
      ? number
      : boolean;

type RequiredParamKeys<TParams extends EventParamDefinitions> = {
  [Key in keyof TParams]-?: TParams[Key] extends { readonly required: true }
    ? Key
    : never;
}[keyof TParams];

type OptionalParamKeys<TParams extends EventParamDefinitions> = Exclude<
  keyof TParams,
  RequiredParamKeys<TParams>
>;

type EmptyEventParams = Record<never, never>;

export type EventParamsFromSchema<TParams extends EventParamDefinitions> = [
  keyof TParams,
] extends [never]
  ? EmptyEventParams
  : {
      [Key in RequiredParamKeys<TParams>]: EventParamValue<TParams[Key]>;
    } & {
      [Key in OptionalParamKeys<TParams>]?: EventParamValue<TParams[Key]>;
    };

export type EventNameFromDefinitions<TEvents extends EventDefinitions> =
  TEvents[number]['name'];

export type EventParamsByNameFromDefinitions<TEvents extends EventDefinitions> =
  {
    [Name in EventNameFromDefinitions<TEvents>]: EventParamsFromSchema<
      Extract<TEvents[number], { readonly name: Name }>['params']
    >;
  };

type RequiredKeys<TParams extends object> = {
  [Key in keyof TParams]-?: undefined extends TParams[Key] ? never : Key;
}[keyof TParams];

type HasRequiredKeys<TParams extends object> = [keyof TParams] extends [never]
  ? false
  : [RequiredKeys<TParams>] extends [never]
    ? false
    : true;

export type EventPayloadFromParamsByName<
  TEventName extends string,
  TParamsByName extends Record<TEventName, object>,
> = {
  [Name in TEventName]: HasRequiredKeys<TParamsByName[Name]> extends true
    ? {
        name: Name;
        params: TParamsByName[Name];
      }
    : {
        name: Name;
        params?: TParamsByName[Name];
      };
}[TEventName];
