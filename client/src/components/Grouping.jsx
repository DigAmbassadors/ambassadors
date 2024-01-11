import { useState } from 'react';
import Header from './Header';
import Button from '@mui/material/Button';
import '../assets/style/grouping.css';
import { Link } from 'react-router-dom';

const Grouping = () => {
	// 新規グループ作成-------------------------------
	const [newName, setNewName] = useState('');
	const newGroup = () => {};

	// 既存グループに参加-----------------------------
	const [joinId, setJoinId] = useState('');
	const [joinPass, setJoinPass] = useState('');

	return (
		<div>
			<Header show={false} />

			<div className='newGroup'>
				<div>
					<h2>チームを作成</h2>
					<Button variant='contained' onClick={newGroup}>
						作成
					</Button>
				</div>
				<div>
					<input type='text' placeholder='新チーム名' onChange={(e) => setNewName(e.target.value)} />
				</div>
			</div>

			<div className='joinGroup'>
				<div>
					<h2>チームに参加</h2>
					<Button variant='contained' onClick={newGroup}>
						参加
					</Button>
				</div>
				<div>
					<input type='text' placeholder='チームID' onChange={(e) => setJoinId(e.target.value)} />
				</div>
				<div>
					<input type='text' placeholder='pass' onChange={(e) => setJoinPass(e.target.value)} />
				</div>
			</div>

			<div className='joined'>
				<h2>参加済みチーム</h2>
			</div>
		</div>
	);
};
export default Grouping;
