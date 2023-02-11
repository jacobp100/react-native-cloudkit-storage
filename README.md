# react-native-cloudkit-storage

<a href="https://jacobdoescode.com/technicalc"><img alt="Part of the TechniCalc Project" src="https://github.com/jacobp100/technicalc-core/blob/master/banner.png" width="200" height="60"></a>

Like AsyncStorage, but syncs with Apple's CloudKit

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
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ...
  [application registerForRemoteNotifications];
  // ...
}

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

### macOS

If you're targeting macOS via Catalyst, the default React Native setup has a bug in it where the app will open itself whenever the CloudKit database changes. To fix this, you'll need to be very comfortable with iOS development, but the following steps should help.

- Remove the React-Native logic from `AppDelegate.m` and implement it in your own `UIViewController`
- Add/keep `@property (nonatomic, strong) UIWindow *window;` in your app delegate
- Your view controller must conform to `RCTBridgeDelegate`
- Implement `- (void)loadView` and initialize `self.view` with an instance of `RCTRootView`
- Add a `Main.storyboard`, and point it to your new view controller. You don't need to set a view subclass

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
