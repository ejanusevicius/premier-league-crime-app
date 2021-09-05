import { Location } from "../interfaces/Location";
import { FiDownload } from 'react-icons/fi';

type PropTypes = {
    location: Location,
    onClick: any,
    className?: string
}
function LocationButton({
    location,
    onClick = undefined,
    className: userClasses = ""
}: PropTypes) {
    let containerClasses = "rounded-full w-20 h-20 border-4 border-blue-500 bg-white inline-block";
    if (userClasses) {
        containerClasses = [containerClasses, userClasses].join(" ");
    }
    return(
        <div className="w-full border-b py-2 pl-5 pr-4 flex" onClick={onClick}>
            <img className="w-12 h-12" src={location.crestUrl} />
            <div className="flex-1 pl-3 flex items-center">

                <div className="flex-1 pr-2">
                    <span className="block text-base font-medium">
                        Chelsea F.C
                    </span>
                    <span className="block text-xs font-semibold">
                        {location.fullAddress}
                    </span>
                </div>

                    <button className="font-semibold text-white rounded-xl px-2 py-0.5 cursor-pointer text-xs border flex items-center justify-center border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-300">
                        <FiDownload className="mr-1 inline" />Load Crimes
                    </button>

            </div>
        </div>
    );
};

export default LocationButton;
