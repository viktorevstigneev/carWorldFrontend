import React, { useCallback, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import lupa from '../../../img/vector.png';
import './style.css';

import { API_URL } from '../../../constants';

const Tests = ({ loadTeamData, team, match }) => {
	const [user, setUser] = useState();
	const [searchValue, setSearchValue] = useState('');
	const [filterData, setFilterData] = useState(team.data && team.data.filter((item) => item.typeThing === 'bmw'));
	console.log('filterData: ', filterData);

	useEffect(() => {
		loadTeamData();
	}, []);

	useEffect(() => {
		setFilterData(team.data && team.data.filter((item) => item.typeThing === 'bmw'));
	}, [team]);

	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};
		getCurrentUser();
	}, []);

	const handleDeletePerson = async (evt) => {
		evt.preventDefault();
		const id = evt.target.getAttribute('data-id');

		const responseData = await axios
			.delete(`${API_URL}/team/${id}`, { withCredentials: true })
			.then((response) => response);

		if (responseData.status == 200) {
			location.reload();
		}
	};

	const handleSearhChange = (evt) => {
		setSearchValue(evt.target.value);
	};

	const handleFilterChange = (evt) => {
		const filter = team.data && team.data.filter((item) => item.typeThing === evt.target.value);
		setFilterData(filter);
	};

	return (
		<Fragment>
			<Header />
			<div className="test">
				<h1 className="test__title">Автомобили</h1>
				<div className="filter__block">
					<div className="info__con">
						<img className="search__icon" src={lupa} alt="" />
						<input className="info__search" type="text" placeholder="Поиск машины" onChange={handleSearhChange} />
					</div>
					<div className="test__select">
						<h3 className="select__title">Фильтровать по марке</h3>
						<select className="" onChange={handleFilterChange} defaultValue="tabletka">
							<option value="bmw">BMW</option>
							<option value="audi">Audi</option>
							<option value="ford">Ford</option>
							<option value="honda">Honda</option>
							<option value="hundai">Hundai</option>
							<option value="kia">Kia</option>
							<option value="mazda">Mazda</option>
							<option value="mersedes">Mersedes</option>
							<option value="mitsibishi">Mitsubishi</option>
							<option value="nissan">Nissan</option>
							<option value="renault">Renault</option>
							<option value="shkoda">Shkoda</option>
							<option value="toyota">Toyota</option>
							<option value="VolksWagen">VolksWagen</option>
							<option value="lexus">Lexus</option>
							<option value="Tesla">Tesla</option>
							<option value="porsche">Porsche</option>
						</select>
					</div>
				</div>

				<div className="info__people">
					{filterData &&
						filterData
							.filter((item) => searchValue == '' || _.includes(item.name, searchValue))
							.map((person) => (
								<Link to={`/tasks/${person._id}`} key={person._id}>
									<div className="person">
										<img className="person__img" src={`${API_URL}/getImage/${person.avatar}`} />
										<p className="person__name">{`${person.price} гг.`}</p>
										<p className="person__name">{person.typeThing} {person.name}</p>
										{user && user.isAdmin && (
											<div className="delete__person" data-id={person._id} onClick={handleDeletePerson}>
												&times;
											</div>
										)}
									</div>
								</Link>
							))}
				</div>
			</div>

			<Footer />
		</Fragment>
	);
};

Tests.propTypes = {
	team: PropTypes.object,
	loadTeamData: PropTypes.func,
};

Tests.defaultProps = {
	team: {},
	loadTeamData: () => {},
};
export default Tests;
