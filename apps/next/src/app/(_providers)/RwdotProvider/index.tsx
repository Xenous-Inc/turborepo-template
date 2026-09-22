import { Rwdot } from 'rwdot';
import { ENV } from 'varlock/env';

const RwdotProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            {ENV.NODE_ENV === 'development' && <Rwdot showSize />}
            {children}
        </>
    );
};

export { RwdotProvider };
