/**
 * Базовый интерфейс для данных о цене и скидке.
 *
 * Содержит общие поля, используемые как при полной оплате,
 * так и при оформлении рассрочки.
 */
type BasePrice = {
	/**
	 * Исходная цена товара в денежных единицах.
	 * Должна быть положительным числом.
	 */
	price: number;

	/**
	 * Размер скидки в процентах.
	 * Например, значение 25 означает скидку 25%.
	 */
	discount: number;
};

/**
 * Тип, описывающий параметры расчёта итоговой стоимости.
 *
 * Представляет собой дискриминированное объединение двух вариантов:
 * - При единовременной оплате (`isInstallment: false`) поле `months` отсутствует.
 * - При рассрочке (`isInstallment: true`) поле `months` обязательно и указывает количество месяцев.
 */
type TotalPrice =
	| (BasePrice & {
			/**
			 * Признак оформления покупки в рассрочку.
			 * Если `true` — требуется указать количество месяцев.
			 */
			isInstallment: true;
			/**
			 * Количество месяцев, на которые оформляется рассрочка.
			 * Обязательно, если `isInstallment: true`.
			 */
			months: number;
	  })
	| (BasePrice & {
			/**
			 * Признак единовременной оплаты.
			 * Если `false` — рассрочка не оформляется.
			 */
			isInstallment: false;
			/**
			 * Поле `months` не должно присутствовать при единовременной оплате.
			 * Использование `never` гарантирует, что передача `months` вызовет ошибку типизации.
			 */
			months?: never;
	  });

/**
 * Вычисляет итоговую стоимость покупки с учётом скидки и формы оплаты.
 *
 * @param price - Исходная цена товара.
 * @param discount - Скидка в процентах (например, 20 для 20% скидки).
 * @param isInstallment - Флаг: оформляется ли покупка в рассрочку.
 * @param months - Количество месяцев рассрочки. Обязательно, если `isInstallment` равно `true`.
 *
 * @returns
 * - Если `isInstallment` равно `true` — возвращает ежемесячный платёж.
 * - Если `isInstallment` равно `false` — возвращает итоговую сумму со скидкой.
 *
 * @example
 * ```ts
 * // Единовременная оплата
 * totalPrice({ price: 10000, discount: 10, isInstallment: false });
 * // → 9000
 * ```
 *
 * @example
 * ```ts
 * // Рассрочка на 12 месяцев
 * totalPrice({ price: 12000, discount: 10, isInstallment: true, months: 12 });
 * // → 900
 * ```
 */
const totalPrice = ({ price, discount, isInstallment, months }: TotalPrice): number => {
	const discountedPrice = price * (1 - discount / 100);

	return isInstallment ? discountedPrice / months : discountedPrice;
};

// Пример использования функции
const price = totalPrice({ price: 100000, discount: 25, isInstallment: true, months: 12 });

// Вывод результата в консоль
console.log(price); // 6250
