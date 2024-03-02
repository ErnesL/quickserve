"use client";



export default function Card({image, title, ingredients, description, price, quantity, onDecrement,onIncrement}) {
  return (
    <>
      <div className="p-3">
        <div className="flex flex-col justify-between content-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-w-80 min-h-80">
          <div className="min-w-80 min-h-80 bg-green-50 p-1">{image}</div>

          <div className="self-center p-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </div>

          <p className="font-normal text-gray-700 dark:text-gray-400">
            {ingredients}
          </p>

          <div className="self-center p-2">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            ${price}
          </p>

          <div className="flex self-center justify-center space-x-4 items-center p-4">
            <button
              className="btn bg-white p-3 rounded-3xl"
              onClick={onDecrement}
            >
              <h1>-</h1>
            </button>

            <p className="text-white">{quantity}</p>

            <button
              className="btn bg-white p-3 rounded-3xl"
              onClick={onIncrement}
            >
              <h1>+</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
