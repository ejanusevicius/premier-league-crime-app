import { FiEye } from "react-icons/fi";
import { Crime } from "../interfaces/Crime";
import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from "../interfaces/ApplicationState";

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedCrime: state.selectedCrime
    }
}
const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

type PropTypes = {
    onClick: any
    crime: Crime
} & ReduxProps;
function CrimeCard({
    onClick = undefined,
    crime,
    selectedCrime
}: PropTypes) {
    let containerClasses = "w-full border-b py-2 px-5 flex";
    if (selectedCrime === crime) {
        containerClasses = [containerClasses, "bg-gray-200"].join(" ");
    }

    return (
        <div className={containerClasses} onClick={onClick}>
            <div className="flex-1 flex items-center">
            
                <div className="flex-1 pl-2.5 text-xs">
                    <span className="block font-medium text-2xs 2xl:text-xs">
                        {crime.category}
                    </span>
                    <span className="block text-xs font-semibold text-3xs 2xl:text-2xs">
                        {crime.date}
                    </span>
                </div>

                    <button onClick={onClick}
                    className="text-purple-600 border-purple-600 border hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors duration-150 text-3xs xl:text-2xs 2xl:text-xs font-semibold text-white rounded-xl px-1 2xl:px-2 py-0.5 cursor-pointer">
                        <FiEye className="mr-1 inline" />Inspect
                    </button>

            </div>
        </div>
    );
}

export default connector(CrimeCard);