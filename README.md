# CandyShop

## Описание проекта

MyReactApp - это веб-приложение для онлайн-магазина конфет, созданное с использованием ASP.NET Core на серверной стороне и React на клиентской стороне. Приложение позволяет пользователям просматривать каталог конфет, добавлять их в корзину и оформлять заказы.


## Начало работы

### Установка и запуск проекта

1. **Клонирование репозитория**

    ```bash
    git clone https://github.com/yourusername/MyReactApp.git
    cd MyReactApp
    ```

2. **Установка зависимостей для серверной части**

    ```bash
    dotnet restore
    ```

3. **Установка зависимостей для клиентской части**

    ```bash
    cd ClientApp
    npm install
    cd ..
    ```

4. **Запуск проекта**

    ```bash
    dotnet run
    ```

5. **Открытие браузера**

    Перейдите по адресу `https://localhost:5122` для просмотра приложения.

## Основные компоненты

### Backend (ASP.NET Core)

- **Controllers**
  - `WeatherForecastController.cs`: Пример контроллера.
  - `CandyController.cs`: Контроллер для управления конфетами.
  - `OrderController.cs`: Контроллер для управления заказами.

- **Models**
  - `User.cs`: Модель данных для пользователя.
  - `Candy.cs`: Модель данных для конфет.
  - `CandyInBag.cs`: Модель данных для конфет в корзине.
  - `Order.cs`: Модель данных для заказов.

- **Data**
  - `ApplicationDbContext.cs`: Контекст базы данных.

### Frontend (React)

- **src/components**
  - `CandyList.js`: Компонент для отображения списка конфет.
  - `Cart.js`: Компонент для отображения корзины.
  - `OrderSummary.js`: Компонент для отображения сводки заказа.

- **App.js**
  - Главный компонент приложения.

## Используемые технологии

- **Backend**
  - ASP.NET Core
  - Entity Framework Core

- **Frontend**
  - React
  - Axios (для HTTP-запросов)

## Автор

- [Ваше имя](https://github.com/yourusername)

## Лицензия

Этот проект лицензируется на условиях лицензии MIT - подробности см. в файле [LICENSE](LICENSE).

## Контакты

Если у вас есть вопросы или предложения, вы можете связаться со мной по электронной почте: [youremail@example.com](mailto:youremail@example.com).
