# API para Validação de Senha

Este projeto consiste em uma API REST desenvolvida utilizando Node.js, Express e TypeScript. A API expõe um endpoint para validar se a senha do usuário corresponde a determinado critérios.

## Funcionalidades

A API dispõe dos seguintes endpoints:

- Validar Senha: Verifica se uma senha é válida de acordo com critérios específicos.
- Healthcheck: Verifica se a API está em execução.

## Requisitos de Senha

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

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

### Passos para Execução

Em breve...

## Decisões do Projeto

### 1. Variáveis de Ambiente

Foi criado o arquivo `env.ts` para gerenciar e validar as variáveis de ambiente do projeto. Embora não haja nenhuma variável de ambiente sensível neste projeto, optou-se criar esse arquivo para demonstrar a forma que eu costumo gerenciar variáveis de ambiente.

Para validar as variáveis de ambiente foi utilizada a biblioteca [Zod](https://zod.dev/). Com mensagens de erro personalizadas e descritivas é possível identificar facilmente as variáveis de ambiente que não foram definidas.
