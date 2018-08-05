import React, {Component} from 'react';

class LogoParade extends Component {
	state = {
		list: [],
	};

	componentDidMount() {
		const {list, speed} = this.props;

		Promise.all(list.map(url => this._imageSize(url)))
			.then(list => list.reduce((sum, element) => sum + element.width, 0))
			.then(size => {
				let keyframes = `
					@-webkit-keyframes logo-parade {
						0% { margin-left: 0; }
						100% { margin-left: -${size}px; }
					}
					.logo-parade-initiator {
						will-change: transform;
						transform: translateZ(0) rotateZ(360deg) translate3d(0, 0, 0);
						animation: logo-parade ${speed}ms linear infinite;
					}
				`;

				const style = document.createElement('style');
				style.id = 'logo-parade';
				style.textContent = keyframes;
				document.head.appendChild(style);
			}).then(() => this.setState({list: [...list, ...list]}));
	}

	render() {
		return (
			<div style={{display: 'flex', overflow: 'hidden'}}>
				{this.state.list.map((element, index) => (
					<div className={`${(index === 0) && 'logo-parade-initiator'}`}><img src={element}/></div>
				))}
			</div>
		);
	}

	componentWillUnmount() {
		const logoParade = document.getElementById('logo-parade');
		logoParade.parentNode.removeChild(logoParade);
	}

	_imageSize(url) {
		const img = new Image();
		img.src = url;
		return new Promise(resolve => {
			img.onload = resolve(img);
		});
	}

	static defaultProps = {
		list: [],
		speed: 5000,
	};
}
