# API para Validação de Senha

Este projeto consiste em uma API REST desenvolvida utilizando Node.js, Express e TypeScript. A API expõe um endpoint para validar se a senha do usuário corresponde a determinado critérios.

## Funcionalidades

A API dispõe dos seguintes endpoints:

- Validar Senha: Verifica se uma senha é válida de acordo com critérios específicos.
- Healthcheck: Verifica se a API está em execução.

### Validar Senha

- URL: `/validate/password`
- Método: `POST`
- Input: o body da requisição deve seguir a interface abaixo.
  ```typescript
  {
    "password": string
  }
  ```
- Output:
  ```typescript
  {
    "isValid": boolean
  }
  ```

### Healthcheck

- URL: `/`
- Método: `GET`
- Output:
  ```json
  {
    "health": "ok"
  }
  ```

## Requisitos da Senha

Uma senha é considerada válida se atender aos seguintes critérios:

- Contém nove ou mais caracteres.
- Contém pelo menos 1 dígito.
- Contém pelo menos 1 letra minúscula.
- Contém pelo menos 1 letra maiúscula.
- Contém pelo menos 1 caractere especial (`!@#$%^&*()-+`).
- Não contém caracteres repetidos.

> Espaços em branco não são considerados caracteres válidos.

### Exemplos

```javascript
isValid(""); // false
isValid("aa"); // false
isValid("ab"); // false
isValid("AAAbbbCc"); // false
isValid("AbTp9!foo"); // false
isValid("AbTp9!foA"); // false
isValid("AbTp9 fok"); // false
isValid("AbTp9!fok"); // true
```

## Tecnologias Utilizadas

Abaixo são elencadas as principais tecnologias que foram utilizadas no projeto:

- Node.js
- Express
- TypeScript

## Como Executar o Projeto?

### Pré-requisitos

É necessário que as ferramentas elencadas abaixo estejam devidamente instaladas em sua máquina:

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)
- yarn (versão 1)

Além disso, você precisa configurar as variáveis de ambiente do projeto, caso contrário, irá obter um erro ao tentar executar o servidor. Para mais detalhes sobre o funcionamento da validação das variáveis de ambiente, confira a seção [Variáveis de Ambiente](#1-variáveis-de-ambiente) em [Decisões do Projeto](#decisões-do-projeto).

Neste momento, as variáveis de ambiente são:

- `PORT`: a porta em que o servidor irá rodar.

Dessa forma, você deve criar um arquivo `.env` na raiz do repositório que siga, por exemplo, o seguinte padrão:

```
PORT=5000
```

### Passos para Execução do Projeto

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/walissonsilva/password-validation-api.git
cd password-validation-api
```

2. Instale as dependências:

```bash
yarn install
```

3. Execute o servidor:

```bash
yarn dev
```

O comando acima executa o servidor em modo de desenvolvimento. Alternativamente, você pode prefirir build o projeto antes de executá-lo. Nesse caso, utilize o comando:

```bash
yarn build && yarn start
```

### Execução dos Testes

Para rodar todos os testes da aplicação, utilize o comando:

```bash
yarn test
```

## Decisões do Projeto

### 1. Variáveis de Ambiente

Foi criado o arquivo `env.ts` para gerenciar e validar as variáveis de ambiente do projeto. Embora não haja nenhuma variável de ambiente sensível neste projeto, optou-se criar esse arquivo para demonstrar a forma que eu costumo gerenciar variáveis de ambiente.

Para validar as variáveis de ambiente foi utilizada a biblioteca [Zod](https://zod.dev/). Com mensagens de erro personalizadas e descritivas é possível identificar facilmente as variáveis de ambiente que não foram definidas. Dessa forma, evita-se obter erros inesperados em runtime. Com isso, espera-se melhorar a DX (_Developer Experience_).

### 2. Setup de Testes

Foi utilizado o Vitest para realizar os testes da aplicação. O motivo desta escolha está relacionado à simplicidade de se realizar o setup para execução dos testes em aplicações Node.js com TypeScript, além da velocidade na execução dos testes e a compatibilidade que esta ferramenta possui com o Jest API e todo o ecossistema de bibliotecas deste outro _test runner_. Para mais detalhes sobre a compatibilidade entre esses test runners, [clique aqui](https://vitest.dev/guide/comparisons#jest:~:text=Vitest%20offers%20compatibility%20with%20most%20of%20the%20Jest%20API%20and%20ecosystem%20libraries%2C%20so%20in%20most%20projects%2C%20it%20should%20be%20a%20drop%2Din%20replacement%20for%20Jest.).

### 3. Implementação do Validador

Embora tenha sido solicitado o desenvolvimento de um endpoint apenas para a validação de senha, eu optei por tentar criar uma solução que fosse capaz de abstrair um validador genérico e que, a partir dele, fosse possível criar um validador de senhas que validasse as regras que foram especificadas no documento do problema.

Essa implementação do validador foi feita utilizando os princípios do SOLID, a fim de favorecer essa abstração e tornar o código mais extensível e com baixo acoplamento.

Essa abstração iniciou com a criação da interface `IValidationRule` que consiste em um contrato para a implementação de uma classe que represente uma regra de validação. Com base nessa interface, foi criada uma classe abstrata, `ValidationRule`, para que as regras de validação fossem criadas extendendo desta classe (herança), exigindo que haja um método `validate` que retorna um booleano, indicando se a validação passou (`true`) ou não (`false`).

Com isso, foram criadas as regras de validação da senha, as quais estão no arquivo `PasswordRules.ts`. Para exemplificar, na classe `LowerCaseRule`, o método `validate` retorna `true` caso exista, pelo menos, um caractere que corresponda a uma letra minúscula.

> 💡 Apesar de todas as classes das regras de validação da senha terem sido criadas com nomes intuitivos (significativos), foi também adicionada uma documentação ao método `validate` de cada uma delas, a fim de melhorar a experiência de desenvolvimento.

Com a implementação da interface do `ValidationRule` também foi possível criar um validador genérico, o `BaseValidator` (arquivo `BaseValidator.ts`). Ele consiste em uma classe cujo construtor recebe um array de `ValidationRule`, correspondendo às regras que deverão ser validadas por ele. Além disso, o `BaseValidator` possui o método `validate`, o qual combina todas as regras que foram passadas no construtor; ele retorna `true`, se todas as regras retornam `true`, e `false`, caso contrário.

> 💡 O método `validate` do `BaseValidate` também foi documentado.

Com o `BaseValidator` ficou simples criar o `PasswordValidator` e, para isso, foi necessário apenas utilizar o conceito de herança (veja o arquivo `PasswordValidator.ts`). Além disso, será fácil criar qualquer outro validador, com suas próprias regras, apenas utilizando a interface do `ValidationRule` e o próprio `BaseValidator`.

#### O que acontece quando é passado um array vazio de regras (`ValidationRule`)?

Nesse caso, como não existe nenhuma regra definida, o validador retornará sempre `true` para qualquer input que for fornecido.

> 🧪 Observe os testes que foram desenvolvidos no arquivo `BaseValidator.test.ts`.

### 4. Injeção de Dependência

# Contato

Qualquer dúvida, entre em contato:

- [LinkedIn](https://www.linkedin.com/in/walissonsilva/)
- Email: [walissonsilva.dev@gmail.com](mailto:walissonsilva.dev@gmail.com) | [walissonsilva.me@gmail.com](mailto:walissonsilva.me@gmail.com)
- WhatsApp: (11) 9 5787-2138
