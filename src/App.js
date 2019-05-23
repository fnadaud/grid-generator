import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import jsPDF from 'jspdf';


class App extends Component {

  constructor(){
    super();
    this.displayedScale = 2;
    this.state = {
      columns: 3,
      rows: 4,
      width: 210 * this.displayedScale,
      height: 297 * this.displayedScale,
      margin: 15 * this.displayedScale,
    }
    this.scale = 10;
    this.margin = 15 * this.scale;
    this.width = 210 * this.scale;
    this.height = 297 * this.scale;
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    const { rows, columns, margin, width, height } = this.state;
    const c = document.getElementById("displayCanvas");
    if(c){
      const ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
      let side, i;
      if(width/height < columns/rows) {
        side = (width - 2 * margin) / columns;
      } else {
        side = (height - 2 * margin) / rows;
      }
      ctx.beginPath();
      ctx.lineWidth = 2;
  
      const widthOffset = width/2 - (columns * side)/2;
      const heightOffset = height/2 - (rows * side)/2;
  
      for(i = 0; i <= columns; i++){
        ctx.moveTo(i*side + widthOffset, 0 + heightOffset);
        ctx.lineTo(i*side + widthOffset, rows * side + heightOffset);
      }
  
      for(i = 0; i <= rows; i++){
        ctx.moveTo(0 + widthOffset, i * side + heightOffset);
        ctx.lineTo(columns * side + widthOffset, i * side + heightOffset);
      }
      ctx.stroke();
    }
  }

  exportDraw() {
    const { rows, columns } = this.state;
    const c = document.getElementById("exportCanvas");
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    let side, i;
    if(this.width/this.height < columns/rows) {
      side = (this.width - 2 * this.margin) / columns;
    } else {
      side = (this.height - 2 * this.margin) / rows;
    }
    ctx.beginPath();
    ctx.lineWidth = 4;

    const widthOffset = this.width/2 - (columns * side)/2;
    const heightOffset = this.height/2 - (rows * side)/2;

    for(i = 0; i <= columns; i++){
      ctx.moveTo(i*side + widthOffset, 0 + heightOffset);
      ctx.lineTo(i*side + widthOffset, rows * side + heightOffset);
    }

    for(i = 0; i <= rows; i++){
      ctx.moveTo(0 + widthOffset, i * side + heightOffset);
      ctx.lineTo(columns * side + widthOffset, i * side + heightOffset);
    }
    ctx.stroke();
  }

  exportToPdf = () => {
    const doc = new jsPDF();
 
    this.exportDraw();
    const canvas = document.getElementById("exportCanvas");
    const imgData = canvas.toDataURL('image/png');
  // Generate PDF
    doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
    // doc.text('Hello world!', 10, 10)
    doc.save('grille_a4.pdf')
  }

  handleChange = name => event => {
    if(event.target.value > 100){
      this.setState({[name]: 100});
    } else if (event.target.value < 1) {
      this.setState({[name]: 1});
    } else {
      this.setState({[name]: event.target.value});
    }
  }
  
  render() {
    this.draw();
    return (
      <div className="app">
        <div className="title-container">
          <h1>Générateur de grilles pour</h1>
          <h1 className="big-title">Emelyne</h1>
        </div>
        <div className="input-container">
          <label style={{marginRight: 20}}>
            Colonnes : <input type="number" value={this.state.columns} onChange={this.handleChange('columns')} />
          </label>
          <label>
            Lignes : <input type="number" value={this.state.rows} onChange={this.handleChange('rows')}/>
          </label>
        </div>
        <button onClick={this.exportToPdf} className="button">Exporter en pdf</button>
        <canvas id="displayCanvas" className="canvas displayed-canvas" width={210 * this.displayedScale} height={297 * this.displayedScale}></canvas>
        <canvas id="exportCanvas" className="canvas" width={210 * this.scale} height={297 * this.scale} style={{position: 'absolute', opacity: 0}}></canvas>
      </div>
    );
  }
}

export default App;
