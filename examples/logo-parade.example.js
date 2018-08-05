import React, { Component } from 'react';
import { render } from 'react-dom';

render((
	<LogoParade
		list={[
			'https://picsum.photos/200/300/?image=146',
			'https://picsum.photos/200/300/?image=147',
			'https://picsum.photos/200/300/?image=145',
			'https://picsum.photos/200/300/?image=149',
			'https://picsum.photos/200/300/?image=144',
		]}
		speed={5000}
	/>
), document.getElementById('root'));