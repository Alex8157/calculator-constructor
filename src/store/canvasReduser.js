const defaultState = {
  canvas: [],
  positions: [],
};

export const canvasReduser = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_IN_CANVAS":
      if (state.positions.includes(action.payload.props.className.slice(-1)))
        return state;
      return {
        ...state,
        canvas: [...state.canvas, action.payload],
        positions: [
          ...state.positions,
          action.payload.props.className.slice(-1),
        ],
      };
    case "CHANGE_POSITION_IN_CANVAS":
      const numberFromBuffer = action.payload.buffer.props.className.slice(-1);
      const numberFromCanvas = action.payload.className.slice(-1);

      if (state.positions.includes(numberFromBuffer)) {
        if (numberFromBuffer === numberFromCanvas) return state;
        if (numberFromBuffer === "1") return state;
        let newCanvas = [...state.canvas];
        let newPositions = [...state.positions];
        const indexFromBuffer = newPositions.indexOf(numberFromBuffer);
        const indexFromCanvas = newPositions.indexOf(numberFromCanvas);
        if (indexFromBuffer > -1 && indexFromCanvas > -1) {
          if (indexFromBuffer > indexFromCanvas) {
            if (indexFromBuffer - indexFromCanvas > 1) {
              let tailCanvas = newCanvas.splice(
                indexFromCanvas + 1,
                indexFromBuffer - indexFromCanvas - 1
              );
              let tailPositions = newPositions.splice(
                indexFromCanvas + 1,
                indexFromBuffer - indexFromCanvas - 1
              );
              newCanvas = [...newCanvas, ...tailCanvas];
              newPositions = [...newPositions, ...tailPositions];
            }
          } else {
            let tailCanvas = newCanvas.splice(
              indexFromCanvas + 1,
              state.positions.length
            );
            let tailPositions = newPositions.splice(
              indexFromCanvas + 1,
              state.positions.length
            );
            let middleCanvas = newCanvas.splice(indexFromBuffer, 1);
            let middlePositions = newPositions.splice(indexFromBuffer, 1);
            newCanvas = [...newCanvas, ...middleCanvas, ...tailCanvas];
            newPositions = [
              ...newPositions,
              ...middlePositions,
              ...tailPositions,
            ];
          }
        }
        return {
          ...state,
          canvas: newCanvas,
          positions: newPositions,
        };
      }

      let newCanvas = [...state.canvas, action.payload.buffer];
      let newPositions = [...state.positions, numberFromBuffer];
      const indexFromBuffer = newPositions.indexOf(numberFromBuffer);
      const indexFromCanvas = newPositions.indexOf(numberFromCanvas);
      if (indexFromBuffer > -1 && indexFromCanvas > -1) {
        [newCanvas[indexFromBuffer], newCanvas[indexFromCanvas + 1]] = [
          newCanvas[indexFromCanvas + 1],
          newCanvas[indexFromBuffer],
        ];
        [newPositions[indexFromBuffer], newPositions[indexFromCanvas + 1]] = [
          newPositions[indexFromCanvas + 1],
          newPositions[indexFromBuffer],
        ];
      }
      return {
        ...state,
        canvas: newCanvas,
        positions: newPositions,
      };
    case "DELETE_BLOCK":
      const numberBlock = action.payload.slice(-1);
      const index = state.positions.indexOf(numberBlock);
      if (index !== -1) {
        return {
          ...state,
          canvas: [...state.canvas.filter((v, i) => i !== index)],
          positions: [...state.positions.filter((v, i) => i !== index)],
        };
      }
      return { ...state };
    case "CLEAN_CANVAS":
      return { ...state, canvas: [], positions: [] };
    default:
      return state;
  }
};
/*

            if (indexFromCanvas - indexFromBuffer === 1) {
              console.log(1);
              [newCanvas[indexFromBuffer], newCanvas[indexFromCanvas]] = [
                newCanvas[indexFromCanvas],
                newCanvas[indexFromBuffer],
              ];
              [newPositions[indexFromBuffer], newPositions[indexFromCanvas]] = [
                newPositions[indexFromCanvas],
                newPositions[indexFromBuffer],
              ];
            }
            if (indexFromCanvas - indexFromBuffer === 2) {
              if (indexFromBuffer === 0) {
                let middleCanvas = newCanvas.splice(0, 1);
                let middlePositions = newPositions.splice(0, 1);
                let tailCanvas = newCanvas.splice(3, 1);
                let tailPositions = newPositions.splice(3, 1);
                newCanvas = [...newCanvas, ...middleCanvas, ...tailCanvas];
                newPositions = [
                  ...newPositions,
                  ...middlePositions,
                  ...tailPositions,
                ];
              } else {
                let tailCanvas = newCanvas.splice(indexFromBuffer, 1);
                let tailPositions = newPositions.splice(indexFromBuffer, 1);
                newCanvas = [...newCanvas, ...tailCanvas];
                newPositions = [...newPositions, ...tailPositions];
              }
            }
            if (indexFromCanvas - indexFromBuffer === 3) {
              let tailCanvas = newCanvas.splice(0, 1);
              let tailPositions = newPositions.splice(0, 1);
              newCanvas = [...newCanvas, ...tailCanvas];
              newPositions = [...newPositions, ...tailPositions];
            }
          }
*/
