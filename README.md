# Cientists

### Integrante

André Coutinho de Macedo Silva (RM: 1141204153)

## Descrição

O **Cientists** é um projeto de plataforma que salva nomes de cientistas que atuam/atuaram no Brasil vinculando seus nomes aos seus endereços de currículo Lattes. Com as últimas atualizações de plataformas digitais mantidas pelo governo brasileiro, o currículo Lattes possui um novo design e uma atribuição direta ao gov.br. Com isso a plataforma está mais atraente e oferece, de forma mais acessível, informações cruciais sobre as atividades acadêmicas de qualquer pesquisador do Brasil.

A plataforma é baseada em Spring e React Native. Cada usuário pode acessar cadastrando seu nome, e-mail e senha. 

#### Tela de cadastro

<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/d3562db3-57c4-4f14-b838-44f7fdde82a5" />

#### Tela de Login

<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/ed4b43a7-c435-45b6-951c-fd1caa483f7b" />

Após entrar na conta, usuários são convidados a colocarem seu endereço lattes na página inicial e o lattes de outros cientistas em uma lista. 

#### Tela de Menu

<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/bf2aefc6-fe0a-4ca5-9730-a8555dcada65" />

#### Tela de adicionar cientista

<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/f2d84be2-5cb6-4c45-bcab-65010ba03645" />

#### Tela de lista de cientistas

<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/027f2db4-965b-4233-a2e0-42cfe945592e" />

Todas as informações, com exceção do endereço lattes de outros cientistas, podem ser editadas.

#### Tela de edição de cientista

<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/2e6c0418-f0a0-4082-9c21-403173a8bebb" />

#### Edição de Lattes do usuário

<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/c014fa97-ac03-495f-b732-bd77ff8dd609" />

## Execução

Para executar o projeto é, primeiro, necessário clonar na máquina. Ao abrir o CMD, utilize o seguinte comando:

``` bash
git clone https://github.com/AndreCoutinhom/Scientists
```

Entre na pasta `backend`. Após criar seu arquivo `.env` rode o projeto Spring:

``` bash

cd Scientists

cd backend

./mvnw spring-boot:run

```

Saia da pasta `backend` e vá para a pasta `app` para instalar os componentes expo e gerar o QR Code de compartilhamento com o celular:

``` bash

cd ..

cd app

npx expo install @react-navigation/native @react-navigation/native-stack \ react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage

npx expo start

```

Após escanear o QR Code usando o app **Expo Go**, a aplicação começará a rodar no seu celular.


---
