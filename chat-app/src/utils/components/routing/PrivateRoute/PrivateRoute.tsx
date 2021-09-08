import { FC, ComponentType, ReactElement } from 'react';
import { Route, RouteComponentProps, Redirect, RouteProps } from 'react-router-dom';

interface CommonProps extends RouteProps {
	allowVisit: boolean;
	redirectTo: string;
}

type Props =
	| ({
			component: ComponentType<RouteComponentProps>;
		} & CommonProps)
	| ({
			render: (props: RouteComponentProps) => ReactElement;
		} & CommonProps);

const PrivateRoute: FC<Props> = ({ allowVisit, redirectTo, component: Component, render, ...rest }) => {
	const renderedComponent = Component ? (props: RouteComponentProps) => <Component {...props} /> : render!;

	return (
		<Route
			{...rest}
			render={(props) =>
				allowVisit ? (
					renderedComponent(props)
				) : (
					<Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
				)}
		/>
	);
};

export default PrivateRoute;
