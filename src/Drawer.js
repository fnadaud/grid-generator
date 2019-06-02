import React, {Component} from 'react';
import { ChromePicker } from 'react-color';


class Drawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayInsidePicker: false,
      displayOutsidePicker: false,
    }
  }

  handlePickerDisplay = inside => {
    this.setState({
      displayInsidePicker: inside ? !this.state.displayInsidePicker : false,
      displayOutsidePicker: !inside ? !this.state.displayOutsidePicker : false
    })
  }
  
  render() {
    const { width, columns, rows, insideColor, outsideColor, handleColorChange, handleChange, exportToPdf } = this.props;
    return (
      <div className="drawer-container" style={{width}}>
        <h1 className="drawer-title">Générateur de grilles</h1>
        <div>
          <div className="input-container">
            <div className="input-column">
              <label className="label">Colonnes</label>
              <input className="input" type="number" value={columns} onChange={handleChange('columns')}/>
            </div>
            <div className="input-column">
              <label className="label">Lignes</label>
              <input className="input" type="number" value={rows} onChange={handleChange('rows')}/>
            </div>
          </div>
          <div className="divider"/>
          <div className="color-container">
            <div className="color-row">
              <div style={{position: "relative"}}>
                <div className="color-square" style={{ background: outsideColor }} onClick={() => this.handlePickerDisplay()}/>
                <ChromePicker
                  className={"color-picker" + (this.state.displayOutsidePicker ? "" : " hidden")}
                  color={outsideColor}
                  onChangeComplete={handleColorChange("outsideColor")}
                />           
              </div>
              <label className="label">Couleur extérieure</label>
            </div>
            <div className="color-row">
              <div style={{ position: "relative" }}>
                <div className="color-square" style={{background: insideColor}} onClick={() => this.handlePickerDisplay(true)}/>
                <ChromePicker
                  className={"color-picker" + (this.state.displayInsidePicker ? "" : " hidden")}
                  color={insideColor}
                  onChangeComplete={handleColorChange("insideColor")}
                />           
              </div>
              <label className="label">Couleur intérieure</label>
            </div>
          </div>
        </div>
        <button onClick={exportToPdf} className="button">Exporter en pdf</button>
      </div>
    );
  }
}

export default Drawer;
