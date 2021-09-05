import { PassesChildren } from "../interfaces/PassesChildren";

type PropTypes = {
    className?: string
} & PassesChildren;
function WidgetContainer({ 
    children, 
    className: userClasses = "" 
}: PropTypes) {

    let containerClasses = "flex-1 m-4 bg-white h-full";
    if (userClasses) {
        containerClasses = [containerClasses, userClasses].join(" ");
    }

    return (
        <div className={containerClasses}>
            {children}
        </div>
    );
};

export default WidgetContainer;