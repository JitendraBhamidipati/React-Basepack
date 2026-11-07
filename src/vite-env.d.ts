/// <reference types="react" />
/// <reference types="react-dom" />

// Asset type declarations for non-TS files
declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.ico' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

// CSS Modules
declare module '*.module.css' {
  const classes: Record<string, string>;
  export = classes;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export = classes;
}

// Plain CSS side-effect imports
declare module '*.css' {
  const _: undefined;
  export default _;
}
