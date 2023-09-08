export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-24 text-black dark:text-white">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
          fill="currentColor"
          fillOpacity="0.7"
        />
        <path
          className="animate-[spin_30000ms_linear_infinite]"
          style={{ transformBox: 'fill-box', transformOrigin: '2px center' }}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 12C17 12.5523 16.5523 13 16 13H11C10.4477 13 10 12.5523 10 12V12C10 11.4477 10.4477 11 11 11H16C16.5523 11 17 11.4477 17 12V12Z"
          fill="currentColor"
          fillOpacity="0.7"
        />
        <path
          className="animate-[spin_500ms_linear_infinite]"
          style={{ transformBox: 'fill-box', transformOrigin: 'center 7px' }}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 5C12.5523 5 13 5.44772 13 6V13C13 13.5523 12.5523 14 12 14V14C11.4477 14 11 13.5523 11 13V6C11 5.44772 11.4477 5 12 5V5Z"
          fill="currentColor"
          fillOpacity="0.7"
        />
      </svg>
    </div>
  )
}
