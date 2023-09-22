# Dynamic Map App

Mobile application that uses react-native-maps and expo-location to show the user's location and lazily loads points of interest from an API (https://solving.ai/public/api/get-place-nearby.php)

## Fetch of points of interests

When a user "moves" the map, the current region location state is instantly updated, hence, every time a user plays with the map very fast, the server would be over-loaded with a lot of requests. To avoid this, a debouncer was employed, this debouncer reacts only 500ms after the user stopped moving the map, with that, we prevent the server to be overloaded.

![map1](https://github.com/franpautt27/map-app/assets/58583172/b54e221d-9d70-442a-b436-8ef0790ff549)


## Permissions

To use this app, the location permissions need to be granted

![map2](https://github.com/franpautt27/map-app/assets/58583172/f4ca6193-e01d-4dbe-9543-e43d1b5342b3)
