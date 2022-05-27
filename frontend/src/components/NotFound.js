import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Container } from '../styledComponents/styledNotFound';

export const NotFound = () => {
	return (
		<Container>
			<Title>
				<h1>404 page not found!</h1>
				<Link to='/'>Go back to start </Link>
			</Title>
		</Container>
	);
};
