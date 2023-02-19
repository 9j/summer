import { CgChevronLeft } from "react-icons/cg";

type Props = {
  onClick: () => void;
};

const BackButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-6 h-8 w-8 rounded-full border border-black bg-white p-2"
    >
      <CgChevronLeft />
    </button>
  );
};

export default BackButton;
