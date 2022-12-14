# react-native-cloudkit-storage

Like AsyncStorage, but syncs with Apple's CloudKit

Exported from [TechniCalc](https://jacobdoescode.com/technicalc)

## Installation

```sh
npm install react-native-cloudkit-storage
```

## Usage

```js
import CloudKitStorage from 'react-native-cloudkit-storage';

// Must call this!
CloudKitStorage.registerForPushUpdates();

await CloudKitStorage.setItem('itemName', JSON.stringify({ key: 'value' }));
const json = JSON.parse(await CloudKitStorage.getItem('itemName'));

// Handle remote events
CloudKitStorage.addListener('delete', ({ key }) => {
  console.log(`Deleted item ${key}`);
});
// Remote events only - not called when calling setItem
CloudKitStorage.addListener('change', ({ key, value }) => {
  console.log(`Changed item ${key}`, value);
});
```

## Set Up

Open XCode.

Click the top item in the files list (your project). In the `Signing & Capabilities` tab, click `+ Capability`, then `iCloud`.

Scroll down to the `iCloud` section, then click the `CloudKit`. It may ask you to set your team.

Under containers, click the `+` button. Pick a name in the form `iCloud.org.{team name}.{project name}`. Ensure it is checked.

**It can take a day or so for the CloudKit database to fully set up.** If you're having issues, wait a few days, and check again.

Next, open `AppDelegate.m` and add the following,

```objc
#import "RCTCloudKitStorage.h"
```

```objc
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  BOOL didHandle = [RCTCloudKitStorage
                    didReceiveRemoteNotification:userInfo
                    fetchCompletionHandler:completionHandler];

  if (!didHandle) {
    completionHandler(UIBackgroundFetchResultNoData);
  }
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
