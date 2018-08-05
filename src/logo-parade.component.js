import React, {Component} from 'react';

class LogoParade extends Component {
	state = {
		list: [],
		run: true,
	};

	componentDidMount() {
		const {list, speed} = this.props;

		Promise.all(list.map(url => this._imageSize(url)))
			.then(list => list.reduce((sum, element) => sum + element.width, 0))
			.then(size => {
				let styles = `
					@-webkit-keyframes logo-parade {
						0% { margin-left: 0; }
						100% { margin-left: -${size}px; }
					}
					.logo-parade-initiator {
						will-change: transform;
						transform: translateZ(0) rotateZ(360deg) translate3d(0, 0, 0);
						animation-timing-function: linear;
						animation-iteration-count: infinite;
						animation-name: logo-parade;
						animation-duration: ${speed}ms;
					}
				`;

				const style = document.createElement('style');
				style.id = 'logo-parade';
				style.textContent = styles;
				document.head.appendChild(style);
			}).then(() => this.setState({list: [...list, ...list]}));
	}

	render() {
		return (
			<div
				style={{height: '100%', display: 'flex', overflow: 'hidden'}}
				onMouseOver={() => this.setState({run: false})}
				onMouseOut={() => this.setState({run: true})}
			>
				{this.state.list.map((element, index) => (
					<div
						className={`${(index === 0) && 'logo-parade-initiator'}`}
						style={{animationPlayState: ((index === 0) && this.state.run) ? `running` : 'paused'}}
					><img src={element}/></div>
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
