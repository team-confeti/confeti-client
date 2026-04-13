const isUseEffect = (callee) => {
  if (callee.type === 'Identifier') {
    return callee.name === 'useEffect';
  }

  if (
    callee.type === 'MemberExpression' &&
    !callee.computed &&
    callee.object.type === 'Identifier' &&
    callee.object.name === 'React' &&
    callee.property.type === 'Identifier'
  ) {
    return callee.property.name === 'useEffect';
  }

  return false;
};

const isAnonymousEffectCallback = (node) => {
  if (!node) {
    return false;
  }

  if (node.type === 'ArrowFunctionExpression') {
    return true;
  }

  return node.type === 'FunctionExpression' && node.id == null;
};

const namedUseEffectRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce named useEffect callbacks',
    },
    schema: [],
    messages: {
      requireNamedUseEffect:
        '익명 useEffect는 사용하지 않아요. `useEffect(function synchronizeSomething() { ... }, [deps])`처럼 의도를 드러내는 이름 있는 함수를 전달해요.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (!isUseEffect(node.callee)) {
          return;
        }

        const [callback] = node.arguments;

        if (!isAnonymousEffectCallback(callback)) {
          return;
        }

        context.report({
          node: callback,
          messageId: 'requireNamedUseEffect',
        });
      },
    };
  },
};

export default namedUseEffectRule;
