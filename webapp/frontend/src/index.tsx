import * as React from 'react';
import * as ReactDOM from 'react-dom';

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

async function fetchAsync(url: string) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

fetchAsync('/model-saver').then(console.log);
