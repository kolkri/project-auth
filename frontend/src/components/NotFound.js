import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const Title = styled.h1`
	padding: 20px;
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 44px;
	text-align: center;
`;

const Container = styled.div`
	width: 300px;
	height: 400px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	padding: 20px;
	margin: 2rem auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

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
