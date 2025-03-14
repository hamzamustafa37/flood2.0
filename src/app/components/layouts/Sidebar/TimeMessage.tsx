import React from 'react';

const DynamicMessage = (): React.ReactElement => {
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setMessage('Good Morning!');
        } else if (currentHour < 18) {
            setMessage('Good Afternoon!');
        } else if (currentHour < 21) {
            setMessage('Good Evening!');
        } else {
            setMessage('Good Night!');
        }
    }, []);

    return (
        <div>
            <span className="font-normal text-sm text-black">{message}</span>
        </div>
    );
};

export default DynamicMessage;
