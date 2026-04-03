export const HitObjectType = {
  hitCircle: 1 << 0, // 1
  slider: 1 << 1, // 2
  newCombo: 1 << 2, // 4
  spinner: 1 << 3, // 8
  colourHax: 1 << 4, // bits 4-6
  maniaHold: 1 << 7, // 128
} as const;

export const HitSound = {
  normal: 1 << 0, // 1
  whistle: 1 << 1, // 2
  finish: 1 << 2, // 4
  clap: 1 << 3, // 8
} as const;

export const TimingPointEffects = {
  kiai: 1 << 0, // 1
  omitFirstBarLine: 1 << 3, // 8
} as const;
