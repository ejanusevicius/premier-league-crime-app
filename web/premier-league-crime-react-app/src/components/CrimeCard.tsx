import { FiEye, FiUserX } from "react-icons/fi";
import { Crime } from "../interfaces/Crime";

type PropTypes = {
    onClick: any
    crime: Crime
}
function CrimeCard({
    onClick = undefined,
    crime
}: PropTypes) {
    return (
        <div className="w-full border-b py-2 px-5 flex" onClick={onClick}>
            <div className="flex-1 flex items-center">
                
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <FiUserX className="text-white" />
                </div>

                <div className="flex-1 pl-2.5">
                    <span className="block text-sm font-medium">
                        {crime.category}
                    </span>
                    <span className="block text-xs font-semibold">
                        {crime.date}
                    </span>
                </div>

                    <button onClick={onClick}
                    className="text-purple-600 border-purple-600 border hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors duration-150 text-xs font-semibold text-white rounded-xl px-2 py-0.5 cursor-pointer">
                        <FiEye className="mr-1 inline" />Inspect
                    </button>

            </div>
        </div>
    );
}

export default CrimeCard;