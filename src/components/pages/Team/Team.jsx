import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import './style.css';

import { API_URL } from '../../../constants';

const Team = ({ loadTeamData, team, match }) => {
	useEffect(() => {
		loadTeamData(match.params.id);
	}, [match.params.id]);

	const [user, setUser] = useState();

	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};
		getCurrentUser();
	}, []);

	const newProduction = team.data && team.data.filter((item, index) => index <= 6);
	return (
		<Fragment>
			<Header />
			<div className="container">
				<h1 className="info__title">Мир автомобилей</h1>
				<h2 className="info__text">Добро пожаловать на веб ресурс об автомобилях.</h2>
				<h1 className="info__caption">Самые новые автомобили</h1>
				<div className="info__famous">
					{newProduction &&
						newProduction.map((person) => (
							<Link to={`/tasks/${person._id}`} key={person._id} className="a">
								<div className="info__card">
									<img className="card__img" src={`${API_URL}/getImage/${person.avatar}`} />
									<p className="card__name">{`${person.price} гг.`}</p>
									<p className="card__name">{`${person.typeThing} ${person.name}`}</p>
								</div>
							</Link>
						))}
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

Team.propTypes = {
	team: PropTypes.object,
	loadTeamData: PropTypes.func,
	match: PropTypes.any,
};

Team.defaultProps = {
	team: {},
	loadTeamData: () => {},
};
export default Team;
