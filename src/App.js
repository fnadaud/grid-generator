import React, {Component} from 'react';
import Drawer from './Drawer';
import './App.css';
import jsPDF from 'jspdf';


class App extends Component {

  constructor(){
    super();
    this.displayedScale = (window.innerHeight - 40)/297;
    this.state = {
      columns: 3,
      rows: 4,
      width: 210 * this.displayedScale,
      height: 297 * this.displayedScale,
      margin: 15 * this.displayedScale,
      insideColor: "#000",
      outsideColor: "#000"
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
    const { rows, columns, margin, width, height, outsideColor, insideColor } = this.state;
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

      const widthOffset = width/2 - (columns * side)/2;
      const heightOffset = height/2 - (rows * side)/2;
      
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.strokeStyle = outsideColor;
      ctx.moveTo(widthOffset, heightOffset);
      ctx.lineTo(widthOffset, rows * side + heightOffset);
      ctx.lineTo(columns * side + widthOffset, rows * side + heightOffset);
      ctx.lineTo(columns * side + widthOffset, heightOffset);
      ctx.lineTo(widthOffset, heightOffset);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = insideColor;

      for(i = 1; i < columns; i++){
        ctx.moveTo(i*side + widthOffset, 0 + heightOffset);
        ctx.lineTo(i*side + widthOffset, rows * side + heightOffset);
      }
  
      for(i = 1; i < rows; i++){
        ctx.moveTo(0 + widthOffset, i * side + heightOffset);
        ctx.lineTo(columns * side + widthOffset, i * side + heightOffset);
      }
      ctx.stroke();
    }
  }

  exportDraw() {
    const { rows, columns, outsideColor, insideColor } = this.state;
    const c = document.getElementById("exportCanvas");
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    let side, i;
    if(this.width/this.height < columns/rows) {
      side = (this.width - 2 * this.margin) / columns;
    } else {
      side = (this.height - 2 * this.margin) / rows;
    }
    const widthOffset = this.width/2 - (columns * side)/2;
    const heightOffset = this.height/2 - (rows * side)/2;
    
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.strokeStyle = outsideColor;
    ctx.moveTo(widthOffset, heightOffset);
    ctx.lineTo(widthOffset, rows * side + heightOffset);
    ctx.lineTo(columns * side + widthOffset, rows * side + heightOffset);
    ctx.lineTo(columns * side + widthOffset, heightOffset);
    ctx.lineTo(widthOffset, heightOffset);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = insideColor;

    for(i = 1; i < columns; i++){
      ctx.moveTo(i*side + widthOffset, 0 + heightOffset);
      ctx.lineTo(i*side + widthOffset, rows * side + heightOffset);
    }

    for(i = 1; i < rows; i++){
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

  handleColorChange = name => color => {
    this.setState({ [name]: color.hex });
  };
  
  render() {
    const drawerWidth = 300;
    const { columns, rows, insideColor, outsideColor } = this.state;

    this.draw();

    return (
      <div className="app">
        <Drawer 
          width={drawerWidth}
          columns={columns}
          rows={rows}
          insideColor={insideColor}
          outsideColor={outsideColor}
          handleColorChange={this.handleColorChange}
          handleChange={this.handleChange}
          exportToPdf={this.exportToPdf}
        />
        <div style={{marginLeft: drawerWidth}}>
          <canvas id="displayCanvas" className="canvas displayed-canvas" width={210 * this.displayedScale} height={297 * this.displayedScale}></canvas>
          <canvas id="exportCanvas" className="canvas" width={210 * this.scale} height={297 * this.scale} style={{position: 'absolute', opacity: 0}}></canvas>
        </div>
      </div>
    );
  }
}

export default App;
