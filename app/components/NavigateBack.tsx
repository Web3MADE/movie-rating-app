interface INavigateBackProps {
  onClick: () => void;
}

const NavigateBack = (props: INavigateBackProps) => {
  return (
    <div className="mt-4">
      <button
        onClick={props.onClick}
        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L9.586 12l-2.293 2.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414l-3-3z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>
    </div>
  );
};

export default NavigateBack;
