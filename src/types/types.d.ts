interface ISharedValue<T> {
  value: T;
}

interface ICoordinates {
  x: ISharedValue<number>;
  y: ISharedValue<number>;
}

interface IElementOptions {
  coords: ICoordinates;
}
