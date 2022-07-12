import create from 'zustand';

const modelStore = create((set) => ({
  model: null,
  modelName: '',
  thumb: null,
  thumbName: '',
  modelProps: {
    scale: 1,
    rotation: { x: 0, y: 0, z: 0 },
    orbitControls: false,
    animations: [],
    autoRotation: false,
  },
  setModel: (model, modelName) => {
    set((state) => ({ ...state, model, modelName }));
  },
  setThumb: (thumb, thumbName) => {
    set((state) => ({ ...state, thumb, thumbName }));
  },
}));
