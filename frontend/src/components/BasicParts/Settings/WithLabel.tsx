import React, { PropsWithChildren } from 'react';

interface Props {
    label: string;
    tooltip?: React.ReactNode;
}

const WithLabel = (props: PropsWithChildren<Props>) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <div className="flex items-center justify-start gap-2">
                <div className="text-sm font-bold text-dark-gray">
                    {props.label}
                </div>
                {props.tooltip}
            </div>
            {props.children}
        </div>
    );
};

export default WithLabel;