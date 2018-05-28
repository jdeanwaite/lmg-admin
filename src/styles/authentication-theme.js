import { AmplifyTheme } from 'aws-amplify-react';

const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, { background: 'purple' });

export default Object.assign({}, AmplifyTheme, { sectionHeader: MySectionHeader });
