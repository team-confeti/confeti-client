const EFFECT_HOOK_NAMES = new Set(['useEffect', 'useLayoutEffect']);

const isReactEffectHook = (callee) => {
  if (callee.type === 'Identifier') {
    return EFFECT_HOOK_NAMES.has(callee.name);
  }

  if (
    callee.type === 'MemberExpression' &&
    !callee.computed &&
    callee.object.type === 'Identifier' &&
    callee.object.name === 'React' &&
    callee.property.type === 'Identifier'
  ) {
    return EFFECT_HOOK_NAMES.has(callee.property.name);
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
      requireNamedEffectHook:
        '익명 effect hook은 사용하지 않아요. `useEffect(function synchronizeSomething() { ... }, [deps])`처럼 의도를 드러내는 이름 있는 함수를 전달해요.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (!isReactEffectHook(node.callee)) {
          return;
        }

        const [callback] = node.arguments;

        if (!isAnonymousEffectCallback(callback)) {
          return;
        }

        context.report({
          node: callback,
          messageId: 'requireNamedEffectHook',
        });
      },
    };
  },
};

export default namedUseEffectRule;
