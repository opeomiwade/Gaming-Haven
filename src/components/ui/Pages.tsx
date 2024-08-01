import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";

const PageToggle: React.FC<{
  pageClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentPage: number;
  next: () => void;
  prev: () => void;
}> = ({ pageClickHandler, currentPage, next, prev }) => {
  const pages = [1, 2, 3, 4, 5];
  return (
    <footer className="flex gap-4 w-full justify-center items-center mt-4">
      <button className="p-2 rounded-md w-fit" onClick={prev}>
        <IoChevronBack size={30} />
      </button>
      <ul className="flex gap-2 p-2 items-center justify-center">
        {pages.map((page) => (
          <button
            key={page}
            id={page.toString()}
            className={`text-md font-semibold rounded-md p-2 w-[50px] border-[1px] border-gray-200 hover:bg-emerald-500 ${
              currentPage == page ? "bg-emerald-500 text-white" : ""
            }`}
            onClick={pageClickHandler}
          >
            {page}
          </button>
        ))}
      </ul>
      <button className="p-2 rounded-md w-fit" onClick={next}>
        <IoChevronForward size={30} />
      </button>
    </footer>
  );
};

export default PageToggle;
