declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        poster?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'shadow-intensity'?: number;
        'exposure'?: number;
        'environment-image'?: string;
        'skybox-image'?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'ar-scale'?: string;
        loading?: 'auto' | 'lazy' | 'eager';
        reveal?: 'auto' | 'interaction' | 'manual';
        style?: React.CSSProperties;
      },
      HTMLElement
    >;
  }
}

