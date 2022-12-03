import React, { useEffect, useState, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import ModalWindow from '../../common/ModalWindow';
import ProfileTaskList from '../../common/ProfileTasksList';
import './style.css';

import { POPUP_OVERLAY_CLASSNAME, API_URL } from '../../../constants';
import ProfileHonorsList from '../../common/ProfileHonorsList/ProfileHonorsList';

const Profile = ({ profile, honors, loadProfileData, loadHonorsData, match }) => {
	const [user, setUser] = useState();
	console.log('user: ', user);
	const [order, setOrder] = useState();
	const [summarySum, setSummaruSum] = useState(0);

	useEffect(() => {
		loadProfileData(match.params.id);
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};

		getCurrentUser();
	}, [match.params.id]);

	useEffect(() => {
		const getOrder = async () => {
			const responseData = await axios
				.get(`${API_URL}/team`, { withCredentials: true })
				.then((response) => setOrder(response.data));
		};
		getOrder();
	}, []);

	const gotedData =
		order && order.filter((value) => profile.data?.userCart && profile.data?.userCart.includes(value._id));
	console.log('gotedData: ', gotedData);

	const handleOrderPreparats = async () => {
		const responseData = await axios
			.post(`${API_URL}/team/order`, { withCredentials: true, gotedData, user: user.username, userID: user._id })
			.then((response) => response.data);
		console.log('responseData: ', responseData);

		window.location.reload();
		alert('успешно');
	};

	const handleDeleteCartItem = async (evt) => {
		const deleteItemId = evt.target.getAttribute('data-id');

		const responseData = await axios
			.patch(`${API_URL}/profile/order/delete`, { withCredentials: true, deleteItemId, userID: user._id })
			.then((response) => response.data);
		console.log('responseData: ', responseData);

		window.location.reload();
	};

	return (
		<Fragment>
			<Header />
			<div className="profile">
				<p className="profile__top">Bаши избранне автомобили</p>
				<div className="fovourites_car">
					{gotedData && gotedData.length ? (
						gotedData &&
						gotedData.map((item) => (
							<div className="flex" key={item._id}>
								<p className="prifile__delete-item" data-id={item._id} onClick={handleDeleteCartItem}>
									убрать
								</p>
								<Link to={`/tasks/${item._id}`} className="">
									<div className="" style={{}}>
										<img
											className="profile__cart-img"
											src={`${API_URL}/getImage/${item.avatar}`}
											alt="картинка машины"
										/>
									</div>
									<p className="profile__top">{item.typeThing} {item.name}</p>
									<p className="profile__top"> {item.price} </p>
								</Link>
							</div>
						))
					) : (
						<p className="">У вас нет избранных автомобилей</p>
					)}
				</div>
				{/* {gotedData && gotedData.length ? (
					<>
						<p className="profile_"> Общая стоимость препаратов : {sum} BYN</p>
						<button className="order__prep" onClick={handleOrderPreparats}>
							Заказать препараты
						</button>
					</>
				) : null} */}
			</div>

			<Footer />
		</Fragment>
	);
};

Profile.propTypes = {
	profile: PropTypes.object,
	honors: PropTypes.object,
	loadProfileData: PropTypes.func,
	loadHonorsData: PropTypes.func,
	match: PropTypes.object,
};

Profile.defaultProps = {
	profile: {},
	honors: {},
	loadProfileData: () => {},
	loadHonorsData: () => {},
	match: {},
};

export default Profile;
