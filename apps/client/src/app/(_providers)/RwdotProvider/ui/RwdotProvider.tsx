import { Rwdot } from 'rwdot';

import { env } from '~/env';

const RwdotProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            {env.NODE_ENV === 'development' && <Rwdot showSize />}
            {children}
        </>
    );
};
RwdotProvider.displayName = 'RwdotProvider';

export default RwdotProvider;
