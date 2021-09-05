import React from "react";
import { PassesChildren } from "../interfaces/PassesChildren";

function Container({ children }: PassesChildren) {
    return (
        <div className="h-full container mx-auto pt-4">
            {children}
        </div>
    );
};

export default Container;