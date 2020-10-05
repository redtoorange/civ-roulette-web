import React from "react";

const Footer = () => {
    const date = new Date();
    return (
        <footer className="footer fixed-bottom mt-3 text-center">
            <div className="container">
                <span className="text-muted">
                    Copyright © Andrew McGuiness {date.getFullYear()}. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer;
