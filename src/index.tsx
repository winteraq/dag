import './styles.css';
import Measure from 'react-measure';
import * as React from 'react';
import { Stage, Layer, Text } from 'react-konva';
export type Props = { text: string };

export default class Dag extends React.Component<Props> {
  state = {
    dimensions: {
      width: 0,
      height: 0,
    },
  };

  render() {
    const { text } = this.props;
    const { dimensions } = this.state;
    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} className="dag-container">
            <Stage width={dimensions.width} height={dimensions.height}>
              <Layer>
                <Text text={text} />
              </Layer>
            </Stage>
          </div>
        )}
      </Measure>
    );
  }
}
