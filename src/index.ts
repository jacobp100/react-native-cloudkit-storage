import type { EventSubscriptionVendor } from 'react-native';
import { NativeModules, NativeEventEmitter } from 'react-native';

declare module CloudKitStorageModule {
  const registerForPushUpdates: () => void;
  const getItem: (key: string) => Promise<string | null>;
  const setItem: (key: string, value: string) => Promise<void>;
}

type EventSubscription = {
  remove: () => void;
};

interface Events {
  (
    eventName: 'change',
    handler: (event: { key: string; value: string | null }) => void
  ): EventSubscription;
  (
    eventName: 'delete',
    handler: (event: { key: string }) => void
  ): EventSubscription;
}

const CloudKitStorage = NativeModules.CloudKitStorage as
  | typeof CloudKitStorageModule & EventSubscriptionVendor;
const events = new NativeEventEmitter(CloudKitStorage);

export default {
  registerForPushUpdates: CloudKitStorage.registerForPushUpdates,
  getItem: CloudKitStorage.getItem,
  setItem: CloudKitStorage.setItem,
  addListener: ((event, handler) => {
    return events.addListener(event, handler);
  }) as Events,
};
