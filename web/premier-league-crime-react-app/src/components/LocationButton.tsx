import { StadiumLocation } from "../interfaces/StadiumLocation";

type PropTypes = {
    location: StadiumLocation,
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
        <div className={containerClasses} onClick={onClick}>
            <div className="w-full h-full flex items-center justify-center">
                <img className="w-1/2 h-1/2" src={location.crestUrl} alt="Team Crest" />
            </div>
        </div>
    );
};

export default LocationButton;