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

interface IGetRightCorner {
  x: number;
  y: number;
  horizontalRightBorder: number;
  verticalBorder: number;
}

interface IGetLeftCorner {
  x: number;
  y: number;
  horizontalLeftBorder: number;
  verticalBorder: number;
}
