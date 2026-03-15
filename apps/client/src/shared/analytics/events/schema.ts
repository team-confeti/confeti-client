export type EventParamType = 'string' | 'number' | 'boolean' | 'enum';
export type ShowEventType = 'page' | 'component';

type StringEventParamDefinition = {
  readonly type: 'string';
  readonly required: boolean;
};

type NumberEventParamDefinition = {
  readonly type: 'number';
  readonly required: boolean;
};

type BooleanEventParamDefinition = {
  readonly type: 'boolean';
  readonly required: boolean;
};

type EnumEventParamDefinition = {
  readonly type: 'enum';
  readonly required: boolean;
  readonly oneOf: readonly (string | number | boolean)[];
};

type EventParamDefinition =
  | StringEventParamDefinition
  | NumberEventParamDefinition
  | BooleanEventParamDefinition
  | EnumEventParamDefinition;

type EventParamDefinitions = Readonly<Record<string, EventParamDefinition>>;

type BaseEventDefinition = {
  readonly name: string;
  readonly params?: EventParamDefinitions;
};

type ShowEventParamDefinitions = EventParamDefinitions & {
  readonly type?: never;
};

export type ClickEventDefinitions = readonly BaseEventDefinition[];

export type ShowEventDefinitions = readonly (BaseEventDefinition & {
  readonly type: ShowEventType;
  readonly params?: ShowEventParamDefinitions;
})[];

type EventParamValue<TParam extends EventParamDefinition> = TParam extends {
  readonly oneOf: readonly (infer Value)[];
}
  ? Value
  : TParam['type'] extends 'string'
    ? string
    : TParam['type'] extends 'number'
      ? number
      : TParam['type'] extends 'boolean'
        ? boolean
        : never;

type EmptyEventParams = Record<never, never>;
type NormalizedEventParams<TParams extends EventParamDefinitions | undefined> =
  Extract<TParams, EventParamDefinitions>;

export type EventParamsFromSchema<
  TParams extends EventParamDefinitions | undefined,
> = [TParams] extends [undefined]
  ? EmptyEventParams
  : [keyof NormalizedEventParams<TParams>] extends [never]
    ? EmptyEventParams
    : {
        [Key in keyof NormalizedEventParams<TParams> as NormalizedEventParams<TParams>[Key] extends {
          readonly required: true;
        }
          ? Key
          : never]: EventParamValue<NormalizedEventParams<TParams>[Key]>;
      } & {
        [Key in keyof NormalizedEventParams<TParams> as NormalizedEventParams<TParams>[Key] extends {
          readonly required: true;
        }
          ? never
          : Key]?: EventParamValue<NormalizedEventParams<TParams>[Key]>;
      };

export type EventNameFromDefinitions<
  TEvents extends readonly { readonly name: string }[],
> = TEvents[number]['name'];

export type EventParamsByNameFromDefinitions<
  TEvents extends readonly {
    readonly name: string;
    readonly params?: EventParamDefinitions;
  }[],
> = {
  [Name in EventNameFromDefinitions<TEvents>]: EventParamsFromSchema<
    Extract<TEvents[number], { readonly name: Name }>['params']
  >;
};

export type EventTypeByNameFromDefinitions<
  TEvents extends readonly {
    readonly name: string;
    readonly type: string;
  }[],
> = {
  [Name in EventNameFromDefinitions<TEvents>]: Extract<
    TEvents[number],
    { readonly name: Name }
  >['type'];
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
