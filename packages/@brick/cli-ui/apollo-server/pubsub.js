import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
pubsub.ee.setMaxListeners(Infinity);

export default pubsub;
