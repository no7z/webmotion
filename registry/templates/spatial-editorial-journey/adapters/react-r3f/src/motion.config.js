export const motionTrajectories = {
  desktop: {
    source: {
      start: { position: [0, 0.15, 8.7], lookAt: [0, 0, 0] },
      end: { position: [-4.2, 3.8, 7.1], lookAt: [-1.8, -0.55, 0] },
    },
    cloud: {
      entryEnd: 0.16,
      start: { position: [-4.2, 3.8, 7.1], lookAt: [-1.8, -0.55, 0] },
      cruiseStart: { position: [-7.2, 2.45, 7.3], lookOffset: [1.8, -0.35, -1.2] },
      end: { position: [7.2, 2.45, 6.65], lookOffset: [1.8, -0.35, -1.2] },
    },
  },
  mobile: {
    source: {
      start: { position: [0, 0.1, 9.1], lookAt: [0, 0, 0] },
      end: { position: [-2.8, 3.35, 7.6], lookAt: [-1.1, -0.35, 0] },
    },
    cloud: {
      entryEnd: 0.2,
      start: { position: [-2.8, 3.35, 7.6], lookAt: [-1.1, -0.35, 0] },
      cruiseStart: { position: [-4.8, 2.35, 7.55], lookOffset: [1.2, -0.25, -1] },
      end: { position: [4.8, 2.35, 7.05], lookOffset: [1.2, -0.25, -1] },
    },
  },
  damping: {
    camera: 6.2,
    lookAt: 7.4,
  },
};
