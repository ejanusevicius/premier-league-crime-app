import { connect, ConnectedProps } from 'react-redux';
import { FiDownload } from 'react-icons/fi';

import { StadiumLocation } from "../interfaces/StadiumLocation";
import { ApplicationState } from "../interfaces/ApplicationState";

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedStadiumLocation: state.selectedStadiumLocation
    }
}
const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

type PropTypes = {
    location: StadiumLocation,
    onClick: any,
    className?: string
} & ReduxProps;

function LocationCard({
    location,
    onClick = undefined,
    className: userClasses = "",
    selectedStadiumLocation
}: PropTypes) {

    let containerClasses = "w-full border-b py-2 pl-5 pr-4 flex";
    if (userClasses) {
        containerClasses = [containerClasses, userClasses].join(" ");
    }
    if (selectedStadiumLocation?.id === location?.id) {
        containerClasses = [containerClasses, "bg-gray-200"].join(" ");
    }

    return(
        <div className={containerClasses}>
            <img className="w-12 h-12" src={location.crestUrl} alt="Team Crest" />
            <div className="flex-1 pl-3 flex items-center">

                <div className="flex-1 pr-2">
                    <span className="block text-2xs xl:text-sm 2xl:text-base font-medium">
                        {location.teamName}
                    </span>
                    <span className="block text-4xs xl:text-2xs 2xl:text-xs font-semibold">
                        {location.fullAddress}
                    </span>
                </div>

                    <button onClick={onClick}
                    className="font-semibold text-white rounded-xl px-1 2xl:px-2 py-0.5 cursor-pointer text-3xs xl:text-2xs 2xl:text-xs border flex items-center justify-center border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-300">
                        <FiDownload className="mr-1 inline" />Load Crimes
                    </button>
            </div>
        </div>
    );
};

export default connector(LocationCard);
