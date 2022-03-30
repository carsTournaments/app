export interface GoogleMapsI {
  Animation: Animation;
  ControlPosition: { [key: string]: number };
  DirectionsStatus: Status;
  DirectionsTravelMode: TravelMode;
  DirectionsUnitSystem: UnitSystem;
  DistanceMatrixStatus: DistanceMatrixStatus;
  DistanceMatrixElementStatus: DistanceMatrixElementStatus;
  ElevationStatus: ElevationStatus;
  GeocoderLocationType: GeocoderLocationType;
  GeocoderStatus: Status;
  KmlLayerStatus: KmlLayerStatus;
  MapTypeControlStyle: MapTypeControlStyle;
  MapTypeId: MapTypeID;
  MaxZoomStatus: MaxZoomStatus;
  NavigationControlStyle: NavigationControlStyle;
  ScaleControlStyle: ScaleControlStyle;
  StreetViewPreference: StreetViewPreference;
  StreetViewStatus: StreetViewStatus;
  StreetViewSource: StreetViewSource;
  StrokePosition: StrokePosition;
  SymbolPath: SymbolPath;
  TrafficModel: TrafficModel;
  TransitMode: TransitMode;
  TransitRoutePreference: TransitRoutePreference;
  TravelMode: TravelMode;
  UnitSystem: UnitSystem;
  ZoomControlStyle: ZoomControlStyle;
  event: any;
  version: string;
  Map: any;
}

export interface Animation {
  BOUNCE: number;
  DROP: number;
  Yo: number;
  Wo: number;
}

export interface Status {
  OK: string;
  UNKNOWN_ERROR: string;
  OVER_QUERY_LIMIT: string;
  REQUEST_DENIED: string;
  INVALID_REQUEST: string;
  ZERO_RESULTS: string;
  MAX_WAYPOINTS_EXCEEDED?: string;
  NOT_FOUND?: string;
  ERROR?: string;
}

export interface TravelMode {
  DRIVING: string;
  WALKING: string;
  BICYCLING: string;
  TRANSIT: string;
  TWO_WHEELER: string;
}

export interface UnitSystem {
  METRIC: number;
  IMPERIAL: number;
}

export interface DistanceMatrixElementStatus {
  OK: string;
  NOT_FOUND: string;
  ZERO_RESULTS: string;
}

export interface DistanceMatrixStatus {
  OK: string;
  INVALID_REQUEST: string;
  OVER_QUERY_LIMIT: string;
  REQUEST_DENIED: string;
  UNKNOWN_ERROR: string;
  MAX_ELEMENTS_EXCEEDED: string;
  MAX_DIMENSIONS_EXCEEDED: string;
}

export interface ElevationStatus {
  OK: string;
  UNKNOWN_ERROR: string;
  OVER_QUERY_LIMIT: string;
  REQUEST_DENIED: string;
  INVALID_REQUEST: string;
  To: string;
}

export interface GeocoderLocationType {
  ROOFTOP: string;
  RANGE_INTERPOLATED: string;
  GEOMETRIC_CENTER: string;
  APPROXIMATE: string;
}

export interface KmlLayerStatus {
  UNKNOWN: string;
  OK: string;
  INVALID_REQUEST: string;
  DOCUMENT_NOT_FOUND: string;
  FETCH_ERROR: string;
  INVALID_DOCUMENT: string;
  DOCUMENT_TOO_LARGE: string;
  LIMITS_EXCEEDED: string;
  TIMED_OUT: string;
}

export interface MapTypeControlStyle {
  DEFAULT: number;
  HORIZONTAL_BAR: number;
  DROPDOWN_MENU: number;
  INSET: number;
  INSET_LARGE: number;
}

export interface MapTypeID {
  ROADMAP: string;
  SATELLITE: string;
  HYBRID: string;
  TERRAIN: string;
}

export interface MaxZoomStatus {
  OK: string;
  ERROR: string;
}

export interface NavigationControlStyle {
  DEFAULT: number;
  SMALL: number;
  ANDROID: number;
  ZOOM_PAN: number;
  Zo: number;
  Hk: number;
}

export interface ScaleControlStyle {
  DEFAULT: number;
}

export interface StreetViewPreference {
  NEAREST: string;
  BEST: string;
}

export interface StreetViewSource {
  DEFAULT: string;
  OUTDOOR: string;
}

export interface StreetViewStatus {
  OK: string;
  UNKNOWN_ERROR: string;
  ZERO_RESULTS: string;
}

export interface StrokePosition {
  CENTER: number;
  INSIDE: number;
  OUTSIDE: number;
}

export interface SymbolPath {
  CIRCLE: number;
  FORWARD_CLOSED_ARROW: number;
  FORWARD_OPEN_ARROW: number;
  BACKWARD_CLOSED_ARROW: number;
  BACKWARD_OPEN_ARROW: number;
}

export interface TrafficModel {
  BEST_GUESS: string;
  OPTIMISTIC: string;
  PESSIMISTIC: string;
}

export interface TransitMode {
  BUS: string;
  RAIL: string;
  SUBWAY: string;
  TRAIN: string;
  TRAM: string;
}

export interface TransitRoutePreference {
  LESS_WALKING: string;
  FEWER_TRANSFERS: string;
}

export interface ZoomControlStyle {
  DEFAULT: number;
  SMALL: number;
  LARGE: number;
  Hk: number;
}

export interface GMapOptionsI {
  mapTypeControl: boolean;
  fullscreenControl?: boolean;
  disableDefaultUI?: boolean;
  streetViewControl?: boolean;
  draggable?: boolean;
  zoom: number;
  mapTypeId?: any;
  center?: any;
  styles: any;
}

export interface GMapMarkerI {
  position: any;
  title: string;
  animation: any;
  draggable?: boolean;
  item: any;
  icon: string;
  addListener?: any;
  map?: any;
  setMap?: any;
}

export interface GMapsInfoWindowI {
  content: string;
  position: any;
  close?: () => void;
  open?: any;
}

export interface GoogleMapClusterI {
  map_: any;
  markers_: any;
  clusters_: any[];
  sizes: number[];
  styles_: Styles[];
  ready_: boolean;
  gridSize_: number;
  minClusterSize_: number;
  maxZoom_: null;
  imagePath_: string;
  imageExtension_: string;
  zoomOnClick_: boolean;
  averageCenter_: boolean;
  gm_accessors_: Gm;
  gm_bindings_: Gm;
  prevZoom_: number;
  removeMarker: any;
  addMarker: any;
}

export interface Gm {
  map: any;
}

export interface Styles {
  url: string;
  height: number;
  width: number;
}

export interface LatLngI {
  lat: number;
  lng: number;
}
