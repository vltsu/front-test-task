import NewsList from './NewsList';
import Relay from 'react-relay';

export default Relay.createContainer(
  NewsList,
  {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          news(first: 100) {
            edges {
              node {
                name
              }
            }
          }
        }
      `,
    }
  }
);