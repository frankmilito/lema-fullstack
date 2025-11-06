import { cn } from '../../../utils/cn';

interface SpinnerProps {
    className?: string;
}

const Spinner = ({ className = '' }: SpinnerProps) => {
    return (
        <div className={cn('flex justify-center items-center h-full py-8', className)}>
            <div className="lds-ellipsis" role="loader" >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div >
        </div >
    );
};

export default Spinner;
