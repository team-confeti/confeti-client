import ts from 'typescript';

import {
  findVariableInitializer,
  getBooleanLiteralValue,
  getLiteralValue,
  getObjectPropertyInitializer,
  getPropertyName,
  unwrapExpression,
} from './ast-utils.mjs';

function parseParamDefinition(paramName, paramDefinition) {
  let paramType = '';
  let required = false;
  const oneOf = [];

  paramDefinition.properties.forEach((property) => {
    if (!ts.isPropertyAssignment(property)) {
      return;
    }

    const propertyName = getPropertyName(property.name);
    const initializer = unwrapExpression(property.initializer);

    if (propertyName === 'type' && ts.isStringLiteral(initializer)) {
      paramType = initializer.text;
    }

    if (propertyName === 'required') {
      required = getBooleanLiteralValue(initializer) === true;
    }

    if (propertyName === 'oneOf' && ts.isArrayLiteralExpression(initializer)) {
      initializer.elements.forEach((item) => {
        const literalValue = getLiteralValue(item);

        if (literalValue !== null) {
          oneOf.push(literalValue);
        }
      });
    }
  });

  return {
    name: paramName,
    type: paramType === 'enum' ? `enum: ${oneOf.join(', ')}` : paramType,
    required,
  };
}

export function parseEventDefinitions({ filePath, variableName, kind }) {
  const eventsInitializer = findVariableInitializer(filePath, variableName);
  const eventMap = new Map();

  if (!eventsInitializer || !ts.isArrayLiteralExpression(eventsInitializer)) {
    return eventMap;
  }

  eventsInitializer.elements.forEach((element) => {
    if (!ts.isObjectLiteralExpression(element)) {
      return;
    }

    const eventNameInitializer = getObjectPropertyInitializer(element, 'name');
    const showTypeInitializer = getObjectPropertyInitializer(element, 'type');
    const paramsInitializer = getObjectPropertyInitializer(element, 'params');

    if (!eventNameInitializer || !ts.isStringLiteral(eventNameInitializer)) {
      return;
    }

    const params =
      paramsInitializer && ts.isObjectLiteralExpression(paramsInitializer)
        ? paramsInitializer.properties.flatMap((property) => {
            if (!ts.isPropertyAssignment(property)) {
              return [];
            }

            const paramDefinition = unwrapExpression(property.initializer);

            if (!ts.isObjectLiteralExpression(paramDefinition)) {
              return [];
            }

            return [
              parseParamDefinition(
                getPropertyName(property.name),
                paramDefinition,
              ),
            ];
          })
        : [];

    eventMap.set(eventNameInitializer.text, {
      kind,
      showType:
        showTypeInitializer && ts.isStringLiteral(showTypeInitializer)
          ? showTypeInitializer.text
          : '',
      params,
    });
  });

  return eventMap;
}
