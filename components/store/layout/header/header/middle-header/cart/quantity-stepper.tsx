export default function QuantityStepper({ quantity }: { quantity: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-400 px-2 py-1">
      {/* Minus button */}
      <button type="button" aria-label="Decrease quantity">
        <svg
          width={16}
          height={16}
          className="hover:text-primary-dark cursor-pointer text-slate-600 transition-all duration-200"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g clipPath="url(#clip0_remove_circle)">
            <path
              d="M13.3335 10L6.66683 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3332 9.9987C18.3332 5.39632 14.6022 1.66536 9.99984 1.66536C5.39746 1.66536 1.6665 5.39632 1.6665 9.9987C1.6665 14.6011 5.39746 18.332 9.99984 18.332C14.6022 18.332 18.3332 14.6011 18.3332 9.9987Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
          <defs>
            <clipPath id="clip0_remove_circle">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <p>{quantity}</p>

      {/* Plus button */}
      <button type="button" aria-label="Increase quantity">
        <svg
          width={16}
          height={16}
          viewBox="0 0 20 20"
          className="hover:text-primary-dark cursor-pointer text-slate-600 transition-all duration-200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g clipPath="url(#clip0_add_circle)">
            <path
              d="M9.99935 6.66797V13.3346M13.3327 10.0013L6.66602 10.0013"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3327 9.9987C18.3327 5.39632 14.6017 1.66536 9.99935 1.66536C5.39698 1.66536 1.66602 5.39632 1.66602 9.9987C1.66602 14.6011 5.39698 18.332 9.99935 18.332C14.6017 18.332 18.3327 14.6011 18.3327 9.9987Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
          <defs>
            <clipPath id="clip0_add_circle">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}

