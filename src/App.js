import { useState } from "react";
import { CompactPicker } from "react-color";

function App() {
  const inicialState = [
    { id: 1, color: null },
    {
      id: 2,
      color: null,
    },
    {
      id: 3,
      color: null,
    },
    {
      id: 4,
      color: null,
    },
    {
      id: 5,
      color: null,
    },
  ];
  const [circleList, setCircleList] = useState(inicialState);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [newPaletteName, setNewPaletteName] = useState("");

  const handleDelete = (id) => {
    const newPalettesArr = savedPalettes.filter((p) => p.id !== id);
    setSavedPalettes(newPalettesArr);
  };

  return (
    <div className="wrapper">
      <h1 style={{ textAlign: "center" }}>Color Palette Generator</h1>
      <div className="colorsWrapper" style={{ width: 400 }}>
        {circleList.map((circle) => {
          return (
            <div className="itemWrapper">
              <div
                key={circle.id}
                className="itemColor"
                onClick={() => {
                  setSelectedCircle(circle.id);
                  if (circle.color === null) {
                    circle.color = "#ccc";
                  }
                }}
                style={{
                  backgroundColor:
                    circle.color === null ? "#fff" : circle.color,
                  transform:
                    circle.id === selectedCircle ? "scale(1.2)" : "scale(1)",
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className="inputsWrapper">
        <div className="ColorPicker">
          <CompactPicker
            onChange={(color) => {
              setCircleList(
                circleList.map((circle) => {
                  if (circle.id === selectedCircle) {
                    return {
                      ...circle,
                      color: color.hex,
                    };
                  }
                  return circle;
                })
              );
            }}
          ></CompactPicker>
        </div>
        <div className="textInputWrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              setSavedPalettes([
                ...savedPalettes,
                {
                  id: new Date().getTime(),
                  name: e.target.paletteName.value,
                  paleta: circleList.map((circle) => {
                    return {
                      ...circle,
                      color: circle.color === null ? "#fff" : circle.color,
                    };
                  }),
                },
              ]);
              setNewPaletteName("");
              setCircleList(inicialState);
              setSelectedCircle("#fff");
            }}
          >
            <label>Name</label>
            <input
              name="paletteName"
              onChange={(e) => {
                setNewPaletteName(e.target.value);
              }}
              value={newPaletteName}
            ></input>
            <button disabled={newPaletteName === ""}>+</button>
          </form>
        </div>
      </div>
      <h2 className="savedPalettes">Saved Palettes</h2>
      <div className="palettesContainer">
        {savedPalettes.map((palette) => {
          return (
            <div className="palette" key={palette.id}>
              <div className="paletteNameWrapper">
                <div className="nameWrapper">
                  <h3>{palette.name}</h3>
                </div>
                <div className="buttonWrapper">
                  <button
                    onClick={() => {
                      handleDelete(palette.id);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
              <div className="colorsWrapper">
                {palette.paleta.map((circle) => {
                  return (
                    <div className="itemWrapper">
                      <div
                        key={circle.id}
                        className="itemColor"
                        style={{
                          width: 25,
                          height: 25,
                          backgroundColor: circle.color,
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
