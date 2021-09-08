import { Spinner } from '@blueprintjs/core';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import apolloClient from '#root/api/apolloClient';
import { useRecoilState } from 'recoil';
import userSessionAtom from '#root/recoil/atoms/userSession';
import Initialised from './initialised/Initialised';

const SpinnerWrapper = styled.div`
	left: 50%;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
`;

const query = gql`
	{
		userSession(me: true) {
			user {
				username
			}
		}
	}
`;

const Root = () => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [, setUserSession ] = useRecoilState(userSessionAtom);

	useEffect(() => {
		apolloClient.query({ query }).then((res) => {
			const userSession = res.data?.userSession ?? null;
			setUserSession(userSession);
			setIsLoading(false);
		});
	}, []);

	return isLoading ? (
		<SpinnerWrapper>
			<Spinner />
		</SpinnerWrapper>
	) : (
		<Initialised />
	);
};

export default Root;
