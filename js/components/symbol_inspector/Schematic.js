var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Text = require('./Text');

var Schematic = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState: function () {
    return {
      view: null,
      x: 0,
      y: 0
    };
  },

  componentWillMount: function () {
    DiagramViewStore.listen(this.handleDiagramViewStoreChange);
    DiagramViewActions.createView(this.props.viewUUID);
    DiagramViewActions.changeViewPortDimensions(this.props.viewUUID, 1000, 600);
  },

  componentDidMount: function () {
    //window.addEventListener('mousewheel', this.handleMouseWheel);
  },

  componentWillUnmount: function () {
    //window.removeEventListener('mousewheel', this.handleMouseWheel);
    DiagramViewActions.removeView(this.props.viewUUID);
    DiagramViewStore.unlisten(this.handleDiagramViewStoreChange);
  },

  handleDiagramViewStoreChange: function (newState) {
    this.setState({ view: newState.views.get(this.props.viewUUID) });
  },

  getViewBox: function () {
    var view = this.state.view;
    var zoom = view.get('zoom');

    var width = view.get('viewPortWidth') / zoom;
    var height = view.get('viewPortHeight') / zoom;
    var offsetX = view.get('diagramOffsetX');
    var offsetY = view.get('diagramOffsetY');

    return offsetX + ' ' + offsetY + ' ' + width + ' ' + height;
  },

  getViewBoxTransform: function () {
    var view = this.state.view;
    var zoom = view.get('zoom');

    var width = view.get('viewPortWidth') / zoom;
    var height = view.get('viewPortHeight') / zoom;
    var offsetX = -view.get('diagramOffsetX');
    var offsetY = -view.get('diagramOffsetY');

    return 'scale(' + zoom + ')' + 'translate(' + offsetX + ' ' + offsetY + ')';
  },

  getViewPort: function () {
    var width = this.state.view.get('viewPortWidth');
    var height = this.state.view.get('viewPortHeight');
    return width + ' ' + height;
  },

  getShapeRendering: function () {
    var view = this.state.view;

    if (view.get('zoom') < 1)
      return 'optimizeSpeed';
    else
      return 'crispEdges';
  },

  svgToBrowser: function (x, y) {
  },

  browserToSvg: function (x, y) {
    var svgX = this.props.offsetX + x / this.props.zoom;
    var svgY = this.props.offsetY + y / this.props.zoom;
    return { x: svgX, y: svgY };
  },

  handleMouseMove: function (event) {
    var bbox = ReactDOM.findDOMNode(this).getBoundingClientRect();
    // var x = event.pageX - bbox.left - document.body.scrollLeft - document.documentElement.scrollLeft;
    // var y = event.pageY - bbox.top - document.body.scrollTop - document.documentElement.scrollTop;
    var pagePos = {
      x: event.clientX - bbox.left,
      y: event.clientY - bbox.top
    }
    var diagramPos = DiagramViewStore.viewPortPositionToDiagram(this.props.viewUUID, pagePos);
    this.setState(diagramPos);
  },

  handleMouseWheel: function (event) {
    event.preventDefault();
    event.stopPropagation();

    var bbox = ReactDOM.findDOMNode(this).getBoundingClientRect();
    var pagePos = {
      x: event.clientX - bbox.left,
      y: event.clientY - bbox.top
    }

    var newZoom = this.state.view.get('zoom') * (event.deltaY > 0 ? 15/16 : 16/15);
    newZoom = Math.round(newZoom * 250) / 250;

    DiagramViewActions.changeZoom(this.props.viewUUID, newZoom, pagePos.x, pagePos.y);
  },

  handleClick: function (event) {
  },

  render: function () {
    var x = 100;
    var y = 100;

    return (
      <svg version='1.2'
        width={this.state.view.get('viewPortWidth')}
        height={this.state.view.get('viewPortHeight')}
        class='schematic'
        //viewBox={this.getViewBox()}
        shape-rendering={this.getShapeRendering()}
        onMouseMove={this.handleMouseMove}
        onWheel={this.handleMouseWheel}
        onClick={this.handleClick}
      >
        <defs>
          <SchematicRepository />
        </defs>

        <g transform={this.getViewBoxTransform()}>
          <Grid viewBox={this.getViewBox()} viewPort={this.getViewPort()} zoom={this.state.view.get('zoom')}/>

          <SomeSymbol name='IC101' key='IC101' value='ATMega88PA-PU' x={100} y={100} relRotation={this.state.r} absRotation={this.state.r}/>

          <NANDGate name='IC201' key='IC201' value='7400' inputsN={2} x={400} y={200}/>
          <NANDGate name='IC202' key='IC202' value='7400' inputsN={3} x={550} y={200}/>
          <NANDGate name='IC203' key='IC203' value='7400' inputsN={4} x={700} y={200}/>

          <SomeSymbol name='IC102' key='IC102' value='7400' x={this.state.x} y={this.state.y} relRotation={90} absRotation={90}/>

          <NANDGate name='IC204' key='IC204' value='7400' inputsN={8} x={850} y={200}/>

          <SomeSymbol name={'IC' + x} value='7400' x={x += 200} y={x += 200} relRotation={90} absRotation={90}/>
          <SomeSymbol name={'IC' + x} value='7400' x={x += 200} y={x += 200} relRotation={90} absRotation={90}/>
          <SomeSymbol name={'IC' + x} value='7400' x={x += 200} y={x += 200} relRotation={90} absRotation={90}/>
          <SomeSymbol name={'IC' + x} value='7400' x={x += 200} y={x += 200} relRotation={90} absRotation={90}/>
          <SomeSymbol name={'IC' + x} value='7400' x={x += 200} y={x += 200} relRotation={90} absRotation={90}/>
          <SomeSymbol name={'IC' + x} value='7400' x={x += 200} y={x += 200} relRotation={90} absRotation={90}/>
          <SomeSymbol name={'IC' + x} value='7400' x={x += 200} y={x += 200} relRotation={90} absRotation={90}/>
          <SomeSymbol name={'IC' + x} value='7400' x={x += 200} y={x += 200} relRotation={90} absRotation={90}/>
          <SomeSymbol name={'IC' + x} value='7400' x={x += 200} y={x += 200} relRotation={90} absRotation={90}/>
        </g>
      </svg>
    );
  }
});

module.exports = Schematic;
