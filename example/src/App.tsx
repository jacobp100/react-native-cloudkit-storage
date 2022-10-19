import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import CloudKitStorage from 'react-native-cloudkit-storage';

export default function App() {
  const [value, setValue] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    CloudKitStorage.getItem('key').then((nextValue) => {
      if (!cancelled) {
        setValue(nextValue!);
      }
    });

    const changeListener = CloudKitStorage.addListener(
      'change',
      ({ key, value: nextValue }) => {
        if (key === 'key') {
          setValue(nextValue!);
        }
      }
    );

    return () => {
      cancelled = true;
      changeListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Value: {value ?? '...'}</Text>
      <Button
        title="Set value"
        onPress={() => {
          const nextValue = String(Math.random());
          CloudKitStorage.setItem('key', nextValue).then(() => {
            setValue(nextValue);
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
