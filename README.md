## API - Financeira

    API Feita no curso Ignite do Rockseat

## Basica para aprender:

    - Conceitos de request/response.
    - Verbos APIREST
    - Quando usar cada tipo de parametro.
    - HTTP codes.
    - Alguns trantamentos de erro.
    - Metódos importantes do javascript( map, filter, reduce, split, some)
    - Middleware

### Requisitos

-   [x] Deve ser possivel criar uma conta
-   [x] Deve ser possivel buscar o extrato bancário do cliente
-   [x] Deve ser possivel realizar um deposito
-   [x] Deve ser possivel realizar um saque
-   [x] Deve ser possivel buscar o extrato bancário do cliente por date
-   [x] Deve ser possivel atualizar dados da conta do cliente
-   [x] Deve ser possivel obter dados da conta do cliente
-   [x] Deve ser possivel deletar uma conta

## Regas de negócio

-   [x] Não deve ser possivel cadastrar uma conta com CPF já existente
-   [x] Não deve ser possivel buscar extrato em uma conta não existente
-   [x] Não deve ser possivel fazer deposito em uma conta não existente
-   [x] Não deve ser possivel fazer saque em uma conta não existente
-   [x] Não deve ser possivel excluir uma conta não existente
-   [x] Não deve ser possivel fazer saque quando o saldo foi insuficiente

## Dados Account

-   CPF: string
-   Name: string
-   id: uuid -- gerado dentro da aplicação
-   statement: [] - dados de movimentação
