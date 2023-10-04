import BackArrowIcon from "./BackArrowIcon";

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
        <BackArrowIcon />
        Back
      </button>
    </div>
  );
};

export default NavigateBack;
