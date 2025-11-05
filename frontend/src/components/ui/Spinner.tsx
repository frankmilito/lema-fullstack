
const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-full py-8">
            <div className="lds-ellipsis" role="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;
