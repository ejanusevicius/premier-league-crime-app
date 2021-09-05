import './Spinner.css';

function Spinner() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="spinner-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;