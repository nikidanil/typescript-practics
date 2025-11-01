# Задача 1: Расчёт итоговой стоимости (`total-price`)

## Описание задачи

Реализовать функцию `totalPrice`, которая рассчитывает итоговую стоимость покупки, учитывая скидку и возможность оформления рассрочки. Ключевая сложность — корректно описать типы так, чтобы:
*   При `isInstallment: true` параметр `months` был **обязательным**.
*   При `isInstallment: false` параметр `months` был **недоступен**.

## Решаемая проблема / Изучаемая концепция

**Проблема:** В JavaScript легко ошибиться и передать/не передать `months`, что приведёт к ошибке во время выполнения (например, деление на `undefined`).

**Решение в TypeScript:** Использование **Дискриминированного объединения (Tagged Union)**. Это позволяет статически (на этапе компиляции) проверить корректность передачи параметров в зависимости от флага `isInstallment`.

## Ключевые элементы решения

1.  **Базовый тип `BasePrice`:** Содержит общие поля `price` и `discount`.
2.  **Объединение `TotalPrice`:**
    *   **Ветка 1:** `{ isInstallment: true; months: number }` — `months` обязателен.
    *   **Ветка 2:** `{ isInstallment: false; months?: never }` — `months` запрещён (попытка передачи вызовет ошибку типизации).
3.  **Функция `totalPrice`:** Принимает аргумент типа `TotalPrice`. TypeScript автоматически сужает тип внутри функции, позволяя безопасно обращаться к `months` только когда `isInstallment` равно `true`.

## Как запустить и протестировать

1.  Убедитесь, что вы находитесь в ветке `total-price`:
    ```bash
    git checkout total-price
    ```
2.  Запустите код:
    ```bash
    npm run dev
    ```
    Вы должны увидеть в консоли результат рассчёта: `6250`.

3.  **Для проверки типов:** Попробуйте изменить вызов функции в `index.ts`:
    *   Уберите `months` при `isInstallment: true` — TypeScript выдаст ошибку.
    *   Добавьте `months` при `isInstallment: false` — TypeScript также выдаст ошибку.

## Пример использования

```typescript
// Корректно: единовременная оплата
const singlePayment = totalPrice({
  price: 10000,
  discount: 10,
  isInstallment: false
}); // Возвращает 9000

// Корректно: рассрочка
const monthlyPayment = totalPrice({
  price: 12000,
  discount: 10,
  isInstallment: true,
  months: 12
}); // Возвращает 900

// Некорректно: вызовет ошибку компиляции
// const error1 = totalPrice({ price: 10000, discount: 10, isInstallment: true });
// const error2 = totalPrice({ price: 10000, discount: 10, isInstallment: false, months: 12 });
