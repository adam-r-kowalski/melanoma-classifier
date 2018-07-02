import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tf from '@tensorflow/tfjs';

document.body.style.margin = '0';

const renderTarget = document.createElement('div');

class App extends React.Component {
    render() {
	return (
	    <div>hello</div>
	);
    }
}


ReactDOM.render(<App />, renderTarget);
document.body.appendChild(renderTarget);

tf.tensor([1, 2, 3]).print();
