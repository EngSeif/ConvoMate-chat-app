import '../styles/global.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export const metadata = {
    title: "ConvoMate", // Customize the title
    description: "Real Life Time Chat Application",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                {/* Web tab image (favicon) */}
                <link rel="icon" href="/images/chat.png" type="image/x-icon" />
            </head>
            <body className=''>
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
