import type { PlopTypes } from '@turbo/gen';

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator('react-component', {
    description: 'Adds a new react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '컴포넌트 이름을 작성해주세요. (ex: sample-component)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.tsx',
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.css.ts',
        templateFile: 'templates/css.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.stories.tsx',
        templateFile: 'templates/stories.hbs',
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        template:
          "export { default as {{pascalCase name}} } from './{{kebabCase name}}/{{kebabCase name}}'",
      },
    ],
  });
}
