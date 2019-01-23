/// <amd-module name="Types/_entity/functor/Compute" />
/**
 * Функтор, хранящий информацию о свойствах, от значения которых зависит результат вычислений.
 * Создадим и выполним функтор, вычисляющий 20% налог на заказ в магазине:
 * <pre>
 *    requirejs(['Types/Functor/Compute'], function(ComputeFunctor) {
 *       var getTax = new ComputeFunctor(function(totals, percent) {
 *             return totals.amount * percent / 100;
 *          }, ['amount']),
 *          tax;
 *
 *       tax = getTax({
 *          count: 5,
 *          amount: 250
 *       }, 20);
 *       console.log(tax);//50
 *       console.log(getTax.properties);//['amount']
 *    });
 * </pre>
 * @class Types/_entity/functor/Compute
 * @public
 * @author Мальцев А.А.
 */

interface IFunctor {
   readonly functor: Function;
   readonly properties: Array<string>;
}

/**
 * Конструктор
 * @param {Function} fn Функция, производящая вычисления
 * @param {Array.<String>} [properties] Свойства, от которых зависит результат вычисления
 * @return {Function}
 * @protected
 */
export default class Compute implements IFunctor {
   readonly functor: Function;
   readonly properties: Array<string>;

   constructor(fn: Function, properties?: Array<string>) {
      properties = properties || [];
      if (!(fn instanceof Function)) {
         throw new TypeError('Argument "fn" be an instance of Function');
      }
      if (!(properties instanceof Array)) {
         throw new TypeError('Argument "properties" be an instance of Array');
      }

      Object.defineProperty(fn, 'functor', {
         get: function() {
            return Compute;
         }
      });
      Object.defineProperty(fn, 'properties', {
         get: function() {
            return properties;
         }
      });

      // @ts-ignore
      return fn;
   }

   static isFunctor(fn: any): boolean {
      return fn && fn.functor === Compute;
   }
}
