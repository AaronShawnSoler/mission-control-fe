import React from 'react';
import StarRatings from 'react-star-ratings';
import { useMutation } from 'urql';

import EditIcon from '@material-ui/icons/Edit';
import { Label } from 'semantic-ui-react';

import NoteEditor from '../../NoteEditor';
// import extractAvatar from '../../../../utils/managers';

import {
	edit,
	projectNote,
	avatarContainer,
	avatar,
	contentContainer,
	noteContainer,
	noteHeader,
	starRating,
	noteBody,
	noteFooter,
	expanded,
	miniAvatarContainer,
	collapsed,
	notewrapperPrivate,
	notewrapperPublic
} from './Notes.module.scss';

const Note = ({ note, user, projectManagers, projectId }) => {
	const [ expandedList, setExpandedList ] = React.useState(false);
	const [ isEditing, setIsEditing ] = React.useState(false);
	const { topic, content, rating, attendedBy } = note;

	// Removes redundant avatar of signed-in user
	const displayedAttendees = attendedBy.filter((person) => person.email !== user.email);

	return isEditing ? (
		<NoteEditor
			projectId={projectId}
			note={note}
			key={note.id}
			id={note.id}
			user={user}
			projectManagers={projectManagers}
			setIsEditing={setIsEditing}
		/>
	) : (
		<section className={projectNote}>
			<div className={avatarContainer}>
				<img
					src="https://cdn4.iconfinder.com/data/icons/political-elections/50/48-512.png"
					alt={`avatar of ${note.author.name}`}
					className={avatar}
				/>
			</div>
			<div className={noteContainer}>
				<div className={contentContainer}>
					<div className={noteHeader}>
						<h2>{topic}</h2>
						<StarRatings
							numberOfStars={3}
							rating={rating}
							className={starRating}
							starRatedColor="rgb(245,73,135)"
							starEmptyColor="rgba(245,73,135,.2)"
							starDimension="20px"
							starSpacing=".5px"
						/>
						{note.privateNote ? (
							<div onClick={() => setIsEditing(true)} class={notewrapperPrivate}>
								Private Note
							</div>
						) : (
							<div onClick={() => setIsEditing(true)} class={notewrapperPublic}>
								Public Note
							</div>
						)}
					</div>
					<div className={noteBody}>{content}</div>
				</div>
				<div className={noteFooter}>
					<div
						className={expandedList ? expanded : collapsed}
						onClick={() => setExpandedList(!expandedList)}
						role="presentation"
					>
						{displayedAttendees.map((attendee) => {
							return (
								<div key={attendee.name} className={miniAvatarContainer}>
									<img src={''} alt={`avatar of ${attendee.name}`} />
									<button type="button">
										<Label disabled size="small">
											{attendee.name}
										</Label>
									</button>
								</div>
							);
						})}
					</div>
					{note.author.email === user.email ? (
						<EditIcon onClick={() => setIsEditing(true)} className={edit} />
					) : (
						false
					)}
				</div>
			</div>
		</section>
	);
};

export default Note;
