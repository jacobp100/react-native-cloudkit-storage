#import <UIKit/UIKit.h>
#import <CloudKit/CloudKit.h>

#import <React/RCTEventEmitter.h>

@interface RCTCloudKitStorage : RCTEventEmitter

+ (BOOL)didReceiveRemoteNotification:(NSDictionary *)notification
              fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
  API_AVAILABLE(ios(12));

@end
