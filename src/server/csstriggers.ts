export interface ICssTriggerRenderData {
  layout: boolean;
  paint: boolean;
  composite: boolean;
}

export interface ICssTriggerRenderPhaseData {
  [engine: string]: ICssTriggerRenderData;
}

export interface ICssTriggerBrowserRenderData {
  change: ICssTriggerRenderPhaseData;
  initial: ICssTriggerRenderPhaseData;
}

export interface ICssTrigger {
  data: {
    [propertyName: string]: ICssTriggerBrowserRenderData;
  };
}
export var cssTriggers: ICssTrigger = {
  data: {
    "align-content": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "align-items": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "align-self": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "backface-visibility": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: null, paint: null, composite: null },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: null, paint: null, composite: null },
        edgehtml: { layout: null, paint: null, composite: null },
      },
    },
    "background-attachment": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "background-blend-mode": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: null, paint: null, composite: null },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: null, paint: null, composite: null },
      },
    },
    "background-clip": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "background-color": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "background-image": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "background-origin": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "background-position": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "background-repeat": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "background-size": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "border-bottom-color": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "border-bottom-left-radius": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-bottom-right-radius": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-bottom-style": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-bottom-width": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-collapse": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: null, paint: null, composite: null },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: null, paint: null, composite: null },
        edgehtml: { layout: null, paint: null, composite: null },
      },
    },
    "border-image-outset": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-image-repeat": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-image-slice": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-image-source": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "border-image-width": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-left-color": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "border-left-style": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-left-width": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-right-color": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "border-right-style": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-right-width": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-top-color": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "border-top-left-radius": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-top-right-radius": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-top-style": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "border-top-width": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    bottom: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "box-shadow": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "box-sizing": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    clear: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    clip: {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    color: {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    cursor: {
      initial: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    direction: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: null, paint: null, composite: null },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: null, paint: null, composite: null },
        edgehtml: { layout: null, paint: null, composite: null },
      },
    },
    display: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "flex-basis": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "flex-direction": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "flex-grow": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "flex-shrink": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "flex-wrap": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    float: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "font-family": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "font-kerning": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: false, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: false, composite: true },
      },
    },
    "font-size": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "font-style": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "font-variant": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "font-variant-ligatures": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "font-weight": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    height: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "justify-content": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    left: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "letter-spacing": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "line-height": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "list-style-image": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "list-style-position": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "list-style-type": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "margin-bottom": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "margin-left": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "margin-right": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "margin-top": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "max-height": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "max-width": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "min-height": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "min-width": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    opacity: {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    order: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    orphans: {
      initial: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "outline-color": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "outline-offset": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "outline-style": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "outline-width": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "overflow-x": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "overflow-y": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "padding-bottom": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "padding-left": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "padding-right": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "padding-top": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    perspective: {
      initial: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: false, paint: false, composite: true },
      },
    },
    "perspective-origin": {
      initial: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "pointer-events": {
      initial: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: false, paint: false, composite: true },
      },
      change: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    position: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    resize: {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: false, paint: false, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: false, paint: false, composite: true },
      },
    },
    right: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "table-layout": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: null, paint: null, composite: null },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: null, paint: null, composite: null },
        edgehtml: { layout: null, paint: null, composite: null },
      },
    },
    "text-align": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "text-decoration": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "text-indent": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "text-rendering": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "text-shadow": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "text-transform": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    top: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    transform: {
      initial: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "transform-origin": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "transform-style": {
      initial: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: null, paint: null, composite: null },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: null, paint: null, composite: null },
        edgehtml: { layout: null, paint: null, composite: null },
      },
    },
    "unicode-bidi": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: false, paint: false, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
    "vertical-align": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    visibility: {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "white-space": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    widows: {
      initial: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: false, paint: false, composite: true },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: false, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: false, paint: false, composite: false },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    width: {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "word-break": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "word-spacing": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
    },
    "word-wrap": {
      initial: {
        blink: { layout: true, paint: true, composite: true },
        gecko: { layout: true, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: true, paint: true, composite: true },
      },
      change: {
        blink: { layout: null, paint: null, composite: null },
        gecko: { layout: null, paint: null, composite: null },
        webkit: { layout: null, paint: null, composite: null },
        edgehtml: { layout: null, paint: null, composite: null },
      },
    },
    "z-index": {
      initial: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
      change: {
        blink: { layout: false, paint: true, composite: true },
        gecko: { layout: false, paint: true, composite: true },
        webkit: { layout: true, paint: true, composite: true },
        edgehtml: { layout: false, paint: true, composite: true },
      },
    },
  },
};
