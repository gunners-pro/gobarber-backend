<h1 align="center">
GoBarber API
</h1>

<p align="center">Um servidor REST API para o sistema web de agendamento para barbeiros</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<hr />

## Features
[//]: # (Add the features of your project here:)
Tecnologias utilizadas:

- **NodeJS**
- **Javascript**
- **PostgreSQL**
- **MongoDB**
- **Redis**
- **SparkPost**
- **Azure Blob Storage**

## Getting started

Primeiro faça o clone do repositório: <br>
    `git clone {url repositório}` <br><br>
Antes de tudo precisa configurar os bancos de dados a ser utilizados de acordo com o arquivo: <br>
    `ormconfig.example` <br><br>
Nesse projeto foi utilizado o Docker para os 3 banco de dados(PostgreSQL, MongoDB, Redis) <br><br>
Precisa alterar as variaveis de ambiente conforme cada serviço externo que for utilizado, seguindo o arquivo de exemplo: <br>
    `.env.example` <br><br>
Execute o comando para baixar os pacotes: <br>
    `yarn` ou `npm` <br><br>
Agora inicie o projeto: <br>
    `yarn start` ou `npm start` <br><br>


## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.
