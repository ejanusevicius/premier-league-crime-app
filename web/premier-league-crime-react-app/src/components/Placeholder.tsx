import { PassesChildren } from "../interfaces/PassesChildren";

type PropTypes = { text?: string } & PassesChildren;
function Placeholder({ children, text}: PropTypes) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <span className="text-3xl 2xl:text-4xl text-gray-700">{children}</span>
            <span className="text-sm 2xl:text-base font-semibold text-gray-700">{text}</span>
        </div>
    );
};

export default Placeholder;