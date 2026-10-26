// m:ss, like a player readout. Floors, so pass a rounded value for a total
// that should read 0:30 rather than 0:29.
export function formatTime(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  const m = Math.floor(whole / 60);
  const s = whole % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
