### LaunchDarkly Sample React Native Typescript Application ###
We've built a simple application that demonstrates how LaunchDarkly's SDK works. Below, you'll find the basic build procedure, but for more comprehensive instructions, you can visit your [Quickstart page](https://app.launchdarkly.com/quickstart#/).
##### Build instructions #####
1. Open the ```hello-react-native-typescript``` directory
2. Copy the mobile key from your account settings page from your LaunchDarkly dashboard into `App.tsx`.
3. Run `npm install` in `hello-react-native-typescript`. This should download and create the directories for the project.
4. Run `pod install` in `hello-react-native-typescript/ios/`. This should download dependencies for iOS.
5. Run `npm start` to start the server to deliver the bundle url. Make sure this is running before you start your application. 
6. Run `npx react-native run-ios` or `npx react-native run-android` to start your application. Note: that you might need to start the Android emulator separately via `emulator -avd MY_AVD`.