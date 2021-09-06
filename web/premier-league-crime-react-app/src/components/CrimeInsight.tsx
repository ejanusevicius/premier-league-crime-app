import { FiCalendar, FiFile, FiZoomIn } from 'react-icons/fi';
import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from "../interfaces/ApplicationState";
import { AiOutlineQuestion } from 'react-icons/ai';

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedStadiumLocation: state.selectedStadiumLocation,
        selectedCrime: state.selectedCrime,
        crimes: state.crimes
    }
}
const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;

function CrimeInsight({ selectedStadiumLocation, selectedCrime, crimes }: ReduxProps) {

    const numberOfCrimes = crimes?.length;

    type CrimeCharacteristicsPropTypes = { children?: React.ReactNode, icon: React.ReactNode, text: string, className?: string }
    const CrimeCharacteristic = ({
        children, icon, text, className: userClasses = ""
    }: CrimeCharacteristicsPropTypes) => {
        let containerClasses = "flex flex-col items-center justify-center"
        if (userClasses) {
            containerClasses = [containerClasses, userClasses].join(" ");
        }
        return(
            <div className={containerClasses}>
                <span className="text-2xl 2xl:text-3xl">
                    {icon}
                </span>
                <span className="text-2xs 2xl:text-xs">
                    {text}
                </span>
                <span className="text-xs 2xl:text-sm text-purple-500 font-bold">
                    {children}
                </span>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">

            <div className="flex flex-col items-center justify-center border-b border-gray-200 pb-1 2xl:pb-2">
                <img className="w-auto h-16 2xl:h-20" src={selectedStadiumLocation?.crestUrl} alt="Team Crest" />
                <p className="text-lg 2xl:text-xl font-medium">Chelsea F.C</p>
                <p className="text-2xs 2xl:text-xs font-semibold">({selectedStadiumLocation?.fullAddress})</p>
                <p className="mt-0.5 text-2xs 2xl:text-xs font-medium">
                    A total of
                    <span className="text-sm font-semibold text-purple-500 mx-1">
                        {numberOfCrimes}
                    </span>
                    Crimes have happened in/near the stadium in the last year.
                </p>
            </div>

            <div className="pt-1 2xl:pt-2 flex flex-col items-center justify-evenly w-full">

                <div className="flex items-center justify-evenly w-full">

                    <CrimeCharacteristic className="w-1/2" text="Occurance Date" icon={<FiCalendar className="inline" />}>
                        {selectedCrime?.date} 
                    </CrimeCharacteristic>

                    <CrimeCharacteristic className="w-1/2" text="Crime Type" icon={<AiOutlineQuestion className="inline" />}>
                        {selectedCrime?.category}
                    </CrimeCharacteristic>

                </div>
                
                <CrimeCharacteristic className="w-full" text="Case Outcome" icon={<FiFile className="inline" />}>
                    {selectedCrime?.outcomeStatus?.status || "Unknown"}
                </CrimeCharacteristic>

            </div>

        </div>
    );
};

export default connector(CrimeInsight);