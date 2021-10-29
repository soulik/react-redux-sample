import React from "react";

export const DynamicComponent: React.FC<{component?: any}> = (props) => {
    if (props.component) {
        const SpecificComponent = props.component
        return (
            <SpecificComponent />
        )
    } else {
        return (
            <></>
        )
    }
}