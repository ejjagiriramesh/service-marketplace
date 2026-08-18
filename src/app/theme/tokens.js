// Design tokens mirrored from src/index.css so JS (inline styles, dynamic
// colors) references the same "Dispatch Docket" palette instead of
// hardcoding hex values inside components.
export const tokens = {
  color: {
    ink: "#001F3F",
    inkSoft: "#1A4D7A",
    paper: "#F3EEE2",
    paperDim: "#E9E1CE",
    surface: "#FFFFFF",
    amber: "#FFD700",
    amberDeep: "#DAA520",
    slate: "#62707D",
    slateLight: "#8D97A0",
    rust: "#C1512F",
    green: "#3F7859",
    line: "#D9D0BB",
  },
  statusStyle: {
    Requested: { bg: "#EFE9DA", fg: "#7A6B45" },
    Accepted: { bg: "#E4ECF7", fg: "#2C4C82" },
    Scheduled: { bg: "#E4ECF7", fg: "#2C4C82" },
    "In Progress": { bg: "#FBEBDD", fg: "#B4661C" },
    Completed: { bg: "#E4F0E8", fg: "#2E6B47" },
    Cancelled: { bg: "#F6E4DD", fg: "#A6402A" },
  },
};
