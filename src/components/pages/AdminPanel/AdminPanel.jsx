import React, { useCallback, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import './style.css';

import { API_URL } from '../../../constants';

const AdminPanel = ({ loadTeamData, team, match }) => {
	useEffect(() => {
		loadTeamData(match.params.id);
	}, [match.params.id]);

	const [file, setFile] = useState('');

	return (
		<Fragment>
			<Header />
			<h1 className="admin__title">Добавить модель</h1>
			<form
				className="admin__person"
				encType="multipart/form-data"
				// method="POST"
				onSubmit={async (evt) => {
					evt.preventDefault();
					location.reload();
					const formData = new FormData(evt.target);

					const responseData = await axios({
						method: 'POST',
						url: `${API_URL}/team`,
						data: formData,
						withCredentials: true,
					});
				}}
			>
				<div className="admin__block">
					<label className="admin__label" htmlFor="avatar">
						<img
							className="admin__avatar"
							src={file ? URL.createObjectURL(file) : `${API_URL}/getImage/default.jpeg`}
							alt="person picture"
						/>
						<div className="admin__icon">&#128194;</div>
					</label>
					<input
						className="admin__input"
						id="avatar"
						name="avatar"
						type="file"
						onChange={(evt) => setFile(evt.target.files[0])}
					/>
				</div>

				<div className="admin__right">
					<label className="music__label" htmlFor="type">
						Выберите марку машины
					</label>
					<select className="admin__text-input" name="typeThing" id="type">
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

					<label className="music__label" htmlFor="name">
						Модель машины
					</label>
					<input
						className="admin__text-input"
						type="text"
						placeholder="Введите модель машины"
						name="name"
						required="true"
					/>

					<label className="music__label" htmlFor="price">
						Года выпуска
					</label>
					<input
						className="admin__text-input"
						type="text"
						placeholder="Введите года выпуска"
						name="price"
						required="true"
					/>
					<label />
					<label className="music__label" htmlFor="description">
						Информация о машине
					</label>
					<textarea
						className="admin__textarea"
						id="description"
						name="description"
						type="text"
						required="true"
						placeholder="Введите информацию о машине"
					/>
					<button className="admin__button" type="submit">
						Добавить машину
					</button>
				</div>
			</form>

			<Footer />
		</Fragment>
	);
};

AdminPanel.propTypes = {
	team: PropTypes.object,
	loadTeamData: PropTypes.func,
};

AdminPanel.defaultProps = {
	team: {},
	loadTeamData: () => {},
};
export default AdminPanel;
