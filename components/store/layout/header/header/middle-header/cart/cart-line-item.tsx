"use client";

import { motion } from "motion/react";

import type { HeaderCartItem } from "@/types/header";
import {
  cartLineItemImageVariants,
  cartLineItemVariants,
} from "@/motion/motion-values";
import QuantityStepper from "./quantity-stepper";

function RemoveButton() {
  return (
    <button type="button" aria-label="Remove item">
      <svg
        width={16}
        height={16}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hover:text-error size-4 cursor-pointer text-gray-400 transition-all duration-150"
        aria-hidden="true"
      >
        <path
          d="M16.25 4.58594L15.7336 12.9402C15.6016 15.0746 15.5356 16.1419 15.0006 16.9092C14.7361 17.2885 14.3955 17.6087 14.0006 17.8493C13.2018 18.3359 12.1325 18.3359 9.99395 18.3359C7.8526 18.3359 6.78192 18.3359 5.98254 17.8484C5.58733 17.6073 5.24666 17.2866 4.98224 16.9066C4.4474 16.1381 4.38288 15.0694 4.25384 12.9319L3.75 4.58594"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2.5 4.58464H17.5M13.3798 4.58464L12.8109 3.41107C12.433 2.63152 12.244 2.24174 11.9181 1.99864C11.8458 1.94472 11.7692 1.89675 11.6892 1.85522C11.3283 1.66797 10.8951 1.66797 10.0288 1.66797C9.14069 1.66797 8.69665 1.66797 8.32974 1.86307C8.24842 1.90631 8.17082 1.95622 8.09774 2.01228C7.76803 2.26522 7.58386 2.66926 7.2155 3.47735L6.71077 4.58464"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default function CartLineItem({ item }: { item: HeaderCartItem }) {
  return (
    <motion.li
      variants={cartLineItemVariants}
      whileHover="hover"
      className="flex items-center gap-8 rounded-xl border border-gray-400 p-5 first:mt-30"
    >
      <div className="relative h-25 w-40 overflow-hidden rounded-xl">
        <motion.div variants={cartLineItemImageVariants}>
          <motion.img src={item.src} alt={item.title} />
        </motion.div>
      </div>
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">{item.title} </h1>
              <RemoveButton />
            </div>

            <p className="text-sm text-gray-500">
              Available: {item.available}
            </p>
            <div className="mt-4 flex w-full items-center justify-between">
              <p className="text-md mt-2 font-bold">${item.price}</p>
              <QuantityStepper quantity={item.quantity} />
            </div>
          </div>
          <div className="font-semibold"></div>
        </div>
      </div>
    </motion.li>
  );
}

